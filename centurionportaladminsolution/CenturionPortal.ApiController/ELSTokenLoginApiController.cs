using GraphQL;
using GraphQL.Client.Http;
using System;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public class ELSTokenLoginApiController
    {
        public static async Task Save(GraphQLHttpClient apiClient, string accessToken, string username, string token)
        {
            try
            {
                GraphQLRequest request = new GraphQLRequest
                {
                    Query = @"
                        mutation execute($username:String!, $token:String!) 
                        {
                            saveTokenLogin(username:$username, token:$token)
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        username,
                        token
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");
                var response = await apiClient.SendMutationAsync<ObjectRequest>(request);
                UtilitiesApiController.VerifyResponse(response);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
