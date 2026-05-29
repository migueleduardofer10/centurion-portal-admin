using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LoanPaymentOnTimeType : ObjectGraphType<vwl_LoanPaymentOnTime>
    {
        public vwl_LoanPaymentOnTimeType()
        {
            Name = nameof(vwl_LoanPaymentOnTimeType);

            Field(x => x.State, nullable: true);
            Field(x => x.A, nullable: true);
            Field(x => x.B, nullable: true);
            Field(x => x.C, nullable: true);
            Field(x => x.D, nullable: true);
            Field(x => x.E, nullable: true);
        }
    }
}
