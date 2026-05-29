using Kendo.Mvc.UI;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class ELSColumnController
    {
        public static async Task<IEnumerable<ELSColumn>> GetColumnsByGrid(ELSGrid grid)
        {
            if (grid == null || string.IsNullOrEmpty(grid.Uid))
                return new List<ELSColumn>();

            var r1= await ELSColumnFacade.GetColumnsByGrid(grid.Uid);

            return r1;
        }



        public static async Task<List<ELSColumn>> GetColumns_By_UserId_EntityType(string userId,int entityType)
        {           
            return await   ELSColumnFacade.GetColumns_By_UserId_EntityType(userId,entityType).ToListAsync();
        }



        public static async Task Insert(ELSColumn column)
        {
            await ELSColumnFacade.Insert(column);
        }
    }
}
