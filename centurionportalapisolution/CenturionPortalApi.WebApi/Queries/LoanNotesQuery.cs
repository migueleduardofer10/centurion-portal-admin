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
    public class LoanNotesQuery : ObjectGraphType, ILirsContractQuery
    {
        public LoanNotesQuery()
        {

            FieldAsync<DataSourceResultType<vwl_LoanNotesType>>(
            "getLoanNotes",
            description: "return Loan Notes information",
            arguments: new QueryArguments(
            new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "loanUid" },
            new QueryArgument<StringGraphType> { Name = "dataSourceRequest" }
            ),
            resolve: async context =>
            {
                try
                {
                    var loanUid = context.GetArgument<string>("loanUid");
                    var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");



                    var r1 = await vwl_LoanNotesBusiness.Get_By_LoanUid(loanUid, KendoUtilities.DeserializeDataSourceRequestFromstring(dataSourceRequest));

                    return r1;

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
