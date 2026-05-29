using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class v_LNSPropertyType : ObjectGraphType<DataBase.Models.Views.v_LNSProperty>
    {
        public v_LNSPropertyType()
        {

            Name = nameof(v_LNSPropertyType);




        

            Field(x => x.LoanUid, nullable: true, type: typeof(StringGraphType));

            Field(x => x.APN, nullable: true, type: typeof(StringGraphType));
            Field(x => x.Type, nullable: true, type: typeof(IntGraphType));
            Field(x => x.ValuationAmount, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.ValuationDate, nullable: true, type: typeof(DateGraphType));
            Field(x => x.Street, nullable: true, type: typeof(StringGraphType));
            Field(x => x.ValuationType, nullable: true, type: typeof(IntGraphType));

        }
    }
}
