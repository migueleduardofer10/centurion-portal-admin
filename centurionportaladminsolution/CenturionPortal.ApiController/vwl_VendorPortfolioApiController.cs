using GraphQL;
using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.CustomEntities;
using CenturionPortal.ApiController.Model.Views;
using CenturionPortal.ApiController.Models.Utilities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using static CenturionPortal.ApiController.UtilitiesApiController;

namespace CenturionPortal.ApiController
{
    public class vwl_VendorPortfolioApiController
    {
        public static async Task<object> FillCombos(GraphQLHttpClient apiClient, string accessToken)
        {
            try
            {
                var fields = UtilitiesApiController.QueryForSelectGraphQL<vwl_VendorPortfolioSecondary>();

                var
                request =


                    new GraphQLRequest
                    {
                        Query = @"
                        query execute( $addRowAll:Boolean! ) 
                        {
                            getINFState(addRowAll:$addRowAll)
                            {
                                name
                                abbreviation
                            }
                        }",
                        OperationName = "execute",
                        Variables = new
                        {
                            addRowAll = true
                        }
                    }
                    ;

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                return new
                {
                    INFState = response.Data.getINFState
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static async Task<object> GetBy_UserId_UserType_State_Status(GraphQLHttpClient apiClient, DataSourceRequest dataSourceRequest, string accessToken, string state, int status, int balance)
        {
            try
            {


                var fields = UtilitiesApiController.QueryForSelectGraphQL<vwl_VendorPortfolioSecondary>();

                var
                request =


                    new GraphQLRequest
                    {
                        Query = @"
                        query execute($dataSourceRequest:String! , $state:String!, $status:Int!, $balance:Int! ) 
                        {
                            getWcw_VendorPortfolioSecondary_By_UserId_UserType_State_Status (dataSourceRequest:$dataSourceRequest, state:$state, status:$status, balance:$balance)
                            {
                                    " + fields + @"                                
                            }                              
                        }",
                        OperationName = "execute",
                        Variables = new
                        {
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest),
                            state,
                            status,
                            balance
                        }
                    }
                    ;

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                return new
                {
                    Result = response.Data.getWcw_VendorPortfolioSecondary_By_UserId_UserType_State_Status == null ? new GenericDataSourceResult<vwl_VendorPortfolioSecondary>() : response.Data.getWcw_VendorPortfolioSecondary_By_UserId_UserType_State_Status,
                    INFState = response.Data.getINFState
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static async Task<object> Get_SubReports(GraphQLHttpClient apiClient,
            string accessToken, string loanUid, DataSourceRequest dataSourceRequest)
        {
            try
            {
                var lnsLoanFields = vwl_LNSLoan.GetQuery();
                var lnsBorrowerFields = UtilitiesApiController.GetFields(typeof(vwl_LNSBorrower));
                var lnsPropertyFields = UtilitiesApiController.GetFields(typeof(vwl_LNSProperty));
                var vendorPortfolioSecondaryFields = UtilitiesApiController.QueryForSelectGraphQL<vwl_VendorPortfolioSecondary>();


                var request1 = new GraphQLRequest
                {
                    Query = @"
                        query execute($loanUid:String!, $dataSourceRequest:String!) 
                        { 
                            getLNSLoan_ByUid(uid:$loanUid)
                            {" + lnsLoanFields + @"                                
                            }
                            ,
                            getVwl_VendorPortfolioSecondary_By_LoanUid  (loanUid:$loanUid, dataSourceRequest:$dataSourceRequest)
                            {" + vendorPortfolioSecondaryFields + @"
                            }
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest),
                        loanUid = loanUid
                    }
                }
                   ;

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response1 = await apiClient.SendQueryAsync<ObjectRequest>(request1);
                var loan = response1.Data.getLNSLoan_ByUid;
                var vendorPortfolioSecondary = response1.Data.getWcw_VendorPortfolioSecondary_By_LoanUid;


                var request2 = new GraphQLRequest
                {
                    Query = @"
                        query execute($borrowerUid:String!, $loanUid:String!) 
                        {                             
                            getLNSBorrower_By_Uid(uid:$borrowerUid)
                            {
                                " + lnsBorrowerFields + @"
                            }
                            ,
                            getLNSProperty_By_LoanUid(loanUid:$loanUid)
                            {
                                " + lnsPropertyFields + @"
                            }
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        borrowerUid = loan.BorrowerUid,
                        loanUid = loanUid
                    }
                }
                                ;

                //    apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response2 = await apiClient.SendQueryAsync<ObjectRequest>(request2);

                return new
                {
                    Loan = loan,
                    ValuationType = ((ValuationTypesEnum)response2.Data.getLNSProperty_By_LoanUid.ValuationType).ToString().Replace("_", " "),
                    Borrower = response2.Data.getLNSBorrower_By_Uid,
                    Property = response2.Data.getLNSProperty_By_LoanUid,
                    VendorPortfolioSecondary = vendorPortfolioSecondary
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static async Task<object> Get_GgraphSecondaryLoan(GraphQLHttpClient apiClient, DataSourceRequest dataSourceRequest, string accessToken, string loanUid)
        {
            try
            {


                var fields = UtilitiesApiController.GetFields(typeof(GraphSecondaryLoan));

                var
                request =


                    new GraphQLRequest
                    {
                        Query = @"
                        query execute($loanUid:String! ) 
                        {
                            getWcw_VendorPortfolioSecondary_GraphSecondaryLoan (loanUid:$loanUid)
                            {
                                    " + fields + @"                                
                            }                              
                        }",
                        OperationName = "execute",
                        Variables = new
                        {
                            loanUid
                        }
                    };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                return new
                {
                    Result = response.Data.getWcw_VendorPortfolioSecondary_GraphSecondaryLoan == null ? new List<GraphSecondaryLoan>() : response.Data.getWcw_VendorPortfolioSecondary_GraphSecondaryLoan
                };

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        private class ObjectRequest
        {
            public List<GraphSecondaryLoan> getWcw_VendorPortfolioSecondary_GraphSecondaryLoan { get; set; }

            public GenericDataSourceResult<vwl_VendorPortfolioSecondary> getWcw_VendorPortfolioSecondary_By_UserId_UserType_State_Status { get; set; }
            public List<ELSColumn> getGrid { get; set; }
            public List<vw_INFState> getINFState { get; set; }
            public vwl_LNSLoan getLNSLoan_ByUid { get; set; }
            public vwl_LNSProperty getLNSProperty_By_LoanUid { get; set; }
            public vwl_LNSBorrower getLNSBorrower_By_Uid { get; set; }

            public GenericDataSourceResult<vwl_VendorPortfolioSecondary> getWcw_VendorPortfolioSecondary_By_LoanUid { get; set; }

        }

        #region utils

        private enum ValuationTypesEnum
        {
            [Description("Original Appraisal")]
            ORIGINAL_APPRAISA = 0,

            [Description("Current Appraisal")]
            CURRENT_APPRAISAL = 1,

            [Description("BPO")]
            BPO = 2,

            [Description("AVM")]
            AVM = 3,

            [Description("Borrower Valuation")]
            BORROWER_VALUATION = 4,

            [Description("Other")]
            OTHER = 5
        };


        #endregion

    }
}
