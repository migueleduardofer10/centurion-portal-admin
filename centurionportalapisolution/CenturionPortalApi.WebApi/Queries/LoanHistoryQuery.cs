using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.Views;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace CenturionPortalApi.WebApi.Queries
{
    public class LoanHistoryQuery : ObjectGraphType, ILirsContractQuery
    {
        public LoanHistoryQuery(IHttpContextAccessor _httpContextAccessor) {

            FieldAsync<DataSourceResultType<vwl_LoanHistoryType>>(
                "getLoanHistory",
                description: "return loan information",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "loanUid" },
                    new QueryArgument<NonNullGraphType<BooleanGraphType>> { Name = "excludeFunding" },
                    new QueryArgument<StringGraphType> { Name = "dataSourceRequest" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        var loanUid = context.GetArgument<string>("loanUid");
                        var excludeFunding = context.GetArgument<bool>("excludeFunding");
                        var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");

                        if (string.IsNullOrEmpty(userUid))
                            UtilitiesController.ShowValidation("User ID could not be empty.");

                        var request = KendoUtilities.GetDataSourceRequest(dataSourceRequest);

                        var result= await LoanHistoryController.GetByVendor2(userUid, loanUid, excludeFunding, request);

                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

        }
    }
}
