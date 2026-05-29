using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.CustomEntities;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace CenturionPortalApi.WebApi.Queries
{
    public class ReportQuery : ObjectGraphType, ILirsContractQuery
    {
        public ReportQuery(IHttpContextAccessor _httpContextAccessor)
        {
            FieldAsync<DataSourceResultType<CustomACHStatusType>>(
                "getACHStatusReport",
                description: "return ach status data for report ",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "dataSourceRequest" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");

                        if (string.IsNullOrEmpty(userUid))
                            throw new Exception("User ID could not be empty.");

                        var result = await ReportController.GetACHStatus(KendoUtilities.GetDataSourceRequest(dataSourceRequest), userUid);

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
