using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using System;

namespace CenturionPortalApi.WebApi.Queries
{
    public class ELSUserQuery : ObjectGraphType, ILirsContractQuery
    {
        public ELSUserQuery()
        {
            

            FieldAsync<ELSUserType>
            (
                "getELSUser_GetByUid",
                     arguments: new QueryArguments(
                        new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" }
                    ),
                resolve: async context =>
                {
                    try
                    {
                        var uid = context.GetArgument<string>("uid");

                        var result = await ELSUserController.getUserById(uid);
                        return result;

                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            );

            //FieldAsync<DataSourceResultType<vwa_ELSUser_GridType>>
            //(
            //    "getELSUser_GridPage",
            //     arguments: new QueryArguments(
            //        new QueryArgument<StringGraphType> { Name = "dataSourceRequest" }
            //    ),
            //    resolve: async context =>
            //    {
            //        try
            //        {
            //            var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");
            //            var result = await ELSUserController.GetPage(KendoUtilities.DeserializeDataSourceRequestFromstring(dataSourceRequest));
            //            return result;
            //        }
            //        catch (Exception ex)
            //        {
            //            context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
            //            return null;
            //        }
            //    }
            //);












            //FieldAsync<ELSUserType>(
            //  "getELSUser_Find",
            //    arguments: new QueryArguments(
            //     new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" }
            //      ),
            //  resolve: async context =>
            //  {
            //      try
            //      {


            //          var uid = context.GetArgument<string>("uid");

            //          var user = await ELSUserFacade.Find(uid);
            //          var newUser = new DataBase.Models.ELSUser  ();
            //          if (user != null)
            //          {
            //              newUser = user;//,// JsonConvert.DeserializeObject<ELSUser>(JsonConvert.SerializeObject(user));
            //               newUser.Photo = Business.UtilitiesController.getUrlImage(newUser.Photo);
            //          }

            //          return newUser;



            //      }
            //      catch (Exception ex)
            //      {
            //          context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
            //          return null;
            //      }
            //  }
            //);
        }
    }
}
 
