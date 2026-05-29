using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
    public static class PortfolioReportsFacade
    {
        public static IQueryable<RPTCustomLenderDisbursement> getData_RPTCustomLenderDisbursement(string userUid, int userType, DateTime dateFrom, DateTime dateTo, string filter, bool includePrint = false, string lenderUid = null)
        {
            LirsDbContext db = new LirsDbContext();
            IQueryable<vwl_LenderDisbursement> query = db.vwl_LenderDisbursements;

            IQueryable<vwl_LNSLoan> loans = UtilitiesMasterFilterFacade.getLoansMasterFilter(UtilitiesMasterFilterFacade.getMFP_By_LenderDisbursement(userUid, userType), db);
            string[] str_arrLoans = filter.Split('|');
            int useRange = Convert.ToInt32(str_arrLoans[0]);
            int uidfrom = Convert.ToInt32(str_arrLoans[1]);
            int uidto = Convert.ToInt32(str_arrLoans[2]);
            if (!string.IsNullOrEmpty(lenderUid))
            {
                if (userType == (int)Enums.UserTypeEnum.LENDER)
                {
                    query = query.Where(l => l.VendorUid == lenderUid);
                    loans = loans.Where(l => db.vwl_LNSLending.Where(lend => lend.LenderUid == lenderUid && lend.LoanUid == l.Uid).Count() > 0);
                }
                else if (userType == (int)Enums.UserTypeEnum.BROKER)
                {
                    List<string> brokersUis = ALLDepartmentFacade.GetAll().Select(d => d.BrokerUid).ToList();
                    query = query.Where(v => !brokersUis.Contains(v.VendorUid));
                    loans = loans.Where(l => l.BrokerRepresentative == lenderUid);
                }
            }
            else
            {
                if (userType == (int)Enums.UserTypeEnum.LENDER)
                {
                    IEnumerable<string> parentUids = ELSServiceMapFacade.Query_By_UserUid_UserType_SelectOnly_ParentUid(db, userUid, userType);
                    query = query.Where(l => parentUids.Contains(l.VendorUid));
                }
                else if (userType == (int)Enums.UserTypeEnum.BROKER)
                {
                    List<string> brokersUis = ALLDepartmentFacade.GetAll().Select(d => d.BrokerUid).ToList();
                    query = query.Where(v => !brokersUis.Contains(v.VendorUid));
                }
            }

            if (str_arrLoans.Count() == 3 && useRange == 1)
            {
                loans = loans.Skip(uidfrom).Take(uidto - uidfrom);
            }
            if (dateFrom != null && dateTo != null)
            {
                dateTo = dateTo.Date.AddDays(1);
                query = query.Where(l => l.CheckDate >= dateFrom && l.CheckDate < dateTo);
            }

            return 
            (
                from q in query
                join l in loans on q.LoanUid equals l.Uid
                where (includePrint == true || (q.CheckNo != "Print" && q.CheckNo != "Immediate" && q.CheckNo != "Hold"))
                orderby q.CheckDate descending
                select  new RPTCustomLenderDisbursement()
                {
                    CheckAmount = q.CheckAmount ?? 0,
                    CheckDate = q.CheckDate ?? DateTime.MinValue,
                    CheckNumber = q.CheckNo,
                    NextPaymentDue = q.PaymentDue ?? DateTime.MinValue,
                    Interest = q.ToInterest,
                    InterestCharges = q.ToChargesInterest,
                    LateCharges = q.ToLateCharge,
                    LenderAccount = q.VendorAccount,
                    LenderUid = q.VendorUid,
                    LoanAccount = q.LoanAccount,
                    PrevLoanAccount = l.PrevAccount,
                    InvestorAssetNumber = l.InvestAssetNumber,
                    LoanUid = q.LoanUid,
                    OtherNonTaxable = q.ToOtherTaxFree,
                    OtherPayments = q.ToOtherPayments,
                    OtherTaxable = q.ToOtherTaxable,
                    PrepayFee = q.ToPrepay,
                    Principal = q.ToPrincipal,
                    PrincipalCharges = q.ToChargesPrincipal,
                    ServiceFees = q.ToServiceFee,
                    Uid = q.Uid
                }
            ).AsQueryable();
        }
    }
}
