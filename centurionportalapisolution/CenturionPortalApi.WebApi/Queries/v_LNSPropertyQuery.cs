using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.Views;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class v_LNSPropertyQuery : ObjectGraphType, ILirsContractQuery
    {
        public v_LNSPropertyQuery(IHttpContextAccessor _httpContextAccessor)
        {
            FieldAsync<v_LNSPropertyType>(
                "getLNSProperty_By_LoanUid",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "loanUid" }
                ),
                resolve: async context =>
                {
                    try
                    {

                        var loanUid = context.GetArgument<string>("loanUid");

                        var result = await v_LNSPropertyController.GetBy_LoanUid(loanUid);

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
