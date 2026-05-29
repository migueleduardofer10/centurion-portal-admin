using GraphQL.Client.Http;
using CenturionPortal.ApiController;
using CenturionPortal.WebApp.Controllers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CenturionPortal.WebApp.Areas.Lender.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "2")]
    [Route("api/lender/[controller]")]
    [ApiController]
    public class DashboardController : CASController
    {
        private readonly GraphQLHttpClient _client;

        public DashboardController(GraphQLHttpClient client)
        {
            _client = client;
        }

        [HttpGet("data")]
        public async Task<ActionResult> GetData()
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            var result = await DashboardApiController.GetData(_client, access_token);
            return Success(result);
        }

        [HttpGet("loans/state")]
        public async Task<ActionResult> GetLoansByState()
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            var loansByState = await DashboardApiController.GetLoanCountAndUPBByState(_client, access_token);
            return Success(loansByState);
        }

        [HttpGet("payments/lender/{fromFilter?}/{toFilter?}")]
        public async Task<ActionResult> GetPaymentsToLender(DateTime? fromFilter, DateTime? toFilter)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            var paymentsLender = await DashboardApiController.GetPaymentsToLender(_client, access_token, fromFilter, toFilter);
            return Success(paymentsLender);
        }

        [HttpGet("payments/borrower/{fromFilter?}/{toFilter?}")]
        public async Task<ActionResult> GetPaymentsFromBorrower(DateTime? fromFilter, DateTime? toFilter)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            var paymentsBorrower = await DashboardApiController.GetPaymentsFromBorrower(_client, access_token, fromFilter, toFilter);
            return Success(paymentsBorrower);
        }

        [HttpGet("loans/status")]
        public async Task<ActionResult> GetLoanStatusByLenderUid()
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            var loansByStatus = await DashboardApiController.GetLoanStatusByLenderUid(_client, access_token);
            return Success(loansByStatus);
        }
    }
}