using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Request;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class LoanInvoicesController
    {
        public static async Task<DataSourceResult> getPendingInvoices(DataSourceRequest request, string userUid, string lenderUid = "all", bool onlyPositive = true)
        {
            bool isSort = (request.Sorts != null && request.Sorts.Count > 0);
            return await LoanInvoicesFacade.getPendingInvoices(userUid, lenderUid, onlyPositive, isSort).ToDataSourceResultAsync(request);
        }

        public static async Task<DataSourceResult> getPaidInvoices(DataSourceRequest request, string userUid, string lenderUid = "all")
        {
            bool isSort = (request.Sorts != null && request.Sorts.Count > 0);
            return await LoanInvoicesFacade.getPaidInvoices(userUid, lenderUid, isSort).ToDataSourceResultAsync(request);
        }

        public static async Task<List<vwl_LBMInvoiceDependencies>> getInvoiceDetails(string invoiceUid, string customerUid)
        {
            return await LoanInvoicesFacade.getInvoiceDetails(invoiceUid, customerUid).ToListAsync();
        }

        public static async Task<List<vwl_LBMInvoiceDetails>> getDetailsByInvoice(string invoiceUid)
        {
            return await LoanInvoicesFacade.getDetailsByInvoice(invoiceUid).ToListAsync();
        }

        public static async Task<VCheckModel> getVCheckInvoiceModel(string enterpriseURL, string customerUid, List<string> listInvoiceUid)
        {
            VCheckModel vCheck = null;

            foreach (var invoiceUid in listInvoiceUid)
            {
                if (!string.IsNullOrEmpty(invoiceUid))
                {
                    if (vCheck == null)
                    {
                        vCheck = await CenturionInvoicesServiceController.getVCheckInvoiceModel(enterpriseURL, customerUid, invoiceUid);
                        vCheck.Notes = vCheck.InvoiceNumber;
                    }
                    else
                    {
                        var tmpVCheck = await CenturionInvoicesServiceController.getVCheckInvoiceModel(enterpriseURL, customerUid, invoiceUid);
                        vCheck.Amount += tmpVCheck.Amount;
                        vCheck.RegularPayment += tmpVCheck.RegularPayment;
                        vCheck.AddlCharges += tmpVCheck.AddlCharges;
                        vCheck.Notes += "," + tmpVCheck.InvoiceNumber;
                        vCheck.InvoiceNumber += "," + tmpVCheck.InvoiceNumber;
                        vCheck.InvoiceUid += "," + tmpVCheck.InvoiceUid;
                    }
                }
            }

            //if (vCheck.RegularPayment <= 0)
            //    UtilitiesController.ShowValidation("Not Invoice Found!");

            vCheck.Uid = UtilitiesController.GetUid();
            vCheck.ServiceFee = 0;

            return vCheck;
        }

        public static async Task<PayPalModel> getPayPalInvoiceModel(string enterpriseURL, string customerUid, List<string> listInvoiceUid)
        {
            PayPalModel payPal = null;

            foreach (var invoiceUid in listInvoiceUid)
            {
                if (!string.IsNullOrEmpty(invoiceUid))
                {
                    if (payPal == null)
                    {
                        payPal = await CenturionInvoicesServiceController.getPayPalInvoiceModel(enterpriseURL, customerUid, invoiceUid);
                        payPal.Notes = payPal.InvoiceNumber;
                    }
                    else
                    {
                        var tmpPayPal = await CenturionInvoicesServiceController.getPayPalInvoiceModel(enterpriseURL, customerUid, invoiceUid);
                        payPal.Amount += tmpPayPal.Amount;
                        payPal.RegularPayment += tmpPayPal.RegularPayment;
                        payPal.AddlCharges += tmpPayPal.AddlCharges;
                        payPal.Notes += "," + tmpPayPal.InvoiceNumber;
                        payPal.InvoiceNumber += "," + tmpPayPal.InvoiceNumber;
                        payPal.InvoiceUid += "," + tmpPayPal.InvoiceUid;
                    }
                }
            }

            //if (payPal.RegularPayment <= 0)
            //    UtilitiesController.ShowValidation("Not Invoice Found!");

            payPal.Uid = UtilitiesController.GetUid();
            payPal.ServiceFee = 0;
            if (payPal.RegularPayment > 250)
                payPal.ServiceFee = payPal.RegularPayment * (decimal)0.03;

            return payPal;
        }

        public static async Task<CreditCardModel> getCreditCardInvoiceModel(string enterpriseURL, string customerUid, List<string> listInvoiceUid)
        {
            CreditCardModel creditCard = null;

            foreach (var invoiceUid in listInvoiceUid)
            {
                if (!string.IsNullOrEmpty(invoiceUid))
                {
                    if (creditCard == null)
                    {
                        creditCard = await CenturionInvoicesServiceController.getCreditCardInvoiceModel(enterpriseURL, customerUid, invoiceUid);
                        creditCard.Notes = creditCard.InvoiceNumber;
                    }
                    else
                    {
                        var tmpCreditCard = await CenturionInvoicesServiceController.getCreditCardInvoiceModel(enterpriseURL, customerUid, invoiceUid);
                        creditCard.Amount += tmpCreditCard.Amount;
                        creditCard.RegularPayment += tmpCreditCard.RegularPayment;
                        creditCard.AddlCharges += tmpCreditCard.AddlCharges;
                        creditCard.Notes += "," + tmpCreditCard.InvoiceNumber;
                        creditCard.InvoiceNumber += "," + tmpCreditCard.InvoiceNumber;
                        creditCard.InvoiceUid += "," + tmpCreditCard.InvoiceUid;
                    }
                }
            }

            //if (creditCard.RegularPayment <= 0)
            //    UtilitiesController.ShowValidation("Not Invoice Found!");

            creditCard.Uid = UtilitiesController.GetUid();
            creditCard.ServiceFee = 0;
            if (creditCard.RegularPayment > 250)
                creditCard.ServiceFee = creditCard.RegularPayment * (decimal)0.03;

            return creditCard;
        }

        public static async Task<string> getPaymentTerms(int paymentType)
        {
            if (paymentType == (int)Enums.PaymentTypeEnum.VCHECK)
                return "VCheck Terms";
            else if (paymentType == (int)Enums.PaymentTypeEnum.PAYPAL)
                return "PayPal Terms";
            else if (paymentType == (int)Enums.PaymentTypeEnum.CREDIT_CARD)
                return "Credit Card Terms";
            else
                return null;
        }

        public static async Task<string> applyPaymentByVCheck(string enterpriseURL, VCheckModel vCheckModel)
        {
            return await CenturionInvoicesServiceController.applyPaymentByVCheck(enterpriseURL, vCheckModel);
        }

        public static async Task<string> applyPaymentByPayPal(string enterpriseURL, PayPalModel payPalModel)
        {
            return await CenturionInvoicesServiceController.applyPaymentByPayPal(enterpriseURL, payPalModel);
        }

        public static async Task<string> applyPaymentByCreditCard(string enterpriseURL, CreditCardModel creditCardModel)
        {
            return await CenturionInvoicesServiceController.applyPaymentByCreditCard(enterpriseURL, creditCardModel);
        }
    }
}
