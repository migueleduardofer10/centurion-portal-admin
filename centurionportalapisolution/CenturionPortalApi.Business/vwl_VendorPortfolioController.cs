using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Loader;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public static class vwl_VendorPortfolioController
    {
        public static async Task<DataSourceResult> GetPage(int userType, string userId, DataSourceRequest request)
        {
            var result = await vwl_VendorPortfolioFacade.GetPage(userType, userId).OrderBy(x => x.AssignedDate).ToDataSourceResultAsync(request);
            return result;
        }


        public static async Task<DataSourceResult> Filter_By(
            string userUid,
            int userType,
            string lastName, string firstName, string address,
            string city, string state,
            DataSourceRequest request)
        {
            var context = new LirsDbContext();


            var query = (

                from ELSServiceMap in context.ELSServiceMap
                join vwl_VendorPortfolio in context.vwl_VendorPortfolio on ELSServiceMap.ParentUid equals vwl_VendorPortfolio.LenderUid
                where

                ELSServiceMap.UserUid == userUid &&

                ELSServiceMap.Type == userType &&

                (!string.IsNullOrEmpty(city) ? vwl_VendorPortfolio.City == city : true) &&

                (!string.IsNullOrEmpty(state) && state.Trim() != "0" ? vwl_VendorPortfolio.State == state : true) &&

                (!string.IsNullOrEmpty(lastName) ? EF.Functions.Like(vwl_VendorPortfolio.LastName, $"%{lastName}%") : true) &&

                (!string.IsNullOrEmpty(firstName) ? EF.Functions.Like(vwl_VendorPortfolio.FirstName, $"%{firstName}%") : true) &&

                (!string.IsNullOrEmpty(address) ? EF.Functions.Like(vwl_VendorPortfolio.Address, $"%{address}%") : true)

                orderby vwl_VendorPortfolio.Account

                select vwl_VendorPortfolio

                ).AsQueryable();

            return await query.ToDataSourceResultAsync(request);





        }

    }
}
