using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.Views;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class FundingQuery : ObjectGraphType, ILirsContractQuery
    {
        public FundingQuery(IHttpContextAccessor _httpContextAccessor)
        {
            FieldAsync<DataSourceResultType<vwl_FundingType>>(
             "getFunding",
             description: "return Funding information",
             arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "loanUid" },
                new QueryArgument<StringGraphType> { Name = "dataSourceRequest" }
                 ),
             resolve: async context =>
             {
                 try
                 {
                     var loanUid = context.GetArgument<string>("loanUid");
                     var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");

                     var result = await vwl_FundingBusiness.Get_By_LoanUid(loanUid, KendoUtilities.DeserializeDataSourceRequestFromstring(dataSourceRequest));// KendoUtilities.DeserializeDataSourceRequestFromstring(dataSourceRequest));

                    return result;

                 }
                 catch (Exception ex)
                 {
                     context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                     return null;
                 }
             });
        }
    }
}
