using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataAccess.Repositories.Contract;
using CenturionPortalApi.WebApi.Queries.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class vCW_LenderDisbursementQuery : ObjectGraphType, ILirsContractQuery
    {

        public vCW_LenderDisbursementQuery()
        {

            FieldAsync<IntGraphType>(
                "getVCW_LenderDisbursement_AwaitingDisbursementCount",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "userUid" },
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "userType" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var userUid = context.GetArgument<string>("userUid");
                        var userType= context.GetArgument<int>("userType");
                        


                        var result = await VCW_LenderDisbursementFacade.GetAwaitingDisbursementCount(userUid,(Centurion.Utilities.CENTEnums.UserTypeEnum)userType,DateTime.Now);

                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            );



            FieldAsync<DecimalGraphType>(
              "getVCW_LenderDisbursement_TotalDisbursement",
              arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "userUid" },
                  new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "userType" }
              ),
              resolve: async context =>
              {
                  try
                  {
                      var userUid = context.GetArgument<string>("userUid");
                      var userType = context.GetArgument<int>("userType");

                      var result = await VCW_LenderDisbursementFacade.GetTotalDisbursement(userUid, (Centurion.Utilities.CENTEnums.UserTypeEnum)userType, DateTime.Now);

                      return result;
                  }
                  catch (Exception ex)
                  {
                      context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                      return null;
                  }
              }
          );





        }
    }
}
