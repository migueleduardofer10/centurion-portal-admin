using GraphQL;
using GraphQL.Client.Http;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.CustomEntities;
using CenturionPortal.ApiController.Model.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public static class PortfolioReportController
    {

        public static async Task<object> Report1(GraphQLHttpClient apiClient)
        {
            try
            {
                var sumaryPortfolioStatisticsFields = UtilitiesApiController.GetFields(typeof(SummaryPortfolioStatistics));
                var otherStatisticsFields = UtilitiesApiController.GetFields(typeof(OtherStatistics));
                var userFields = ELSUser.QueryForSelectSettingsAccountGraphQL;

                var request = new GraphQLRequest
                {
                    Query = @"
                        query execute () 
                        {
                            getSummaryPortfolioStatistics_By_UserUid_UserType ()   
                            {
                                " + sumaryPortfolioStatisticsFields + @"
                            }
                            ,
                            getOtherStatistics_By_UserUid_UserType ()
                            {
                                " + otherStatisticsFields + @"
                            }
                            ,
                            getVCW_LenderDisbursement_AwaitingDisbursementCount ()
                            ,
                            getVCW_LenderDisbursement_TotalDisbursement ()
                            ,
                            getELSUserInfo()
                            {
                                 " + userFields + @"                                
                            }   

                        }",
                    OperationName = "execute",
                    //Variables = new
                    //{
                    //    userUid,
                    //    userType
                    //}
                };




                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                UtilitiesApiController.VerifyResponse(response);

                var ArrSummPort = response.Data.getSummaryPortfolioStatistics_By_UserUid_UserType;
                var ArrOtherStatisticsAll = response.Data.getOtherStatistics_By_UserUid_UserType;
                var count = response.Data.getVCW_LenderDisbursement_AwaitingDisbursementCount;
                var totalAmount = response.Data.getVCW_LenderDisbursement_TotalDisbursement;
                var elsUser = response.Data.getELSUser_GetByUid;


                var ArrOtherStatistics1 = new[] { new { Title = default(string), Value = default(string) } }.Skip(1).ToList();
                ArrOtherStatistics1.Add(new { Title = "Checks Awaiting Disbursement", Value = count.ToString() }); ;
                ArrOtherStatistics1.Add(new { Title = "Check Proceeds to be Disbursed", Value = totalAmount.ToString("$ #,##0.00") });
                ArrOtherStatistics1.Add(new { Title = "Current Month's Payments Received", Value = ArrOtherStatisticsAll.Find(x => x.Title == "MonthToDate").Count.ToString() });
                ArrOtherStatistics1.Add(new { Title = "Prior Month's Payments Received", Value = ArrOtherStatisticsAll.Find(x => x.Title == "PriorMonth").TotalAmount.ToString("$ #,##0.00") });
                ArrOtherStatistics1.Add(new { Title = "Current Year-To-Date Payments Received", Value = ArrOtherStatisticsAll.Find(x => x.Title == "CurrentYear").TotalAmount.ToString("$ #,##0.00") });

                var ArrOtherStatistics2 = new[] { new { Title = default(string), Value = default(string) } }.Skip(1).ToList();
                ArrOtherStatistics2.Add(new { Title = "Current Year-To-Date Interest Received *", Value = ArrOtherStatisticsAll.Find(x => x.Title == "CurrentYear").TotalInterest.ToString("$ #,##0.00") });
                ArrOtherStatistics2.Add(new { Title = "Prior Year-To-Date Interest Received *", Value = ArrOtherStatisticsAll.Find(x => x.Title == "PriorYear").TotalInterest.ToString("$ #,##0.00") });
                ArrOtherStatistics2.Add(new { Title = "Prior Year-To-Date Payments Received", Value = ArrOtherStatisticsAll.Find(x => x.Title == "PriorYear").TotalAmount.ToString("$ #,##0.00") });
                ArrOtherStatistics2.Add(new { Title = "Portfolio Lifetime Payments Received", Value = ArrOtherStatisticsAll.Find(x => x.Title == "Lifetime").TotalAmount.ToString("$ #,##0.00") });






                var TotalOpenLoans = ArrSummPort.Where(s => (s.Id != -1
                                             && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.NON_ACTIVE
                                             && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.PAID_OFF
                                             && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.TRANSFERED_OUT
                                             && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.TRANSFERED
                                             && s.PrincipalBalance > 0)).Sum(s => s.TotalLoans);

                var AverageNoteRateforLoans = (ArrSummPort.Where(s => (s.Id != -1
                                                   && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.NON_ACTIVE
                                                   && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.PAID_OFF
                                                   && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.TRANSFERED_OUT
                                                   && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.TRANSFERED
                                                   && s.PrincipalBalance > 0))
                                                .Sum(s => s.SUMNoteRate) ?? 0
                                                / (
                                                (float)(ArrSummPort.Where(s => (s.Id != -1
                                                    && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.NON_ACTIVE
                                                    && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.PAID_OFF
                                                    && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.TRANSFERED_OUT
                                                    && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.TRANSFERED
                                                    && s.PrincipalBalance > 0))
                                                .Sum(s => (int?)s.TotalLoans) ?? 0)
                                                )).ToString("#0.000%");

                var OpenLoansOriginalBalance = ArrSummPort.Where(s => (s.Id != -1
                                               && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.NON_ACTIVE
                                               && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.PAID_OFF
                                               && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.TRANSFERED_OUT
                                               && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.TRANSFERED
                                               && s.PrincipalBalance > 0)).Sum(s => s.OriginalBalance)?.ToString("$" + "#,##0.00");

                var OpenLoansCurrentBalance = ArrSummPort.Where(s => (s.Id != -1
                                               && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.NON_ACTIVE
                                               && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.PAID_OFF
                                               && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.TRANSFERED_OUT
                                               && s.Id != (int)Centurion.Utilities.CENTEnums.LoanStatusEnum.TRANSFERED
                                               && s.PrincipalBalance > 0)).Sum(s => s.PrincipalBalance)?.ToString("$" + "#,##0.00");


                var ArrSumary = new[] { new { Title = default(string), Value = default(string) } }.Skip(1).ToList();
                ArrSumary.Add(new { Title = "Total Open Loans", Value = TotalOpenLoans.ToString() });
                ArrSumary.Add(new { Title = "Average Note Rate for Loans", Value = AverageNoteRateforLoans });
                ArrSumary.Add(new { Title = "Open Loans Original Balance", Value = OpenLoansOriginalBalance });
                ArrSumary.Add(new { Title = "Open Loans Current Balance", Value = OpenLoansCurrentBalance });






                return new
                {
                    ArrSummPort,
                    ArrSumary,
                    ArrOtherStatistics1,
                    ArrOtherStatistics2,
                    UserInfo = elsUser.FullName
                };

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static async Task<object> Report_LoanPortfolio_Load(GraphQLHttpClient apiClient, string accessToken)
        {
            try
            {
          


                var request = new GraphQLRequest
                {
                    Query = @"
                        query execute () 
                        {
                            getLNSLoan_Get_CbLoansFilter ()   
                            {
                                trustAccountUid, account, uid
                            }  
                            ,
                            getELSServiceMap_GetAccount_ByUidAndType()   
                            {
                                account, fullName , parentUid
                            }
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        
                    }
                };


                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");


                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                UtilitiesApiController.VerifyResponse(response);






                return new
                {
                    ArrAccount = response.Data.getLNSLoan_Get_CbLoansFilter.OrderBy(x=>x.Account).ToList(),
                    ArrCbLoansFilter = response.Data.getELSServiceMap_GetAccount_ByUidAndType.OrderBy(x=>x.Account).ToList()
                };

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public static async Task<object> Report_LoanPortfolio_Document(
        GraphQLHttpClient apiClient,string accessToken,DataSourceRequest dataSourceRequest,
        string lenderUid, bool useRange, string from, string to, bool includeInactive)
        {
            try
            {
                var fields = UtilitiesApiController.QueryForSelectGraphQL<RPTCustomFullLoanPortfolio>();
                //
                var request = new GraphQLRequest
                {
                    Query = @"
                        query execute ($dataSourceRequest:String!, $lenderUid:String!, $useRange:Boolean!, $from:Int!, $to:Int!, $includeInactive:Boolean! ) 
                        {
                            getRPTCustomFullLoanPortfolio (dataSourceRequest: $dataSourceRequest, lenderUid:$lenderUid, useRange:$useRange, from:$from, to:$to, includeInactive:$includeInactive)   
                            {
                                " + fields + @"
                            }                            
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        dataSourceRequest=UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest),
                        lenderUid,
                        useRange,from,to,includeInactive
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                UtilitiesApiController.VerifyResponse(response);

                return new
                {
                    Result = response.Data.getRPTCustomFullLoanPortfolio
                };

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        private class ObjectRequest
        {
            public UtilitiesApiController.GenericDataSourceResult<RPTCustomFullLoanPortfolio> getRPTCustomFullLoanPortfolio { get; set; }
            public List<ELSServiceMap> getELSServiceMap_GetAccount_ByUidAndType { get; set; }

            public List<vwl_LNSLoan> getLNSLoan_Get_CbLoansFilter { get; set; }
            public List<SummaryPortfolioStatistics> getSummaryPortfolioStatistics_By_UserUid_UserType { get; set; }
            public List<OtherStatistics> getOtherStatistics_By_UserUid_UserType { get; set; }
            public int getVCW_LenderDisbursement_AwaitingDisbursementCount { get; set; }
            public decimal getVCW_LenderDisbursement_TotalDisbursement { get; set; }
            public ELSUser getELSUser_GetByUid { get; set; }
        }

    }
}
