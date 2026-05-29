using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.Views;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

namespace CenturionPortalApi.WebApi.Queries
{
    public class LoanChargesQuery : ObjectGraphType, ILirsContractQuery
    {
        public LoanChargesQuery(IHttpContextAccessor _httpContextAccessor)
        {
            FieldAsync<DataSourceResultType<vwl_LoanChargesType>>("getLoanCharges",
                description: "return loan charges page",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "loanUid" },
                    new QueryArgument<NonNullGraphType<BooleanGraphType>> { Name = "hidePaid" },
                    new QueryArgument<NonNullGraphType<BooleanGraphType>> { Name = "withDetails" },
                    new QueryArgument<StringGraphType> { Name = "dataSourceRequest" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        var loanUid = context.GetArgument<string>("loanUid");
                        var hidePaid = context.GetArgument<bool>("hidePaid");
                        var withDetails = context.GetArgument<bool>("withDetails");                        
                        var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");                        

                        var result = await LoanChargesController.GetByLoanUid(userUid, (int)Enums.UserTypeEnum.LENDER, loanUid, hidePaid, withDetails, KendoUtilities.GetDataSourceRequest(dataSourceRequest));

                        return result;

                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

            FieldAsync<ListGraphType<vwl_ChargesDetailsType>>("getChargeDetails",
                description: "return charge details",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "chargeUid" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var chargeUid = context.GetArgument<string>("chargeUid");

                        var result =await LoanChargesController.GetChargeDetailsByChargeUid(chargeUid);

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
