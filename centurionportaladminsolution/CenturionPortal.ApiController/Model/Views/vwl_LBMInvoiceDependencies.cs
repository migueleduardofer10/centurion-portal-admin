namespace CenturionPortal.ApiController.Model.Views
{
    public class vwl_LBMInvoiceDependencies
    {
        public vwl_LBMInvoice Invoice { get; set; }
        public vwl_LBMInvoiceDetail InvoiceDetails { get; set; }
        public vwl_LNSPayment Payment { get; set; }
        public vwl_LBMPaymentLog PaymentLog { get; set; }
    }
}
