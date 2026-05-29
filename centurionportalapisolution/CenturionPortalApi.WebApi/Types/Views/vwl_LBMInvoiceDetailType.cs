using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LBMInvoiceDetailType : ObjectGraphType<vwl_LBMInvoiceDetail>
    {
        public vwl_LBMInvoiceDetailType()
        {
            Name = nameof(vwl_LBMInvoiceDetailType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.InvoiceUid, nullable: true);
            Field(x => x.PaymentUid, nullable: true);
            Field(x => x.Reference, nullable: true);
            Field(x => x.PaymentMethod, nullable: true);
            Field(x => x.FinalAmount, nullable: true);
        }
    }
}
