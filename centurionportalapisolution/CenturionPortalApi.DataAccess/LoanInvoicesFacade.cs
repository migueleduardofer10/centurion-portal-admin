using Centurion.Boarding;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using System.Collections.Generic;
using System.Linq;

namespace CenturionPortalApi.DataAccess
{
    public class LoanInvoicesFacade
    {
        public static IQueryable<vwl_CreditCardInvoices> getPendingInvoices(string userUid, string lenderUid = "all", bool onlyPositive = true, bool isSort = false)
        {
            LirsDbContext context = new LirsDbContext();

            var query = (
               from invoices in context.vwl_CreditCardInvoices
               join map in context.ELSServiceMap on invoices.VendorUid equals map.ParentUid
               where map.UserUid == userUid && map.Type == (int)Enums.UserTypeEnum.LENDER &&
                     (string.IsNullOrEmpty(lenderUid) || lenderUid == "all" || invoices.VendorUid == lenderUid) &&
                     (!onlyPositive || invoices.Amount > 0)
               select invoices
            ).AsQueryable();

            if (!isSort)
                query.OrderByDescending(invoice => invoice.NumInvoice);

            return query; //.Where(i => (i.Reference == null || i.Reference != "") && i.PaymentUid == null);
        }

        public static IQueryable<vwl_PaidInvoices> getPaidInvoices(string userUid, string lenderUid = "all", bool isSort = false)
        {
            LirsDbContext context = new LirsDbContext();

            var query = (
               from invoices in context.vwl_PaidInvoices
               join map in context.ELSServiceMap on invoices.CustomerUid equals map.ParentUid
               where map.UserUid == userUid && map.Type == (int)Enums.UserTypeEnum.LENDER &&
                     (string.IsNullOrEmpty(lenderUid) || lenderUid == "all" || invoices.CustomerUid == lenderUid)
               select invoices
            ).AsQueryable();

            if (!isSort)
                query.OrderByDescending(invoice => invoice.NumInvoice);

            return query;
        }

        public static IQueryable<vwl_LBMInvoiceDependencies> getInvoiceDetails(string invoiceUid, string customerUid)
        {
            LirsDbContext context = new LirsDbContext();

            return (
                from invoice in context.vwl_LBMInvoice
                join invoiceDetail in context.vwl_LBMInvoiceDetail on invoice.Uid equals invoiceDetail.InvoiceUid
                join payment in context.vwl_LNSPayment on invoiceDetail.PaymentUid equals payment.Uid
                join paymentLog in context.vwl_LBMPaymentLog on invoiceDetail.PaymentUid equals paymentLog.PaymentUid
                where invoiceDetail.InvoiceUid == invoiceUid && invoice.CustomerUid == customerUid
                select new vwl_LBMInvoiceDependencies()
                {
                    Invoice = invoice,
                    InvoiceDetails = invoiceDetail,
                    Payment = payment,
                    PaymentLog = paymentLog
                }
            ).AsQueryable();
        }

        public static IQueryable<vwl_LBMInvoiceDetails> getDetailsByInvoice(string invoiceUid)
        {
            LirsDbContext context = new LirsDbContext();

            return context.vwl_LBMInvoiceDetails
                .Where(i => i.Uid == invoiceUid).AsQueryable();
        }
    }
}
