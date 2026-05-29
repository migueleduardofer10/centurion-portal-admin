using GraphQL.Authorization;
using GraphQL.Types;
using GraphQLParser.AST;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.CustomEntities;
using CenturionPortalApi.WebApi.Types.Views;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class vcw_VendorPortfolioSecondaryQuery : ObjectGraphType, ILirsContractQuery
    {
        public vcw_VendorPortfolioSecondaryQuery(IHttpContextAccessor _httpContextAccessor)
        {
            FieldAsync<DataSourceResultType<vcw_VendorPortfolioSecondaryType>>(
                "getWcw_VendorPortfolioSecondary_By_UserId_UserType_State_Status",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "userUid" },
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "userType" },
                    new QueryArgument<StringGraphType> { Name = "state", DefaultValue = "" },
                    new QueryArgument<IntGraphType> { Name = "status", DefaultValue = -2 },
                     new QueryArgument<IntGraphType> { Name = "balance", DefaultValue = 0 },
                    new QueryArgument<StringGraphType> { Name = "dataSourceRequest", DefaultValue = "" }
                ),
                resolve: async context =>
                {
                    try
                    {

                        var dataSourceRequest = KendoUtilities.DeserializeDataSourceRequestFromstring(context.GetArgument<string>("dataSourceRequest"));
                        var userUid = context.GetArgument<string>("userUid");
                        var userType = context.GetArgument<int>("userType");
                        var state = context.GetArgument<string>("state");
                        var status = context.GetArgument<int>("status");
                        var balance = context.GetArgument<int>("balance");

                        var result = await vcw_VendorPortfolioSecondaryController.Get_By_UserUid_UserType_State_Status_Balance(userUid, userType, dataSourceRequest, state, status,balance);

                        return result;


                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            );//.AuthorizeWith(Policies.lirsOperation);


            FieldAsync<DataSourceResultType<vcw_VendorPortfolioSecondaryType>>(
                "getWcw_VendorPortfolioSecondary_By_LoanUid",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "loanUid" } ,
                      new QueryArgument<StringGraphType> { Name = "dataSourceRequest", DefaultValue = "" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var dataSourceRequest = KendoUtilities.DeserializeDataSourceRequestFromstring(context.GetArgument<string>("dataSourceRequest"));

                        var loanUid = context.GetArgument<string>("loanUid");
                    
                        var result = await vcw_VendorPortfolioSecondaryController.Get_By_LoanUid(loanUid, dataSourceRequest);

                        return result;


                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            );//.AuthorizeWith(Policies.lirsOperation);




            FieldAsync<ListGraphType<GraphSecondaryLoanType>>(
                "getWcw_VendorPortfolioSecondary_GraphSecondaryLoan",
                arguments: new QueryArguments(
                     new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "userUid" },
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "userType" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "loanUid" } 
                ),
                resolve: async context =>
                {
                    try
                    {
                        var userUid = context.GetArgument<string>("userUid");
                        var userType = context.GetArgument<int>("userType");
                        var loanUid = context.GetArgument<string>("loanUid");

                        var result = await vcw_VendorPortfolioSecondaryController.Get_GraphSecondaryLoan(userUid,userType,loanUid);

                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            );//.AuthorizeWith(Policies.lirsOperation);

           
        }
    }
}
