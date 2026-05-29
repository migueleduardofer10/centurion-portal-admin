using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.CustomEntities
{
    public class GraphSecondaryLoanType : ObjectGraphType<GraphSecondaryLoan>
    {
        public GraphSecondaryLoanType()
        {

            Name = nameof(GraphSecondaryLoanType);

            Field(x => x.BalanceFull, nullable: true);
            Field(x => x.DateReceived, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.DateDue, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.PartialBalance, nullable: true);






        }
    }
}
