using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LBMInvoiceDependenciesType : ObjectGraphType<vwl_LBMInvoiceDependencies>
    {
        public vwl_LBMInvoiceDependenciesType()
        {
            Name = nameof(vwl_LBMInvoiceDependenciesType);

            Field(x => x.Invoice, type: typeof(vwl_LBMInvoiceType), nullable: true);
            Field(x => x.InvoiceDetails, type: typeof(vwl_LBMInvoiceDetailType), nullable: true);
            Field(x => x.Payment, type: typeof(vwl_LNSPaymentType), nullable: true);
            Field(x => x.PaymentLog, type: typeof(vwl_LBMPaymentLogType), nullable: true);
        }
    }
}
