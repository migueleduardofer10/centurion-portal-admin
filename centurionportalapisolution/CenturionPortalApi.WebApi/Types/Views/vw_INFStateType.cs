using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vw_INFStateType : ObjectGraphType<vw_INFState>
    {
        public vw_INFStateType() {

            Name = nameof(vw_INFStateType);

            Field(x => x.Name, nullable: true, type: typeof(StringGraphType));
            Field(x => x.Abbreviation, nullable: true, type: typeof(StringGraphType));


        }
    }
}
