namespace CenturionPortal.ApiController.Model.Views
{
    public partial class vwl_LBMInvoiceDetail
    {
        public string Uid { get; set; }
        public string InvoiceUid { get; set; }
        public string PaymentUid { get; set; }
        public string Reference { get; set; }
        public int PaymentMethod { get; set; }
        public decimal FinalAmount { get; set; }
    }
}
