using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class LNSLoanQuery : ObjectGraphType, ILirsContractQuery
    {
        public LNSLoanQuery()
        {
            FieldAsync<ListGraphType<vwl_LNSLoanType>>(
           "getLNSLoan_Get_CbLoansFilter",

           arguments: new QueryArguments(
              new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "userUid" },
              new QueryArgument<NonNullGraphType<  IntGraphType>> { Name = "userType" }
               ),
           resolve: async context =>
           {
               try
               {
                   var userUid = context.GetArgument<string>("userUid");
                   var userType =(Centurion.Utilities.CENTEnums.UserTypeEnum) context.GetArgument<int>("userType");

                   var result = await LNSLoanController.Get_CbLoansFilter(userUid,userType);

                   return result;

               }
               catch (Exception ex)
               {
                   context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                   return null;
               }
           });


            FieldAsync<ListGraphType<vwl_LNSLoanType>>(
             "getLNSLoan_ByFilter",
            
             arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "filter" },
                new QueryArgument<StringGraphType> { Name = "loansUidExclude" }
                 ),
             resolve: async context =>
             {
                 try
                 {
                     var filter = context.GetArgument<string>("filter");
                     var loansUidExclude = context.GetArgument<string>("loansUidExclude");

                     var result = await LNSLoanController.GetByFilter(filter, loansUidExclude);
                     
                    return result;

                 }
                 catch (Exception ex)
                 {
                     context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                     return null;
                 }
             });


            FieldAsync<vwl_LNSLoanType>(
            "getLNSLoan_ByUid",

            arguments: new QueryArguments(
               new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" } 
                ),
            resolve: async context =>
            {
                try
                {
                    var uid = context.GetArgument<string>("uid");
                  
                    var result = await LNSLoanController.GetByUid(uid);

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
