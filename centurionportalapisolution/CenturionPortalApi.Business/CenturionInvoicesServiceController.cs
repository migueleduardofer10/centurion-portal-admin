using CenturionPortalApi.DataBase.Models.Request;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class CenturionInvoicesServiceController
    {
        public static async Task<VCheckModel> getVCheckInvoiceModel(string enterpriseURL, string customerUid, string invoiceUid)
        {
            return new VCheckModel();
        }

        public static async Task<PayPalModel> getPayPalInvoiceModel(string enterpriseURL, string customerUid, string invoiceUid)
        {
            return new PayPalModel();
        }

        public static async Task<CreditCardModel> getCreditCardInvoiceModel(string enterpriseURL, string customerUid, string invoiceUid)
        {
            return new CreditCardModel();
        }

        public static async Task<string> applyPaymentByVCheck(string enterpriseURL, VCheckModel vCheckModel)
        {
            return null;
        }

        public static async Task<string> applyPaymentByPayPal(string enterpriseURL, PayPalModel payPalModel)
        {
            return null;
        }

        public static async Task<string> applyPaymentByCreditCard(string enterpriseURL, CreditCardModel creditCardModel)
        {
            return null;
        }
    }
}
