using Centurion.Utilities;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.CodeAnalysis.Operations;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public class ELSServiceMapFacade
    {
        public static async Task<IEnumerable<ELSServiceMap>> GetByUidAndNotType(string uid, int type)
        {
            LirsDbContext context = new LirsDbContext();
            return await context.ELSServiceMap.Where(x => x.UserUid == uid && x.Type != type).ToListAsync();
        }
        public static async Task<IEnumerable<ELSServiceMap>> GetByUidAndType(string uid, int type)
        {
            return await QueryByIdAndType(uid, type).ToListAsync();
        }

        public static IQueryable<ELSServiceMap> GetMatchUserAndLoanAccount(string uid, string loanAccount)
        {
            LirsDbContext context = new LirsDbContext();
            return context.ELSServiceMap.Where(x => x.UserUid == uid && x.Account == loanAccount);
        }

        public static IQueryable<ELSServiceMap> QueryByIdAndType(string uid, int type)
        {
            LirsDbContext context = new LirsDbContext();
            return context.ELSServiceMap.Where(x => x.UserUid == uid && x.Type == type);
        }


        public static IQueryable<string> Query_By_UserUid_UserType_SelectOnly_ParentUid(
            LirsDbContext context, string uid, int type)
        {
            //  LirsDbContext context = new LirsDbContext();
            return context.ELSServiceMap.Where(x => x.UserUid == uid && x.Type == type).Select(x => x.ParentUid).AsQueryable();
        }
        public static IQueryable<string> Query_By_UserUid_SelectOnly_ParentUid(
            LirsDbContext context, string uid)
        {
            //  LirsDbContext context = new LirsDbContext();
            return context.ELSServiceMap.Where(x => x.UserUid == uid).Select(x => x.ParentUid).AsQueryable();
        }

        public static IQueryable<ELSServiceMap> GetValidLender_ByUidAndTypeAndViewType(string uid, int type, int viewType)
        {
            LirsDbContext context = new LirsDbContext();
            //De manera temporal hasta afinar la query
            //return QueryByIdAndType(uid, type);

            IQueryable<ELSServiceMap> query = null;

            if (viewType == (int)Enums.AttachmentViewEnum.PENDING_DISBURSEMENT_TO_LENDER)
            {
                query =
                (
                    from lv in context.vwl_LNSVendor
                    join ld in context.vwl_LenderDisbursements on lv.Uid equals ld.VendorUid
                    where (ld.CheckNo == "Print" || ld.CheckNo == "Immediate" || ld.CheckNo == "Hold")
                    && (
                        (
                           type == (int)CENTEnums.UserTypeEnum.LENDER //Filter by List of Lenders
                           && QueryByIdAndType(uid, type).Where(x => x.ParentUid.Contains(ld.VendorUid)).Any()
                        )
                        ||
                        (
                           type == (int)CENTEnums.UserTypeEnum.BROKER //Filter by List of Brokers
                           && !context.vw_ALLDepartment.Where(x => x.BrokerUid.Contains(ld.VendorUid)).Any() //Esto es para que no vean los pagos a los broker, no quieren que vean los fees que se les esta cobrando  
                           && QueryByIdAndType(uid, type).Where(x => x.ParentUid.Contains(ld.OfficerUid)).Any() //mapp -> OfficerUid para que vean pagos solo de los loans asignados.
                        )
                        //||
                        //(
                        //   type != (int)CENTEnums.UserTypeEnum.LENDER && type != (int)CENTEnums.UserTypeEnum.BROKER //Esto reemplaza al 1 = 1 pero hay que consultar
                        //)
                    )
                    select new ELSServiceMap()
                    {
                        ParentUid = lv.Uid,
                        Account = lv.Account,
                        FullName = lv.FullName,
                        UserUid = uid
                    }
                ).AsQueryable();
            }
            else if (viewType == (int)Enums.AttachmentViewEnum.ALL_ATTACHMENT || (type == (int)Enums.UserTypeEnum.BROKER && viewType == (int)Enums.AttachmentViewEnum.NOTIFICATION_OF_DEPOSIT))
            {
                query =
                (
                    from lv in context.vwl_LNSVendor
                    join lo in context.vwl_LNSOfficers on lv.Uid equals lo.VendorUid
                    join sm in QueryByIdAndType(uid, type) on lo.Uid equals sm.ParentUid
                    //where QueryByIdAndType(uid, type).Where(x => x.ParentUid.Contains(lo.Uid)).Any()
                    select new ELSServiceMap()
                    {
                        ParentUid = lv.Uid,
                        Account = lv.Account,
                        FullName = lv.FullName,
                        UserUid = uid
                    }
                ).AsQueryable();
            }
            else
            {
                if (type == (int)CENTEnums.UserTypeEnum.BROKER)
                {
                    query =
                    (
                        from lv in context.vwl_LNSVendor
                        join vp in context.vwl_VendorPortfolio on lv.Uid equals vp.LenderUid
                        join sm in QueryByIdAndType(uid, type) on vp.OfficerUid equals sm.ParentUid
                        where (
                            !(
                                from lo in context.vwl_LNSLoan
                                join le in context.vwl_LNSLending on lo.Uid equals le.LoanUid
                                where vp.LenderUid == le.LenderUid 
                                && !sm.ParentUid.Contains(lo.BrokerRepresentative)
                                select lo
                            ).Any()
                        )
                        select new ELSServiceMap()
                        {
                            ParentUid = lv.Uid,
                            Account = lv.Account,
                            FullName = lv.FullName,
                            UserUid = uid
                        }
                    ).AsQueryable();
                }
                else
                {
                    query = QueryByIdAndType(uid, type);
                }
            }

            return query.OrderBy(x => x.Account).AsQueryable();
        }

        public static async Task Insert(ELSServiceMap serviceMap)
        {
            LirsDbContext context = new LirsDbContext();
            context.ELSServiceMap.Add(serviceMap);
            await context.SaveChangesAsync();
        }

        public static async Task<bool> Delete(ELSServiceMap serviceMap)
        {
            LirsDbContext context = new LirsDbContext();
            context.ELSServiceMap.Remove(serviceMap);
            return await context.SaveChangesAsync() > 0;
        }

        public static async Task<bool> Delete(string userUid, string parentUid)
        {
            LirsDbContext context = new LirsDbContext();
            context.ELSServiceMap.Remove(new ELSServiceMap { UserUid = userUid, ParentUid = parentUid });
            return await context.SaveChangesAsync() > 0;
        }
    }
}
