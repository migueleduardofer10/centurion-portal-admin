using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
   public static class ALLDepartmentFacade
    {
        public static IQueryable<vw_ALLDepartment> GetAll()
        {
            return new LirsDbContext()
               .vw_ALLDepartment                
               .AsQueryable();
        }

    }
}
