using System;

namespace CenturionPortal.ApiController.Model.Views
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

        public string BeginDate_String { get { return BeginDate != null ? string.Format("{0:MM/dd/yyyy}", BeginDate) : ""; } }
        public string EndDate_String { get { return EndDate != null ? string.Format("{0:MM/dd/yyyy}", EndDate) : ""; } }
    }
}
