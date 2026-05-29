using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.Views
{
    public class vwl_LNSProperty
    {
        public string? LoanUid { get; set; }

        public string? APN { get; set; }
        public int? Type { get; set; }
        public decimal? ValuationAmount { get; set; }
        public DateTime? ValuationDate { get; set; }
        public string? Street { get; set; }

        public int? ValuationType { get; set; }
    }
}
