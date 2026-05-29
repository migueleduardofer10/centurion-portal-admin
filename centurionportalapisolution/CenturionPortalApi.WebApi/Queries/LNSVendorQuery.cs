using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.Views;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CenturionPortalApi.WebApi.Queries
{
    public class LNSVendorQuery : ObjectGraphType, ILirsContractQuery
    {
        public LNSVendorQuery(IHttpContextAccessor _httpContextAccessor)
        {

            Field<DataSourceResultType<vwl_VendorPortfolioType>>(
                "getLNSVendor",
                description: "return loan information",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "dataSourceRequest" }
                ),
                resolve: context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");

                        if (string.IsNullOrEmpty(userUid))
                            throw new Exception("User ID could not be empty.");

                        
                        var result= LNSVendorController.GetPage(userUid, KendoUtilities.GetDataSourceRequest(dataSourceRequest));

                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);


            FieldAsync<ListGraphType<vwl_LNSVendorType>>(
            "getLNSVendor_ByFilter",
            
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

                    var result = await LNSVendorController.GetByFilter(filter, loansUidExclude);
                    
                    return result;

                }
                catch (Exception ex)
                {
                    context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                    return null;
                }
            });



            FieldAsync<vwl_LNSVendorType>(
         "getLNSVendor_ByUid",
         arguments: new QueryArguments(
            new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" }             
             ),
         resolve: async context =>
         {
             try
             {
                 var uid = context.GetArgument<string>("uid");
                
                 var result = await LNSVendorController.GetByUid(uid);

                 return result;

             }
             catch (Exception ex)
             {
                 context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                 return null;
             }
         });


            #region 


            FieldAsync<ListGraphType<VendorHistoryStatisticsType>>(
             "getPaymentsToLender",
             description: "return payments to lender",
             arguments: new QueryArguments(
                 new QueryArgument<DateTimeGraphType> { Name = "fromFilter" },
                 new QueryArgument<DateTimeGraphType> { Name = "toFilter" }
             ),
             resolve: async context =>
             {
                 try
                 {
                     string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                     DateTime? fromFilter = context.GetArgument<DateTime?>("fromFilter");
                     DateTime? toFilter = context.GetArgument<DateTime?>("toFilter");

                     if (string.IsNullOrEmpty(userUid))
                         UtilitiesController.ShowValidation("User ID could not be empty.");

                     var result = await LNSVendorController.GetPaymentsToLender(userUid, fromFilter, toFilter);

                     return result;
                 }
                 catch (Exception ex)
                 {
                     context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                     return new List<VendorHistoryStatistics>();
                 }
             }
         ).AuthorizeWith(Policies.lirsOperation)
         ;


            FieldAsync<ListGraphType<VendorHistoryStatisticsType>>(
             "getPaymentsFromBorrower",
             description: "return payments to lender",
             arguments: new QueryArguments(
                 new QueryArgument<DateTimeGraphType> { Name = "fromFilter" },
                 new QueryArgument<DateTimeGraphType> { Name = "toFilter" }
             ),
             resolve: async context =>
             {
                 try
                 {
                     string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                     DateTime? fromFilter = context.GetArgument<DateTime?>("fromFilter");
                     DateTime? toFilter = context.GetArgument<DateTime?>("toFilter");

                     if (string.IsNullOrEmpty(userUid))
                         UtilitiesController.ShowValidation("User ID could not be empty.");

                     var result = await LNSVendorController.GetPaymentsFromBorrower(userUid, fromFilter, toFilter);

                     return result;
                 }
                 catch (Exception ex)
                 {
                     context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                     return new List<VendorHistoryStatistics>();
                 }
             }
         ).AuthorizeWith(Policies.lirsOperation)
         ;

            FieldAsync<ListGraphType<LoanStatusStatisticType>>(
                "getLoanStatusByLenderUid",
                description: "return loan status by lender uid",
                arguments: new QueryArguments(),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();

                        if (string.IsNullOrEmpty(userUid))
                            UtilitiesController.ShowValidation("User ID could not be empty.");

                        var result = await LNSVendorController.GetLoanStatusByLenderUid(userUid);

                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return new List<LoanStatusStatistic>();
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation)
                ;


            #endregion

            FieldAsync<ListGraphType<vwl_LNSVendorType>>(
            "getLNSVendor_Resumen_ByFilter",

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

                    var result = await LNSVendorController.GetByFilter(filter, loansUidExclude);

                    return result;

                }
                catch (Exception ex)
                {
                    context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                    return null;
                }
            });

            FieldAsync<ListGraphType<ELSServiceMapType>>(
                "getValidLendersByLender",
                arguments: new QueryArguments(),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        var result = await LNSVendorController.GetValidLendersByLender(userUid);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);
        }
    }
}
