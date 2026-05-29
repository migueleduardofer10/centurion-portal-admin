using System.Threading.Tasks;
using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController;
using CenturionPortal.WebApp.Controllers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CenturionPortal.WebApp.Areas.Lender.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "2")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : CASController
    {
        private readonly GraphQLHttpClient _client;

        public ReportsController(GraphQLHttpClient client)
        {
            _client = client;
        }

        [HttpGet("achstatus")]
        public async Task<ActionResult> ACHStatus([DataSourceRequest] DataSourceRequest dataSourceRequest)
        {
            var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);
            var result = await ReportApiController.GetACHStatus(_client, accessToken, dataSourceRequest, true);
            return Success(result);
        }
    }
}
