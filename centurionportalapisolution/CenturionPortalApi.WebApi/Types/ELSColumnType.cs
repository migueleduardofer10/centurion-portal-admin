using GraphQL.Types;
using CenturionPortalApi.DataBase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types
{
    public class ELSColumnType : ObjectGraphType<ELSColumn>
    {
        public ELSColumnType()
        {

            Name = nameof(ELSColumnType);
            Description = "column descriptor";

            Field(x => x.Uid, nullable: true);
            Field(x => x.GridUid, nullable: true);
            Field(x => x.ColumnName, nullable: true);
            Field(x => x.Position, nullable: true);
            Field(x => x.Checked, nullable: true);
            Field(x => x.AppTimeStamp, type: typeof(DateTimeGraphType), nullable: false);
            Field(x => x.AppCreatedBy, nullable: true);
            Field(x => x.AppCreationDate, type: typeof(DateTimeGraphType), nullable: false);
            Field(x => x.AppLastUpdatedBy, nullable: true);

          

        }
    }
}
