using GraphQL;
using GraphQL.Client.Http;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.ApiController.Model.Views;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public class DashboardApiController
    {
        public static async Task<object> GetData(GraphQLHttpClient apiClient, string access_token)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    query getDashboardData
                    {
                        getLoanCountAndUPBByState
                        {
                            stateUid,                               
                            stateName,                               
                            uPB,                               
                            uPBDelinquency,                               
                            totalLoans,                               
                            totalDelinquency                               
                        },
                        getCubeLoanPaymentOnTime
                        {
                            state,
                            a,
                            b,
                            c,
                            d,
                            e
                        },
                        getPaymentsToLender(fromFilter:null, toFilter:null)
                        {
                            legend,
                            totalAmount,
                            toInterest,
                            toPrincipal,
                            toLateCharge,
                            other,
                            startDate,
                            endDate
                        },
                        getPaymentsFromBorrower(fromFilter:null, toFilter:null)
                        {
                            legend,
                            totalAmount,
                            toInterest,
                            toPrincipal,
                            toLateCharge,
                            other,
                            startDate,
                            endDate
                        },
                        getLoanStatusByLenderUid
                        {
                            status,
                            count
                        }
                    }",
                OperationName = "getDashboardData"
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
            UtilitiesApiController.VerifyResponse(response);

            return new
            {
                loansByState = response.Data.getLoanCountAndUPBByState,
                paymentsOnTime = response.Data.getCubeLoanPaymentOnTime,
                paymentsLender = response.Data.getPaymentsToLender,
                paymentsBorrower = response.Data.getPaymentsFromBorrower,
                loansByStatus = response.Data.getLoanStatusByLenderUid
            };
        }

        public static async Task<List<RESLoanByState>> GetLoanCountAndUPBByState(GraphQLHttpClient apiClient, string access_token)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    query getLoanCountAndUPBByState
                    {
                        getLoanCountAndUPBByState
                        {
                            stateUid,                               
                            stateName,                               
                            uPB,                               
                            uPBDelinquency,                               
                            totalLoans,                               
                            totalDelinquency                               
                        }
                    }",
                OperationName = "getLoanCountAndUPBByState"
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
            UtilitiesApiController.VerifyResponse(response);

            return response.Data.getLoanCountAndUPBByState;
        }

        public static async Task<List<VendorHistoryStatistics>> GetPaymentsToLender(
            GraphQLHttpClient apiClient, string access_token, DateTime? fromFilter, DateTime? toFilter)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    query getPaymentsToLender($fromFilter:DateTime!, $toFilter:DateTime!) 
                    {
                        getPaymentsToLender(fromFilter:$fromFilter, toFilter:$toFilter)
                        {
                            legend,
                            totalAmount,
                            toInterest,
                            toPrincipal,
                            toLateCharge,
                            other,
                            startDate,
                            endDate
                        }
                    }",
                OperationName = "getPaymentsToLender",
                Variables = new {
                    fromFilter,
                    toFilter
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
            UtilitiesApiController.VerifyResponse(response);

            return response.Data.getPaymentsToLender;
        }

        public static async Task<List<VendorHistoryStatistics>> GetPaymentsFromBorrower(
            GraphQLHttpClient apiClient, string access_token, DateTime? fromFilter, DateTime? toFilter)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    query getPaymentsFromBorrower($fromFilter:DateTime!, $toFilter:DateTime!) 
                    {
                        getPaymentsFromBorrower(fromFilter:$fromFilter, toFilter:$toFilter)
                        {
                            legend,
                            totalAmount,
                            toInterest,
                            toPrincipal,
                            toLateCharge,
                            other,
                            startDate,
                            endDate
                        }
                    }",
                OperationName = "getPaymentsFromBorrower",
                Variables = new
                {
                    fromFilter,
                    toFilter
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
            UtilitiesApiController.VerifyResponse(response);

            return response.Data.getPaymentsFromBorrower;
        }

        public static async Task<List<LoanStatusStatistic>> GetLoanStatusByLenderUid(GraphQLHttpClient apiClient, string access_token)
        {
            var request = new GraphQLRequest
            {
                Query = @"
                    query getLoanStatusByLenderUid
                    {
                        getLoanStatusByLenderUid
                        {
                            status,
                            count
                        }
                    }",
                OperationName = "getLoanStatusByLenderUid"
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
            UtilitiesApiController.VerifyResponse(response);

            return response.Data.getLoanStatusByLenderUid;
        }

        private class ObjectRequest
        {
            public List<RESLoanByState> getLoanCountAndUPBByState { get; set; }
            public List<vwl_LoanPaymentOnTime> getCubeLoanPaymentOnTime { get; set; }
            public List<VendorHistoryStatistics> getPaymentsToLender { get; set; }
            public List<VendorHistoryStatistics> getPaymentsFromBorrower { get; set; }
            public List<LoanStatusStatistic> getLoanStatusByLenderUid { get; set; }
        }
    }
}
