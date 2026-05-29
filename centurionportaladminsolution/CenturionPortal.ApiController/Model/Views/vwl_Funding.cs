using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.Views
{
    public class vwl_Funding
    {

        public string LenderUid { get; set; }
        public string LoanUid { get; set; }
        public string LenderAccount { get; set; }
        public decimal LenderCurrentBalance { get; set; }
        public string LenderName { get; set; }
        public decimal LenderAmountFunded { get; set; }
        public string SecondaryUid { get; set; }
        public double InvestorRate { get; set; }
        public decimal PercentageOwned { get; set; }
        public decimal PaymentInformation { get; set; }

        //public static string QueryForSelectGraphQL
        //{
        //    get
        //    {
        //        return @"
        //            investorRate,
        //            lenderAccount,
        //            lenderAmountFunded,
        //            lenderCurrentBalance,
        //            lenderName,
        //            lenderUid,
        //            loanUid,
        //            paymentInformation,
        //            percentageOwned,
        //            secondaryUid";
        //    }
        //}
    }
}
