using System;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_PaidInvoices
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
    }
}
