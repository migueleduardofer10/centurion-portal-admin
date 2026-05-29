using System;
using System.Threading.Tasks;
using CenturionPortal.ApiController;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.WebApp.Controllers;
using GraphQL.Client.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CenturionPortal.WebApp.Areas.Security.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme/*, Roles = "0"*/)]
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : CASController
    {
        private readonly GraphQLHttpClient _client;

        public ReportController(GraphQLHttpClient client)
        {
            _client = client;
        }

        [HttpPost("login/general")]
        public async Task<IActionResult> GetLoginGeneral(ReportLoginRequest reportLogin)
        {
            try
            {
                string access_token = HttpContext.Session.GetString("accesstoken");
                return Success(await LoginDetailApiController.GetLoginGeneral(_client, access_token, reportLogin.Chart, reportLogin.UserType, reportLogin.Status));
            }
            catch(Exception ex)
            {
                return UtilitiesApiController.IsValidation(ex) ? Validation(ex.Message) : Error(ex.Message);
            }
        }
    }
}
