using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public class LNSLoanFacade
    {
        public static async Task<List<vwl_LNSLoan>> GetByFilter(string filter, string loansUidExclude)
        {
            //LirsDbContext context = new LirsDbContext();

            ////Listamos los loans coincidentes
            //var objArr = await context.vwl_LNSLoan
            //    .Where(x => x.Account.Contains(filter) || x.BorrowerName.Contains(filter))
            //    .Select(x => new
            //    vwl_LNSLoan
            //    {
            //        Uid = x.Uid,
            //        Account = x.Account,
            //        BorrowerName = x.BorrowerName
            //    })
            //    .ToListAsync();

            ////Partimos en una la lista los Uid de los Loans a esxluir
            //List<string> loansUid = loansUidExclude.Split('|').ToList();

            ////Eliminamos en la lista de retorno aquellos registros que coincidan con los Uid de los loans a excluir
            //objArr.RemoveAll(x => loansUid.Exists(l => l == x.Uid));

            //return objArr;


            //Partimos en una la lista los Uid de los Loans a esxluir
            var loansUid = loansUidExclude.Split('|').ToList();

            var context = new LirsDbContext();

            //Listamos los loans coincidentes
            var objArr = await context.vwl_LNSLoan
                .Where(x => (x.Account.Contains(filter) || x.BorrowerName.Contains(filter)) && loansUid.Contains(x.Uid) == false)
                .Select(x => new
                vwl_LNSLoan
                {
                    Uid = x.Uid,
                    Account = x.Account,
                    BorrowerName = x.BorrowerName
                })
                .ToListAsync();




            return objArr;
        }

        public static async Task<vwl_LNSLoan> GetByUid(string uid)
        {
            try
            {

                LirsDbContext context = new LirsDbContext();

                return await context.vwl_LNSLoan
                    .Where(x => x.Uid == uid)
                    .FirstOrDefaultAsync();


            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }


        public static IQueryable<vwl_LNSLoan> Get_CbLoansFilter( LirsDbContext context,   string userUid, Centurion.Utilities.CENTEnums.UserTypeEnum userType)
        {
          
            //var mapQuery = v_IRSServiceMapFacade.Get_ParentUid(context, userUid, userType);

            //var portfolioQuery = context.vcw_VendorPortfolioResume.Where(obj => mapQuery.Contains(obj.LenderUid)).Select(x => x.LoanUid).AsQueryable();

            //var query = context.vwl_LNSLoan.Where(obj => portfolioQuery.Contains(obj.Uid))
            //    .Select(obj => new vwl_LNSLoan { TrustAccountUid = obj.TrustAccountUid, Account = obj.Account, BorrowerFullName = obj.BorrowerFullName }).AsQueryable();



            var query = context.vwl_LNSLoan.FromSqlRaw(@"
            select * from vwl_LNSLoan l
            where exists
            (
	            select  p.LoanUid from VCW_VendorPortfolioResume p
	            where 
	            exists 
	            (  
		            select m.ParentUid from v_IRSServiceMap m
		            where m.UserUid = {0} and m.type = {1} and m.ParentUid=p.LenderUid
	            ) and
	            l.Uid=p.LoanUid
            )", userUid,(int)userType).AsQueryable();


            return query;
        }



   

    }
}
