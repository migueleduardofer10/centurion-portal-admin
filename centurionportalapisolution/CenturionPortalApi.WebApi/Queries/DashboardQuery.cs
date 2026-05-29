using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Views;
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
    public class DashboardQuery : ObjectGraphType, ILirsContractQuery
    {
        public DashboardQuery(IHttpContextAccessor _httpContextAccessor)
        {

            FieldAsync<ListGraphType<RESLoanByStateType>>(
                "getLoanCountAndUPBByState",
                description: "return loans by state",
                arguments: new QueryArguments(),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();

                        if (string.IsNullOrEmpty(userUid))
                            UtilitiesController.ShowValidation("User ID could not be empty.");

                        var result = await UtilityGraphController.GetLoanCountAndUPBByState(userUid);

                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return new List<RESLoanByState>();
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation)
                ;

            FieldAsync<ListGraphType<vwl_LoanPaymentOnTimeType>>(
                "getCubeLoanPaymentOnTime",
                description: "return loan payments on time",
                arguments: new QueryArguments(),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();

                        if (string.IsNullOrEmpty(userUid))
                            UtilitiesController.ShowValidation("User ID could not be empty.");

                        var result = await UtilityGraphController.GetCubeLoanPaymentOnTime(userUid);

                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return new List<vwl_LoanPaymentOnTime>();
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation)
                ;

        }
    }
}
