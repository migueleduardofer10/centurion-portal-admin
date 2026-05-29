using System;

namespace CenturionPortal.ApiController.Model.Views
{
    public class vwl_CreditCardInvoices
    {
        public string Uid { get; set; }
        public string CustomerUid { get; set; }
        public string Memo { get; set; }
        public string Description { get; set; }
        public decimal OriginalAmount { get; set; }
        public decimal Amount { get; set; }
        public DateTime DateDue { get; set; }
        public DateTime Date { get; set; }
        public int? DepartmentUid { get; set; }
        public string Account { get; set; }
        public string VendorUid { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string NumInvoice { get; set; }
        public string Reference { get; set; }
        public string PaymentUid { get; set; }
        public DateTime? CCFollowUpDate { get; set; }
        public DateTime? SendLastEmailDate { get; set; }
        public bool ExcludeLateCharge { get; set; }
        public int ApprovalAllowed { get; set; }
        public bool? Is_CreditCard { get; set; }
        public bool? CCDeclined { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public bool? IsFrozenChecks { get; set; }

        public string DepartmentUid_String { get { return DepartmentUid == 1 ? "National" : (DepartmentUid == 2 ? "FCI" : ""); } }
        public string IsFrozenChecks_String { get { return IsFrozenChecks == true ? "Yes" : (IsFrozenChecks == false ? "No" : ""); } }
        public string DateDue_String { get { return DateDue != null ? string.Format("{0:MM/dd/yyyy}", DateDue) : ""; } }
        public string Date_String { get { return Date != null ? string.Format("{0:MM/dd/yyyy}", Date) : ""; } }
        public string SendLastEmailDate_String { get { return SendLastEmailDate != null ? string.Format("{0:MM/dd/yyyy}", SendLastEmailDate) : ""; } }
    }
}
