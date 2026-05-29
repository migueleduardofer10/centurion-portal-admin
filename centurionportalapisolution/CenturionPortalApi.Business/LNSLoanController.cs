using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace CenturionPortalApi.Business
{
    public class LNSLoanController
    {
        public static async Task<IList<vwl_LNSLoan>> GetByFilter(string filter, string loansUidExclude)
        {
            return await LNSLoanFacade.GetByFilter(filter, loansUidExclude);
        }

        public static async Task<vwl_LNSLoan> GetByUid(string uid)
        {
            return await LNSLoanFacade.GetByUid(uid);
        }


        public static async Task<List<vwl_LNSLoan>> Get_CbLoansFilter(string userUid,
            Centurion.Utilities.CENTEnums.UserTypeEnum userType)
        {



        

            return await LNSLoanFacade.Get_CbLoansFilter( new DataBase.Context.LirsDbContext() ,userUid, userType).ToListAsync();

        }

    }
}
