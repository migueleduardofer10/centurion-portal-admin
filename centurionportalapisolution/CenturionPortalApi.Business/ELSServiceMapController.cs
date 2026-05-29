using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class ELSServiceMapController
    {
        public static async Task<IEnumerable<ELSServiceMap>> GetByUidAndNotType(string uid, int type)
        {
            return await ELSServiceMapFacade.GetByUidAndNotType(uid, type);
        }

        public static async Task<IEnumerable<ELSServiceMap>> GetByUidAndType(string uid, int type)
        {
            return await ELSServiceMapFacade.GetByUidAndType(uid, type);
        }

        //public static async Task<IEnumerable<ELSServiceMap>> GetByUidAndType(string uid, int type)
        //{
        //    return await ELSServiceMapFacade.GetByUidAndType(uid, type);
        //}

        public static async Task<IEnumerable<ELSServiceMap>> GetByUidAndType(string uid, int type,UtilitiesController.SelectSomeProperties<ELSServiceMap> ssp )
        {
           return await ELSServiceMapFacade.QueryByIdAndType(uid, type).Select(x=>ssp.Select(x)).ToListAsync();             
        }
        public static IQueryable<ELSServiceMap> GetMatchUserAndLoanAccount(string useruid, string loanAccount)
        {
            return ELSServiceMapFacade.GetMatchUserAndLoanAccount(useruid, loanAccount);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="uid">User Uid</param>
        /// <param name="type">User Type</param>
        /// <param name="viewType">View Type</param>
        /// <returns></returns>
        public static async Task<List<ELSServiceMap>> GetValidLender_ByUidAndTypeAndViewType(string uid, int type, int viewType)
        {
            return await ELSServiceMapFacade.GetValidLender_ByUidAndTypeAndViewType(uid, type, viewType).ToListAsync();
        }

        public static async Task<List<string>> GetValidLender_ByUidAndTypeAndViewType_Only_ParentUids(string uid, int type, int viewType)
        {
            return await ELSServiceMapFacade.GetValidLender_ByUidAndTypeAndViewType(uid, type, viewType).Select(x => x.ParentUid).ToListAsync();
        }

        public static async Task Insert(ELSServiceMap serviceMap)
        {
            await ELSServiceMapFacade.Insert(serviceMap);
        }

        public static async Task<bool> Delete(ELSServiceMap serviceMap)
        {
            return await ELSServiceMapFacade.Delete(serviceMap);
        }
        public static async Task<bool> Delete(string userUid, string parentUid)
        {
            return await ELSServiceMapFacade.Delete(userUid, parentUid);
        }

        public static async Task<List<string>> getValidLoansByUidAndType(string userUid, int userType)
        {
            var maps = ELSServiceMapFacade.QueryByIdAndType(userUid, userType);

            List<string> mapUis = await maps.Select(m => m.ParentUid).ToListAsync();
            //se comento lo de BK por pedido de ellos
            // TODO: List<string> loansValids = CLNSLoanController.GetAll().Where(l => mapUis.Contains(l.Uid) && (l.IsForeclosure == false || l.IsForeclosure == null) /*&& l.IsBankruptcy == false*/).Select(l => l.Uid).ToList();
            // TODO: maps = maps.Where(m => loansValids.Contains(m.ParentUid)).ToList();

            return mapUis;
        }
    }
}
