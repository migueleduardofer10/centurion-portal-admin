using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Views;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class LNSOfficersController
    {
        public static async Task<IEnumerable<object>> GetByFilter(string name, string loansUidExclude)
        {
            return await LNSOfficersFacade.GetByFilter(name, loansUidExclude);
        }

        public static async Task<vwl_LNSOfficers> GetByUid(string uid)
        {
            return await LNSOfficersFacade.GetByUid(uid);
        }
    }
}
