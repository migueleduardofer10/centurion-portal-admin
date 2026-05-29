
using GraphQL.Client.Http;
using CenturionPortal.ApiController;
using CenturionPortal.WebApp.Controllers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System.IO;
using System.Threading.Tasks;

namespace CenturionPortal.WebApp.Areas.Lender.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "2")]
    [Route("api/[controller]")]
    [ApiController]
    public class ELSUserController : CASController
    {



        private readonly GraphQLHttpClient _client;

        public ELSUserController(GraphQLHttpClient client)
        {
            _client = client;
        }

        [HttpPost("getAccount_AccountFullName")]
        public async Task<ActionResult> getAccount()
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);
                var uid = UtilitiesApiController.Get_Uid_FromHttpContext(HttpContext);


                var result = await ELSServiceMapApiController.Get_AccountFullName_ByUidAndType(_client,
                    accessToken, uid,
                    (int)Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }

        }
        [HttpPost("getByUid")]
        public async Task<ActionResult> GetByUid()
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);
                var uid = UtilitiesApiController.Get_Uid_FromHttpContext(HttpContext);


                var result = await ELSUserApiController.GetByUid(_client, accessToken, uid);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }

        }

        [HttpPost("updateEmail/{email}")]
        public async Task<ActionResult> UpdateEmail(string email)
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);
                var uid = UtilitiesApiController.Get_Uid_FromHttpContext(HttpContext);

                var result = await ELSUserApiController.Update_Email(_client, accessToken, uid, email);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }

        }



        [HttpPost("updatePersonalInformation/{firstName}/{lastName}/{address1}/{address2}/{title}/{ext}/{homePhone}/{mobilePhone}/{email}")]
        public async Task<ActionResult> UpdatePersonalInformation(
         string firstName, string lastName,
         string address1, string address2,
         string title, string ext,
            string homePhone, string mobilePhone, string email)
        {
            try
            {

                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);
                var uid = UtilitiesApiController.Get_Uid_FromHttpContext(HttpContext);

                var photo = HttpContext.Session.Get("UserNewPhoto");

                var result = await ELSUserApiController.Update_PersonalInformation(_client, accessToken,
                                        uid,
                                        UtilitiesApiController.Convert_NullToString(firstName), UtilitiesApiController.Convert_NullToString(lastName),
                                        UtilitiesApiController.Convert_NullToString(address1), UtilitiesApiController.Convert_NullToString(address2),
                                        UtilitiesApiController.Convert_NullToString(title), UtilitiesApiController.Convert_NullToString(ext),
                                        UtilitiesApiController.Convert_NullToString(homePhone), UtilitiesApiController.Convert_NullToString(mobilePhone),
                                        UtilitiesApiController.Convert_NullToString(email), photo);

                HttpContext.Session.Remove("UserNewPhoto");

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }

        }

      
        [HttpGet("personalInformation_CurrentPhoto/{width}/{height}")]
        public async Task< ActionResult> updatePersonalInformation_CurrentPhoto(int width, int height)
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);
                var uid = UtilitiesApiController.Get_Uid_FromHttpContext(HttpContext);

                byte[] image = null;

                var photoStringFromDataBase = await ELSUserApiController.PersonalInformation_GetPhotoByUid(_client, accessToken, uid);
                if (string.IsNullOrEmpty(photoStringFromDataBase))
                {
                    image = Properties.Resources.GeneralUser;
                }
                else
                {
                    image = UtilitiesApiController.Convert_String_To_ByteArray(photoStringFromDataBase); 
                }
             
                var objImage = Image.Load(image);
                objImage.Mutate(x => x.Resize(new ResizeOptions
                {
                    Size = new Size(width, height),
                    Mode = ResizeMode.Max                   
                }));
               MemoryStream ms = new MemoryStream ();
                objImage.SaveAsPng(ms);
                var arr = ms.ToArray();
                ms.Close();
                ms.Dispose();

             

                return File(arr, "image/png");

          

        
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }

        [HttpPost("updatePersonalInformation_NewPhoto_Add")]
        public ActionResult UpdatePersonalInformation_NewPhoto_Add(IFormFile[] files)
        {
            try
            {



                var file = files[0];
                byte[] byteArray = null;
                using (var ms = new System.IO.MemoryStream())
                {
                    file.CopyTo(ms);
                    byteArray = ms.ToArray();                  
                }

                HttpContext.Session.Set("UserNewPhoto", byteArray);

           

   

                return Success();
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }
        [HttpPost("updatePersonalInformation_NewPhoto_Remove")]
        public ActionResult UpdatePersonalInformation_NewPhoto_Remove(IFormFile[] fileNames)
        {
            try
            {
               
                HttpContext.Session.Remove("UserNewPhoto");

                return Success();
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }

        }


        [HttpPost("updateRecoverySetting/{email}/{Question1}/{Question1String}/{Answer1}/{Question2}/{Question2String}/{Answer2}/{Question3}/{Question3String}/{Answer3}")]
        public async Task<ActionResult> UpdateRecoverySetting(
          string email,
          int question1, string question1String, string answer1,
          int question2, string question2String, string answer2,
          int question3, string question3String, string answer3)
        {
            try
            {

                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);
                var uid = UtilitiesApiController.Get_Uid_FromHttpContext(HttpContext);

                var result = await ELSUserApiController.Update_RecoverySetting(_client, accessToken,
                    uid,
                    email,
                    question1, UtilitiesApiController.Convert_NullToString(question1String), UtilitiesApiController.Convert_NullToString(answer1),
                    question2, UtilitiesApiController.Convert_NullToString(question2String), UtilitiesApiController.Convert_NullToString(answer2),
                    question3, UtilitiesApiController.Convert_NullToString(question3String), UtilitiesApiController.Convert_NullToString(answer3));

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }

        }


        [HttpPost("updatePassword/{currentPassword}/{newPassword}/{confirmPassword}")]
        public async Task<ActionResult> UpdatePassword(
        string currentPassword, string newPassword, string confirmPassword)
        {
            try
            {

                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);
                var uid = UtilitiesApiController.Get_Uid_FromHttpContext(HttpContext);

                var result = await ELSUserApiController.Update_Password(_client, accessToken,
                    uid, currentPassword, newPassword, confirmPassword);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }
    }



}
