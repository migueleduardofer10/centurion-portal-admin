using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
    public static class OtherStatisticsFacade
    {



        public static IQueryable<OtherStatistics> getOtherStatistics(string userUid,
            Centurion.Utilities.CENTEnums.UserTypeEnum userType)
        {
            var db = new LirsDbContext();
            var column = "";

            try
            {

                var where = "";

                if (userType == Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER)
                {
                    column = " v.VendorUid  ";
                    // lender = " v.VendorUid in ('" + string.Join("', '", map) + "')";
                }
                else if (userType == Centurion.Utilities.CENTEnums.UserTypeEnum.BROKER)
                {
                    column = " v.BrokerRepresentative  ";
                    // lender = " v.BrokerRepresentative in ('" + string.Join("', '", map) + "')";
                }

                if (column != "")
                {
                    where = $@"
                        where exists (
                            select m.ParentUid from v_IRSServiceMap m
                            where m.UserUid = @userUid and m.type = @userType and m.parentUid = {column}                    
                        )
                    ";
                }

                var sql = $@"
                    select 
                    [range].Uid as [Title],
                    ISNULL(SUM(temp.TotalAmount),0) as [TotalAmount],
                    ISNULL(SUM(temp.TotalInterest),0) as [TotalInterest] , 0 Count
                    from(
	                    select
	                    (v.ToInterest + v.ToPrincipal + v.ToServiceFee + v.ToLateCharge + v.ToChargesPrincipal + v.ToChargesInterest +
	                    v.ToPrepay + v.ToOtherTaxable + v.ToTrust + v.ToOtherPayments + v.ToOtherTaxFree + v.ToEscrowInt) as TotalAmount,
	                    ISNULL(ToInterest,0) as TotalInterest, v.CheckDate
	                    from vw_VendorHistory v
	                    {where}
                    )as temp
                    right join
                    (
	                    (select 'MonthToDate' as Uid, dateadd(m, datediff(m, 0, GETDATE()), 0) as startDate, getdate() as endDate)
	                    union (select 'PriorMonth' as Uid, dateadd(m, datediff(m, 0, GETDATE())-1, 0) as startDate, dateadd(m, datediff(m, 0, GETDATE()), 0) as endDate)
	                    union (select 'CurrentYear' as Uid, dateadd(yy, datediff(yy, 0, GETDATE()), 0) as startDate, getdate() as endDate)
	                    union (select 'PriorYear' as Uid, dateadd(yy, datediff(yy, 0, GETDATE())-1, 0) as startDate, dateadd(yy, datediff(yy, 0, GETDATE()), 0) as endDate)
	                    union (select 'Lifetime' as Uid, dateadd(yy, 0, 0) as startDate, dateadd(yy, datediff(yy, 0, GETDATE()), 0) as endDate)
                    )as [range] on [range].startDate <= temp.CheckDate and temp.CheckDate < [range].endDate
                    group by [range].uid, [range].startDate, [range].endDate
                    ";

                var query = db.OtherStatistics.FromSqlRaw(sql, 
                    new SqlParameter("userUid", userUid), new SqlParameter("userType", (int)userType));



                return query;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}
