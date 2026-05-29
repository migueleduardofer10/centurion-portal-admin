using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Views;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class UtilityGraphController
    {
        public static async Task<List<RESLoanByState>> GetLoanCountAndUPBByState(string userUid)
        {
            return await UtilityGraphFacade.GetLoanCountAndUPBByState(userUid);
        }

        public static async Task<List<vwl_LoanPaymentOnTime>> GetCubeLoanPaymentOnTime(string userUid)
        {
            return await UtilityGraphFacade.GetCubeLoanPaymentOnTime(userUid);
        }
    }
}
