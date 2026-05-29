using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LBMPaymentLogType : ObjectGraphType<vwl_LBMPaymentLog>
    {
        public vwl_LBMPaymentLogType()
        {
            Name = nameof(vwl_LBMPaymentLogType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.PaymentUid, nullable: true);
            Field(x => x.CheckUid, nullable: true);
            Field(x => x.ActivityUid, nullable: true);
            Field(x => x.Reference, nullable: true);
            Field(x => x.Type, nullable: true);
        }
    }
}
