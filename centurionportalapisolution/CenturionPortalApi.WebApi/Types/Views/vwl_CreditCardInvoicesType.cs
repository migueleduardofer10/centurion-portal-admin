using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_CreditCardInvoicesType : ObjectGraphType<vwl_CreditCardInvoices>
    {
        public vwl_CreditCardInvoicesType()
        {
            Name = nameof(vwl_CreditCardInvoicesType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.CustomerUid, nullable: true);
            Field(x => x.Memo, nullable: true);
            Field(x => x.Description, nullable: true);
            Field(x => x.OriginalAmount, nullable: true);
            Field(x => x.Amount, nullable: true);
            Field(x => x.DateDue, type: typeof(DateGraphType), nullable: true);
            Field(x => x.Date, type: typeof(DateGraphType), nullable: true);
            Field(x => x.DepartmentUid, nullable: true);
            Field(x => x.Account, nullable: true);
            Field(x => x.VendorUid, nullable: true);
            Field(x => x.FullName, nullable: true);
            Field(x => x.Email, nullable: true);
            Field(x => x.NumInvoice, nullable: true);
            Field(x => x.Reference, nullable: true);
            Field(x => x.PaymentUid, nullable: true);
            Field(x => x.CCFollowUpDate, type: typeof(DateGraphType), nullable: true);
            Field(x => x.SendLastEmailDate, type: typeof(DateGraphType), nullable: true);
            Field(x => x.ExcludeLateCharge, nullable: true);
            Field(x => x.ApprovalAllowed, nullable: true);
            Field(x => x.Is_CreditCard, nullable: true);
            Field(x => x.CCDeclined, nullable: true);
            Field(x => x.AppCreationDate, nullable: true);
            Field(x => x.IsFrozenChecks, nullable: true);
        }
    }
}
