using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Utilities;
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
    public class ELSServiceMapQuery : ObjectGraphType, ILirsContractQuery
    {
        public ELSServiceMapQuery(IHttpContextAccessor _httpContextAccessor)
        {
            FieldAsync<ListGraphType<ELSServiceMapType>>(
              "getELSServiceMap_GetAccount_ByUidAndType",
                arguments: new QueryArguments(
                 new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" },
                 new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "type" }
                  ),
              resolve: async context =>
              {
                  try
                  {
                      var arrNames=context.SubFields.ToList().Select(x => x.Value.Name).ToArray();

                      var uid = context.GetArgument<string>("uid");
                      var type = context.GetArgument<int>("type");

                    
                      var result = await ELSServiceMapController.GetByUidAndType(uid, type ,
                        new UtilitiesController.SelectSomeProperties<ELSServiceMap> (arrNames)
                          );

                      return result;

                  }
                  catch (Exception ex)
                  {
                      context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                      return null;
                  }
              }
            );


            FieldAsync<ListGraphType<ELSServiceMapType>>(
               "getELSServiceMap_ByUidAndType",
                 arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" },
                  new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "type" }
                   ),
               resolve: async context =>
               {
                   try
                   {

                      
                       var uid = context.GetArgument<string>("uid");
                       var type = context.GetArgument<int>("type");

                       var result = await       ELSServiceMapController.GetByUidAndType(uid, type);

                       return result;

                   }
                   catch (Exception ex)
                   {
                       context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                       return null;
                   }
               }
             );

            FieldAsync<ListGraphType<ELSServiceMapType>>(
                "getELSServiceMap_ValidLenders_ByLender",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "viewType" }),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        int userType = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "UserType").Select(x => x.Value).FirstOrDefault());
                        int viewType = context.GetArgument<int>("viewType");

                        var result = await ELSServiceMapController.GetValidLender_ByUidAndTypeAndViewType(userUid, userType, viewType);

                        return result;

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
