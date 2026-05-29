using GraphQL.Types;
using GraphQLParser.AST;
using CenturionPortalApi.Business;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types.CustomEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class SummaryPortfolioStatisticsQuery : ObjectGraphType, ILirsContractQuery
    {
        public SummaryPortfolioStatisticsQuery()
        {


            FieldAsync<ListGraphType<SummaryPortfolioStatisticsType>>
            (
                "getSummaryPortfolioStatistics_By_UserUid_UserType",
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

                        var result = await SummaryPortfolioStatisticsController.GetPortfolioStatisticsbyLenderUidAsync(userUid, (Centurion.Utilities.CENTEnums.UserTypeEnum)  userType);

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
