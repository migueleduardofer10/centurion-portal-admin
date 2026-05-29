using GraphQL;
using GraphQL.Client.Http;
using CenturionPortal.ApiController.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public class ELSColumnApiController
    {


        public static async Task<List<ELSColumn>> GridColumns(GraphQLHttpClient apiClient,
            string userId, int entityType)
        {

            var properties = UtilitiesApiController.GetFields(typeof(Model.ELSColumn));

            GraphQLRequest request = new GraphQLRequest
            {
                Query = @"
                        query execute($userId:String!, $entityType:Int! ) 
                        {
                            getGrid(userId:$userId, entityType:$entityType) 
                            {"+properties+@"}
                        }",
                OperationName = "execute",
                Variables = new
                {
                    userId = userId,
                    entityType = entityType
                }
            };

            var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

            if (response.Data == null)
                return null;
            else
                return   response.Data.getGrid;


        }

        private class ObjectRequest
        {
            public List<ELSColumn> getGrid { get; set; }
        }


    }
}
