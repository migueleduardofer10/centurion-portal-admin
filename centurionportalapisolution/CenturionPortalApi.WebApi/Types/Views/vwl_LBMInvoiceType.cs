using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LBMInvoiceType : ObjectGraphType<vwl_LBMInvoice>
    {
        public vwl_LBMInvoiceType()
        {
            Name = nameof(vwl_LBMInvoiceType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.PaymentUid, nullable: true);
            Field(x => x.Reference, nullable: true);
            Field(x => x.ExportUid, nullable: true);
            Field(x => x.CustomerUid, nullable: true);
            Field(x => x.NumInvoice, nullable: true);
            Field(x => x.Memo, nullable: true);
            Field(x => x.Date, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.DateDue, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.NumDistributions, nullable: true);
            Field(x => x.Quantity, nullable: true);
            Field(x => x.Description, nullable: true);
            Field(x => x.Amount, nullable: true);
            Field(x => x.AmountDue, nullable: true);
            Field(x => x.PaymentMethod, nullable: true);
            Field(x => x.LateCharge, nullable: true);
            Field(x => x.WriteOffDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.WriteOffAmount, nullable: true);
            Field(x => x.ExcludeLateCharge, nullable: true);
            Field(x => x.ACHTraceNumber, nullable: true);
            Field(x => x.ACHBatchNumber, nullable: true);
            Field(x => x.ACHTransNumber, nullable: true);
            Field(x => x.ACHDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.CCApprovedDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.CCFollowUpDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.CCDeclined, nullable: true);
            Field(x => x.AppTimeStamp, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.AppCreatedBy, nullable: true);
            Field(x => x.AppCreationDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.AppLastUpdatedBy, nullable: true);
            Field(x => x.SendLastEmailDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.AttchmentUid, nullable: true);
        }
    }
}
