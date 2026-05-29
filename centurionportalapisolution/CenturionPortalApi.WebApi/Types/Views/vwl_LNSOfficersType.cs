using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LNSOfficersType : ObjectGraphType<vwl_LNSOfficers>
    {
        public vwl_LNSOfficersType()
        {

            Name = nameof(vwl_LNSOfficersType);


            Field(x => x.Uid, nullable: true);
            Field(x => x .DepartmentUid, nullable: true);
            Field(x => x. Name, nullable: true);
            Field(x => x.VendorUid, nullable: true);



            //Field(x => x.Name, nullable: true, type: typeof(StringGraphType));
            //Field(x => x.Uid, nullable: true, type: typeof(IntGraphType));


        }
    }
}
