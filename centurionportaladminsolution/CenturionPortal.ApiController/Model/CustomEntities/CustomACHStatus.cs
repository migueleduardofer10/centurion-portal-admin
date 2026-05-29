using System;

namespace CenturionPortal.ApiController.Model.Custom_Entities
{
    public class CustomACHStatus
    {
        public string LoanUid { get; set; }
        public string LoanAccount { get; set; }
        public string ACH_Status { get; set; }
        public string Borrower_Name { get; set; }
        public DateTime? ACH_NextDebitDate { get; set; }
        public string ACH_CustomPayment { get; set; }
        public decimal ACH_PaymentAmount { get; set; }
        
        public string ACH_NextDebitDate_String { get { return ACH_NextDebitDate != null ? string.Format("{0:MM/dd/yyyy}", ACH_NextDebitDate) : ""; } }
    }
}
