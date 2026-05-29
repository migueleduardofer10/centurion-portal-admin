using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public class LoanHistoryFacade
    {

        public static async Task<DataSourceResult> GetAllByVendor2(string userUid, string loanUid, bool excludeFunding, DataSourceRequest dataSourceRequest)
        {
            var context = new LirsDbContext();

            //var mapQuery = context.ELSServiceMap.Where(x => x.UserUid == userUid && x.Type == userType).Select(x => x.ParentUid).AsQueryable();// ELSServiceMapFacade.QueryByIdAndType(userUid, userType).Select(x => x.ParentUid);


            var query = context.vwl_LoanHistory
                .GroupJoin(
                    context.vwl_LNSPaymentSplit,
                    lh => lh.SplitUid,
                    ps => ps.Uid,
                    (lh, ps) => new { lh, ps }
                )
                .SelectMany(
                    lhps => lhps.ps.DefaultIfEmpty(),
                    (lhps, ps) => new { lhps.lh, ps }
                )
                .Where(lhps => lhps.lh.LoanUid == loanUid)
                .Where(lhps =>
                    string.IsNullOrEmpty(lhps.ps.Uid) ||
                    (
                        !string.IsNullOrEmpty(lhps.ps.Uid) &&
                        lhps.ps.Type != (int)Enums.TransTypeEnum.TAX_ADVANCE_RESERVE &&
                        lhps.ps.Type != (int)Enums.TransTypeEnum.INSURANCE_ADVANCE_RESERVE
                    )
                )
                .Select(lhps => lhps.lh)
                .AsQueryable();

            if (excludeFunding)
                query = query.Where(lh => lh.Code != "Funding" && lh.Code != "Draw");

            //   if (maps.Count > 0)
            //   {
            //var queryLending = context.vwl_LNSLending
            //    .Where(s => (s.LoanUid == loanUid && maps.Contains(s.LenderUid)));

            var lendingQuery = (
               from lending in context.vwl_LNSLending
               join map in context.ELSServiceMap on lending.LenderUid equals map.ParentUid
               where map.UserUid == userUid && map.Type == (int)Enums.UserTypeEnum.LENDER
               select new { lending.Funds, lending.AssignedDate }
           ).AsQueryable();

            //  if (await lendingQuery.CountAsync() > 0)
            //if (await lendingQuery.Take(1).CountAsync()==1)
            // {
            if (await lendingQuery.Where(x => (x.Funds != 0 || x.AssignedDate == null)).Select(x => x.Funds).Take(1).CountAsync() > 0)
            {
                return await query.ToDataSourceResultAsync(dataSourceRequest);
            }
            //else if (await lendingQuery.Where(s => s.AssignedDate == null).Take(1).CountAsync() > 0)
            //{
            //    return await query.ToListAsync();
            //}
            else
            {
                DateTime? maxAssignedDate = lendingQuery.Select(x => x.AssignedDate).Max();

                if (maxAssignedDate != null)
                {
                    return await query.Where(s => s.DateReceived <= maxAssignedDate).ToDataSourceResultAsync(dataSourceRequest);
                }
                else
                {
                    return await query.ToDataSourceResultAsync(dataSourceRequest);
                }
            }
            // }
            //   }

            //    return await query.ToListAsync();
        }

        public static async Task<List<vwl_LoanHistory>> GetAllByVendor(string loanUid, bool excludeFunding, List<string> maps)
        {
            LirsDbContext context = new LirsDbContext();

            IQueryable<vwl_LoanHistory> query = context.vwl_LoanHistory
                .GroupJoin(
                    context.vwl_LNSPaymentSplit,
                    lh => lh.SplitUid,
                    ps => ps.Uid,
                    (lh, ps) => new { lh, ps }
                )
                .SelectMany(
                    lhps => lhps.ps.DefaultIfEmpty(),
                    (lhps, ps) => new { lhps.lh, ps }
                )
                .Where(lhps => lhps.lh.LoanUid == loanUid)
                .Where(lhps =>
                    string.IsNullOrEmpty(lhps.ps.Uid) ||
                    (
                        !string.IsNullOrEmpty(lhps.ps.Uid) &&
                        lhps.ps.Type != (int)Enums.TransTypeEnum.TAX_ADVANCE_RESERVE &&
                        lhps.ps.Type != (int)Enums.TransTypeEnum.INSURANCE_ADVANCE_RESERVE
                    )
                )
                .Select(lhps => lhps.lh)
                .AsQueryable();

            if (excludeFunding)
                query = query.Where(lh => lh.Code != "Funding" && lh.Code != "Draw");

            if (maps.Count > 0)
            {
                IQueryable<vwl_LNSLending> queryLend = context.vwl_LNSLending
                    .Where(s => (s.LoanUid == loanUid && maps.Contains(s.LenderUid)));

                if (await queryLend.CountAsync() > 0)
                {
                    if (await queryLend.CountAsync(s => s.Funds != 0) > 0)
                    {
                        return await query.ToListAsync();
                    }
                    else if (queryLend.Count(s => s.AssignedDate == null) > 0)
                    {
                        return await query.ToListAsync();
                    }
                    else
                    {
                        DateTime? maxAssignedDate = queryLend.Select(x => x.AssignedDate).Max();

                        //DateTime? depositDate = (from x in db.LNSDeposit
                        //                        join l in db.LNSLending on x.LendingUid equals l.Uid
                        //                        where l.LoanUid == Loan && mapp.Contains(l.LenderUid)
                        //                        select (DateTime?)x.Date).Max();

                        //DateTime? dateRecieved = (from x in db.LNSLenderActivity
                        //                          join act in db.LNSLoanActivity on x.PaymentUid equals act.Uid
                        //                          where x.LoanUid == Loan && mapp.Contains(x.VendorUid)
                        //                          select (DateTime?)act.DateReceived).Max();

                        //query = query.Where(s => s.DateReceived <= maxAssignedDate).AsQueryable();
                        //var e = query.Count();

                        return await query.Where(s => s.DateReceived <= maxAssignedDate).ToListAsync();
                    }
                }
            }

            return await query.ToListAsync();
        }
    }
}
