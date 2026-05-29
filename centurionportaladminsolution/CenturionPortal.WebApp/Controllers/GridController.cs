using GraphQL.Client.Http;
using CenturionPortal.ApiController;
using CenturionPortal.ApiController.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortal.WebApp.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class GridController : CASController
    {
        private readonly GraphQLHttpClient _client;
        public GridController(GraphQLHttpClient client)
        {
            _client = client;
        }

        [HttpPost("{gridEnum}")]
        public async Task<IActionResult> PostGrid(int gridEnum, [FromBody] List<GridColumnForView> columns)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            await ELSGridController.Save(_client, access_token, gridEnum, columns);
            return Success(message: "Changes applied successfully");
        }


       [HttpGet("GetByUid/{entityType}")]
        public async Task<IActionResult> GetByUid(  int entityType)
        {
            ELSUser userSesion = UtilitiesApiController.GetELSUser(User);

            var r1 = await ELSColumnApiController.GridColumns(_client, userSesion.Uid, entityType);
            
            return Success(r1);

 
        }

    }
}