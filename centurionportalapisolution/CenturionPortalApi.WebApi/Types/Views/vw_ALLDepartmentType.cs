using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vw_ALLDepartmentType : ObjectGraphType<vw_ALLDepartment>
    {
        public vw_ALLDepartmentType()
        {

            Name = nameof(vw_ALLDepartmentType);

            Field(x => x.Name, nullable: true, type: typeof(StringGraphType));
            Field(x => x.Uid, nullable: true, type: typeof(IntGraphType));


        }
    }
}
