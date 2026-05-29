using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.Views
{
    public partial class vwl_LoanCharges
    {
        public string Uid { get; set; }
        public string LoanUid { get; set; }
        public DateTime? Date { get; set; }
        public string Reference { get; set; }
        public string Description { get; set; }
        public string ChargeType { get; set; }
        public double InterestRate { get; set; }
        public DateTime? InterestFrom { get; set; }
        public bool Deferred { get; set; }
        public string OwedToAccount { get; set; }
        public decimal OriginalAmount { get; set; }
        public decimal? Balance { get; set; }
        public decimal VendorBalance { get; set; }
        public decimal? AccruedInterest { get; set; }
        public decimal? TotalDue { get; set; }
        public int LoanNoteType { get; set; }
    }
}
