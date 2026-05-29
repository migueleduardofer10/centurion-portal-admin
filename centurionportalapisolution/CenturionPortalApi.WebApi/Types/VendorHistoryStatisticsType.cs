using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Custom_Entities;

namespace CenturionPortalApi.WebApi.Types
{
    public class VendorHistoryStatisticsType : ObjectGraphType<VendorHistoryStatistics>
    {
        public VendorHistoryStatisticsType()
        {
            Name = nameof(VendorHistoryStatisticsType);
            Description = "vendor history statistics";

            Field(x => x.Legend, nullable: true);
            Field(x => x.TotalAmount, nullable: true);
            Field(x => x.ToInterest, nullable: true);
            Field(x => x.ToPrincipal, nullable: true);
            Field(x => x.ToLateCharge, nullable: true);
            Field(x => x.Other, nullable: true);
            Field(x => x.StartDate, nullable: true);
            Field(x => x.EndDate, nullable: true);
        }
    }
}
