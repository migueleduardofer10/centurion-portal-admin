using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

namespace CenturionPortalApi.Business
{
    public static class vw_VendorHistoryController
    {
        public static async Task<DataSourceResult> Report_PaymentToLender(string userUid, 
            string account, bool onlyPending, DataSourceRequest dataSourceRequest)
        {
            try
            {

                //var context = new DataBase.Context.LirsDbContext();

                //value Model.vw_VendorHistory(



                //return query;


                var result = await vw_VendorHistoryFacade.Get(userUid, account,onlyPending)
                    .Select(x => new vw_VendorHistory
                    {
                        CheckDate = x.CheckDate,
                        CheckNo = x.CheckNo,
                        Account = x.Account,
                        PaymentCode = x.PaymentCode,
                        CheckAmount = x.CheckAmount,
                        ToServiceFee = x.ToServiceFee,
                        ToInterest = x.ToInterest,
                        ToPrincipal = x.ToPrincipal,
                        ToLateCharge = x.ToLateCharge,
                        ToChargesPrincipal = x.ToChargesPrincipal,
                        ToChargesInterest = x.ToChargesInterest,
                        ToPrepay = x.ToPrepay,
                        ToOtherTaxable = x.ToOtherTaxable,
                        ToOtherTaxFree = x.ToOtherTaxFree,
                        ToOtherPayments = x.ToOtherPayments,
                        ToTrust = x.ToTrust
                    })
                    .ToDataSourceResultAsync(dataSourceRequest);
                return result;
                //return query;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
