using GraphQL.Types;
using CenturionPortalApi.DataBase.Models;

namespace CenturionPortalApi.WebApi.Types.Input
{
    public class ELSColumnInputType : InputObjectGraphType<ELSColumn>
    {
        public ELSColumnInputType()
        {

            Name = nameof(ELSColumnInputType);
            Description = "Column Info";

            Field(x => x.Uid, nullable: false, type: typeof(StringGraphType));
            Field(x => x.GridUid, nullable: false, type: typeof(StringGraphType));
            Field(x => x.ColumnName, nullable: false, type: typeof(StringGraphType));
            Field(x => x.Position, nullable: false, type: typeof(IntGraphType));
            Field(x => x.Checked, nullable: false, type: typeof(BooleanGraphType));
            Field(x => x.AppTimeStamp, nullable: false, type: typeof(DateTimeGraphType));
            Field(x => x.AppCreatedBy, nullable: false, type: typeof(StringGraphType));
            Field(x => x.AppCreationDate, nullable: false, type: typeof(DateTimeGraphType));
            Field(x => x.AppLastUpdatedBy, nullable: false, type: typeof(StringGraphType));

        }
    }
}
