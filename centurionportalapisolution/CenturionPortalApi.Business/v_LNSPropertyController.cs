using Kendo.Mvc.UI;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace CenturionPortalApi.Business
{
   public static  class v_LNSPropertyController
    {
        public static async Task<v_LNSProperty> GetBy_LoanUid(string loanUid)
        {
            return await v_LNSPropertyFacade.GetBy_LoanUid(loanUid).FirstOrDefaultAsync();
        }
    }
}
