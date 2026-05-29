using GraphQL.Client.Http;
using CenturionPortal.ApiController;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.WebApp.Attributes;
using CenturionPortal.WebApp.Repositories.Contract;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using Centurion.Utilities;

namespace CenturionPortal.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : CASController
    {
        private readonly IAntiforgery antiforgery;
        private readonly GraphQLHttpClient _client;
        private IConfigurationSettings _configurationSetting;

        public AuthController(IAntiforgery antiforgery, GraphQLHttpClient client, IConfigurationSettings configurationSetting)
        {
            this.antiforgery = antiforgery;
            this._client = client;
            this._configurationSetting = configurationSetting;
        }

        [HttpPost("login")]
        [ValidateRecaptcha]
        public async Task<IActionResult> Login(Authenticate auth)
        {
            try
            {
                if (!ModelState.IsValid)
                    return Error(UtilitiesApiController.GetModelStateError(ModelState));

                string identityServerURL = _configurationSetting.IdentityServerURL;
                string JWT_Key = _configurationSetting.JWT_Key;
                SessionInfo sessionInfo = await ELSUserApiController.Login(identityServerURL, auth.Username, auth.Password, JWT_Key);

                HttpContext.Session.SetString("accesstoken", sessionInfo.Tokenro);
                HttpContext.Session.SetString("refreshtoken", sessionInfo.RefreshToken);
                HttpContext.Session.SetString("cipherpassword", CENTUtilities.Encrypt(auth.Password));
                ///Aqui crear cookie y otras datos del user

                return Success(sessionInfo, "User logged in successfully");
            }
            catch (Exception ex)
            {
                if (UtilitiesApiController.IsValidation(ex))
                    return Validation(ex.Message);
                throw ex;
            }
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> Login(Authenticate auth)
        //{
        //    ELSUser user = await ELSUserController.Login(auth.Username, auth.Password);

        //    if (user == null)
        //        return Validation("Incorrect Username or password");

        //    if (user.UserType == (int)ELSEnums.UserTypeEnum.BORROWER)
        //        return Validation("User Type no valid");

        //    user.Password = string.Empty;
        //    string token = ELSUserController.Token(user);
        //    string version = ModelUtilities.GetAssemblyVersion();

        //    HttpContext.Session.SetString("accesstoken", token);

        //    return Exito(new { token, version }, "User logged in successfully");
        //}

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                string identityServerURL = _configurationSetting.IdentityServerURL;
                string access_token = HttpContext.Session.GetString("accesstoken");
                await ELSUserApiController.Logout(identityServerURL, access_token);
            }
            catch (Exception ex)
            {

            }
            return Success("User logged out successfully");
        }

        [HttpGet("refresh/token")]
        public IActionResult RefreshToken()
        {
            return Success(false, "Your Session has expired");
        }

        [HttpGet("recaptcha")]
        public IActionResult Recaptcha()
        {
            string strCaptcha = _configurationSetting.Recaptcha_SiteKey;
            return Success(strCaptcha);
            //return Success(UtilitiesApiController.AppSetting("Recaptcha:SiteKey"));
        }

        [HttpPost("appVersion_Full")]
        public async Task<IActionResult> AppVersion_Full()
        {
            //get Info Local Data
            string FCIWebDBStringConnection = _configurationSetting.ConnectionStrings_LirsDb;
            List<string> stringConnectionList = FCIWebDBStringConnection.Split(";").ToList();
            string WebAppDBName = "";
            if (stringConnectionList.Count > 1)
            {
                List<string> WebAppStringConnectionCatalog = stringConnectionList[1].Split("=").ToList();
                WebAppDBName = WebAppStringConnectionCatalog.Count > 1 ? WebAppStringConnectionCatalog[1] : "--";
            }

            //get info Api Data
            string access_token = HttpContext.Session.GetString("accesstoken");
            string responseInfoIdentity = await UtilitiesApiController.ApiGetInfo(_client, access_token);
            bool apiStatusconnection = string.IsNullOrEmpty(responseInfoIdentity) ? false : true;
            string apiVersion = "";
            string apiDatabaseName = "";
            string apiDbServer = "";
            try
            {

                JObject apiQuery = JObject.Parse(responseInfoIdentity);
                JObject apiInfo = (JObject)apiQuery["data"]["getInfo"];
                apiVersion = (string)apiInfo["version"];
                foreach (var itemService in apiInfo["services"])
                {
                    string serviceName = (string)itemService["Service"];
                    if (serviceName.CompareTo("DataBase FCIWeb") == 0)
                    {
                        apiDatabaseName = serviceName;
                        apiDbServer = (string)itemService["Connection"];
                    }
                }
            }
            catch
            {
                //Nothing To Do
            }


            ///// INFO TO SHOW//////
            //WebApp
            string DBName = WebAppDBName;
            string server = HttpContext.Connection.LocalIpAddress.ToString(); //From HttpContext ?
            //Api Version 
            string dbName = apiDatabaseName;
            string dbServer = apiDbServer;
            string apiServer = _configurationSetting.LirsAPI;
            //Identity Server
            string Server = _configurationSetting.IdentityServerURL;

            // putting info into dinamic class*******************************************************************************
            var Details = new[] { new { Title = default(string), Description = default(string) } }.Skip(1).ToList();
            var result = new[] { new { Group = default(string), Details } }.Skip(1).ToList();

            result.Add(new { Group = "Web App", Details = new[] { new { Title = "DB Name", Description = WebAppDBName }, new { Title = "Server", Description = server } }.ToList() });
            result.Add(new { Group = "Api Version", Details = new[] { new { Title = "DB Name", Description = apiDatabaseName }, new { Title = "DB Server", Description = apiDbServer }, new { Title = "API Server", Description = apiServer } }.ToList() });
            result.Add(new { Group = "Identity Server", Details = new[] { new { Title = "Server", Description = Server } }.ToList() });

            return Success(result);
            //return Success(UtilitiesApiController.AppSetting("Recaptcha:SiteKey"));
        }
    }
}