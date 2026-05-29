using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.Request
{
    public class LNSVendorGraphRequest
    {
        public DataSourceResultLoanPortfolio getLNSVendor { get; set; }
        public List<GridColumnForView> getGridColumns { get; set; }
    }
}
