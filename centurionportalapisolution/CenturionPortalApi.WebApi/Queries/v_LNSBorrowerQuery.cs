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
    public class v_LNSBorrowerQuery : ObjectGraphType, ILirsContractQuery
    {
        public v_LNSBorrowerQuery(IHttpContextAccessor _httpContextAccessor)
        {
            FieldAsync<v_LNSBorrowerType>(
                "getLNSBorrower_By_Uid",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" }
                ),
                resolve: async context =>
                {
                    try
                    { var uid = context.GetArgument<string>("uid");

                        var result = await v_LNSBorrowerController.GetBy_Uid(uid);

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
