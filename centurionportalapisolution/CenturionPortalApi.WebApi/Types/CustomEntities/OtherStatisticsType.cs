using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.CustomEntities
{
    public class OtherStatisticsType : ObjectGraphType<OtherStatistics>
    {
        public OtherStatisticsType()
        {
            Name = nameof(OtherStatisticsType);

            Field(x => x.Title, type: typeof(StringGraphType), nullable: true);
            Field(x => x.TotalAmount, type: typeof(DecimalGraphType), nullable: true);
            Field(x => x.TotalInterest, type: typeof(DecimalGraphType), nullable: true);
            Field(x => x.Count, type: typeof(IntGraphType), nullable: true);
        }
    }
}
