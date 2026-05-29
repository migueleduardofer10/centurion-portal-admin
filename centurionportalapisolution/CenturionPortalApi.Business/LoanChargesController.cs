using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class LoanChargesController
    {
        public static async Task<DataSourceResult> GetByLoanUid(string userUid, int userType, string loanUid, bool hidePaid, bool withDetails, DataSourceRequest dataSourceRequest )
        {
            var query = LoanChargesFacade.GetByLoanUid(userUid, userType, loanUid, hidePaid);


            var result = await query.ToDataSourceResultAsync(dataSourceRequest);


            if (result != null && result.Data != null)
            {
                result.Data.Cast<vwl_LoanCharges>().ToList().ForEach(c =>
                {
                    if (c.InterestFrom.HasValue && (hidePaid || (!hidePaid && c.LoanNoteType != (int)Enums.NoteTypeEnum.LINE_OF_CREDIT)))
                    {
                        if (c.OriginalAmount == 0) //-- OriginalBalance, -- OriginalAmount
                            c.OriginalAmount = 0;
                        if (c.Balance == null) //--UnpaidBalance,  -- Balance
                            c.Balance = 0;
                        // TODO:
                        if (hidePaid) //Cuando es true el * 100 se aplica al valor de retorno de la funcion
                        {
                            //item.AccruedInterest = (CLNSPaymentController.RoundMoney(CLNSPaymentController.GetTotalInterests (
                            //  objLoan, (decimal)item.InterestRate, item.Balance.Value, dateNow, item.InterestFrom, true, true))
                            //) * 100;
                        }
                        else //Cuando es false el * 100 se aplica al parametro item.InterestRate
                        {
                            //item.AccruedInterest = (CLNSPaymentController.RoundMoney(CLNSPaymentController.GetTotalInterests (
                            //  objLoan, (decimal)item.InterestRate * 100, item.Balance.Value, dateNow, item.InterestFrom, true, true))
                            //);
                        }
                    }
                    c.TotalDue = c.Balance.Value + c.AccruedInterest;
                    //c.ChargesDetails = chargesDetails.FindAll(cd => cd.ChargeUid == c.Uid).OrderBy(cd => cd.Date).ToList();
                });
            }


            return result;

           




            #region original

            /*
             
               IQueryable<vwl_LoanCharges> query = LoanChargesFacade.GetByLoanUid(loanUid, hidePaid, userUid,userType);

            List<vwl_LoanCharges> listCharges = null;
            DataSourceResult dataLoanCharges = null;
            if (!string.IsNullOrEmpty(dataSourceRequest))
            {
                DataSourceRequest request =
                   JsonConvert.DeserializeObject<DataSourceRequest>(dataSourceRequest, new JsonSerializerSettings
                   {
                       TypeNameHandling = TypeNameHandling.All
                   });

                dataLoanCharges = query.ToDataSourceResult(dataSourceRequest);
                listCharges = dataLoanCharges.Data as List<vwl_LoanCharges>;
            }
            else
            {
                listCharges = await query.OrderByDescending(x => x.Date).ToListAsync();
            }
               
            DateTime dateNow = DateTime.Now; // TODO: CUtilitiesController.GetSystemDateTime();

            if (listCharges != null && listCharges.Count() > 0)
            {
                //List<vwl_ChargesDetails> chargesDetails = 
                //    withDetails 
                //    ? ChargesDetailsFacade.GetByChargeUid(listCharges.Select(x => x.Uid).ToList()).ToList()
                //    : new List<vwl_ChargesDetails>();
                listCharges.ForEach(c =>
                {
                    //if (c.InterestFrom.HasValue && objLoan.NoteType != (int)Enums.NoteTypeEnum.LINE_OF_CREDIT)
                    if (c.InterestFrom.HasValue && (hidePaid || (!hidePaid && c.LoanNoteType != (int)Enums.NoteTypeEnum.LINE_OF_CREDIT)))
                    {
                        if (c.OriginalAmount == 0) //-- OriginalBalance, -- OriginalAmount
                            c.OriginalAmount = 0;
                        if (c.Balance == null) //--UnpaidBalance,  -- Balance
                            c.Balance = 0;
                        // TODO:
                        if (hidePaid) //Cuando es true el * 100 se aplica al valor de retorno de la funcion
                        {
                            //item.AccruedInterest = (CLNSPaymentController.RoundMoney(CLNSPaymentController.GetTotalInterests (
                            //  objLoan, (decimal)item.InterestRate, item.Balance.Value, dateNow, item.InterestFrom, true, true))
                            //) * 100;
                        }
                        else //Cuando es false el * 100 se aplica al parametro item.InterestRate
                        {
                            //item.AccruedInterest = (CLNSPaymentController.RoundMoney(CLNSPaymentController.GetTotalInterests (
                            //  objLoan, (decimal)item.InterestRate * 100, item.Balance.Value, dateNow, item.InterestFrom, true, true))
                            //);
                        }
                    }
                    c.TotalDue = c.Balance.Value + c.AccruedInterest;
                    //c.ChargesDetails = chargesDetails.FindAll(cd => cd.ChargeUid == c.Uid).OrderBy(cd => cd.Date).ToList();
                });
            }

            if (dataLoanCharges != null)
            { 
                return JsonConvert.SerializeObject(dataLoanCharges);
            }
            else
            {
                return JsonConvert.SerializeObject(listCharges);
            }
             
             */
            #endregion

        }

        public static async Task< List<vwl_ChargesDetails>> GetChargeDetailsByChargeUid(string ChargeUid)
        {
           var result=await  ChargesDetailsFacade.GetByChargeUid(ChargeUid).ToListAsync();
            // return JsonConvert.SerializeObject(chargesDetails);
            return result;
        }
    }
}
