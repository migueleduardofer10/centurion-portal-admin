using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Kendo.Mvc.Extensions;
using CenturionPortalApi.DataBase.Context;
using Kendo.Mvc.UI;
using Microsoft.EntityFrameworkCore;
using CenturionPortalApi.DataBase.Models.Custom_Entities;

namespace CenturionPortalApi.Business
{
    public static class vcw_VendorPortfolioSecondaryController
    {
        public static async Task<List<GraphSecondaryLoan>> Get_GraphSecondaryLoan(string userUid, int userType, string loanUid)
        {
            try
            {
                var result = await vcw_VendorPortfolioSecondaryFacade.Get_GraphSecondaryLoan(userUid, userType, loanUid).ToListAsync();
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static async Task<DataSourceResult> Get_By_LoanUid(string loanUid, DataSourceRequest dataSourceRequest)
        {
            return await vcw_VendorPortfolioSecondaryFacade.Get_By_LoanUid(loanUid)
                .ToDataSourceResultAsync(dataSourceRequest);
        }


        public static async Task<DataSourceResult> Get_By_UserUid_UserType_State_Status_Balance(string userId, int userType,
            DataSourceRequest dataSourceRequest, string state = "", int status = -2, int balance = 0)
        {
            try
            {
                var result = await vcw_VendorPortfolioSecondaryFacade.Get_By_UserId_UserType_State_Status_Balance(userId, userType, state, status, balance).ToDataSourceResultAsync(dataSourceRequest);
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}
