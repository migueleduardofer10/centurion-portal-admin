using System.Linq;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.DataAccess
{
    public class LoanChargesFacade
    {
        public static IQueryable<vwl_LoanCharges> GetByLoanUid(string userUid, int userType, string loanUid, bool hidePaid)
        {
            var context = new LirsDbContext();

            var query =
                (from ch in context.vwl_LoanCharges
                 where ch.LoanUid == loanUid &&
                 (!hidePaid || ch.VendorBalance > 0)
                 &&
                 (
                    userType != (int)Enums.UserTypeEnum.LENDER ||
                    context.vwl_VendorPortfolioResume.Where(v =>
                        v.LoanUid == loanUid &&
                        context.ELSServiceMap.Where(map => map.UserUid == userUid && map.Type == userType && map.ParentUid == v.LenderUid).Any() &&
                        (v.Status >= 0 || ch.Date < v.AssignedDate)
                    ).Any()
                 )
                 select ch).AsQueryable();

            return query;
        }
    }
}
