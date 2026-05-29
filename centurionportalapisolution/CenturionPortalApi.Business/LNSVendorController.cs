using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using CenturionPortalApi.DataBase.Context;

namespace CenturionPortalApi.Business
{
    public class LNSVendorController
    {
        public static DataSourceResult GetPage(string userId, DataSourceRequest request)
        {
            return LNSVendorFacade.GetPage(userId).ToDataSourceResult(request);
        }

       


        public static async Task<IEnumerable<vwl_LNSVendor>> GetByFilter(string filter, string loansUidExclude)
        {
            return await LNSVendorFacade.GetByFilter(filter, loansUidExclude);
        }

        public static async Task<vwl_LNSVendor> GetByUid(string uid)
        {
            return await LNSVendorFacade.GetByUid(uid);
        }

        public static async Task<List<VendorHistoryStatistics>> GetPaymentsToLender(
            string userUid, DateTime? fromFilter, DateTime? toFilter
        )
        {
            List<string> parentMap = await ELSServiceMapController.getValidLoansByUidAndType(userUid, (int)Enums.UserTypeEnum.LENDER);
            return await LNSVendorFacade.GetPaymentsToLender(parentMap, fromFilter, toFilter);
        }

        public static async Task<List<VendorHistoryStatistics>> GetPaymentsFromBorrower(
            string userUid, DateTime? fromFilter, DateTime? toFilter
        )
        {
            List<string> parentMap = await ELSServiceMapController.getValidLoansByUidAndType(userUid, (int)Enums.UserTypeEnum.LENDER);
            return await LNSVendorFacade.GetPaymentsFromBorrower(parentMap, fromFilter, toFilter);
        }

        public static async Task<List<LoanStatusStatistic>> GetLoanStatusByLenderUid(string userUid)
        {
            return await LNSVendorFacade.GetLoanStatusByLenderUid(userUid);
        }

        public static async Task<List<ELSServiceMap>> GetValidLendersByLender(string userUid)
        {
            return await LNSVendorFacade.GetValidLendersByLender(userUid).ToListAsync();
        }
    }
}
