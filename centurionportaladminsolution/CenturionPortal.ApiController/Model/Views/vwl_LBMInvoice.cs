using System;

namespace CenturionPortal.ApiController.Model.Views
{
    public partial class vwl_LBMInvoice
    {
        public string Uid { get; set; }
        public string PaymentUid { get; set; }
        public string Reference { get; set; }
        public string ExportUid { get; set; }
        public string CustomerUid { get; set; }
        public string NumInvoice { get; set; }
        public string Memo { get; set; }
        public DateTime Date { get; set; }
        public DateTime DateDue { get; set; }
        public int NumDistributions { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public decimal AmountDue { get; set; }
        public int PaymentMethod { get; set; }
        public decimal LateCharge { get; set; }
        public DateTime? WriteOffDate { get; set; }
        public decimal WriteOffAmount { get; set; }
        public bool ExcludeLateCharge { get; set; }
        public string ACHTraceNumber { get; set; }
        public string ACHBatchNumber { get; set; }
        public int ACHTransNumber { get; set; }
        public DateTime? ACHDate { get; set; }
        public DateTime? CCApprovedDate { get; set; }
        public DateTime? CCFollowUpDate { get; set; }
        public int CCDeclined { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string AppLastUpdatedBy { get; set; }
        public DateTime? SendLastEmailDate { get; set; }
        public string AttchmentUid { get; set; }
    }
}
