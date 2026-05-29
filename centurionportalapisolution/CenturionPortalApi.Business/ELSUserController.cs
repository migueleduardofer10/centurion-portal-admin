using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class ELSUserController
    {
        public static async Task<ELSUser> getUserById(string userId)
        {
            try
            {
                ELSUser user = await ELSUserFacade.getUserById(userId);
                return user;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static async Task<ELSUser> Login(string username, string password)
        {
            ELSUser user = await ELSUserFacade.Login(username, UtilitiesController.GetMD5(password));

            if (user == null) return null;

            ELSUser newUser = new ELSUser();
            newUser = JsonConvert.DeserializeObject<ELSUser>(JsonConvert.SerializeObject(user));
            newUser.Photo = UtilitiesController.getUrlImage(newUser.Photo);
            newUser.Permissions = string.Empty;

            return newUser;
        }

        public static string Token(ELSUser user)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, user.UserType.ToString()));
            claims.Add(new Claim("UserID", user.Uid.ToString()));
            claims.Add(new Claim("Email", (user.Email ?? "")));
            claims.Add(new Claim("Username", (user.Username ?? "")));
            claims.Add(new Claim("FirstName", (user.FirstName ?? "")));
            claims.Add(new Claim("MiddleName", (user.MiddleName ?? "")));
            claims.Add(new Claim("LastName", (user.LastName ?? "")));
            claims.Add(new Claim("FullName", (user.FullName ?? "")));
            claims.Add(new Claim("Title", (user.Title ?? "")));
            claims.Add(new Claim("Address1", (user.Address1 ?? "")));
            claims.Add(new Claim("Address2", (user.Address2 ?? "")));
            claims.Add(new Claim("HomePhone", (user.HomePhone ?? "")));
            claims.Add(new Claim("MobilePhone", (user.MobilePhone ?? "")));
            claims.Add(new Claim("Ext", (user.Ext ?? "")));
            claims.Add(new Claim("Photo", (user.Photo ?? "")));
            claims.Add(new Claim("IsActive", user.IsActive.ToString()));
            claims.Add(new Claim("EnableReason", user.EnableReason.ToString()));
            claims.Add(new Claim("EnableBy", (user.EnableBy ?? "")));
            claims.Add(new Claim("ShowFundingInformation", user.ShowFundingInformation.ToString()));
            claims.Add(new Claim("ShowLenderStatement", user.ShowLenderStatement.ToString()));
            claims.Add(new Claim("IncludeOriginalVendor", user.IncludeOriginalVendor.ToString()));


            var expireDate = DateTime.UtcNow.AddMinutes(30);
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = Encoding.UTF8.GetBytes(UtilitiesController.AppSetting("JWT:key"));
            var signingCred = new SigningCredentials(new SymmetricSecurityKey(securityKey), SecurityAlgorithms.HmacSha256); //HmacSha256Signature

            var jwtSecurityToken = new JwtSecurityToken(
               issuer: null,
               audience: null,
               claims: claims,
               expires: expireDate,
               signingCredentials: signingCred
            );

            return tokenHandler.WriteToken(jwtSecurityToken);
        }

        /// <summary>
        /// Retorna una lista de todos los usuarios
        /// </summary>
        /// <returns></returns>
        public static async Task<List<vwa_ELSUser_Grid>> GetAll()
        {
            return await ELSUserFacade.GetQuery().ToListAsync();
        }

        public static async Task<DataSourceResult> GetPage([DataSourceRequest] DataSourceRequest dataSourceRequest)
        {
            var query = ELSUserFacade.GetQuery();
            return await query.ToDataSourceResultAsync(dataSourceRequest);
        }

        public static async Task<ELSUser> GetUser(string uid)
        {
            ELSUser user = await ELSUserFacade.Find(uid);
            ELSUser newUser = new ELSUser();
            if (user != null)
            {
                newUser = JsonConvert.DeserializeObject<ELSUser>(JsonConvert.SerializeObject(user));
                newUser.Photo = UtilitiesController.getUrlImage(newUser.Photo);
            }

            return newUser;
        }

        public static async Task<List<ResponseObservation>> Save(ELSUser user, string mappingUids)
        {
            //if (ParameterSystem.ELSCurrentUser.UserType != (int)ELSEnums.UserTypeEnum.ADMIN)
            //    throw new CreatedException("Don't have privileges to edit this type of user.");

            ELSUser saveUser = new ELSUser();

            if (user.Username != null)
                user.Username = user.Username.Trim();

            if (!string.IsNullOrEmpty(user.Uid))
                saveUser = await ELSUserFacade.Find(user.Uid);
            else
                saveUser.Uid = string.IsNullOrEmpty(user.Uid) ? UtilitiesController.GetUid() : user.Uid;

            var observations = await ValidateUser(user, saveUser);

            if (observations.Count > 0)
                return observations;

            saveUser = SetUserData(user, saveUser);

            if (string.IsNullOrEmpty(user.Uid))
                //saveUser.Email = saveUser.Username;
                await ELSUserFacade.Insert(saveUser);
            else
                await ELSUserFacade.Update(saveUser);

            await AssignLoans(user.Uid, user.UserType, mappingUids);

            return observations;
        }

        public static async Task Delete(ELSUser user)
        {
            await ELSUserFacade.Delete(user);
        }

        public static async Task<List<ResponseObservation>> ValidateUser(ELSUser user, ELSUser saveUser)
        {
            List<ResponseObservation> observations = new List<ResponseObservation>();

            if (string.IsNullOrEmpty(user.FirstName))
                observations.Add(new ResponseObservation() { Field = "user.FirstName", Message = "First Name is required.", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });
            if (string.IsNullOrEmpty(user.LastName))
                observations.Add(new ResponseObservation() { Field = "user.LastName", Message = "Last Name is required.", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });

            if (string.IsNullOrEmpty(user.Uid))
            {
                if (string.IsNullOrEmpty(user.Username))
                    observations.Add(new ResponseObservation() { Field = "user.Username", Message = "User username is required.", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });

                //if (!SecurityController.IsPermissionGrantedWithString(ParameterSystem.ELSCurrentUser.Permissions, ACL.Instance.ADD_USERS.Bit))
                //    throw new CreatedException("you cannot perform this action because it not have necessary permissions.");

                if (await ELSUserFacade.ValideDuplicateUser(user.Username))
                    observations.Add(new ResponseObservation() { Field = "", Message = "The username " + user.Email + "already in use, Contact Customer Service", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });
                if (string.IsNullOrEmpty(user.Password))
                    observations.Add(new ResponseObservation() { Field = "user.Password", Message = "Password is required.", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });
                if (string.IsNullOrEmpty(user.RePassword) || user.Password != user.RePassword)
                    observations.Add(new ResponseObservation() { Field = "user.RePassword", Message = "Re-Password is required and must match with the password.", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });
            }
            else
            {
                //if (!SecurityController.IsPermissionGrantedWithString(ParameterSystem.ELSCurrentUser.Permissions, ACL.Instance.EDIT_USERS.Bit))
                //    throw new CreatedException("you cannot perform this action because it not have necessary permissions.");

                if (saveUser.Username != user.Username && await ELSUserFacade.ValideDuplicateUser(user.Username))
                    observations.Add(new ResponseObservation() { Field = "", Message = "The username " + user.Email + "already in use, Contact Customer Service", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });
                if (!string.IsNullOrEmpty(user.Password) || !string.IsNullOrEmpty(user.RePassword))
                {
                    if (string.IsNullOrEmpty(user.Password))
                        observations.Add(new ResponseObservation() { Field = "user.Password", Message = "Password is required.", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });
                    if (string.IsNullOrEmpty(user.RePassword) || user.Password != user.RePassword)
                        observations.Add(new ResponseObservation() { Field = "user.RePassword", Message = "Re-Password is required and must match with the password.", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });
                    observations.Add(new ResponseObservation() { Field = "user.RePassword", Message = "Re-Password is required and must match with the password.", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });

                }
            }

            //Validamos que exista la contraseña y que esta sea igual a la confirmación de contraseña
            if (!string.IsNullOrEmpty(user.Password) && user.Password.Equals(user.RePassword))
            {
                //Evaluamos la contraseña con una expresión regular
                Regex r = new Regex(UtilitiesController.RegExStrongPassword);
                if (!r.IsMatch(user.Password))
                {
                    observations.Add(new ResponseObservation { Field = "", Message = "The password must contain at least one lowercase, one uppercase, one number, and one special character.", TypeMessage = (int)ResponseTransactionBase.EnumTypeMessage.WARNING });
                }
            }

            return observations;
        }

        private static void ValidateAdmUser(ELSUser user, ELSUser saveUser)
        {
            if (string.IsNullOrEmpty(user.Uid))
            {
                saveUser.Username = user.Username;
                //Esta validacion es para ver si ya se creo un admUser con el mismo nombre
                //if (!ELSWebConfig.IsOriginalWeb && user.UserType == (int)ELSEnums.UserTypeEnum.ADMIN)
                //{
                //    var centUser = ADMUserController.GetByUserName(user.Username);
                //    if (centUser != null)
                //    {
                //        try
                //        {
                //            ELSUserController.InsertByADMUser(centUser);
                //        }
                //        catch (Exception ex)
                //        {
                //            RegisterException.Register(ex);
                //        }
                //        throw new CreatedException("This username is already exists.");
                //    }
                //}
            }
        }

        public static ELSUser SetUserData(ELSUser user, ELSUser saveUser)
        {
            saveUser.Address1 = user.Address1;
            saveUser.Address2 = user.Address2;
            saveUser.EnableBy = user.EnableBy;
            saveUser.EnableReason = user.EnableReason;
            saveUser.Ext = user.Ext;
            saveUser.FirstName = user.FirstName;
            saveUser.FullName = user.FullName;
            saveUser.HomePhone = user.HomePhone;
            saveUser.IsActive = user.IsActive;
            saveUser.LastName = user.LastName;
            saveUser.MiddleName = user.MiddleName;
            saveUser.MobilePhone = user.MobilePhone;
            saveUser.Title = user.Title;

            //Lender Access
            saveUser.ShowFundingInformation = user.ShowFundingInformation;
            saveUser.ShowLenderStatement = user.ShowLenderStatement;

            ValidateAdmUser(user, saveUser);

            saveUser.Email = user.Email;
            saveUser.UserType = user.UserType;
            if (!string.IsNullOrEmpty(user.Password))
                saveUser.Password = UtilitiesController.GetMD5(user.Password);

            //if (permissions == null) permissions = new List<string>();

            //if (permissions.Count == 0) permissions.Add("id_-1");

            //string[] uidPermissions = permissions.Select(d => d.Replace("id_", "")).ToArray();

            //user.Permissions = SecurityUtilities.CreateEmptyPermissions();
            //if (user.UserType == (int)ELSEnums.UserTypeEnum.ADMIN)
            //{
            //    user.Permissions = SecurityController.SetPermission(user.Permissions, ACL.Instance.FULL_GENERAL, uidPermissions);
            //    user.Permissions = SecurityController.SetPermission(user.Permissions, ACL.Instance.FULL_ACCESS, uidPermissions);
            //}

            //saveUser.Permissions = user.Permissions;

            saveUser.IncludeOriginalVendor = false;
            if (user.UserType == (int)Enums.UserTypeEnum.LENDER)
            {
                saveUser.IncludeOriginalVendor = user.IncludeOriginalVendor;
            }

            if (!string.IsNullOrEmpty(user.Photo) && saveUser.Photo != user.Photo)
            {
                CreatImageInScale(user.Photo);
                saveUser.Photo = user.Photo;
            }

            return saveUser;
        }

        private static string CreatImageInScale(string fileName, bool createNewName = false)
        {
            string pathTempData = Path.Combine(Directory.GetCurrentDirectory(), UtilitiesController.AppSetting("ImagePath:Public"));
            pathTempData = Path.Combine(pathTempData, UtilitiesController.AppSetting("ImagePath:TempDataUpload"));
            fileName = Path.Combine(pathTempData, fileName);

            string newNameFile = string.Empty;
            if (File.Exists(fileName))
            {
                if (UtilitiesController.IsImageByPath(fileName))
                {
                    FileInfo myFile = new FileInfo(fileName);
                    if (myFile != null && myFile.Length != 0)
                    {
                        string pathPublic = Path.Combine(Directory.GetCurrentDirectory(), UtilitiesController.AppSetting("ImagePath:Public"));
                        string pathImgOriginal = Path.Combine(pathPublic, UtilitiesController.AppSetting("ImagePath:ThumbOriginal"));
                        string pathImg300x400 = Path.Combine(pathPublic, UtilitiesController.AppSetting("ImagePath:Thumb300x400"));
                        string pathImg128x128 = Path.Combine(pathPublic, UtilitiesController.AppSetting("ImagePath:Thumb128x128"));
                        string pathImg64x64 = Path.Combine(pathPublic, UtilitiesController.AppSetting("ImagePath:Thumb64x64"));
                        string pathImg32x32 = Path.Combine(pathPublic, UtilitiesController.AppSetting("ImagePath:Thumb32x32"));
                        string pathImg20x20 = Path.Combine(pathPublic, UtilitiesController.AppSetting("ImagePath:Thumb20x20"));

                        if (!Directory.Exists(pathImgOriginal)) Directory.CreateDirectory(pathImgOriginal);
                        if (!Directory.Exists(pathImg300x400)) Directory.CreateDirectory(pathImg300x400);
                        if (!Directory.Exists(pathImg128x128)) Directory.CreateDirectory(pathImg128x128);
                        if (!Directory.Exists(pathImg64x64)) Directory.CreateDirectory(pathImg64x64);
                        if (!Directory.Exists(pathImg32x32)) Directory.CreateDirectory(pathImg32x32);
                        if (!Directory.Exists(pathImg20x20)) Directory.CreateDirectory(pathImg20x20);

                        try
                        {
                            newNameFile = myFile.Name;
                            if (createNewName) newNameFile = UtilitiesController.GetUid() + "." + myFile.Extension;
                            string imgOriginal = Path.Combine(pathImgOriginal, newNameFile);
                            string img300x400 = Path.Combine(pathImg300x400, newNameFile);
                            string img128x128 = Path.Combine(pathImg128x128, newNameFile);
                            string img64x64 = Path.Combine(pathImg64x64, newNameFile);
                            string img32x32 = Path.Combine(pathImg32x32, newNameFile);
                            string img20x20 = Path.Combine(pathImg20x20, newNameFile);

                            File.Copy(fileName, imgOriginal, true);
                            UtilitiesController.ScaleImage(imgOriginal, 300, 400).Save(img300x400);
                            UtilitiesController.ScaleImage(imgOriginal, 128, 128).Save(img128x128);
                            UtilitiesController.ScaleImage(imgOriginal, 64, 64).Save(img64x64);
                            UtilitiesController.ScaleImage(imgOriginal, 32, 32).Save(img32x32);
                            UtilitiesController.ScaleImage(imgOriginal, 20, 20).Save(img20x20);
                        }
                        catch (Exception ex)
                        {
                            var message = string.Format("La subida de archivo falló: {0}", ex.Message);
                        }
                    }
                }
            }
            return newNameFile;
        }

        public static async Task AssignLoans(string userUid, int userType, string mappingUids)
        {
            // Delete ServiceMap where userUid and not userType
            List<ELSServiceMap> otherMap = (List<ELSServiceMap>)await ELSServiceMapController.GetByUidAndNotType(userUid, userType);
            foreach (ELSServiceMap delUid in otherMap)
            {
                await ELSServiceMapController.Delete(delUid);
            }

            // Return if userType is not valid to this action
            if (userType != (int)Enums.UserTypeEnum.BROKER && userType != (int)Enums.UserTypeEnum.LENDER && userType != (int)Enums.UserTypeEnum.BORROWER)
                return;

            // Get listMapUids
            List<string> listMapUids = mappingUids.Split('|').ToList();

            // Get ServiceMap where userUid and userType
            List<ELSServiceMap> currentMap = (List<ELSServiceMap>)await ELSServiceMapController.GetByUidAndType(userUid, userType);

            // Select ParentUid from ServiceMap where userUid and userType
            List<string> currentUidsMap = new List<string>();
            if (currentMap != null)
            {
                currentUidsMap = currentMap.Select(s => s.ParentUid).ToList();
            }

            // Filter valid mapUids
            List<string> validListUids = listMapUids
                .Where(map => !currentUidsMap.Contains(map))
                .Where(map => !string.IsNullOrEmpty(map.Trim())).ToList();

            // Insert valid mapUids
            foreach (string map in validListUids)
            {
                string account = null;
                string fullName = null;

                if (userType == (int)Enums.UserTypeEnum.LENDER)
                {
                    //LNSVendorResume.GetVendorResumeById(user.Uid);
                    var vend = await LNSVendorController.GetByUid(map) ?? new vwl_LNSVendor();
                    account = vend.Account;
                    fullName = vend.FullName;
                }
                else if (userType == (int)Enums.UserTypeEnum.BROKER)
                {
                    var offi = await LNSOfficersController.GetByUid(map) ?? new vwl_LNSOfficers();
                    account = offi.Name;
                }
                else if (userType == (int)Enums.UserTypeEnum.BORROWER)
                {
                    var lRes = await LNSLoanController.GetByUid(map) ?? new vwl_LNSLoan();
                    account = lRes.Account;
                    fullName = lRes.BorrowerName;
                }

                //if (!string.IsNullOrEmpty(account) && account.Length > 32)
                //account = account.Substring(0, 32);

                //Verificar el tipo de usuario
                //hacer la consulta officer o sumary lender
                ELSServiceMap obj = new ELSServiceMap()
                {
                    UserUid = userUid,
                    Type = userType,
                    ParentUid = map,
                    Account = account,
                    FullName = fullName
                };

                await ELSServiceMapController.Insert(obj);
            }

            // Get ServiceMap are not in listMapUids
            List<ELSServiceMap> delList = new List<ELSServiceMap>();
            if (currentMap != null)
            {
                delList = currentMap.Where(d => !listMapUids.Contains(d.ParentUid)).ToList() ?? new List<ELSServiceMap>();
            }

            // Delete ServiceMap are not in listMapUids
            foreach (ELSServiceMap delUid in delList)
            {
                await ELSServiceMapController.Delete(delUid);
            }
        }
    }
}
