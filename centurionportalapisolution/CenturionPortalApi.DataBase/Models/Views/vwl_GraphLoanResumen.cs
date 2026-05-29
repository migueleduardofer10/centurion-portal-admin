using System;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_GraphLoanResumen
    {
        public string StateUid { get; set; }
        public string StateName { get; set; }
        public decimal UPB { get; set; }
        public DateTime? NextDueDate { get; set; }
        public int LoanStatus { get; set; }
        public bool LoanIsActive { get; set; }
        public string DelinquencyName { get; set; }
        public int DelinquencyUid { get; set; }
        public int IsDelinquency { get; set; }
        public string LenderUid { get; set; }
        public string OfficerUid { get; set; }
    }
}
