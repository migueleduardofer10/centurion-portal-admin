using GraphQL;
using GraphQL.Client.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CenturionPortal.ApiController.Model.CustomEntities;

namespace CenturionPortal.ApiController
{
    public static class VendorPortfolioApiController
    {
        public static async Task<List<CustomLoanUser>> GetLoansByFilter(GraphQLHttpClient apiClient, string access_token, int userType, string filter, string loansUidExclude)
        {
            try
            {
                var request = new GraphQLRequest
                {
                    Query = @"
                        query execute ($userType:Int!, $filter:String!, $loansUidExclude:String!)
                        {
                            getLoansByFilter(userType:$userType, filter:$filter, loansUidExclude:$loansUidExclude)
                            {
                            " + UtilitiesApiController.GetFields(typeof(CustomLoanUser)) + @"
                            }
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        userType,
                        filter,
                        loansUidExclude
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
                UtilitiesApiController.VerifyResponse(response);

                return response.Data.getLoansByFilter;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private class ObjectRequest
        {
            public List<CustomLoanUser> getLoansByFilter { get; set; }
        }
    }
}
