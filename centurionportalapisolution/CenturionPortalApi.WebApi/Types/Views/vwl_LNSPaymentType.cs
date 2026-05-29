using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LNSPaymentType : ObjectGraphType<vwl_LNSPayment>
    {
        public vwl_LNSPaymentType()
        {
            Name = nameof(vwl_LNSPaymentType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.TrustAccountUid, nullable: true);
            Field(x => x.ActivityUid, nullable: true);
            Field(x => x.ClientUid, nullable: true);
            Field(x => x.GroupUid, nullable: true);
            Field(x => x.TransferLinkUid, nullable: true);
            Field(x => x.ClientAccount, nullable: true);
            Field(x => x.ClientName, nullable: true);
            Field(x => x.ClientAddress, nullable: true);
            Field(x => x.CheckStatus, nullable: true);
            Field(x => x.Reference, nullable: true);
            Field(x => x.Comments, nullable: true);
            Field(x => x.Memo, nullable: true);
            Field(x => x.DateReceived, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.DateDeposited, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.Module, nullable: true);
            Field(x => x.Transaction, nullable: true);
            Field(x => x.ClearStatus, nullable: true);
            Field(x => x.ReconciliationUid, nullable: true);
            Field(x => x.Amount, nullable: true);
            Field(x => x.OtherPaymentType, nullable: true);
            Field(x => x.RepaymentUid, nullable: true);
            Field(x => x.AppTimeStamp, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.AppCreatedBy, nullable: true);
            Field(x => x.AppCreationDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.AppLastUpdatedBy, nullable: true);
            Field(x => x.IsACH, nullable: true);
        }
    }
}
