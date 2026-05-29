using Kendo.Mvc.UI;
using CenturionPortalApi.DataAccess;
using System.Threading.Tasks;
using System;
using System.Linq;
using Kendo.Mvc.Extensions;
using CenturionPortalApi.DataBase.Models.Custom_Entities;

namespace CenturionPortalApi.Business
{
    public class ReportController
    {
        public static async Task<DataSourceResult> GetACHStatus(DataSourceRequest request, string userUid)
        {
            return await ReportFacade.GetACHStatus(userUid).ToDataSourceResultAsync(request);
        }

        public static IQueryable<RPTCustomLenderDisbursement> RPTCustomLenderDisbursement_Data(string userUid, int userType, DateTime dateFrom, DateTime dateTo, string filter, bool includePrint = false, string lenderUid = null)
        {
            return PortfolioReportsFacade.getData_RPTCustomLenderDisbursement(userUid, userType, dateFrom, dateTo, filter, includePrint, lenderUid);
            //IQueryable<vwl_LenderDisbursement> query =   CLNSLenderActivityController.GetAllLenderDisbursement(db);

            //IQueryable<LNSLoan> loans = UtilitiesMasterFilter.getLoansMasterFilter(UtilitiesMasterFilter.getMFPbyLenderDisbursement(user), db);
            //string[] str_arrLoans = filter.Split('|');
            //int useRange = Convert.ToInt32(str_arrLoans[0]);
            //int uidfrom = Convert.ToInt32(str_arrLoans[1]);
            //int uidto = Convert.ToInt32(str_arrLoans[2]);
            //if (!string.IsNullOrEmpty(lenderUid))
            //{
            //    if (userType == (int)Enums.UserTypeEnum.LENDER)
            //    {
            //        query = query.Where(l => l.VendorUid == lenderUid);
            //        loans = loans.Where(l => db.LNSLending.Where(lend => lend.LenderUid == lenderUid && lend.LoanUid == l.Uid).Count() > 0);
            //    }
            //    else if (userType == (int)Enums.UserTypeEnum.BROKER)
            //    {
            //        List<string> brokersUis = ALLDepartmentFacade.GetAll().Select(d => d.BrokerUid).ToList();
            //        query = query.Where(v => !brokersUis.Contains(v.VendorUid));
            //        loans = loans.Where(l => l.BrokerRepresentative == lenderUid);
            //    }
            //}
            //else
            //{
            //    if (userType == (int)Enums.UserTypeEnum.LENDER)
            //    {
            //        List<string> parentUids = ELSServiceMapFacade.GetByUidAndType(userUid, userType).Select(u => u.ParentUid).ToList();
            //        query = query.Where(l => parentUids.Contains(l.VendorUid));
            //    }
            //    else if (userType == (int)Enums.UserTypeEnum.BROKER)
            //    {
            //        List<string> brokersUis = ALLDepartmentFacade.GetAll().Select(d => d.BrokerUid).ToList();
            //        query = query.Where(v => !brokersUis.Contains(v.VendorUid));
            //    }
            //}

            //if (str_arrLoans.Count() == 3 && useRange == 1)
            //{
            //    loans = loans.Skip(uidfrom).Take(uidto - uidfrom);
            //}
            //if (dateFrom != null && dateTo != null)
            //{
            //    dateTo = dateTo.Date.AddDays(1);
            //    query = query.Where(l => l.CheckDate >= dateFrom && l.CheckDate < dateTo);
            //}

            //return (from q in query
            //        join l in loans on q.LoanUid equals l.Uid
            //        where (includePrint == true || (q.CheckNo != "Print" && q.CheckNo != "Immediate" && q.CheckNo != "Hold"))
            //        orderby q.CheckDate descending
            //        select new RPTCustomLenderDisbursement()
            //        {
            //            CheckAmount = q.CheckAmount ?? 0,
            //            CheckDate = q.CheckDate ?? DateTime.MinValue,
            //            CheckNumber = q.CheckNo,
            //            NextPaymentDue = q.PaymentDue ?? DateTime.MinValue,
            //            Interest = q.ToInterest,
            //            InterestCharges = q.ToChargesInterest,
            //            LateCharges = q.ToLateCharge,
            //            LenderAccount = q.VendorAccount,
            //            LenderUid = q.VendorUid,
            //            LoanAccount = q.LoanAccount,
            //            PrevLoanAccount = l.PrevAccount,
            //            InvestorAssetNumber = l.InvestAssetNumber,
            //            LoanUid = q.LoanUid,
            //            OtherNonTaxable = q.ToOtherTaxFree,
            //            OtherPayments = q.ToOtherPayments,
            //            OtherTaxable = q.ToOtherTaxable,
            //            PrepayFee = q.ToPrepay,
            //            Principal = q.ToPrincipal,
            //            PrincipalCharges = q.ToChargesPrincipal,
            //            ServiceFees = q.ToServiceFee,
            //            Uid = q.Uid
            //        }).AsQueryable();
        }
    }
}
