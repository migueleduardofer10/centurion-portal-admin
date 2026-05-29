using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class v_LNSBorrowerType : ObjectGraphType<DataBase.Models.Views.v_LNSBorrower>
    {
        public v_LNSBorrowerType()
        {

            Name = nameof(v_LNSBorrowerType);



            Field(x => x.Uid, nullable: true, type: typeof(StringGraphType));
            Field(x => x.Fax, nullable: true, type: typeof(StringGraphType));
            Field(x => x.FullName, nullable: true, type: typeof(StringGraphType));
            Field(x => x.Email, nullable: true, type: typeof(StringGraphType));
            Field(x => x.HomePhone, nullable: true, type: typeof(StringGraphType));
            Field(x => x.WorkPhone, nullable: true, type: typeof(StringGraphType));
            Field(x => x.MobilePhone, nullable: true, type: typeof(StringGraphType));
            Field(x => x.TIN, nullable: true, type: typeof(StringGraphType));


          
        }



    }
}
