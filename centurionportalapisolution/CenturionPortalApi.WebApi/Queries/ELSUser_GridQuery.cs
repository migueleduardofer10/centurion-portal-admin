using GraphQL.Authorization;
using GraphQL.Types;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataAccess;
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
    public class ELSUser_GridQuery : ObjectGraphType, ILirsContractQuery
    {
        public ELSUser_GridQuery(IHttpContextAccessor _httpContextAccessor)
        {
            FieldAsync<vwa_ELSUser_GridType>(
            "getELSUser_Grid_GetUser",
            arguments: new QueryArguments(
                new QueryArgument<StringGraphType> { Name = "uid" }
                ),
            resolve: async context =>
            {
                try
                {
                    var uid = context.GetArgument<string>("uid");
 
                    var result = await ELSUserFacade.GetQuery().Where(x=>x.Uid==uid).FirstOrDefaultAsync();
                 
                        return result;

                }
                catch (Exception ex)
                {
                    context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                    return null;
                }
            });

            FieldAsync<DataSourceResultType<vwa_ELSUser_GridType>>(
            "getELSUser_Grid_List",
            arguments: new QueryArguments(
               new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "dataSourceRequest" }
                ),
            resolve: async context =>
            {
                try
                {
                    var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");
                    var result = await ELSUserFacade.GetQuery().ToDataSourceResultAsync(KendoUtilities.DeserializeDataSourceRequestFromstring(dataSourceRequest));

                    return result;

                }
                catch (Exception ex)
                {
                    context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                    return null;
                }
            }).AuthorizeWith(Policies.lirsOperation);
        }
    }
}
