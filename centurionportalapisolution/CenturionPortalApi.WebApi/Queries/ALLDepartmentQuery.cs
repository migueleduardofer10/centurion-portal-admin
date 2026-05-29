using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataBase.Models.Views;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class ALLDepartmentQuery : ObjectGraphType, ILirsContractQuery
    {
        public ALLDepartmentQuery()
        {
            FieldAsync<ListGraphType<vw_ALLDepartmentType>>(
          "getALLDepartment",
          arguments: new QueryArguments(new QueryArgument<BooleanGraphType> { Name = "addRowAll" }),
          resolve: async context =>
          {
              try
              {
                  var addRowAll = context.GetArgument<bool>("addRowAll");



                  var result = await ALLDepartmentController.GetAll_Columns_Uid_Name();

                  if (addRowAll)
                  {
                      result.Insert(0, new vw_ALLDepartment { Uid = 0, Name = "All" });
                  }

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
