using GraphQL;
using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.Custom_Entities;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.ApiController.Models.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public class ReportApiController
    {
        public static async Task<object> GetACHStatus(
            GraphQLHttpClient apiClient, string access_token, DataSourceRequest dataSourceRequest = null, bool getColumns = false)
        {
            GraphQLRequest request = null;
            var customACHStatusProperties = UtilitiesApiController.QueryForSelectGraphQL<CustomACHStatus>();

            if (getColumns == false)
            {
                request = new GraphQLRequest
                {
                    Query = @"query 
                        getACHStatusReport($dataSourceRequest:String) 
                        {
                            getACHStatusReport(dataSourceRequest:$dataSourceRequest)
                            {
                                " + customACHStatusProperties + @"
                            }
                        }",
                    OperationName = "getACHStatusReport",
                    Variables = new
                    {
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest)
                    }
                };
            }
            else
            {
                var ELSColumnProperties = UtilitiesApiController.GetFields(typeof(ELSColumn));

                request = new GraphQLRequest
                {
                    Query = @"query 
                        getACHStatusReport($dataSourceRequest:String, $entityType:Int!) 
                        {
                            getACHStatusReport(dataSourceRequest:$dataSourceRequest)
                            {
                                " + customACHStatusProperties + @"
                            },
                            getGrid(entityType:$entityType) 
                            {
                                " + ELSColumnProperties + @" 
                            }
                        }",
                    OperationName = "getACHStatusReport",
                    Variables = new
                    {
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest),
                        entityType = (int)Enums.GridEntityTypeEnum.VWL_CHARGES_DETAILS
                    }
                };
            }

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<ReportResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return new
            {
                Result = response.Data.getACHStatusReport,
                Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid
            };
        }
    }

    public class ReportResponse
    {
        public GenericDataSourceResult<CustomACHStatus> getACHStatusReport { get; set; }
        public List<ELSColumn> getGrid { get; set; }
    }
}
