using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_PaidInvoicesType : ObjectGraphType<vwl_PaidInvoices>
    {
        public vwl_PaidInvoicesType()
        {
            Name = nameof(vwl_PaidInvoicesType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.DepartmentUid, nullable: true);
            Field(x => x.FullName, nullable: true);
            Field(x => x.DateDue, type: typeof(DateGraphType), nullable: true);
            Field(x => x.Date, type: typeof(DateGraphType), nullable: true);
            Field(x => x.CustomerUid, nullable: true);
            Field(x => x.Description, nullable: true);
            Field(x => x.Amount, nullable: true);
            Field(x => x.AmountDue, nullable: true);
            Field(x => x.Account, nullable: true);
            Field(x => x.Reference, nullable: true);
            Field(x => x.NumInvoice, nullable: true);
            Field(x => x.DateReceived, type: typeof(DateGraphType), nullable: true);
            Field(x => x.AppCreationDate, type: typeof(DateGraphType), nullable: true);
            Field(x => x.SendLastEmailDate, type: typeof(DateGraphType), nullable: true);
            Field(x => x.WriteOffDate, type: typeof(DateGraphType), nullable: true);
            Field(x => x.ExportUid, nullable: true);
            Field(x => x.PaymentUid, nullable: true);
            Field(x => x.WasPayment, nullable: true);
            Field(x => x.Is_ACH, nullable: true);
        }
    }
}
