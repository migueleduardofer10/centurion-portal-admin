using GraphQL;
using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.Views;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static CenturionPortal.ApiController.Models.Utilities.Enums;

namespace CenturionPortal.ApiController
{
    public static class LoansSearchApiController
    {
        public static async Task<object> GetAll(GraphQLHttpClient apiClient, string accessToken,
            string lastName, string firstName, string address, string city, string state, bool getColumns, DataSourceRequest dataSourceRequest)
        {

            try
            {

                var properties = UtilitiesApiController.QueryForSelectGraphQLFromString(vwl_VendorPortfolio.QueryForSelectGraphQL);

                GraphQLRequest request = null;

                if (getColumns)
                {
                    var ELSColumnProperties = UtilitiesApiController.GetFields(typeof(Model.ELSColumn));

                    request = new GraphQLRequest
                    {
                        Query = @"
                        query getVendorPortfolio_By($lastName:String!, $firstName:String!, $address:String!, $city:String!, $state:String!, $dataSourceRequest:String!, $entityType:Int! )
                        {
                            getVendorPortfolio_By(lastName:$lastName, firstName:$firstName, address:$address, city:$city, state:$state, dataSourceRequest:$dataSourceRequest)
                            {
                                " + properties + @"                         
                            } 
                            , 
                            getGrid(entityType:$entityType) 
                            {
                                " + ELSColumnProperties + @"
                            }
                        }",
                        OperationName = "getVendorPortfolio_By",
                        Variables = new
                        {                            
                            lastName,
                            firstName,
                            address,
                            city,
                            state,
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest),
                            entityType = Convert.ToInt32(GridEntityTypeEnum.LEN_LOANS_SEARCH)
                        }

                    };
                }
                else
                {
                    request = new GraphQLRequest
                    {
                        Query = @"
                        query getVendorPortfolio_By($lastName:String!, $firstName:String!, $address:String!, $city:String!, $state:String!, $dataSourceRequest:String! )
                        {
                            getVendorPortfolio_By(lastName:$lastName, firstName:$firstName, address:$address, city:$city, state:$state, dataSourceRequest:$dataSourceRequest)
                            {
                               " + properties + @"
                         
                            }
                        }",
                        OperationName = "getVendorPortfolio_By",
                        Variables = new
                        {
                            lastName,
                            firstName,
                            address,
                            city,
                            state,
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest)
                        }

                    };
                }

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                return new
                {
                    Result = response.Data.getVendorPortfolio_By == null ? new UtilitiesApiController.GenericDataSourceResult<vwl_VendorPortfolio>() : response.Data.getVendorPortfolio_By,
                    Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid
                };


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private class ObjectRequest
        {
            public UtilitiesApiController.GenericDataSourceResult<vwl_VendorPortfolio> getVendorPortfolio_By { get; set; }
            public List<ELSColumn> getGrid { get; set; }
        }

    }
}
