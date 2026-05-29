using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public class UtilityGraphFacade
    {
        public static async Task<List<RESLoanByState>> GetLoanCountAndUPBByState(string userUid)
        {
            LirsDbContext context = new LirsDbContext();

            var result = await
                (
                    from loan in context.vwl_GraphLoanResumen
                    join map in context.ELSServiceMap on loan.LenderUid equals map.ParentUid
                    where !string.IsNullOrEmpty(loan.StateUid) &&
                        map.UserUid == userUid && map.Type == (int)Enums.UserTypeEnum.LENDER                        
                    group new
                    {
                        loan.UPB,
                        loan.IsDelinquency,
                        UPBDelinquency = loan.IsDelinquency == 1 ? loan.UPB : 0
                    } by new
                    {
                        loan.StateUid,
                        loan.StateName
                    } into g
                    select new RESLoanByState()
                    {
                        StateName = g.Key.StateName,
                        StateUid = g.Key.StateUid,
                        UPB = g.Sum(d => d.UPB),
                        UPBDelinquency = g.Sum(d => d.UPBDelinquency),
                        TotalLoans = g.Count(),
                        TotalDelinquency = g.Sum(d => d.IsDelinquency)
                    }
                ).ToListAsync();

            return result;
        }

        public static async Task<List<vwl_LoanPaymentOnTime>> GetCubeLoanPaymentOnTime(string userUid)
        {
            LirsDbContext context = new LirsDbContext();

            string query = string.Format(@"
                SELECT State, [0] AS 'A', [1] AS 'B',[2] AS 'C',[3] AS 'D',[4] AS 'E'
                    FROM (
                        SELECT
			                result2.State,
			                (CASE
				                WHEN result2.PctPaymentOnTime < 41 THEN 0
				                WHEN result2.PctPaymentOnTime < 60 THEN 1 
				                WHEN result2.PctPaymentOnTime < 80 THEN 2
				                WHEN result2.PctPaymentOnTime <= 99 THEN 3
				                ELSE 4
			                END) AS RangePmt
                        FROM (
                            SELECT
				                l.Account
				                , l.State
				                , result.TotalPmt
				                , result.TotalPerformingPmt
				                , (result.TotalPerformingPmt * 100/ result.TotalPmt) AS PctPaymentOnTime
				                , DATEDIFF(MONTH, ISNULL(l.FirstPaymentDate, l.OriginationDate), l.MaturityDate) AS NumMonthsToEnd
                            FROM [vw_VendorPortfolio] l
                                INNER JOIN [ELSServiceMap] map ON map.ParentUid = l.LenderUid
			                 INNER JOIN (
                                    SELECT
					                       LoanUid
					                       , COUNT(Uid) AS TotalPmt
					                       , SUM(CASE
							                     WHEN DATEDIFF(DAY, DateDue, DateReceived) >= 0 THEN 1
							                     ELSE 0
						                      END
					                       ) AS TotalPerformingPmt
                                    FROM Centurion.dbo.LNSLoanActivity 
                                    WHERE Description = 'Regpmt' OR Description = 'Payoff'
                                    GROUP BY LoanUid
                                    HAVING COUNT(Uid) > 0
                                ) AS result ON l.LoanUid = result.LoanUid
                            WHERE map.UserUid = '{0}' AND map.Type = {1}
                        ) AS result2
                    ) AS SourceTable PIVOT(COUNT(RangePmt) FOR RangePmt IN (
			                [0],
			                [1],
			                [2],
			                [3],
			                [4]
		                )
	                ) AS PivotTable",
                new object[] { userUid, (int)Enums.UserTypeEnum.LENDER }
            );

            return await context.vwl_LoanPaymentOnTime.FromSqlRaw(query).ToListAsync();
        }
    }
}
