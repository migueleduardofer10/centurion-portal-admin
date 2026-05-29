using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public class ELSColumnFacade
    {
        public static async Task<IEnumerable<ELSColumn>> GetColumnsByGrid(string gridUid)
        {


            LirsDbContext context = new LirsDbContext();
            return await context.ELSColumn
                .Where(c => c.GridUid == gridUid)
                .OrderBy(c => c.Position)
                .ToListAsync();
        }

        public static IQueryable<ELSColumn> GetColumns_By_UserId_EntityType(string userUid, int entityType)
        {

            var context = new LirsDbContext();
            
                var query = 
                (
                    from column in context.ELSColumn
                    where column.GridUid == 
                        (
                            from grid in context.ELSGrid 
                            where grid.UserUid == userUid && grid.GridEnum == entityType 
                            orderby grid.AppTimeStamp descending
                            select grid.Uid
                        ).FirstOrDefault()
                    orderby column.Position ascending
                    select column
                )
                .AsQueryable();

            return query;
                
        }

        public static async Task Insert(ELSColumn column)
        {
            LirsDbContext context = new LirsDbContext();
         
         
         
            context.ELSColumn.Add(column);
            await context.SaveChangesAsync();
        }


        public static async Task Insert(List< ELSColumn> column)
        {
            LirsDbContext context = new LirsDbContext();



            context.ELSColumn.AddRange(column);
            await context.SaveChangesAsync();
        }

    }
}
