using System;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_LBMInvoiceDetails
    {
        public string Uid { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Name { get; set; }
        public string Account { get; set; }
        public string LoanAcct { get; set; }
        public string Borrower { get; set; }
        public string PropStreet { get; set; }
        public string PropCity { get; set; }
        public string PropState { get; set; }
        public string PropZip { get; set; }
        public string LoanStatus { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public decimal Amount { get; set; }
    }
}
