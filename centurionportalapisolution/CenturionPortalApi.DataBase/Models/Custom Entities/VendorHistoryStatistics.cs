using System;

namespace CenturionPortalApi.DataBase.Models.Custom_Entities
{
    public class VendorHistoryStatistics
    {
        public string Legend { get; set; }
        public decimal? TotalAmount { get; set; }
        public decimal? ToInterest { get; set; }
        public decimal? ToPrincipal { get; set; }
        public decimal? ToLateCharge { get; set; }
        public decimal? Other { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
