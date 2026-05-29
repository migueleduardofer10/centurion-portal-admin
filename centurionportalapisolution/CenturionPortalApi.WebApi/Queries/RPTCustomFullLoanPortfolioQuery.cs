using GraphQL.Types;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.CustomEntities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class RPTCustomFullLoanPortfolioQuery : ObjectGraphType, ILirsContractQuery
    {
        public RPTCustomFullLoanPortfolioQuery()
        {


            FieldAsync<DataSourceResultType<RPTCustomFullLoanPortfolioType>>
            (
                "getRPTCustomFullLoanPortfolio",
                     arguments: new QueryArguments(
                        new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "userUid" },
                           new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "userType" },
                           new QueryArgument<StringGraphType> { Name = "dataSourceRequest", DefaultValue = "" },
                           new QueryArgument<StringGraphType> { Name = "lenderUid", DefaultValue = "" },

                            new QueryArgument<BooleanGraphType> { Name = "useRange", DefaultValue = false },
                            new QueryArgument<IntGraphType> { Name = "from", DefaultValue = 0 },
                            new QueryArgument<IntGraphType> { Name = "to", DefaultValue = 0 },
                            new QueryArgument<BooleanGraphType> { Name = "includeInactive", DefaultValue = false }



                    ),
                resolve: async context =>
                {
                    try
                    {



                        var userUid = context.GetArgument<string>("userUid");
                        var userType = context.GetArgument<int>("userType");
                        var dataSourceRequest = UtilitiesController.Convert_StringToDataSourRequest(context.GetArgument<string>("dataSourceRequest"));
                        var lenderUid = context.GetArgument<string>("lenderUid");

                        var useRange = context.GetArgument<bool>("useRange");
                        var from = context.GetArgument<int>("from");
                        var to = context.GetArgument<int>("to");
                        var includeInactive = context.GetArgument<bool>("includeInactive");



                        var result = await RPTCustomFullLoanPortfolioFacade.getLoansMasterFilter(
                            userUid,
                       (Centurion.Utilities.CENTEnums.UserTypeEnum)userType,
                       useRange, from, to, includeInactive, lenderUid).ToDataSourceResultAsync(dataSourceRequest);

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
