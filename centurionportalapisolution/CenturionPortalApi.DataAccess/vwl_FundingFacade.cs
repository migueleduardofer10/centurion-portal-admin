using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
 public static    class vwl_FundingFacade
    {
        public static IQueryable<vwl_Funding> Funding_By_LoanUid(string loanUid)
        {
            try
            {

                var context = new LirsDbContext();

                return (
                        from funding in context.vwl_Funding
                        where funding.LoanUid == loanUid
                        orderby funding.LenderUid ascending
                        orderby funding.LoanUid ascending
                        select funding
                    ).AsQueryable();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
