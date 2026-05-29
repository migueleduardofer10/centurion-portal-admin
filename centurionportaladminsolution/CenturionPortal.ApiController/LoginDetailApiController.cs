using CenturionPortal.ApiController.Model.Views;
using GraphQL;
using GraphQL.Client.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public class LoginDetailApiController
    {
        public static async Task<List<vwa_AllLoginUser>> GetLoginGeneral(GraphQLHttpClient apiClient, string accessToken, int chart, int userType, int status)
        {
            try
            {
                GraphQLRequest request = new GraphQLRequest
                {
                    Query = @"
                    query execute($chart:Int!, $userType:Int!, $status:Int!) 
                    {
                        getLoginGeneral(chart:$chart, userType:$userType, status:$status) {
                            year,
                            month,
                            nroMonth,
                            day,
                            dayName,
                            nroSuccess,
                            nroFail,
                            hour,
                            isActiveName,
                            isActive,
                            userTypeName,
                            userType,
                        }
                    }",
                    OperationName = "execute",
                    Variables = new
                    {
                        chart,
                        userType,
                        status
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");
                var response = await apiClient.SendMutationAsync<LoginDetailRequest>(request);
                UtilitiesApiController.VerifyResponse(response);

                return response.Data.getLoginGeneral;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    public class LoginDetailRequest
    {
        public List<vwa_AllLoginUser> getLoginGeneral { get; set; }
    }
}
