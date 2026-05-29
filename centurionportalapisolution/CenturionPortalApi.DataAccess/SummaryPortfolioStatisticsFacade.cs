using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
    public static class SummaryPortfolioStatisticsFacade
    {

        public static   IQueryable<SummaryPortfolioStatistics> GetPortfolioStatisticsbyLenderUid(string userUid, Centurion.Utilities.CENTEnums.UserTypeEnum userType)
        {
            var context = new LirsDbContext();

            try
            {
                var columnName = "";

                switch (userType)
                {
                    case Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER:
                        columnName = " v.lenderUid ";
                        break;
                    case Centurion.Utilities.CENTEnums.UserTypeEnum.BROKER:
                        columnName = " v.officerUid ";
                        break;
                }
                var where = columnName == "" ? "" :$@"  
                    where exists 
                    (
                        select m.ParentUid from Centurion_Web..IRSServiceMap m
                        where m.UserUid = @userUid and m.type = @userType and m.parentUid = {columnName}
                    ) ";


                var sql = $@"
                    SELECT 
                    list.id, 
                    ' ' as [Status],
                    COUNT(query.LoanUid) as TotalLoans,
                    ISNULL(SUM(query.OriginalBalance),0) AS OriginalBalance,
                    ISNULL(SUM(query.PrincipalBalance),0) as PrincipalBalance,
                    ISNULL(SUM(query.NoteRate),0) as SUMNoteRate              
                    FROM
                    (
	                    select v.LoanUid, MAX(v.Status) as [Status],
	                    SUM(v.OriginalBalance) as OriginalBalance,
	                    SUM(v.CurrentBalance) as PrincipalBalance,
	                    AVG(v.NoteRate) as NoteRate
	                    from Centurion..VCW_VendorPortfolio v
	                    {where}   
	                    group by v.LoanUid
                    )as query
                    right join
                    (
                        select -1 as id union all
                        select 0 as id union all
                        select 1 as id union all 
                        select 2 as id union all
                        select 3 as id union all
                        select 4 as id union all
                        select 5 as id union all
                        select 6 as id union all
                        select 7 as id union all
                        select 8 as id union all
                        select 9 as id union all
                        select 10 as id union all
                        select 11 as id union all
                        select 12 as id union all
                        select 13 as id union all
                        select 14 as id union all
                        select 15 as id
                    ) as list on list.id = query.Status
                    group by list.id";

                var query = context.SummaryPortfolioStatistics.FromSqlRaw(sql,
                    new SqlParameter("userUid",userUid),
                    new SqlParameter("userType",(int)userType) );

                return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

    }
}
