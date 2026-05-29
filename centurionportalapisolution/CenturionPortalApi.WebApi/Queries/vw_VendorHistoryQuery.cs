using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataBase.Models.Views;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class vw_VendorHistoryQuery : ObjectGraphType, ILirsContractQuery
    {
        public vw_VendorHistoryQuery()
        {
            FieldAsync<DataSourceResultType<vw_VendorHistoryType>>(
               "getVW_VendorHistory_Report_PaymentToLender",
               arguments: new QueryArguments(
                  new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "userUid" },
                  new QueryArgument<StringGraphType> { Name = "account", DefaultValue = "0" },
                  new QueryArgument<BooleanGraphType> { Name = "onlyPending"},
                  new QueryArgument<StringGraphType> { Name = "dataSourceRequest", DefaultValue = "" }
                   ),
               resolve: async context =>
               {
                   try
                   {
                       var userUid = context.GetArgument<string>("userUid");
                       var account = context.GetArgument<string>("account");
                       var onlyPending= context.GetArgument<bool>("onlyPending");
                       var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");
                   

                                                                                                                             

                       var result = await vw_VendorHistoryController.Report_PaymentToLender(userUid, account, 
                           onlyPending,
                           KendoUtilities.DeserializeDataSourceRequestFromstring(dataSourceRequest) );
                       
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

    public class Uno
    {
        public string name { get; set; }
       
    }

}
