using CenturionPortalApi.DataBase.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
 public static    class v_IRSServiceMapFacade
    {
        public static IQueryable<string>Get_ParentUid( LirsDbContext context,  
            string userUid, Centurion.Utilities.CENTEnums.UserTypeEnum userType)
        {
            //var query= context.v_IRSServiceMap
              //  .Where(x => x.UserUid == userUid && x.Type == (int)userType)
                //.Select(x => x.ParentUid).AsQueryable();
            var query= context
                .v_IRSServiceMap
                .FromSqlRaw("select parentUid from v_IRSServiceMap where userUid={0} and type={1}", userUid,(int) userType)
                .Select(obj=>obj.ParentUid).AsQueryable();




            return query;
        }


    }
}
