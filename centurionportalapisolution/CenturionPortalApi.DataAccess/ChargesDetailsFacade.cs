using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
    public class ChargesDetailsFacade
    {
        public static IQueryable<vwl_ChargesDetails> GetQuery()
        {
            var context = new LirsDbContext();
            var query = context.vwl_ChargesDetails.AsQueryable();
            return query;
        }

        public static IQueryable<vwl_ChargesDetails> GetByChargeUid(string ChargeUid)
        {
            var query = GetByChargeUid(new List<string>() { ChargeUid });
            return query;
        }

        public static IQueryable<vwl_ChargesDetails> GetByChargeUid(List<string> ChargeUids)
        {
            var context = new LirsDbContext();
            var query = context.vwl_ChargesDetails.Where(x => ChargeUids.Contains(x.ChargeUid)).OrderBy(x => x.Date).AsQueryable();
            return query;
        }
    }
}
