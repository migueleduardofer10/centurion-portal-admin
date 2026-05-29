using GraphQL;
using GraphQL.Client.Http;
using CenturionPortal.ApiController.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public static class ELSServiceMapApiController
    {
        public static async Task<List<ELSServiceMap>> Get_AccountFullName_ByUidAndType(
            GraphQLHttpClient apiClient, string accessToken, string uid, int type)
        {

            var request = new GraphQLRequest
            {
                Query = @"
                        query execute($uid:String!, $type:Int! ) 
                        {
                            getELSServiceMap_GetAccount_ByUidAndType(uid:$uid, type:$type)   
                            { account, fullName , parentUid }
                        }",
                OperationName = "execute",
                Variables = new
                {
                    uid,
                    type
                }
            };
            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

            var result = await apiClient.SendMutationAsync<Response>(request);

            return result.Data.getELSServiceMap_GetAccount_ByUidAndType;//.Select(x=>x.Account+" - "+x.FullName).ToList();
        }

        public static async Task<List<ELSServiceMap>> GetValidLenders_ByLender(GraphQLHttpClient apiClient, string access_token, int viewType)
        {
            var fields = UtilitiesApiController.GetFields(typeof(ELSServiceMap));

            var request = new GraphQLRequest
            {
                Query = @"
                        query execute ($viewType:Int!)
                        {
                            getELSServiceMap_ValidLenders_ByLender(viewType:$viewType)
                            {
                            " + fields + @"
                            }
                        }",
                OperationName = "execute",
                Variables = new
                {
                    viewType
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<Response>(request);
            UtilitiesApiController.VerifyResponse(response);
            return response.Data.getELSServiceMap_ValidLenders_ByLender;
        }

        public static async Task<bool> Delete(GraphQLHttpClient apiClient, string userId, string parentUid)
        {


            var request = new GraphQLRequest
            {
                Query = @"
                        query execute($userId:String!, $parentUid:String! ) 
                        {
                            eLSServiceMap_Delete(userId:$userId, parentUid:$parentUid)                             
                        }",
                OperationName = "execute",
                Variables = new
                {
                    userId,
                    parentUid
                }
            };


            var result = await apiClient.SendMutationAsync<Response>(request);

            return result.Data.eLSServiceMap_Delete;

        }

        private class Response
        {
            public List<ELSServiceMap> getELSServiceMap_GetAccount_ByUidAndType { get; set; }
            public List<ELSServiceMap> getELSServiceMap_ValidLenders_ByLender { get; set; }
            public bool eLSServiceMap_Delete { get; set; }
        }
    }
}
