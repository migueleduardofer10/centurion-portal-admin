using GraphQL;
using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.ApiController.Model.Views;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public class ALLAttachmentApiController
    {
        public static async Task<object> GetFile(GraphQLHttpClient apiClient, string accessToken, string uid)
        {
            try
            {
                var request = new GraphQLRequest
                {
                    Query = @"
                    query execute($uid:String!) 
                    {
                        getFileAttachment(uid:$uid)
                    }",
                    OperationName = "execute",
                    Variables = new { uid }
                };


                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");
                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
                UtilitiesApiController.VerifyResponse(response);

                if (response.Data == null || string.IsNullOrEmpty(response.Data.getFileAttachment))
                {
                    return null;
                }
                else
                {
                    string dataPdf = response.Data.getFileAttachment;
                    string Uri = "data:application/pdf;base64," + dataPdf;
                    return new { Uri };
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static async Task<object> GetListByLenderUidAndViewType(GraphQLHttpClient apiClient, string accessToken, string lenderUid, int viewType, DateTime appCreationDateFrom, DateTime appCreationDateTo, DataSourceRequest dataSourceRequest = null)
        {
            try
            {
                GraphQLRequest request = null;
                var fields = UtilitiesApiController.QueryForSelectGraphQLFromString(ALLAttachment.QuerGrillaForSelectGraphQL);

                request = new GraphQLRequest
                {
                    Query = @"
                        query execute($lenderUid:String, $viewType:Int!, $appCreationDateFrom:Date!, $appCreationDateTo:Date!, $dataSourceRequest:String!) 
                        {
                            getUserAttachment(lenderUid:$lenderUid, viewType:$viewType, appCreationDateFrom:$appCreationDateFrom, appCreationDateTo:$appCreationDateTo, dataSourceRequest:$dataSourceRequest)
                            {
                                 " + fields + @"
                            }                           
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        lenderUid,
                        viewType,
                        appCreationDateFrom,
                        appCreationDateTo,
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest),
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");
                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
                UtilitiesApiController.VerifyResponse(response);

                return new { Result = response.Data.getUserAttachment };
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        private class ObjectRequest
        {
            public GenericDataSourceResult<ALLAttachment> getUserAttachment { get; set; }
            public string getFileAttachment { get; set; }
        }
    }
}
