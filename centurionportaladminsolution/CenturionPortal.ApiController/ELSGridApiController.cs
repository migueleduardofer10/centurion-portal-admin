using GraphQL;
using GraphQL.Client.Http;
using CenturionPortal.ApiController.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public class ELSGridController
    {
        public static async Task<bool> Save(GraphQLHttpClient apiClient, string access_token, int gridEnum, List<GridColumnForView> columns)
        {
            try
            {
                var request = new GraphQLRequest
                {
                    Query = @"mutation
                        insertGrid($gridEnum:Int!, $columns:String!) 
                        {
                            insertGrid(gridEnum:$gridEnum, columns:$columns)
                        }",
                    OperationName = "insertGrid",
                    Variables = new
                    {
                        gridEnum,
                        columns = JsonConvert.SerializeObject(columns)
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
                var response = await apiClient.SendQueryAsync<gridRequest>(request);
                UtilitiesApiController.VerifyResponse(response);

                return response.Data.insertGrid;
            }catch(Exception ex)
            {
                throw ex;
            }
        }
    }

    public class gridRequest
    {
        public bool insertGrid { get; set; }
    }
}
