using System;
using System.Collections.Generic;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;

namespace CenturionPortalApi.WebApi.Queries
{
    public class AppQuery : ObjectGraphType
    {
        public AppQuery(IEnumerable<ILirsContractQuery> blisContractQueries)
        {

            foreach (var queries in blisContractQueries)
            {
                var q = queries as ObjectGraphType<object>;
                foreach (var f in q.Fields)
                {
                    AddField(f);
                }
            }

        }

     


    }
}
