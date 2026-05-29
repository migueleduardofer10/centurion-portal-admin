using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public static class vcw_VendorPortfolioSecondaryFacade
    {

        public static IQueryable<GraphSecondaryLoan> Get_GraphSecondaryLoan(string userUid, int userType, string loanUid)
        {
            try
            {
                var context = new LirsDbContext();

            //    loanUid = "88631b222c9e4ed7bb0ecb3929b53df8";

                IQueryable<string> mapQuery = null;

                if (userType == (int)Enums.UserTypeEnum.LENDER)
                {
                    mapQuery = ELSServiceMapFacade.Query_By_UserUid_SelectOnly_ParentUid(context, userUid);
                }


                var query = context.vcw_GetPartialVsFullSecondary.Where(x =>
                        x.LoanUid == loanUid &&
                        (mapQuery != null ? (mapQuery.Contains(x.PrimaryUid) || mapQuery.Contains(x.SecondaryUid)) : true)
                    )
                    .GroupBy(x => x.PaymentUid)
                    .OrderBy(x => x.Max(y => y.DateDue)).Select(x =>
                        new GraphSecondaryLoan
                        {
                            BalanceFull = x.Sum(y => y.BalanceFull),
                            DateReceived = x.Max(y => y.DateReceived),
                            DateDue = x.Max(y => y.DateDue),
                            PartialBalance = x.Sum(y => y.PartialBalance)
                        }
                    )
                    
                    .AsQueryable();
                 

                return query; 

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public static IQueryable<vcw_VendorPortfolioSecondary> Get_By_LoanUid(string loanUid)
        {
            return new LirsDbContext().vcw_VendorPortfolioSecondary.Where(x => x.LoanUid == loanUid).OrderBy(x => x.Account).AsQueryable();
        }


        public static IQueryable<vcw_VendorPortfolioSecondary> Get_By_UserId_UserType_State_Status_Balance(string userUid, int userType, string state, int status, int balance)
        {
            try
            {
                var context = new LirsDbContext();

                var mapQuery = ELSServiceMapFacade.Query_By_UserUid_SelectOnly_ParentUid(context, userUid);

                //var mapQuery =
                //    context.ELSServiceMap.Where(x => x.UserUid == userUid // && x.Type == userType
                //    ).Select(x => x.ParentUid).AsQueryable();


                var query =
                    context.vcw_VendorPortfolioSecondary
                    .Where(v =>

                    (mapQuery.Contains(v.PrimaryUid) || mapQuery.Contains(v.SecondaryUid)) &&

                    (status >= -1 ? v.Status == status : true) &&

                    (string.IsNullOrEmpty(state) != false && state.Trim() != "0" && state.Trim() != "" ? v.State == state : true)

                    ).AsQueryable();



                //filtro BALANCE, tiene dos posibles valores 
                switch (balance)
                {
                    case 0: //IRSUtilitiesController.BalanceFilterEnum.ONLY_POSITIVE = 0
                    case 1: //IRSUtilitiesController.BalanceFilterEnum.ONLY_NEGATIVE = 1
                        var groupConsulta = query
                            .GroupBy(x => new { x.LoanUid, x.Account, x.IsForeclosure })
                            .Where(x =>

                                (balance == 0 ? x.Sum(y => y.SecondaryCurrentBalance) > 0 : true) &&

                                (balance == 1 ? x.Sum(y => y.SecondaryCurrentBalance) == 0 : true)

                        ).AsQueryable();


                        query = groupConsulta
                            .Select(d => new
                            {
                                LoanUid = d.Key.LoanUid,
                                OfficerUid = d.Max(r => r.OfficerUid),
                                SecondaryUid = d.Max(r => r.SecondaryUid),
                                PrimaryUid = d.Max(r => r.PrimaryUid),
                                LendingUid = d.Max(r => r.LendingUid),
                                Account = d.Key.Account,
                                BorrowerFullName = d.Max(r => r.BorrowerFullName),
                                City = d.Max(r => r.City),
                                State = d.Max(r => r.State),
                                LoanOriginalBalance = d.Max(r => r.LoanOriginalBalance),
                                LoanCurrentBalance = d.Max(r => r.LoanCurrentBalance),
                                DaysLate = d.Max(r => r.DaysLate),
                                NextDueDate = d.Max(r => r.NextDueDate),
                                PrimaryAccount = d.Count() == 1 ? d.Max(r => r.PrimaryAccount) : "Multi Lender",
                                PrimaryOriginalBalance = d.Sum(r => r.PrimaryOriginalBalance),
                                RemainingEquityPortion = d.Sum(r => r.RemainingEquityPortion),
                                LenderRate = d.Average(r => r.LenderRate),
                                SecondaryAccount = d.Count() == 1 ? d.Max(r => r.SecondaryAccount) : "Multi Lender",
                                LoanPartialBalance = d.Sum(r => r.LoanPartialBalance),
                                SecondaryOriginalBalance = d.Sum(r => r.SecondaryOriginalBalance),
                                SecondaryCurrentBalance = d.Sum(r => r.SecondaryCurrentBalance),
                                SecondaryRate = d.Sum(r => r.SecondaryCurrentBalance > 0 ? 1 : 0) > 0 ? (d.Sum(r => r.SecondaryCurrentBalance > 0 ? r.SecondaryRate : 0) / d.Sum(r => r.SecondaryCurrentBalance > 0 ? 1 : 0)) : d.Average(r => r.SecondaryRate),
                                TotalPayment = d.Sum(r => r.TotalPayment),
                                Status = d.Max(r => r.Status),
                                StartDate = d.Max(r => r.StartDate),
                                Maturity = d.Max(r => r.Maturity),
                                IsForeclosure = d.Key.IsForeclosure,
                                TermsLeft = d.Average(r => r.TermsLeft)
                            })
                            .Select(l => new vcw_VendorPortfolioSecondary()
                            {
                                LoanUid = l.LoanUid,
                                OfficerUid = l.OfficerUid,
                                SecondaryUid = l.SecondaryUid,
                                PrimaryUid = l.PrimaryUid,
                                LendingUid = l.LendingUid,
                                Account = l.Account,
                                BorrowerFullName = l.BorrowerFullName,
                                City = l.City,
                                State = l.State,
                                LoanOriginalBalance = l.LoanOriginalBalance,
                                LoanCurrentBalance = l.LoanCurrentBalance,
                                DaysLate = l.DaysLate,
                                NextDueDate = l.NextDueDate,
                                PrimaryAccount = l.PrimaryAccount,
                                PrimaryOriginalBalance = l.PrimaryOriginalBalance,
                                RemainingEquityPortion = l.RemainingEquityPortion,
                                LenderRate = l.LenderRate,
                                SecondaryAccount = l.SecondaryAccount,
                                LoanPartialBalance = l.LoanPartialBalance,
                                SecondaryOriginalBalance = l.SecondaryOriginalBalance,
                                SecondaryCurrentBalance = l.SecondaryCurrentBalance,
                                SecondaryRate = l.SecondaryRate,
                                TotalPayment = l.TotalPayment,
                                Status = l.Status,
                                StartDate = l.StartDate,
                                Maturity = l.Maturity,
                                IsForeclosure = l.IsForeclosure,
                                TermsLeft = (int)l.TermsLeft/*,
                                Today = DateNow*/
                            }).AsQueryable();

                        break;
                }






                return query.OrderBy(x => x.Account).AsQueryable();

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
    }
}
