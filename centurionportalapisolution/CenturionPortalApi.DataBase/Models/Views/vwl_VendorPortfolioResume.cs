using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_VendorPortfolioResume
    {
        public string LoanUid { get; set; }
        public string LendingUid { get; set; }
        public string OfficerUid { get; set; }
        public string LenderUid { get; set; }
        public string OrigVendorUid { get; set; }
        public string InvestAssetNumber { get; set; }
        public decimal CurrentBalance { get; set; }
        public bool IsActive { get; set; }
        public decimal? TotalPayment { get; set; }
        public int Status { get; set; }
        public bool IsForeclosure { get; set; }
        public string SecondaryUid { get; set; }
        public DateTime? AssignedDate { get; set; }
    }
}
