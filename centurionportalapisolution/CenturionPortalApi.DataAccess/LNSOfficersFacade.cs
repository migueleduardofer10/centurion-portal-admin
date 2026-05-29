using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public class LNSOfficersFacade
    {
        public static async Task<IEnumerable<object>> GetByFilter(string filter, string loansUidExclude)
        {
            LirsDbContext context = new LirsDbContext();

            //Listamos los loans coincidentes
            var objArr = await context.vwl_LNSOfficers
                .Where(x => x.Name.Contains(filter))
                .Select(x => new
                {
                    x.Uid,
                    FullName = x.Name
                })
                .ToListAsync();

            //Partimos en una la lista los Uid de los Loans a esxluir
            List<string> loansUid = loansUidExclude.Split('|').ToList();

            //Eliminamos en la lista de retorno aquellos registros que coincidan con los Uid de los loans a excluir
            objArr.RemoveAll(x => loansUid.Exists(l => l == x.Uid));

            return objArr;
        }

        public static async Task<IList<vwl_LNSOfficers>> GetByFilter2(string filter, string loansUidExclude)
        {
            var context = new LirsDbContext();

            var loansUid = loansUidExclude.Split('|').ToList();

            //Listamos los loans coincidentes
            var objArr = await context.vwl_LNSOfficers
                .Where(x => x.Name.Contains(filter) && loansUid.Contains(x.Uid) == false)
                //.Select(x => new
                //{
                //    x.Uid,
                //    FullName = x.Name
                //})
                .ToListAsync();

            //Partimos en una la lista los Uid de los Loans a esxluir

            //Eliminamos en la lista de retorno aquellos registros que coincidan con los Uid de los loans a excluir
            //  objArr.RemoveAll(x => loansUid.Exists(l => l == x.Uid));

            return objArr;
        }

        public static async Task<vwl_LNSOfficers> GetByUid(string uid)
        {
            LirsDbContext context = new LirsDbContext();

            return await context.vwl_LNSOfficers
                .Where(x => x.Uid == uid)
                .FirstOrDefaultAsync();
        }
    }
}
