using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CenturionPortal.WebApp.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : CASController
    {
        private readonly IConfiguration configuration;

        public UploadController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

    }
}