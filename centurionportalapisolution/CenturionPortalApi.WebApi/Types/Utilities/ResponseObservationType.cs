using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Utilities;

namespace CenturionPortalApi.WebApi.Types.Utilities
{
    public class ResponseObservationType : ObjectGraphType<ResponseObservation>
    {
        public ResponseObservationType()
        {
            Name = nameof(ResponseObservationType);

            Field(x => x.Field, nullable: true);
            Field(x => x.Message, nullable: true);
            Field(x => x.TypeMessage, nullable: true);
        }
    }
}
