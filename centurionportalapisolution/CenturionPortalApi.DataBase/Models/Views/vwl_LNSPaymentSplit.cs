using System;
using System.Collections.Generic;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_LNSPaymentSplit
    {
        public string Uid { get; set; }
        public string TrustAccountUid { get; set; }
        public string PaymentUid { get; set; }
        public string AccountUid { get; set; }
        public string Memo { get; set; }
        public decimal Amount { get; set; }
        public int Type { get; set; }
        public int Module { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string AppLastUpdatedBy { get; set; }
    }
}
