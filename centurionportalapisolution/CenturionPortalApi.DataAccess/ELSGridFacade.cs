using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public class ELSGridFacade
    {
        public static async Task<ELSGrid> GetGrid(string userUid, int entityType)
        {
            LirsDbContext context = new LirsDbContext();
            return await context.ELSGrid
                .Where(g => g.UserUid == userUid)
                .Where(g => g.GridEnum == entityType)
                .OrderByDescending(g => g.AppTimeStamp)
                .FirstOrDefaultAsync();

        }

        public static async Task Insert(ELSGrid grid)
        {
            LirsDbContext context = new LirsDbContext();
            context.ELSGrid.Add(grid);
            await context.SaveChangesAsync();
        }

        public static async Task<string> GetPassword(string uid)
        {            
            var context = new LirsDbContext();
           
            return await   context.ELSUser.Where(x => x.Uid == uid).Select(x => x.Password).FirstOrDefaultAsync();
        }

        public static async Task Update_Password(string uid, string password)
        {
            var obj = new ELSUser { Uid = uid, Password=password};

            var context = new LirsDbContext();

            context.Attach(obj);
            context.Entry(obj).Property(x => x.Password).IsModified = true;

            await context.SaveChangesAsync();
        }

        public static async Task Update_Email(string uid, string email)
        {
            var obj = new ELSUser { Uid = uid, Email = email };

            var context = new LirsDbContext();

            context.Attach(obj);
            context.Entry(obj).Property(x => x.Email).IsModified = true;
           
            await context.SaveChangesAsync();
        }

        public static async Task Update_PersonalInformation(string uid, string firstName,
            string lastName,string address1,string address2,string title, 
            string ext,
            string homePhone,
            string mobilePhone, string email)
        {
            var obj = new ELSUser { Uid = uid,
                FirstName=firstName,
                LastName=lastName,
                Address1=address1,
                Address2=address2,
                Title=title,
                Ext=ext,
                HomePhone=homePhone,
                MobilePhone=mobilePhone,
                Email = email };

            var context = new LirsDbContext();

            context.Attach(obj);
            context.Entry(obj).Property(x => x.FirstName).IsModified = true;
            context.Entry(obj).Property(x => x.LastName).IsModified = true;
            context.Entry(obj).Property(x => x.Address1).IsModified = true;
            context.Entry(obj).Property(x => x.Address2).IsModified = true;
            context.Entry(obj).Property(x => x.Title).IsModified = true;
            context.Entry(obj).Property(x => x.Ext).IsModified = true;
            context.Entry(obj).Property(x => x.HomePhone).IsModified = true;
            context.Entry(obj).Property(x => x.MobilePhone).IsModified = true;
            context.Entry(obj).Property(x => x.Email).IsModified = true;

            await context.SaveChangesAsync();
        }

        public static async Task Update_RecoverySetting(string uid, string email,
             int question1, string question1String, string answer1,
          int question2, string question2String, string answer2,
          int question3, string question3String, string answer3)
        {
            var obj = new ELSUser
            {
                Uid = uid,               
                Email = email,
                Question1=question1,
                Question1String=question1String,
                Answer1=answer1,
                Question2 = question2,
                Question2String = question2String,
                Answer2 = answer2,
                Question3 = question3,
                Question3String = question3String,
                Answer3 = answer3,

            };

            var context = new LirsDbContext();

            context.Attach(obj);
            context.Entry(obj).Property(x => x.Email).IsModified = true;

            context.Entry(obj).Property(x => x.Question1).IsModified = true;
            context.Entry(obj).Property(x => x.Question1String).IsModified = true;
            context.Entry(obj).Property(x => x.Answer1).IsModified = true;

            context.Entry(obj).Property(x => x.Question2).IsModified = true;
            context.Entry(obj).Property(x => x.Question2String).IsModified = true;
            context.Entry(obj).Property(x => x.Answer2).IsModified = true;

            context.Entry(obj).Property(x => x.Question3).IsModified = true;
            context.Entry(obj).Property(x => x.Question3String).IsModified = true;
            context.Entry(obj).Property(x => x.Answer3).IsModified = true;

            await context.SaveChangesAsync();
        }
    }
}
