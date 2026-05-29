using GraphQL;
using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.Views;
using CenturionPortal.ApiController.Models.Utilities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.ApiController.Model.Utilities;

namespace CenturionPortal.ApiController
{
    public static class ELSUser_GridApiController
    {

        public static async Task<object> GetUserByUid(GraphQLHttpClient apiClient, string access_token, string uid)
        {
            try
            {
                GraphQLRequest request = null;

                request = new GraphQLRequest
                {
                    Query = @"
                        query execute(  $uid:String! ) 
                        {
                            getUserGridInfo(uid:$uid)
                            {
                                 " + UserInfoWithAccounts.QueryForSelectGraphQL + @"                                
                            }           
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        uid = uid ?? string.Empty
                    }
                };
                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
                var response = await apiClient.SendQueryAsync<UserInfoRequest>(request);

                return new { User = response.Data.getUserGridInfo };

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static async Task<object> GetUserList(GraphQLHttpClient apiClient, string access_token, bool getColumns, DataSourceRequest dataSourceRequest = null)
        {

            try
            {
                GraphQLRequest request = null;


                if (getColumns)
                {
                    var ELSColumnProperties = UtilitiesApiController.GetFields(typeof(Model.ELSColumn));

                    request = new GraphQLRequest
                    {
                        Query = @"
                        query execute($dataSourceRequest:String!, $entityType:Int!) 
                        {
                            getAllUserGrid(dataSourceRequest:$dataSourceRequest)
                            {
                                 " + DataSourceResultUserList.QueryForSelectGraphQL + @"                                
                            },
                            getGrid(entityType:$entityType) 
                            {
                                " + ELSColumnProperties + @" 
                            }                          
                        }",
                        OperationName = "execute",
                        Variables = new
                        {
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest),
                            entityType = (int)Enums.GridEntityTypeEnum.ELS_USER
                        }
                    };
                }
                else
                {
                    request = new GraphQLRequest
                    {
                        Query = @"
                        query execute($dataSourceRequest:String!) 
                        {
                            getAllUserGrid(dataSourceRequest:$dataSourceRequest)
                            {
                                 " + DataSourceResultUserList.QueryForSelectGraphQL + @"                                
                            }                       
                        }",
                        OperationName = "execute",
                        Variables = new
                        {
                            dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest)
                        }
                    };
                }

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
                var response = await apiClient.SendQueryAsync<UserListGraphRequest>(request);
                UtilitiesApiController.VerifyResponse(response);

                return new
                {
                    Result = response.Data.getAllUserGrid == null ? new DataSourceResultUserList() : response.Data.getAllUserGrid,
                    Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid
                };
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static async Task<List<AccountAssigned>> GetAccountsToAssign(GraphQLHttpClient apiClient, string access_token, int userType, string filter, string loansUidExclude)
        {
            try
            {
                GraphQLRequest request = null;
                request = new GraphQLRequest
                {
                    Query = @"
                        query execute($userType:Int!, $filter:String!, $loansUidExclude:String!) 
                        {
                            getAccountToAssignByFilter(userType:$userType,filter:$filter,loansUidExclude:$loansUidExclude)
                            {
                                 " + AccountAssigned.QueryForSelectGraphQL + @"                                
                            }                            
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        userType,
                        filter,
                        loansUidExclude
                    }
                };
                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
                var response = await apiClient.SendQueryAsync<AccountToAssignGraphRequest>(request);

                return response.Data.getAccountToAssignByFilter;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }



        public class DataSourceResultUserList
        {
            public List<UserGrid> Data { get; set; }
            public int Total { get; set; }
            public List<CustomAggregate> AggregateResults { get; set; }

            public static string QueryForSelectGraphQL
            {
                get
                {
                    return @"data
                {
                    " + UserGrid.QueryForSelectGraphQL + @"
                },
                total,
                aggregateResults{
                    value,
                    member,
                    formattedValue,
                    itemCount,
                    caption,
                    functionName,
                    aggregateMethodName
                }"
                    ;
                }
            }
        }

        private class UserInfoRequest
        {
            public UserInfoWithAccounts getUserGridInfo { get; set; }
        }
        private class UserListGraphRequest
        {
            public DataSourceResultUserList getAllUserGrid { get; set; }
            public List<ELSColumn> getGrid { get; set; }
        }

        private class AccountToAssignGraphRequest
        {
            public List<AccountAssigned> getAccountToAssignByFilter { get; set; }
        }
    }
}
