using GraphQL;
using GraphQL.Client.Http;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.Views;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static CenturionPortal.ApiController.Models.Utilities.Enums;

namespace CenturionPortal.ApiController
{
    public static class INFStateApiController
    {

        public static async Task<object> GetAll(GraphQLHttpClient apiClient,string access_token, bool addRowAll,bool getColumns)
        {

            try
            {
                GraphQLRequest request = null;
                var ELSColumnProperties = UtilitiesApiController.GetFields(typeof(Model.ELSColumn));

                if (getColumns)
                {
                    request = new GraphQLRequest
                    {
                        Query = @"
                        query getINFState($addRowAll:Boolean!, $entityType:Int!)
                        {
                            getINFState(addRowAll:$addRowAll)
                            {
                                name
                                abbreviation
                            } 
                            ,
                            getGrid(entityType:$entityType) 
                            {" + ELSColumnProperties + @"}
                        }",
                        OperationName = "getINFState",
                        Variables = new
                        {
                            addRowAll = addRowAll,
                            entityType=Convert.ToInt32(GridEntityTypeEnum.LEN_LOANS_SEARCH)
                        }

                    };
                }
                else
                {
                    request = new GraphQLRequest
                    {
                        Query = @"
                        query getINFState($addRowAll:Boolean!)
                        {
                            getINFState(addRowAll:$addRowAll)
                            {
                                name
                                abbreviation
                            }
                        }",
                        OperationName = "getINFState",
                        Variables = new
                        {
                            addRowAll = addRowAll
                        }

                    };
                }

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");

                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                return new
                {
                    Result = response.Data.getINFState,
                    Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid

                };


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        class ObjectRequest
        {
            public List<vw_INFState> getINFState { get; set; }
            public List<ELSColumn> getGrid { get; set; }

        }

    }
}
