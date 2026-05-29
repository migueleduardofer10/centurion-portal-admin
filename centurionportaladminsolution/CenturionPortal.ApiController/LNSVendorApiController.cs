using GraphQL;
using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.ApiController.Model.Views;
using CenturionPortal.ApiController.Models.Utilities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace CenturionPortal.ApiController
{
    public class LNSVendorApiController
    {
        public static async Task<vwl_LNSVendor> GetResumenInformationByUid(GraphQLHttpClient apiClient, string accessToken, string uid)
        {
            try
            {
                GraphQLRequest request = null;
                var fields = vwl_LNSVendor.QueryResumenInformationForSelectGraphQL;

                request = new GraphQLRequest
                {
                    Query = @"
                        query execute($uid:String! ) 
                        {
                            getLNSVendor_ByUid(uid:$uid)
                            {
                                 " + fields + @"                                
                            }                           
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        uid
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");
                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
                UtilitiesApiController.VerifyResponse(response);

                return response.Data.getLNSVendor_ByUid;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static async Task<object> Funding(GraphQLHttpClient apiClient, 
            string accessToken,
            string loanUid, DataSourceRequest dataSourceRequest,
        bool getColumns)
        {

            try
            {

                GraphQLRequest request = null;

                var vwl_FundingProperties = UtilitiesApiController.QueryForSelectGraphQL<vwl_Funding>();



                if (getColumns == false)
                {
                    request = new GraphQLRequest
                    {
                        Query = @"
                        query getFunding($loanUid:String!, $dataSourceRequest:String!)
                        {
                            getFunding(loanUid:$loanUid, dataSourceRequest:$dataSourceRequest)
                            {
                                 " + vwl_FundingProperties + @"                               
                            }
                        }",
                        OperationName = "getFunding",
                        Variables = new
                        {
                            loanUid = loanUid,
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest)
                        }

                    };
                }
                else
                {
                    var ELSColumnProperties = UtilitiesApiController.GetFields(typeof(Model.ELSColumn));

                    request = new GraphQLRequest
                    {
                        Query = @"
                        query execute($loanUid:String!, $dataSourceRequest:String!, $entityType:Int! ) 
                        {
                            getFunding(loanUid:$loanUid, dataSourceRequest:$dataSourceRequest)
                            {
                                 " + vwl_FundingProperties + @"                              
                            }
                            ,
                            getGrid(entityType:$entityType) 
                            {" + ELSColumnProperties + @"}
                        }",
                        OperationName = "execute",
                        Variables = new
                        {
                            loanUid,
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest),
                            entityType = (int)Enums.GridEntityTypeEnum.VCW_VENDORPORTFOLIOSECONDARY
                        }
                    };

                }

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");
             
                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
              
                UtilitiesApiController.VerifyResponse(response);

                return new
                {
                    Result = response.Data.getFunding,
                    Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid
                };
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static async Task<object> Notes(GraphQLHttpClient apiClient, string accesToken,
            string loanUid, DataSourceRequest dataSourceRequest, bool getColumns
        )
        {
            try
            {

                GraphQLRequest request = null;

                var loanNotesProperties = UtilitiesApiController.QueryForSelectGraphQL<vwl_LoanNotes>();


                if (getColumns == false)
                {
                    request = new GraphQLRequest
                    {
                        Query = @"
                        query execute($loanUid:String!, $dataSourceRequest:String!) 
                        {
                            getLoanNote(loanUid:$loanUid, dataSourceRequest:$dataSourceRequest) 
                            {
                            " + loanNotesProperties + @"    
                            }
                        }",
                        OperationName = "execute",
                        Variables = new
                        {
                            loanUid = loanUid,
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest)
                        }
                    };
                }
                else
                {
                    var properties = UtilitiesApiController.GetFields(typeof(Model.ELSColumn));

                    request = new GraphQLRequest
                    {
                        Query = @"
                        query execute($loanUid:String!, $dataSourceRequest:String!, $entityType:Int! ) 
                        {
                            getLoanNote(loanUid:$loanUid,  dataSourceRequest:$dataSourceRequest  ) 
                            {
                            " + loanNotesProperties + @"
                            }
                            ,
                            getGrid(entityType:$entityType) 
                            {" + properties + @"}
                        }",
                        OperationName = "execute",
                        Variables = new
                        {
                            loanUid = loanUid,
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest),
                            entityType = (int)Enums.GridEntityTypeEnum.VWL_LOANNOTES
                        }
                    };
                }

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accesToken}");
             
                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
             
                UtilitiesApiController.VerifyResponse(response);

                return new { 
                    Result = response.Data.getLoanNote,
                    Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid
                };

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static async Task<object> Vendors(
            GraphQLHttpClient apiClient, string access_token, DataSourceRequest dataSourceRequest, bool getColumns)
        {
            GraphQLRequest request = null;
            //var vwl_VendorPorfolioProperties = UtilitiesApiController.QueryForSelectGraphQL<Model.Views.vwl_VendorPortfolio>();
            var vwl_VendorPorfolioProperties = DataSourceResultLoanPortfolio.QueryForSelectGraphQL;

            if (getColumns == false)
            {
                request = new GraphQLRequest
                {
                    Query = @"
                            query getLNSVendor($dataSourceRequest:String!) 
                            {
                                getLNSVendor(dataSourceRequest:$dataSourceRequest)
                                {
                                    " + vwl_VendorPorfolioProperties + @"                                
                                }
                            }",
                    OperationName = "getLNSVendor",
                    Variables = new
                    {
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest)
                    }
                };
            }
            else
            {
                var ELSColumnProperties = UtilitiesApiController.GetFields(typeof(ELSColumn));

                request = new GraphQLRequest
                {
                    Query = @"
                        query getLNSVendor($entityType:Int!, $dataSourceRequest:String!) 
                        {
                            getLNSVendor(dataSourceRequest:$dataSourceRequest)
                            {
                                " + vwl_VendorPorfolioProperties + @"                                
                            },
                            getGrid(entityType:$entityType)
                            {
                                " + ELSColumnProperties + @" 
                            }
                        }",
                    OperationName = "getLNSVendor",
                    Variables = new
                    {
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest),
                        entityType = (int)Enums.GridEntityTypeEnum.LNS_LOAN
                    }
                };
            }

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
            UtilitiesApiController.VerifyResponse(response);

            return new
            {
                Result = response.Data.getLNSVendor,
                Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid
            };
        }

        public static async Task<object> PaymentHistory(GraphQLHttpClient apiClient, string access_token,
            string loanUid, bool excludeFunding, DataSourceRequest dataSourceRequest, bool getColumns)
        {
            try
            {


                GraphQLRequest request = null;
                var vwl_LoanHistoryProperties = UtilitiesApiController.QueryForSelectGraphQL<Model.Views.vwl_LoanHistory>();

                if (getColumns == false)
                {
                    request = new GraphQLRequest
                    {
                        Query = @"
                        query getLoanHistory($loanUid:String!,$excludeFunding:Boolean!, $dataSourceRequest:String!) 
                        {
                            getLoanHistory(loanUid:$loanUid, excludeFunding:$excludeFunding, dataSourceRequest:$dataSourceRequest ) 
                            {
                                " + vwl_LoanHistoryProperties + @" 
                            }
                        }",
                        OperationName = "getLoanHistory",
                        Variables = new
                        {
                            loanUid,
                            excludeFunding,
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest)
                        }

                    };
                }
                else
                {
                    var ELSColumnProperties = UtilitiesApiController.GetFields(typeof(ELSColumn));

                    request = new GraphQLRequest
                    {
                        Query = @"
                        query getLoanHistory($loanUid:String!, $excludeFunding:Boolean!, $dataSourceRequest:String!, $entityType:Int! ) 
                        {
                            getLoanHistory(loanUid:$loanUid, excludeFunding:$excludeFunding, dataSourceRequest:$dataSourceRequest ) 
                            {
                                " + vwl_LoanHistoryProperties + @"                           
                            },
                            getGrid(entityType:$entityType) 
                            {
                                " + ELSColumnProperties + @" 
                            }
                        }",
                        OperationName = "getLoanHistory",
                        Variables = new
                        {
                            loanUid,
                            excludeFunding,
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest),
                            entityType = (int)Enums.GridEntityTypeEnum.VWL_LOAN_HISTORY
                        }
                    };

                   
                }
        
                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
                UtilitiesApiController.VerifyResponse(response);

                return new
                {
                    Result = response.Data.getLoanHistory,
                    Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid
                };
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        //public class Totales
        //{ 
        //public decimal Value { get; set; }
        //    public string Member { get; set; }
        //    public string AggregateMethodName { get; set; }
        //}

        //public class Resultado1//:DataSourceResult
        //{

        //    public List<vwl_Funding> Data { get; set; }
        //    public int Total { get; set; }
        //    public List<Totales> AggregateResults { get; set; }


        //}


        private class ObjectRequest
        {
            public GenericDataSourceResult<vwl_VendorPortfolio> getLNSVendor { get; set; }
            public vwl_LNSVendor getLNSVendor_ByUid { get; set; }
            public GenericDataSourceResult<vwl_Funding> getFunding { get; set; }
            public GenericDataSourceResult<vwl_LoanHistory> getLoanHistory { get; set; }
            public GenericDataSourceResult<vwl_LoanNotes> getLoanNote { get; set; }
            public List<ELSColumn> getGrid { get; set; }
        }
    }
}
