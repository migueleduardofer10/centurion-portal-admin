using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_ChargesDetails
    {
        public string Uid { get; set; }
        public string ChargeUid { get; set; }
        public DateTime? Date { get; set; }
        public string Reference { get; set; }
        public string VendorName { get; set; }
        public decimal? Amount { get; set; }
        public decimal PrinVendor { get; set; }
        public decimal IntVendor { get; set; }
        public decimal PrinBehalf { get; set; }
        public decimal IntBehalf { get; set; }
    }
}
