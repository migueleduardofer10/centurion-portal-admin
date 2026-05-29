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
    public class VendorPortfolioQuery : ObjectGraphType, ILirsContractQuery
    {
        public VendorPortfolioQuery()
        {

            FieldAsync<DataSourceResultType<vwl_VendorPortfolioType>>(
            "getVendorPortfolio_By",
            arguments: new QueryArguments(
                  new QueryArgument<StringGraphType> { Name = "userUid" },
                  new QueryArgument<IntGraphType> { Name="userType"},
            new QueryArgument<StringGraphType> { Name = "lastName" },
            new QueryArgument<StringGraphType> { Name = "firstName" },
            new QueryArgument<StringGraphType> { Name = "address" },
            new QueryArgument<StringGraphType> { Name = "city" },
            new QueryArgument<StringGraphType> { Name = "state" },
            new QueryArgument<StringGraphType> { Name = "dataSourceRequest" }
          ),
          resolve: async context =>
          {
              try
              {
                  var userUid = context.GetArgument<string>("userUid");
                  var userType = context.GetArgument<int>("userType");
                  var lastName = context.GetArgument<string>("lastName");
                  var firstName = context.GetArgument<string>("firstName");
                  var address = context.GetArgument<string>("address");
                  var city = context.GetArgument<string>("city");
                  var state = context.GetArgument<string>("state");
                  var dataBase = context.GetArgument<string>("dataBase");

                  var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");

                  if (string.IsNullOrEmpty(lastName) && string.IsNullOrEmpty(firstName) &&
                  string.IsNullOrEmpty(address) && string.IsNullOrEmpty(city) &&
                  string.IsNullOrEmpty(state) &&
                  string.IsNullOrEmpty(dataBase))
                  {
                      return null;
                  }
                  else
                  {

                      var result = await vwl_VendorPortfolioController.Filter_By(
                          userUid,
                          userType,
                          lastName, firstName, address, city,
                          state,
                           KendoUtilities.DeserializeDataSourceRequestFromstring(dataSourceRequest));

                      
                      return result;
                  }
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
