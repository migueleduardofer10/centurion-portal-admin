using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
    public static class vwl_LoanNotesFacade
    {
        public static IQueryable<vwl_LoanNotes> LoanNotes_By_LoanUid(string loanUid)
        {
            try
            {

                var context = new LirsDbContext();

                return (
                        from loanNotes in context.vwl_LoanNotes
                        where loanNotes.UidLoan == loanUid
                        orderby loanNotes.UidNote ascending
                        select loanNotes
                    ).AsQueryable();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
