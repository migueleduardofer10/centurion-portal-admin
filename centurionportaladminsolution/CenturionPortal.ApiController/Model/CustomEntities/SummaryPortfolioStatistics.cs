using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.CustomEntities
{
  public   class SummaryPortfolioStatistics
    {
        public int? Id { get; set; }
        public string? Status { get; set; }
        public int? TotalLoans { get; set; }
        public decimal? OriginalBalance { get; set; }
        public decimal? PrincipalBalance { get; set; }
        public double? SUMNoteRate { get; set; }
    }
}
