using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class ELSGridController
    {
        public static async Task<ELSGrid> GetGrid(string userUid, int entityType)
        {
            return await ELSGridFacade.GetGrid(userUid, entityType);
        }
        public static async Task Update_Email(string uid, string email)
        {
            await ELSGridFacade.Update_Email(uid, email);
        }
        public static async Task Update_PersonalInformation(string uid, string firstName,
            string lastName, string address1, string address2, string title,
            string ext,
            string homePhone,
            string mobilePhone, string email)
        {
            await ELSGridFacade.Update_PersonalInformation(uid, firstName, lastName,
                address1, address2, title, ext, homePhone,
                mobilePhone, email);
        }

        public static async Task Update_RecoverySetting(string uid, string email,
             int question1, string question1String, string answer1,
          int question2, string question2String, string answer2,
          int question3, string question3String, string answer3)
        {
            await ELSGridFacade.Update_RecoverySetting(uid, email,
                question1, question1String, answer1,
                question2, question2String, answer2,
                question3, question3String, answer3);
        }

        public static async Task Update_Password(string uid,
         string currentPassword, string newPassword, string confirmPassword)
        {
            if ( string.IsNullOrEmpty(currentPassword)|| string.IsNullOrEmpty(newPassword)|| string.IsNullOrEmpty(confirmPassword))
            {
                throw new Exception("Password is required");
            }

            var dataBaseCurrentPassword = await ELSGridFacade.GetPassword(uid);

            currentPassword = UtilitiesController.GetMD5(currentPassword);
            newPassword = UtilitiesController.GetMD5(newPassword);
            confirmPassword = UtilitiesController.GetMD5(confirmPassword);

            if (string.Equals(dataBaseCurrentPassword, currentPassword) == false)
            {
                throw new Exception("the current password is incorrect");
            }
            if (string.Equals(newPassword, confirmPassword) == false)
            {
                throw new Exception("New Password and Confirm Password do not match");
            }
            if (string.Equals(dataBaseCurrentPassword, newPassword))
            {
                throw new Exception("Please, insert a different password. The current used password is already in use.");
            }

            await ELSGridFacade.Update_Password(uid, newPassword);


        //    var s = 222;
            //   UtilitiesController.GetMD5()
            //await ELSGridFacade.Update_RecoverySetting(uid, email,
            //    question1, question1String, answer1,
            //    question2, question2String, answer2,
            //    question3, question3String, answer3);
        }

        public static async Task Save(string userUid, string username, int gridEnum, List<ELSColumn> columns)
        {
            ELSGrid grid = new ELSGrid();
            grid.Uid = UtilitiesController.GetUid();
            grid.UserUid = userUid;
            grid.GridEnum = gridEnum;
            grid.AppTimeStamp = DateTime.UtcNow;
            grid.AppCreationDate = DateTime.UtcNow;
            grid.AppCreatedBy = username;

            await ELSGridFacade.Insert(grid);

            foreach (ELSColumn column in columns)
            {
                column.Uid = UtilitiesController.GetUid();
                column.GridUid = grid.Uid;
                //grid.AppTimeStamp = DateTime.UtcNow;
                //grid.AppCreationDate = DateTime.UtcNow;
                grid.AppCreatedBy = username;
            }

            await ELSColumnFacade.Insert(columns);
        }
    }
}
