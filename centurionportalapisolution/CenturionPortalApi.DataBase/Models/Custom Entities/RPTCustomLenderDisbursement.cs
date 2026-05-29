using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Custom_Entities
{
    public class RPTCustomLenderDisbursement
    {
        public string Uid { get; set; }
        public string LenderUid { get; set; }
        public string LoanUid { get; set; }
        public DateTime CheckDate { get; set; }
        public DateTime NextPaymentDue { get; set; }
        public string StringNextPaymentDue { get { return NextPaymentDue != null && NextPaymentDue != DateTime.MinValue ? string.Format("{0:MM/dd/yyyy}", NextPaymentDue) : ""; } }
        public string CheckNumber { get; set; }
        public string LenderAccount { get; set; }
        public string LoanAccount { get; set; }
        public string PrevLoanAccount { get; set; }
        public string InvestorAssetNumber { get; set; }
        public decimal CheckAmount { get; set; }
        public decimal ServiceFees { get; set; }
        public decimal Interest { get; set; }
        public decimal Principal { get; set; }
        public decimal LateCharges { get; set; }
        public decimal PrincipalCharges { get; set; }
        public decimal InterestCharges { get; set; }
        public decimal PrepayFee { get; set; }
        public decimal OtherTaxable { get; set; }
        public decimal OtherNonTaxable { get; set; }
        public decimal OtherPayments { get; set; }
    }
}
