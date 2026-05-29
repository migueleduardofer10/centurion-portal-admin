using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LBMInvoiceDetailsType : ObjectGraphType<vwl_LBMInvoiceDetails>
    {
        public vwl_LBMInvoiceDetailsType()
        {
            Name = nameof(vwl_LBMInvoiceDetailType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.BeginDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.EndDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.Name, nullable: true);
            Field(x => x.Account, nullable: true);
            Field(x => x.LoanAcct, nullable: true);
            Field(x => x.Borrower, nullable: true);
            Field(x => x.PropStreet, nullable: true);
            Field(x => x.PropCity, nullable: true);
            Field(x => x.PropState, nullable: true);
            Field(x => x.PropZip, nullable: true);
            Field(x => x.LoanStatus, nullable: true);
            Field(x => x.Description, nullable: true);
            Field(x => x.Quantity, nullable: true);
            Field(x => x.Amount, nullable: true);
        }
    }
}
