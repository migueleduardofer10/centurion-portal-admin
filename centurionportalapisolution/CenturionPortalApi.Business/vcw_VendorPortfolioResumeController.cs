using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class vcw_VendorPortfolioResumeController
    {




        public static async Task<List<vcw_VendorPortfolioResume>> GetBy_LoanUid_UserUid_UserType(
            string loanUid,
            string userUid,
            Centurion.Utilities.CENTEnums.UserTypeEnum userType,
            Func<vcw_VendorPortfolioResume, vcw_VendorPortfolioResume> columns)
        {


            var context = new LirsDbContext();
            try
            {
                var parentUid_arr = await ELSServiceMapFacade.Query_By_UserUid_UserType_SelectOnly_ParentUid(context, userUid, (int)userType).ToListAsync();

                var query = context.vcw_VendorPortfolioResume.AsQueryable();
                if (parentUid_arr.Count != 0)
                {
                    switch (userType)
                    {
                        case Centurion.Utilities.CENTEnums.UserTypeEnum.BROKER:
                            query = query.Where(x => x.LoanUid == loanUid && parentUid_arr.Contains(x.OfficerUid));
                            break;
                        case Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER:
                            query = query.Where(x => x.LoanUid == loanUid && parentUid_arr.Contains(x.LenderUid));
                            break;
                        case Centurion.Utilities.CENTEnums.UserTypeEnum.BORROWER:
                            query = query.Where(x => x.LoanUid == loanUid && parentUid_arr.Contains(x.LoanUid));
                            break;
                        default:
                            query = query.Where(x => x.LoanUid == loanUid);
                            break;
                    }

                    async Task<List<vcw_VendorPortfolioResume>> getResult()
                    {
                        return columns == null ? await query.ToListAsync() : await query.Select(x => columns(x)).ToListAsync();
                    }

                    var result = await getResult();//  columns==null ? await query.ToListAsync():await query.Select(x=> columns(x)).ToListAsync();
                 
                    if (result.LongCount() == 0 && userType == Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER)
                    {
                        var secUids = context.v_LNSSecLending
                            .Where(l => parentUid_arr.Contains(l.LenderUid) && l.LoanUid == loanUid)
                            .Select(s => s.Uid).AsQueryable();
                        query = context.vcw_VendorPortfolioResume.Where(l => l.LoanUid == loanUid && secUids.Contains(l.SecondaryUid));

                        result = await getResult();// columns == null ? await query.ToListAsync() : await query.Select(x => columns(x)).ToListAsync();
                    }

                    return result;
                }
                else
                {
                    return await query.Where(l => l.LoanUid == loanUid).ToListAsync();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
