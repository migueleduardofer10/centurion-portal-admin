using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public static class v_LNSBorrowerController
    {
        public static async Task<v_LNSBorrower> GetBy_Uid(string uid)
        {
            return await v_LNSBorrowerFacade.GetBy_Uid(uid).FirstOrDefaultAsync();
        }
    }
}
