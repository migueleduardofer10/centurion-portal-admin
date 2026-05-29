using System;
using System.Threading.Tasks;
using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController;
using CenturionPortal.ApiController.Model.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CenturionPortal.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : CASController
   {
        private readonly GraphQLHttpClient _client;

        public InvoiceController(GraphQLHttpClient client)
        {
            this._client = client;
        }

        [HttpGet("pending/{getColumns?}/{lenderUid?}/{onlyPositive?}")]
        public async Task<ActionResult> PendingInvoices([DataSourceRequest] DataSourceRequest request, bool getColumns = true, string lenderUid = "all", bool onlyPositive = true)
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            return Success(await LoanInvoicesApiController.getPendingInvoices(_client, access_token, request, getColumns, lenderUid, onlyPositive));
        }

        [HttpGet("paid/{getColumns?}/{lenderUid?}")]
        public async Task<ActionResult> PaidInvoices([DataSourceRequest] DataSourceRequest request, bool getColumns = true, string lenderUid = "all")
        {
            string access_token = HttpContext.Session.GetString("accesstoken");
            return Success(await LoanInvoicesApiController.getPaidInvoices(_client, access_token, request, getColumns, lenderUid));
        }

        [HttpGet("details/{invoiceUid}/{customerUid}")]
        public async Task<ActionResult> InvoiceDetails(string invoiceUid, string customerUid)
        {
            try
            {
                string access_token = HttpContext.Session.GetString("accesstoken");
                return Success(await LoanInvoicesApiController.getInvoiceDetails(_client, access_token, invoiceUid, customerUid));
            }
            catch (Exception ex)
            {
                if (UtilitiesApiController.IsValidation(ex))
                    return Validation(ex.Message);
                throw ex;
            }
        }

        [HttpGet("{invoiceUid}/details")]
        public async Task<ActionResult> DetailsByInvoice(string invoiceUid)
        {
            try
            {
                string access_token = HttpContext.Session.GetString("accesstoken");
                return Success(await LoanInvoicesApiController.getDetailsByInvoice(_client, access_token, invoiceUid));
            }
            catch (Exception ex)
            {
                if (UtilitiesApiController.IsValidation(ex))
                    return Validation(ex.Message);
                throw ex;
            }
        }

        [HttpGet("vcheck/{customerUid}/{listInvoiceUid}")]
        public async Task<ActionResult> VCheckModel(string customerUid, string listInvoiceUid)
        {
            try
            {
                string access_token = HttpContext.Session.GetString("accesstoken");
                return Success(await LoanInvoicesApiController.getVCheckInvoiceModel(_client, access_token, customerUid, listInvoiceUid));
            }
            catch (Exception ex)
            {
                if (UtilitiesApiController.IsValidation(ex))
                    return Validation(ex.Message);
                throw ex;
            }
        }

        [HttpGet("paypal/{customerUid}/{listInvoiceUid}")]
        public async Task<ActionResult> PayPalModel(string customerUid, string listInvoiceUid)
        {
            try
            {
                string access_token = HttpContext.Session.GetString("accesstoken");
                return Success(await LoanInvoicesApiController.getPayPalInvoiceModel(_client, access_token, customerUid, listInvoiceUid));
            }
            catch (Exception ex)
            {
                if (UtilitiesApiController.IsValidation(ex))
                    return Validation(ex.Message);
                throw ex;
            }
        }

        [HttpGet("creditcard/{customerUid}/{listInvoiceUid}")]
        public async Task<ActionResult> CreditCardModel(string customerUid, string listInvoiceUid)
        {
            try
            {
                string access_token = HttpContext.Session.GetString("accesstoken");
                return Success(await LoanInvoicesApiController.getCreditCardInvoiceModel(_client, access_token, customerUid, listInvoiceUid));
            }
            catch (Exception ex)
            {
                if (UtilitiesApiController.IsValidation(ex))
                    return Validation(ex.Message);
                throw ex;
            }
        }

        [HttpPost("payment/vcheck")]
        public async Task<ActionResult> PaymentByVCheck([FromBody]VCheckModel vCheckModel)
        {
            try
            {
                string access_token = HttpContext.Session.GetString("accesstoken");
                return Success(await LoanInvoicesApiController.applyPaymentByVCheck(_client, access_token, vCheckModel));
            }
            catch (Exception ex)
            {
                if (UtilitiesApiController.IsValidation(ex))
                    return Validation(ex.Message);
                throw ex;
            }
        }

        [HttpPost("payment/paypal")]
        public async Task<ActionResult> PaymentByPayPal([FromBody]PayPalModel payPalModel)
        {
            try
            {
                string access_token = HttpContext.Session.GetString("accesstoken");
                return Success(await LoanInvoicesApiController.applyPaymentByPayPal(_client, access_token, payPalModel));
            }
            catch (Exception ex)
            {
                if (UtilitiesApiController.IsValidation(ex))
                    return Validation(ex.Message);
                throw ex;
            }
        }

        [HttpPost("payment/creditcard")]
        public async Task<ActionResult> PaymentByCreditCard([FromBody]CreditCardModel creditCardModel)
        {
            try
            {
                string access_token = HttpContext.Session.GetString("accesstoken");
                return Success(await LoanInvoicesApiController.applyPaymentByCreditCard(_client, access_token, creditCardModel));
            }
            catch (Exception ex)
            {
                if (UtilitiesApiController.IsValidation(ex))
                    return Validation(ex.Message);
                throw ex;
            }
        }
    }
}
