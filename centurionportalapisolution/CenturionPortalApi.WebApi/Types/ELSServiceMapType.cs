using GraphQL.Types;
using CenturionPortalApi.DataBase.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types
{
    public class ELSServiceMapType : ObjectGraphType<ELSServiceMap>
    {
        public ELSServiceMapType()
        {
            Name = nameof(ELSServiceMapType);

            Field(x => x.UserUid, nullable: true);
            Field(x => x.ParentUid, nullable: true);
            Field(x => x.Type, nullable: true);
            Field(x => x.Account, nullable: true);
            Field(x => x.FullName, nullable: true);
            Field(x => x.AppCreatedBy, nullable: true);
            Field(x => x.AppCreationDate, type: (typeof(DateTimeGraphType)), nullable: true);
        }
    }
}
