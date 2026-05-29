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
    public class INFStateQuery : ObjectGraphType, ILirsContractQuery
    {
        public INFStateQuery()
        {


            FieldAsync<ListGraphType<vw_INFStateType>>(
        "getINFState",

            arguments: new QueryArguments(new QueryArgument<BooleanGraphType> { Name = "addRowAll" }),
        resolve: async context =>
        {
            try
            {
               
                bool? addRowAll = context.GetArgument<bool>("addRowAll");


                var result = await INFStateController.GetAll();

                if (addRowAll!=null && addRowAll==true)
                {
                    result.Insert(0, new  vw_INFState {Abbreviation  = "0", Name= "All" });
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
