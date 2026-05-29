using GraphQL;
using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.ApiController.Model.Views;
using CenturionPortal.ApiController.Models.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public class LoanChargesApiController
    {
        public static async Task<object> GetCharges(
            GraphQLHttpClient apiClient, string access_token, string loanUid, bool hidePaid, bool withDetails, DataSourceRequest dataSourceRequest = null, bool getColumns = false)
        {
            try
            {
                GraphQLRequest request = null;
                var vwl_LoanChargesProperties = UtilitiesApiController.QueryForSelectGraphQL<vwl_LoanCharges>();

                if (getColumns == false)
                {
                    request = new GraphQLRequest
                    {
                        Query = @"query 
                        getLoanCharge($loanUid:String!, $hidePaid:Boolean!, $withDetails:Boolean!, $dataSourceRequest:String) 
                        {
                            getLoanCharge(loanUid:$loanUid, hidePaid:$hidePaid, withDetails:$withDetails, dataSourceRequest:$dataSourceRequest)
                            {
                                " + vwl_LoanChargesProperties + @"
                                ,
                                aggregateResults{
                                    aggregateMethodName
                                    member
                                    value
                                }
                            }
                        }",
                        OperationName = "getLoanCharge",
                        Variables = new
                        {
                            loanUid,
                            hidePaid,
                            withDetails,
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
                        getLoanCharge($loanUid:String!, $hidePaid:Boolean!, $withDetails:Boolean!, $dataSourceRequest:String, $entityType:Int!) 
                        {
                            getLoanCharge(loanUid:$loanUid, hidePaid:$hidePaid, withDetails:$withDetails, dataSourceRequest:$dataSourceRequest)
                            {
                                " + vwl_LoanChargesProperties + @",
                                aggregateResults{
                                    aggregateMethodName
                                    member
                                    value
                                }
                            },
                            getGrid(entityType:$entityType) 
                            {
                                " + ELSColumnProperties + @" 
                            }
                        }",
                        OperationName = "getLoanCharge",
                        Variables = new
                        {
                            loanUid,
                            hidePaid,
                            withDetails,
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest),
                            entityType = (int)Enums.GridEntityTypeEnum.VWL_CHARGES_DETAILS
                        }
                    };
                }
                    
                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
                var response = await apiClient.SendQueryAsync<Response>(request);
                UtilitiesApiController.VerifyResponse(response);

                return new
                {
                    Result = response.Data.getLoanCharge,
                    Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid
                };
            }
            catch (System.Exception ex)
            {

                throw ex;
            }

        }

        public static async Task<object> GetChargeDetails(GraphQLHttpClient apiClient, string chargeUid)
        {
            try
            {
                var request = new GraphQLRequest
                {
                    Query = @"query 
                    getChargeDetail($chargeUid:String!) 
                    {
                        getChargeDetail(chargeUid:$chargeUid)
                        {
                            amount
                            chargeUid
                            date
                            intBehalf
                            intVendor
                            prinBehalf
                            prinVendor
                            reference
                            uid
                            vendorName      
                        }
                    }",
                    OperationName = "getChargeDetail",
                    Variables = new
                    {
                        chargeUid,
                    }
                };

                var response = await apiClient.SendQueryAsync<Response>(request);



                return new { Result = response.Data.getChargeDetail };
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }
    }

    public class Response
    {
        public List<ELSColumn> getGrid { get; set; }
        public GenericDataSourceResult<vwl_LoanCharges> getLoanCharge { get; set; }
        public List<vwl_ChargesDetails> getChargeDetail { get; set; }
    }
}
