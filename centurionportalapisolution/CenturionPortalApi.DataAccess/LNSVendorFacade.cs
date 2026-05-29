using Centurion.Boarding;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public class LNSVendorFacade
    {

     





        //public static async Task<List<vwl_VendorPortfolio>> GetAll(int userType, List<string> maps)
        //{
        //    LirsDbContext context = new LirsDbContext();

        //    IQueryable<vwl_VendorPortfolio> query = context.vwl_VendorPortfolio.AsQueryable();

        //    if (userType == (int)ELSEnums.UserTypeEnum.LENDER)//Filter by List of Lenders
        //    {
        //        query = query.Where(c => maps.Contains(c.LenderUid));
        //    }
        //    else if (userType == (int)ELSEnums.UserTypeEnum.BROKER)//Filter by List of officers
        //    {
        //        query = query.Where(c => maps.Contains(c.OfficerUid));
        //    }
        //    else if (userType == (int)ELSEnums.UserTypeEnum.BORROWER)//Filter by List of officers
        //    {
        //        query = query.Where(c => maps.Contains(c.LoanUid) && (c.IsForeclosure == false));
        //    }

        //    return await query.ToListAsync();
        //}

        public static IQueryable<vwl_VendorPortfolio> GetPage(string userUid)
        {
            LirsDbContext context = new LirsDbContext();

            return
                (
                    from loan in context.vwl_VendorPortfolio
                    join map in context.ELSServiceMap on loan.LenderUid equals map.ParentUid
                    where map.UserUid == userUid && map.Type == (int)Enums.UserTypeEnum.LENDER
                    orderby loan.Name, loan.AssignedDate
                    select loan
                ).AsQueryable();
        }

        public static async Task<vwl_LNSVendor> GetByUid(string uid)
        {
            LirsDbContext context = new LirsDbContext();

            return await context.vwl_LNSVendor
                .Where(x => x.Uid == uid)
                .FirstOrDefaultAsync();
        }

        public static async Task<List<vwl_LNSVendor>> GetByFilter(string filter, string loansUidExclude)
        {
            LirsDbContext context = new LirsDbContext();

            //Partimos en una la lista los Uid de los Loans a esxluir
            List<string> loansUid = loansUidExclude.Split('|').ToList();

            //Eliminamos en la lista de retorno aquellos registros que coincidan con los Uid de los loans a excluir
            // objArr.RemoveAll(x => loansUid.Exists(l => l == x.Uid));


            //Listamos los loans coincidentes
            var objArr = await context.vwl_LNSVendor
                .Where(x => (x.Account.Contains(filter) || x.FullName.Contains(filter)) && loansUid.Contains(x.Uid) == false)
                .Select(x =>
                    new vwl_LNSVendor
                    {
                        Uid = x.Uid,
                        Account = x.Account,
                        FullName = x.FullName
                    }
                )
                .ToListAsync();


            return objArr;
        }

        public static async Task<List<VendorHistoryStatistics>> GetPaymentsToLender(
            List<string> parentMap, DateTime? fromFilter, DateTime? toFilter
        )
        {
            LirsDbContext context = new LirsDbContext();

            string parentFilter = string.Empty;
            string customDate = string.Empty;

            foreach (string uid in parentMap)
            {
                parentFilter += "(SELECT '" + uid + "' AS AssignUid) " + (parentMap.Last().Equals(uid) ? "" : " UNION\n");
            }

            parentFilter = string.IsNullOrEmpty(parentFilter) ? "SELECT 'notUid' AS AssignUid" : parentFilter;

            if (fromFilter != null && toFilter != null)
            {
                customDate = string.Format(
                    @"UNION (SELECT 5 AS uid, 'Custom Range' AS Legend, CONVERT(DATETIME, '{0}', 103) as startDate, CONVERT(DATETIME, '{1}', 103) AS endDate)",
                    new object[] { string.Format("{0:dd/MM/yyyy}", fromFilter), string.Format("{0:dd/MM/yyyy}", toFilter) }
                );
            }

            string query = string.Format(@"
                    SELECT
                        rang.Legend,
                        rang.startDate as StartDate,
                        rang.endDate as EndDate,
                        ISNULL(SUM(tmp.TotalAmount),0) as TotalAmount,
                        ISNULL(SUM(tmp.ToInterest),0) as ToInterest,
                        ISNULL(SUM(tmp.ToPrincipal),0) as ToPrincipal,
                        ISNULL(SUM(tmp.ToLateCharge),0) as ToLateCharge,
                        ISNULL(SUM(tmp.TotalAmount-(tmp.ToInterest + tmp.ToPrincipal + tmp.ToLateCharge)),0) AS Other
                    FROM (
                        SELECT
		                    (
			                    a.ToInterest + 
			                    a.ToPrincipal + 
			                    a.ToServiceFee + 
			                    a.ToLateCharge + 
			                    a.ToChargesPrincipal + 
			                    a.ToChargesInterest + 
			                    a.ToPrepay + 
			                    a.ToOtherTaxable + 
			                    a.ToTrust + 
			                    a.ToOtherPayments + 
			                    a.ToOtherTaxFree + 
			                    a.ToEscrowInt
		                    ) AS TotalAmount,
		                    a.ToInterest, 
		                    a.ToPrincipal,
		                    a.ToLateCharge,
		                    a.CheckDate,
		                    a.VendorUid,
		                    l.BrokerRepresentative
	                    FROM Centurion.dbo.LNSLenderActivity AS a 
	                        INNER JOIN Centurion.dbo.LNSLoan AS l ON a.LoanUid = l.Uid
                            INNER JOIN (
                                {0}
                            ) AS assigns on (1 = {2} AND VendorUid = assigns.AssignUid) OR (0 = {2} AND BrokerRepresentative = assigns.AssignUid)
	                    WHERE a.CheckNo NOT IN ('Print', 'Immediate', 'Hold')  
                    ) AS tmp
                        RIGHT JOIN (
	                        (SELECT 1 AS uid, 'Month to Date' AS Legend, DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) AS startDate, DATEADD(DD, 0, DATEDIFF(DD, 0, GETDATE()) + 1) AS endDate) 
	                        UNION (SELECT 2 as uid, 'Prior Month' as Legend, DATEADD(m, DATEDIFF(m, 0, GETDATE()) - 1, 0) as startDate, DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) AS endDate) 
	                        UNION (SELECT 3 as uid, 'Year to Date' as Legend, DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) as startDate, DATEADD(DD,0, DATEDIFF(DD, 0, GETDATE()) + 1) AS endDate) 
	                        UNION (SELECT 4 as uid, 'Prior Year' as Legend, DATEADD(yy, DATEDIFF(yy, 0, GETDATE()) - 1, 0) as startDate, DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) AS endDate) 
                            {1} 
                        ) AS rang ON rang.startDate <= tmp.CheckDate AND tmp.CheckDate < rang.endDate
                    GROUP BY rang.uid, rang.Legend, rang.startDate, rang.endDate
                    ORDER BY rang.uid ",
                new object[] { parentFilter, customDate, 1 }
            );

            return await context.VendorHistoryStatistics.FromSqlRaw(query).ToListAsync();
        }

        public static async Task<List<VendorHistoryStatistics>> GetPaymentsFromBorrower(
            List<string> parentMap, DateTime? fromFilter, DateTime? toFilter
        )
        {
            try
            {


                LirsDbContext context = new LirsDbContext();

                string parentFilter = string.Empty;
                string customDate = string.Empty;

                foreach (string uid in parentMap)
                {
                    parentFilter += "(SELECT '" + uid + "' AS AssignUid) " + (parentMap.Last().Equals(uid) ? "" : " UNION\n");
                }

                parentFilter = string.IsNullOrEmpty(parentFilter) ? "SELECT 'notUid' AS AssignUid" : parentFilter;

                if (fromFilter != null && toFilter != null)
                {
                    customDate = string.Format(
                        @"UNION (SELECT 5 AS uid, 'Custom Range' AS Legend, CONVERT(DATETIME, '{0}', 103) as startDate, CONVERT(DATETIME, '{1}', 103) AS endDate)",
                        new object[] { string.Format("{0:dd/MM/yyyy}", fromFilter), string.Format("{0:dd/MM/yyyy}", toFilter) }
                    );
                }

                string query = string.Format(@"
                    SELECT
                        rang.Legend,
                        rang.startDate AS StartDate,
                        rang.endDate AS EndDate,
                        ISNULL(SUM(tmp.TotalAmount), 0) AS TotalAmount,
                        ISNULL(SUM(tmp.ToInterest), 0) AS ToInterest,
                        ISNULL(SUM(tmp.ToPrincipal), 0) AS ToPrincipal,
                        ISNULL(SUM(tmp.ToLateCharge), 0) AS ToLateCharge,
                        ISNULL(SUM(tmp.TotalAmount - (tmp.ToInterest + tmp.ToPrincipal + tmp.ToLateCharge)), 0) AS Other
                    FROM (
	                    SELECT 
	                        h.ToInterest, 
	                        h.ToPrincipal,
	                        h.ToLateCharge,
	                        (
		                        h.ToPrincipal + 
	                            h.ToInterest + 
	                            h.ToReserve + 
	                            h.ReserveRestricted +
	                            h.ToImpound + 
	                            h.ToCapitalExp +
	                            h.ToRepair +
	                            h.ToMiscellaneous +
	                            h.ToSecurityDeposit +
	                            h.ToAdvanceRentReserve +
	                            h.ToPropertyManagement +
	                            h.ToExpenseReserve +
	                            h.ToTaxReserve +
	                            h.ToInsuranceReserve +
	                            h.ToLateCharge + 
	                            h.ToChargesPrincipal + 
	                            h.ToChargesInterest + 
	                            h.ToPrepay + 
	                            h.ToBrokerFee + 
	                            h.ToLenderFee + 
	                            h.ToOtherPayments + 
	                            h.ToOtherTaxable + 
	                            h.ToUnpaidFees + 
	                            h.ToUnpaidEscrowInt + 
	                            h.ToOtherTaxFree +
	                            h.ToTaxAdvanceReserve +
	                            h.ToInsuranceAdvanceReserve		
	                        ) AS TotalAmount,
	                        h.DateReceived
	                    FROM Centurion.dbo.LNSLoanActivity h WITH (NOLOCK)
                            INNER JOIN (	
							    SELECT 
                                    portfolio.LoanUid,
                                    MAX(portfolio.Status) AS LoanStatus,
                                    Max(portfolio.AssignedDate) AS AssignedDate                                        
							    FROM [vwl_VendorPortfolioResume] portfolio
                                    INNER JOIN (
                                        {0}
                                    ) AS assignLenders ON 1 = {2} AND portfolio.LenderUid = assignLenders.AssignUid
							    GROUP BY portfolio.LoanUid										

                                UNION

                                SELECT 
                                    portfolio.LoanUid ,
                                    MAX(portfolio.Status) as LoanStatus,
                                    Max(portfolio.AssignedDate) as AssignedDate                                        
							    FROM [vwl_VendorPortfolioResume] portfolio
                                    INNER JOIN
                                    (
                                        {0}
                                    ) AS assignLenders ON 1 = {2} AND portfolio.OfficerUid = assignLenders.AssignUid 
							    GROUP BY portfolio.LoanUid	
	                        ) AS lend ON h.LoanUid = lend.LoanUid 
	                    WHERE 
                            (lend.LoanStatus != -1 OR lend.AssignedDate IS NULL OR h.DateReceived <= lend.AssignedDate) AND
                            NOT EXISTS (
	                            SELECT 
	                                1
	                            FROM 
	                            (
		                            SELECT 'Adj-PB' AS Description UNION
		                            SELECT 'Funding' AS Description UNION
		                            SELECT 'Draw' AS Description UNION
		                            SELECT 'EscVou' AS Description
	                            ) AS tmpDes 
	                            WHERE tmpDes.Description = h.Description
                            )
                    ) AS tmp
                        RIGHT JOIN (
	                        (SELECT 1 AS uid, 'Month to Date' AS Legend, DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) AS startDate, DATEADD(DD, 0, DATEDIFF(DD, 0, GETDATE()) + 1) AS endDate)
	                        UNION (SELECT 2 AS uid, 'Prior Month' AS Legend, DATEADD(m, DATEDIFF(m, 0, GETDATE()) - 1, 0) AS startDate, DATEADD(m, DATEDIFF(m, 0, GETDATE()), 0) AS endDate)
	                        UNION (SELECT 3 AS uid, 'Year to Date' AS Legend, DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) AS startDate, DATEADD(DD, 0, DATEDIFF(DD, 0, GETDATE()) + 1) AS endDate)
	                        UNION (SELECT 4 AS uid, 'Prior Year' AS Legend, DATEADD(yy, DATEDIFF(yy, 0, GETDATE()) - 1, 0) AS startDate, DATEADD(yy, DATEDIFF(yy, 0, GETDATE()), 0) AS endDate)
                            {1}
                        ) AS rang ON rang.startDate <= tmp.DateReceived AND DateReceived < rang.endDate
                    GROUP BY rang.uid , rang.Legend, rang.startDate, rang.endDate
                    ORDER BY rang.uid ",
                    new object[] { parentFilter, customDate, 1 }
                );

                return await context.VendorHistoryStatistics.FromSqlRaw(query).ToListAsync();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static async Task<List<LoanStatusStatistic>> GetLoanStatusByLenderUid(string userUid)
        {
            LirsDbContext context = new LirsDbContext();

            string query = string.Format(@"
                SELECT
	               query.Status,
                    COUNT(*) AS [Count]
                FROM (
                    SELECT
                        v.LoanUid,
                        MAX(v.Status) AS Status
                    FROM vw_VendorPortfolio v
                        INNER JOIN ELSServiceMap map ON map.ParentUid = v.LenderUid
                    WHERE map.UserUid = '{0}' AND map.Type = {1}
                    GROUP BY v.LoanUid
                ) AS query
                GROUP BY Status",
                new object[] { userUid, (int)Enums.UserTypeEnum.LENDER }
            );

            return await context.LoanStatusStatistic.FromSqlRaw(query).ToListAsync();
        }

        public static IQueryable<ELSServiceMap> GetValidLendersByLender(string userUid)
        {
            LirsDbContext context = new LirsDbContext();

            var query = (
                from vendor in context.vwl_LNSVendor
                join officer in context.vwl_LNSOfficers on vendor.Uid equals officer.VendorUid
                join map in context.ELSServiceMap on officer.Uid equals map.ParentUid
                where map.UserUid == userUid && map.Type == (int)Enums.UserTypeEnum.LENDER
                select new ELSServiceMap
                {
                    ParentUid = vendor.Uid,
                    Account = vendor.Account,
                    FullName = vendor.FullName,
                    UserUid = userUid
                }
            ).AsQueryable();

            return query;
        }
    }
}
