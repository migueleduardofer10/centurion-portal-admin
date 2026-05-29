using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Kendo.Mvc.UI;
using GraphQL.Client.Http;
using Microsoft.AspNetCore.Http;
using CenturionPortal.ApiController;
using CenturionPortal.ApiController.Models.Utilities;
using CenturionPortal.ApiController.Model;
using CenturionPortal.WebApp.Repositories.Contract;
using CenturionPortal.WebApp.Controllers;
using System;
using CenturionPortal.ApiController.Model.Request;

namespace CenturionPortal.WebApp.Areas.Security.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme/*, Roles = "0"*/)]
    [ApiController]
    [Route("api/security/[controller]")]
    public class UserController : CASController
    {
        private readonly GraphQLHttpClient _client;
        private readonly IConfigurationSettings _configurationSetting;

        public UserController(GraphQLHttpClient client, IConfigurationSettings configurationSetting)
        {
            _client = client;
            _configurationSetting = configurationSetting;
        }

        [HttpPost("loginAs")]
        public async Task<IActionResult> LoginAs(AuthenticateAs authAs)
        {
            try
            {
                string redirectUrl = string.Empty;
                if (authAs.UserType == (int)Enums.UserTypeEnum.BORROWER)
                    redirectUrl = _configurationSetting.BlisWeb;
                else if (authAs.UserType == (int)Enums.UserTypeEnum.LENDER)
                    redirectUrl = _configurationSetting.LirsWeb;
                else
                    UtilitiesApiController.ShowValidation("Redirect Url No Valid!");

                string identityServerURL = _configurationSetting.IdentityServerURL;
                string cipherPassword = HttpContext.Session.GetString("cipherpassword");
                string token = await ELSUserApiController.getTokenComplementLoginAs(identityServerURL, authAs.Username, authAs.AdminUsername, cipherPassword);

                string accessToken = HttpContext.Session.GetString("accesstoken");
                await ELSTokenLoginApiController.Save(_client, accessToken, authAs.Username, token);

                return Success(new { token, redirectUrl });
            }
            catch (Exception Ex)
            {
                if (UtilitiesApiController.IsValidation(Ex)) return Validation(Ex.Message);
                throw Ex;
            }
        }

        /// <summary>
        /// Retorna la lista completa de usuarios
        /// </summary>
        /// <returns></returns>
        /// //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "2")] permite especficiar el rol que usará una accións
        [HttpPost("list/{getColumns}")]
        public async Task<IActionResult> GetList(bool getColumns, [DataSourceRequest] DataSourceRequest dataSourceRequest)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            var Result = await ELSUser_GridApiController.GetUserList(_client, access_token, getColumns, dataSourceRequest);
            return Success(Result);
        }

        [HttpGet("edit/{uid?}")]
        public async Task<IActionResult> GetUser(string uid)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");

            var user = await ELSUser_GridApiController.GetUserByUid(_client, access_token, uid);

            if (user == null)
                return Validation("User not found");

            return Success(user);
        }

        [HttpPost("save/{mappingUids?}")]
        public async Task<IActionResult> PostUser([FromBody] ELSUser user, string mappingUids = "")
        {
            try
            {
                string access_token = HttpContext.Session.GetString("accesstoken");
                await ELSUserApiController.Save(_client, access_token, user, mappingUids);

                return Success(user, "User saved successfully");
            }
            catch (Exception Ex)
            {
                if (UtilitiesApiController.IsValidation(Ex)) return Validation(Ex.Message);
                throw Ex;
            }
        }

        [HttpDelete("delete/{uid}")]
        public async Task<IActionResult> DeleteUser(string uid)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            await ELSUserApiController.Delete(_client, access_token, uid);
            return Success(message: "User deleted successfully");
        }

        [HttpGet("accounts/{filter}/{type}/{loansUidExclude?}")]
        public async Task<IActionResult> GetAccounts(string filter, int type, string loansUidExclude = "")
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            return Success(await ELSUser_GridApiController.GetAccountsToAssign(_client, access_token, type, filter, loansUidExclude));
        }
    }
}