using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.DataAccess
{
 public static    class v_LNSPropertyFacade
    {
        public static IQueryable<v_LNSProperty> GetBy_LoanUid(string loanUid)
        {
            var context = new LirsDbContext().v_LNSProperty;
           return  context.Where(x => x.LoanUid == loanUid).AsQueryable();
            
        }
    }
}
