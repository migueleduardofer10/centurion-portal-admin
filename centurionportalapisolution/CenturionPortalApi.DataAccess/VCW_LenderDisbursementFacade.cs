using CenturionPortalApi.DataBase.Context;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.DataAccess
{
    public static class VCW_LenderDisbursementFacade
    {

        public static async Task< decimal> GetTotalDisbursement(string userUid, Centurion.Utilities.CENTEnums.UserTypeEnum userType, DateTime currentDate)
        {
  
            var db = new LirsDbContext();
     
            try
            {
                var mapQuery = v_IRSServiceMapFacade.Get_ParentUid(db,userUid, userType);


                return await db.VCW_LenderDisbursement.Where(x => 
                
                (userType== Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER? mapQuery.Contains(x.OfficerUid):true) &&
                (userType== Centurion.Utilities.CENTEnums.UserTypeEnum.BORROWER?mapQuery.Contains(x.VendorUid):true) &&
                
                (x.CheckNo == "Print" || x.CheckDate >= currentDate)).SumAsync(s => s.CheckAmount) ?? 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static async Task<  int> GetAwaitingDisbursementCount(string userUid, Centurion.Utilities.CENTEnums.UserTypeEnum userType, DateTime currentDate)
        {
           
            var db = new LirsDbContext();
           
            try
            {
                var mapQuery = v_IRSServiceMapFacade.Get_ParentUid(db,userUid, userType);


                return await db.VCW_LenderDisbursement.Where(x =>

                (userType == Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER ? mapQuery.Contains(x.OfficerUid) : true) &&
                (userType == Centurion.Utilities.CENTEnums.UserTypeEnum.BORROWER ? mapQuery.Contains(x.VendorUid) : true) &&

                (x.CheckNo == "Print" || x.CheckDate >= currentDate)).CountAsync() ;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //public static decimal GetTotalDisbursement(string userUid,
        //    Centurion.Utilities.CENTEnums.UserTypeEnum userType, DateTime currentDate)
        //{


        //    var mapQuery = v_IRSServiceMapFacade.Get_ParentUid(userUid, userType);

        //    //var db = new LirsDbContext();
        //    //decimal? Total = 0;

        //    try
        //    {

        //        //var column = "";
        //        //switch (userType) { case Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER:

        //        //        column = " l.officerUid ";
        //        //        break;
        //        //    case Centurion.Utilities.CENTEnums.UserTypeEnum.BORROWER:
        //        //        column = " l.vendorUid ";
        //        //        break;
        //        //}
        //        //var where = "";
        //        //if (column!="")
        //        //{
        //        //    where = $@"
        //        //        select m.ParentUid from Centurion_Web..IRSServiceMap m
        //        //        where m.UserUid = @userUid and m.type = @userType and m.parentUid = {column} and 
        //        //    ";
        //        //}




        //        return new LirsDbContext().VCW_LenderDisbursement.Where(x =>
        //        (userType == Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER ? mapQuery.Contains(x.OfficerUid) : true) &&
        //        (userType == Centurion.Utilities.CENTEnums.UserTypeEnum.BORROWER ? mapQuery.Contains(x.VendorUid) : true) &&
        //        (x.CheckNo == "Print" || x.CheckDate >= currentDate))
        //            .Sum(s => s.CheckAmount) ?? 0;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}




    }
}
