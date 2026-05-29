using GraphQL.Types;
using CenturionPortalApi.DataBase.Models;

namespace CenturionPortalApi.WebApi.Types
{
    public class ELSGridType : ObjectGraphType<ELSGrid>
    {
        public ELSGridType()
        {
            Name = nameof(ELSGridType);
            Description = "ELS Grid Type";

            Field(x => x.Uid, nullable: true);
            Field(x => x.UserUid, nullable: true);
            Field(x => x.GridEnum, nullable: true);
            Field(x => x.GridName, nullable: true);
            Field(x => x.AppTimeStamp, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.AppCreatedBy, nullable: true);
            Field(x => x.AppCreationDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.AppLastUpdatedBy, nullable: true);
        }
    }
}
