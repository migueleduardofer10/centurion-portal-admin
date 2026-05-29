using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class ELSColumnQuery : ObjectGraphType, ILirsContractQuery
    {
        public ELSColumnQuery(IHttpContextAccessor _httpContextAccessor)
        {
            FieldAsync<ListGraphType<ELSColumnType>>(
                "getELSColumn_GridColumns",
                description: "return grid columns description",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "entityType" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        string userId = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        var entityType = context.GetArgument<int>("entityType");
                        var columns = await ELSColumnController.GetColumns_By_UserId_EntityType(userId, entityType);

                        return columns;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);



        }
    }
}
