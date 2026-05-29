using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
    public class UtilitiesMasterFilterFacade
    {
        #region[Get Parameters By Report]
        public static MasterFilterParameter getMFP_By_LenderDisbursement(string userUid, int userType)
        {
            return new MasterFilterParameter {
                UserUid = userUid, // UserUid login
                UserType = userType, // UserTyoe Login
                Header = null,// header from group box
                ShowLenders = true,// show combo of Lenders
                IncludeAllParent = true,// include in combo lenders --any lenders--
                OptionFilterLoan = MasterFilterParameter.masterFilterLoanOption.WITH_RANGE, // include range of loans or hide combos
                IncludeAllLoans = false,// include in combo loans --any loans--
                IncludeBalanceCero = true,// include balance cero
                
                ShowOnHold = false //show checkbox "include on hold"
                
            };
        }
        #endregion

        public static IQueryable<vwl_LNSLoan> getLoansMasterFilter(MasterFilterParameter modelMVF, LirsDbContext parentDB = null, bool includeAssignedLoans = true, string lenderUid = "")
        {
            LirsDbContext db = parentDB ?? new LirsDbContext();
            List<string> parentUids = new List<string>();
            List<ELSServiceMap> Map = new List<ELSServiceMap>();
            if (string.IsNullOrEmpty(lenderUid))
            {
                Map = ELSServiceMapFacade.QueryByIdAndType(modelMVF.UserUid, modelMVF.UserType).ToList();
                parentUids = Map.Select(p => p.ParentUid).ToList();
            }
            else
            {
                parentUids = new List<string>();
                parentUids.Add(lenderUid);
            }
            modelMVF.Map = Map;
            return null
            /*modelMVF.OptionFilterLoan == MasterFilterParameter.masterFilterLoanOption.NONE
            ? CLNSLoanController.GetAll(0, "", true, -1, null, null, "", false, false, db).Where(l => 0 == 1)
            : (
                modelMVF.UserType == (int)Enums.UserTypeEnum.LENDER
                ? CLNSLoanController.GetAllByLenderUids(parentUids, modelMVF.IncludeBalanceCero, db, modelMVF.FilterLoanStatus, includeAssignedLoans)
                : (
                modelMVF.UserType == (int)Enums.UserTypeEnum.BROKER
                ? CLNSLoanController.GetAll(0, "", modelMVF.IncludeBalanceCero, -1, null, null, "", false, false, db).Where(l => parentUids.Contains(l.BrokerRepresentative) && (modelMVF.FilterLoanStatus == null || l.Status == (int?)modelMVF.FilterLoanStatus))
                : CLNSLoanController.GetAll(0, "", true, -1, null, null, "", false, false, db).Where(l => 0 == 1)
                )
            )*/;
        }
    }
}
