using System;

namespace CenturionPortal.ApiController.Model.Views
{
    public class vwl_PaidInvoices
    {
        public string Uid { get; set; }
        public int? DepartmentUid { get; set; }
        public string FullName { get; set; }
        public DateTime DateDue { get; set; }
        public DateTime Date { get; set; }
        public string CustomerUid { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public decimal AmountDue { get; set; }
        public string Account { get; set; }
        public string Reference { get; set; }
        public string NumInvoice { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public DateTime? SendLastEmailDate { get; set; }
        public DateTime? WriteOffDate { get; set; }
        public string ExportUid { get; set; }
        public string PaymentUid { get; set; }
        public bool? WasPayment { get; set; }
        public bool? Is_ACH { get; set; }

        public string DepartmentUid_String { get { return DepartmentUid == 1 ? "National" : (DepartmentUid == 2 ? "FCI" : ""); } }
        public string DateDue_String { get { return DateDue != null ? string.Format("{0:MM/dd/yyyy}", DateDue) : ""; } }
        public string Date_String { get { return Date != null ? string.Format("{0:MM/dd/yyyy}", Date) : ""; } }
        public string DateReceived_String { get { return DateReceived != null ? string.Format("{0:MM/dd/yyyy}", DateReceived) : ""; } }
        public string SendLastEmailDate_String { get { return SendLastEmailDate != null ? string.Format("{0:MM/dd/yyyy}", SendLastEmailDate) : ""; } }
    }
}
