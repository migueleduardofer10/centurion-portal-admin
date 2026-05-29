using System;

namespace CenturionPortalApi.DataBase.Models.Custom_Entities
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
    }
}
