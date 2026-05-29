using System;

namespace CenturionPortal.ApiController.Model.Views
{
    public partial class vwl_LNSPayment
    {
        public string Uid { get; set; }
        public string TrustAccountUid { get; set; }
        public string ActivityUid { get; set; }
        public string ClientUid { get; set; }
        public string GroupUid { get; set; }
        public string TransferLinkUid { get; set; }
        public string ClientAccount { get; set; }
        public string ClientName { get; set; }
        public string ClientAddress { get; set; }
        public int CheckStatus { get; set; }
        public string Reference { get; set; }
        public string Comments { get; set; }
        public string Memo { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? DateDeposited { get; set; }
        public int Module { get; set; }
        public int Transaction { get; set; }
        public int ClearStatus { get; set; }
        public string ReconciliationUid { get; set; }
        public decimal Amount { get; set; }
        public int OtherPaymentType { get; set; }
        public string RepaymentUid { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string AppLastUpdatedBy { get; set; }
        public bool IsACH { get; set; }

        public string AppCreationDate_String { get { return AppCreationDate != null ? string.Format("{0:MM/dd/yyyy}", AppCreationDate) : ""; } }
        public string DateReceived_String { get { return DateReceived != null ? string.Format("{0:MM/dd/yyyy}", DateReceived) : ""; } }
    }
}
