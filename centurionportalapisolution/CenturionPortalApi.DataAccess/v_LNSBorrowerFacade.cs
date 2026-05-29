using Kendo.Mvc.Extensions;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;

using System.Linq;

namespace CenturionPortalApi.DataAccess
{
  public  static class v_LNSBorrowerFacade
    {
        public  static IQueryable<v_LNSBorrower> GetBy_Uid(string uid)
        {
            var context = new LirsDbContext().v_LNSBorrower;
            var query = context.Where(x => x.Uid == uid).AsQueryable();
            return query;
        }
    }
}
