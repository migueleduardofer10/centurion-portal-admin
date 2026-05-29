using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public class ELSUserFacade
    {
       
        public static async Task<ELSUser> getUserById(string uid)
        {
            LirsDbContext context = new LirsDbContext();
            return await context.ELSUser
                .Where(u => u.Uid == uid)
                .FirstOrDefaultAsync();
        }

        public static async Task<ELSUser> Login(string username, string hashPassword)
        {
            LirsDbContext context = new LirsDbContext();
            return await context.ELSUser
                .Where(u => u.Username == username)
                .Where(u => u.Password == hashPassword)
                .FirstOrDefaultAsync();
        }

        /// <summary>
        /// Retorna una lista de todos los usuarios con los campos necesarios para mostrar en una grilla
        /// </summary>
        /// <returns></returns>
        public static IQueryable<vwa_ELSUser_Grid> GetQuery()
        {
            LirsDbContext context = new LirsDbContext();
            return context.vwa_ELSUser_Grid.AsQueryable();
        }        

        public static async Task<bool> ValideDuplicateUser(string username)
        {
            LirsDbContext context = new LirsDbContext();
            return await context.ELSUser.Where(u => u.Username.ToLower() == username.ToLower()).CountAsync() > 0;
        }

        public static async Task<ELSUser> Find(string uid)
        {
            LirsDbContext context = new LirsDbContext();
            return (await context.ELSUser.FindAsync(uid));
        }

        public static async Task Insert(ELSUser user)
        {
            LirsDbContext context = new LirsDbContext();
            context.ELSUser.Add(user);
            await context.SaveChangesAsync();
        }

        public static async Task Update(ELSUser user)
        {
            LirsDbContext context = new LirsDbContext();
            context.ELSUser.Update(user);
            await context.SaveChangesAsync();
        }

        public static async Task<bool> Delete(ELSUser user)
        {
            LirsDbContext context = new LirsDbContext();
            context.ELSUser.Remove(user);
            return await context.SaveChangesAsync() > 0;
        }

        public static async Task<bool> Delete(string uid)
        {
            LirsDbContext context = new LirsDbContext();
            context.ELSUser.Remove(new ELSUser { Uid=uid});
            return await context.SaveChangesAsync() > 0;
        }
    }
}
