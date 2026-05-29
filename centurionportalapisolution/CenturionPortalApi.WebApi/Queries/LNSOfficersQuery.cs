using GraphQL.Types;
using CenturionPortalApi.DataAccess;
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
    public class LNSOfficersQuery : ObjectGraphType, ILirsContractQuery
    {
        public LNSOfficersQuery(IHttpContextAccessor _httpContextAccessor)
        {

            FieldAsync<vwl_LNSOfficersType>(
                "getLNSOfficer_ByUid",
                
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "uid" }
                ),
                resolve:async context =>
                {
                    try
                    {
                          var uid = context.GetArgument<string>("uid");

                        var result= await LNSOfficersFacade.GetByUid(uid);

                        return result;
                    
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            ) ;


            FieldAsync<ListGraphType<vwl_LNSOfficersType>>(
              "getLNSOfficer_ByFilter",
              arguments: new QueryArguments(
                  new QueryArgument<StringGraphType> { Name = "name" },
                   new QueryArgument<StringGraphType> { Name = "loansUidExclude" }
              ),
              resolve: async context =>
              {
                  try
                  {
                      var name = context.GetArgument<string>("name");
                      var loansUidExclude = context.GetArgument<string>("loansUidExclude");

                      var result = await LNSOfficersFacade.GetByFilter2(name,loansUidExclude);

                      return result;

                  }
                  catch (Exception ex)
                  {
                      context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                      return null;
                  }
              }
          );

        }
    }
}
