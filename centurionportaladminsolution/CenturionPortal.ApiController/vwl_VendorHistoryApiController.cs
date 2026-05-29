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
    public static class vwl_VendorHistoryApiController
    {
        public static async Task<object> Report_PaymentToLender(GraphQLHttpClient apiClient, bool onlyPending, string account, DataSourceRequest dataSourceRequest, string accessToken)
        {

            try
            {
                var fields = UtilitiesApiController.QueryForSelectGraphQL<vw_VendorHistory>();

                var
                request =


                    new GraphQLRequest
                    {
                        Query = @"
                        query execute($account:String!, $onlyPending:Boolean!, $dataSourceRequest:String! ) 
                        {                            
                            getVW_VendorHistory_Report_PaymentToLender(account:$account, onlyPending:$onlyPending, dataSourceRequest:$dataSourceRequest )
                            {
                                    " + fields + @"                                
                            }                              
                        }",
                        OperationName = "execute",
                        Variables = new
                        {
                            account,
                            onlyPending,
                            dataSourceRequest=UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest)
                        }
                    }
                    ;

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                return response.Data.getVW_VendorHistory_Report_PaymentToLender;                
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        private class ObjectRequest
        {
            public GenericDataSourceResult<vw_VendorHistory> getVW_VendorHistory_Report_PaymentToLender { get; set; }
        }

    }
}
