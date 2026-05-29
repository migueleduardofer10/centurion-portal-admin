using Kendo.Mvc.Extensions;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Utilities;
using System.Collections.Generic;
using System.Linq;

namespace CenturionPortalApi.DataAccess
{
    public class ReportFacade
    {
        public static IQueryable<CustomACHStatus> GetACHStatus(string userUid)
        {
            var context = new LirsDbContext();

            return (
                from loan in context.vwl_LNSLoan
                join vendor in context.vwl_VendorPortfolio on loan.Uid equals vendor.LoanUid
                join map in context.ELSServiceMap on vendor.LenderUid equals map.ParentUid
                where map.Type == (int)Enums.UserTypeEnum.LENDER &&
                    map.UserUid == userUid && vendor.CurrentBalance > 0
                select new CustomACHStatus()
                {
                    ACH_Status = loan.ACHStatus == 0 ? "NONE" : loan.ACHStatus == 1 ? "ACTIVE" : loan.ACHStatus == 2 ? "CANCELLED" : "HOLD",
                    Borrower_Name = loan.BorrowerFullName,
                    ACH_NextDebitDate = loan.ACHNextDueDate,
                    ACH_PaymentAmount = (decimal)(loan.ACHPaymentAmount != null ? loan.ACHPaymentAmount : 0),
                    ACH_CustomPayment = loan.ACHCustomPayment == true ? "Automatic" : "Fixed Amount",
                    LoanAccount = loan.Account,
                    LoanUid = loan.Uid,
                }
            );
        }
    }
}
