using System;

namespace CenturionPortalApi.DataBase.Models.Views
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
    }
}
