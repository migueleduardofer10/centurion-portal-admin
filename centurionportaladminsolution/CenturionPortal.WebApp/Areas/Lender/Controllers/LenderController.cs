using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Models.Utilities;
using CenturionPortal.WebApp.Controllers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace CenturionPortal.WebApp.Areas.Lender.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "2")]
    [Route("api/[controller]")]
    [ApiController]
    public class LenderController : CASController
    {
        private readonly GraphQLHttpClient _client;

        public LenderController(GraphQLHttpClient client)
        {
            _client = client;
        }

        [HttpPost("reportLoanPortfolioDocument/{lenderUid}/{useRange}/{from}/{to}/{includeInactives}")]
        public async Task<ActionResult> reportLoanPortfolioDocument(string lenderUid, bool useRange, string from, string to, bool includeInactives, [DataSourceRequest] DataSourceRequest dataSourceReques)
        {
            try
            {
                lenderUid = UtilitiesApiController.Convert_NullToString(lenderUid);
                from = UtilitiesApiController.Convert_NullToString(from);
                to = UtilitiesApiController.Convert_NullToString(to);

                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);

                var result = await PortfolioReportController.Report_LoanPortfolio_Document(_client, accessToken, dataSourceReques, lenderUid, useRange, from, to, includeInactives);//.Report_PaymentToLender(_client, userUid, parentUid, dataSourceReques, accessToken);//.Get_GgraphSecondaryLoan(_client, dataSourceReques, accessToken, userUid, userType, loanUid);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }
        [HttpPost("reportLoanPortfolioLoad")]
        public async Task<ActionResult> reportLoanPortfolioLoad()
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);           

                var result = await PortfolioReportController.Report_LoanPortfolio_Load(_client, accessToken);//.Report_PaymentToLender(_client, userUid, parentUid, dataSourceReques, accessToken);//.Get_GgraphSecondaryLoan(_client, dataSourceReques, accessToken, userUid, userType, loanUid);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }

        [HttpPost("reportLoanStatusBreakdown")]
        public async Task<ActionResult> reportLoanStatusBreakdown()
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);                

                var result = await PortfolioReportController.Report1(_client );//.Report_PaymentToLender(_client, userUid, parentUid, dataSourceReques, accessToken);//.Get_GgraphSecondaryLoan(_client, dataSourceReques, accessToken, userUid, userType, loanUid);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }

        [HttpPost("paymentToLender/{parentUid}/{onlyPending}")]
        public async Task<ActionResult> paymentToLender(string parentUid, bool onlyPending, [DataSourceRequest] DataSourceRequest dataSourceReques)
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);                

                var result = await vwl_VendorHistoryApiController.Report_PaymentToLender(_client,onlyPending, parentUid, dataSourceReques, accessToken);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }

        [HttpPost("loans/secondaryLoansView_graphSecondaryLoan/{loanUid}")]
        public async Task<ActionResult> secondaryLoansView_graphSecondaryLoan(string loanUid, [DataSourceRequest] DataSourceRequest dataSourceReques)
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);                

                var result = await vwl_VendorPortfolioApiController.Get_GgraphSecondaryLoan(_client, dataSourceReques, accessToken, loanUid);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }
        [HttpPost("loans/secondaryLoansView_subReports/{loanUid}")]
        public async Task<ActionResult> secondaryLoansView_subReports(string loanUid, [DataSourceRequest] DataSourceRequest dataSourceReques)
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);

                var result = await vwl_VendorPortfolioApiController.Get_SubReports(_client, accessToken, loanUid, dataSourceReques);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }
        [HttpPost("loans/secondaryLoansView_search/{state}/{status}/{balance}")]
        public async Task<ActionResult> secondaryLoansView_search(string state, int status, int balance, [DataSourceRequest] DataSourceRequest dataSourceReques)
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);

                var result = await vwl_VendorPortfolioApiController.GetBy_UserId_UserType_State_Status(_client, dataSourceReques, accessToken,
                    UtilitiesApiController.Convert_NullToString(state),
                    status, balance);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }
        [HttpPost("loans/secondaryLoansView_fillCombos")]
        public async Task<ActionResult> secondaryLoansView_fillCombos()
        {
            try
            {
                var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);

                var result = await vwl_VendorPortfolioApiController.FillCombos(_client, accessToken);

                return Success(result);
            }
            catch (System.Exception ex)
            {
                return Error(ex.Message);
            }
        }

        [HttpPost("loans/loansSearch_by/{lastName}/{firstName}/{address}/{city}/{state}/{getColumns}")]
        public async Task<ActionResult> LoansSearch_By(string lastName, string firstName, string address, string city, string state, bool getColumns, [DataSourceRequest] DataSourceRequest dataSourceRequest)
        {


            var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);            



            var result = await LoansSearchApiController.GetAll(
                _client,
                accessToken,                                
                UtilitiesApiController.Convert_NullToString(lastName),
                UtilitiesApiController.Convert_NullToString(firstName),
                UtilitiesApiController.Convert_NullToString(address),
                UtilitiesApiController.Convert_NullToString(city),
                UtilitiesApiController.Convert_NullToString(state, "0"),
                getColumns,
                dataSourceRequest);

            return Success(result);

        }

        [HttpPost("loans/loansSearch_getInfState/{getColumns}")]
        public async Task<ActionResult> LoansSearch_GetInfState(bool getColumns)
        {
            var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);

            var r1 = await INFStateApiController.GetAll(_client, accessToken, true, getColumns);

            return Success(r1);

        }

        [HttpPost("loans/notes/{loanUid}/{getColumns}")]
        public async Task<ActionResult> Notes(string loanUid, bool getColumns,
          [DataSourceRequest] DataSourceRequest dataSourceReques)
        {
            var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);

            var r1 = await LNSVendorApiController.Notes(_client, accessToken, loanUid, dataSourceReques, getColumns);

            return Success(r1);

        }

        [HttpPost("loans/funding/{loanUid}/{getColumns}")]
        public async Task<ActionResult> Funding(string loanUid, bool getColumns,
            [DataSourceRequest] DataSourceRequest dataSourceReques)
        {
            var accessToken = UtilitiesApiController.Get_AccessToken_FromHttpContext(HttpContext);

            var r1 = await LNSVendorApiController.Funding(_client, accessToken, loanUid, dataSourceReques, getColumns);

            return Success(r1);

        }

        [HttpGet("loans/{getColumns}")]
        public async Task<ActionResult> Vendors(bool getColumns, [DataSourceRequest] DataSourceRequest dataSourceReques)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            var result = await LNSVendorApiController.Vendors(_client, access_token, dataSourceReques, getColumns);
            return Success(result);
        }

        [HttpGet("loan/{loanUid}/payments/{excludeFunding}/{getColumns}")]
        public async Task<ActionResult> PaymentHistory(string loanUid, bool excludeFunding, bool getColumns, [DataSourceRequest] DataSourceRequest request)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            var result = await LNSVendorApiController.PaymentHistory(_client, access_token, loanUid, excludeFunding, request, getColumns);
            return Success(result);
        }

        [HttpGet("loan/{loanUid}/charges/{hidePaid}/{getColumns}")]
        public async Task<IActionResult> ChargesPage(string loanUid, bool hidePaid, bool getColumns, [DataSourceRequest] DataSourceRequest request)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            return Success(await LoanChargesApiController.GetCharges(_client, access_token, loanUid, hidePaid, true, request, getColumns));
        }

        [HttpGet("loan/chargeDetails/{chargeUid}")]
        public async Task<IActionResult> ChargeDetails(string chargeUid)
        {
            return Success(await LoanChargesApiController.GetChargeDetails(_client, chargeUid));
        }

        [HttpGet("validLender/{viewType}")]
        public async Task<IActionResult> ValidLenderList_ByLender(int viewType)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            return Success(await ELSServiceMapApiController.GetValidLenders_ByLender(_client, access_token, viewType));
        }

        [HttpGet("resumenInformation/{lenderUid}")]
        public async Task<IActionResult> LenderResumenInformation(string lenderUid)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            return Success(await LNSVendorApiController.GetResumenInformationByUid(_client, access_token, lenderUid));
        }

        [HttpGet("attachment/{viewType}/{filterDateFrom}/{filterDateTo}/{getColumns}")]
        public async Task<IActionResult> Attachment_ByUser(int viewType, DateTime filterDateFrom, DateTime filterDateTo, bool getColumns, [DataSourceRequest] DataSourceRequest request)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            return Success(await ALLAttachmentApiController.GetListByLenderUidAndViewType(_client, access_token, "", viewType, filterDateFrom, filterDateTo, request));
        }

        [HttpGet("attachment/{lenderUid}/{viewType}/{filterDateFrom}/{filterDateTo}/{getColumns}")]
        public async Task<IActionResult> Attachment_ByLender(string lenderUid, int viewType, DateTime filterDateFrom, DateTime filterDateTo, bool getColumns, [DataSourceRequest] DataSourceRequest request)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            return Success(await ALLAttachmentApiController.GetListByLenderUidAndViewType(_client, access_token, lenderUid, viewType, filterDateFrom, filterDateTo, request));
        }

        [HttpGet("attachment/download/{uid}")]
        public async Task<IActionResult> Attachment_Download(string Uid)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            var response = await ALLAttachmentApiController.GetFile(_client, access_token, Uid);
            if (response != null) return Success(response);
            else return Validation("The file could not be downloaded.");
        }

        [HttpGet("loans/{userType}/{filter}/{loansUidExclude?}")]
        public async Task<IActionResult> GetLoans(int userType, string filter, string loansUidExclude = "")
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            var loans = await VendorPortfolioApiController.GetLoansByFilter(_client, access_token, userType, filter, loansUidExclude);
            return Success(loans);
        }
    }
}