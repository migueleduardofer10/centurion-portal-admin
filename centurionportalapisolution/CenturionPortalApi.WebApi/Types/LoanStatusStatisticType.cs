using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Custom_Entities;

namespace CenturionPortalApi.WebApi.Types
{
    public class LoanStatusStatisticType : ObjectGraphType<LoanStatusStatistic>
    {
        public LoanStatusStatisticType()
        {
            Name = nameof(LoanStatusStatisticType);
            Description = "loan status statistics";

            Field(x => x.Status, nullable: true);
            Field(x => x.Count, nullable: true);
        }
    }
}
