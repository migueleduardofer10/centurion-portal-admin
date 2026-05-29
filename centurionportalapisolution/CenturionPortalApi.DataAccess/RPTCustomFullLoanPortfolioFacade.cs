using Centurion.Boarding;
using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
    public static class RPTCustomFullLoanPortfolioFacade
    {
        public static IQueryable<RPTCustomFullLoanPortfolio> getLoansMasterFilter(

       string userUid, Centurion.Utilities.CENTEnums.UserTypeEnum userType,
       bool useRange,
       int from, int to,
         bool includeInactive , string lenderUid )
        {
            try
            {

                var context = new LirsDbContext();

                var loans = LNSLoanFacade.Get_CbLoansFilter(context, userUid, userType);

                var mapQuery = v_IRSServiceMapFacade.Get_ParentUid(context, userUid, userType).ToList();
 
                if (!string.IsNullOrEmpty(lenderUid))
                {

                    if (userType == Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER)//  userlogin.UserType == (int)WebModel.Utilities.WebModelUtilities.UserTypeEnum.LENDER)
                        loans = loans.Where(l => context.vwl_LNSLending.Where(lend => lend.LenderUid == lenderUid && lend.LoanUid == l.Uid).Count() > 0).AsQueryable();
                    else if (userType == Centurion.Utilities.CENTEnums.UserTypeEnum.BROKER)//  userlogin.UserType == (int)WebModel.Utilities.WebModelUtilities.UserTypeEnum.BROKER)
                        loans = loans.Where(l => l.BrokerRepresentative == lenderUid).AsQueryable();
                }
                
                var query = context.VCW_VendorPortfolioFullData.Where(obj =>
                mapQuery.Contains(obj.LenderUid) &&
                (includeInactive==false?obj.CurrentBalance>0:true)
                //(userType == Centurion.Utilities.CENTEnums.UserTypeEnum.LENDER ? mapQuery.Contains(obj.LenderUid):true) &&
                //(userType == Centurion.Utilities.CENTEnums.UserTypeEnum.BORROWER? mapQuery.Contains(obj.OfficerUid):true)
              ).AsQueryable();
              

                var RateTypeList = Centurion.Utilities.CENTEnums.EnumDescriptionList(typeof(Centurion.Utilities.CENTEnums.RateTypeEnum)).ToList();
                var ACHStatusEnumList = Centurion.Utilities.CENTEnums.EnumDescriptionList(typeof(Centurion.Utilities.CENTEnums.ACHStatusEnum)).ToList();

                var PropertyType = Centurion.Utilities.CENTEnums.EnumDescriptionList(typeof(Centurion.Utilities.CENTEnums.PropertyTypeEnum));

                var LoanPrimaryPurpose = Centurion.Utilities.CENTEnums.EnumDescriptionList(typeof(LoanPrimaryPurposeEnum));

                var PropertyOccupancy = Centurion.Utilities.CENTEnums.EnumDescriptionList(typeof(Centurion.Utilities.CENTEnums.PropertyOccupancyStatusEnum));
                var LoanStatus = new Dictionary<int, string>() 
                {
                    {0 , "Performing"},
                    {1 , "Closed"},//Non Active
                    {2 , "Paid Off"},
                    {3 , "Transferred"},
                    {4 , "Bankruptcy"},
                    {5 , "Foreclosure"},
                    {6 , "REO"},
                    {7 , "Charge Off"},
                    {8 , "Complete Charge Off"},
                    {9 , "Transfer Out"},
                    {10 ,"Payoff Demand"},
                    {11 ,"Pre Boarding"},
                    {12 ,"Final Boarding"},
                    {13 ,"RESPA"},
                    {14 ,"Loss-Mit Request"},
                    {15 ,"Delinquent"}
                };

                loans = loans.OrderBy(x => x.Account);

                if (useRange)
                {
                    loans = loans.Skip(from).Take(to - from);
                }

                var list = (from x in query
                            join l in loans on x.LoanUid equals l.Uid
                            select x)
                                .Select(x => new RPTCustomFullLoanPortfolio()
                                {
                                    Account = x.Account,
                                    DepartmentName = (x.DepartmentName == "Specialty Servicing" ? "National" : "FCI"),
                                    PrevAccount = x.PrevAccount,
                                    OrigLender = x.OrigLender,
                                    LenderAccount = x.LenderAccount,
                                    LenderName = x.LenderName,
                                    LenderOwnerPct = x.LenderOwnerPct != null ? String.Format("{0:P3}", x.LenderOwnerPct) : "",
                                    LenderFundDate = (x.LenderFundDate != null ? String.Format("{0:MM/dd/yyyy}", x.LenderFundDate) : ""),
                                    Name = x.Name,
                                    BorrowerAddress = x.Status == -1 ? "" : x.BorrowerAddress,
                                    BorrowerCity = x.Status == -1 ? "" : x.BorrowerCity,
                                    BorrowerState = x.Status == -1 ? "" : x.BorrowerState,
                                    BorrowerZip = x.Status == -1 ? "" : x.BorrowerZip,
                                    HomePhone = x.Status == -1 ? "" : x.HomePhone,
                                    WorkPhone = x.Status == -1 ? "" : x.WorkPhone,
                                    MobilePhone = x.Status == -1 ? "" : x.MobilePhone,
                                    BorrowerFax = x.Status == -1 ? "" : x.Fax,
                                    TotalOriginalBalance = String.Format("{0:$#,##0.00;($#,##0.00)}", x.TotalOriginalBalance),
                                    OriginalBalance = String.Format("{0:$#,##0.00;($#,##0.00)}", x.OriginalBalance),
                                    CurrentBalance = String.Format("{0:$#,##0.00;($#,##0.00)}", x.CurrentBalance),
                                    NoteRate = String.Format("{0:P4}", x.NoteRate),
                                    SoldRate = String.Format("{0:P4}", x.SoldRate),
                                    Position = x.Position == 0 ? "1st Lien" : (x.Position == 1 ? "2nd Lien" : ""),
                                    PaymmentImpound = x.Status == -1 ? "" : String.Format("{0:$#,##0.00;($#,##0.00)}", x.PaymentImpound),
                                    PaymmentReserve = x.Status == -1 ? "" : String.Format("{0:$#,##0.00;($#,##0.00)}", x.PaymentReserve),
                                    UnpaidCharges = x.Status == -1 ? "" : String.Format("{0:$#,##0.00;($#,##0.00)}", x.UnpaidCharges),
                                    UnpaidLateCharges = x.Status == -1 ? "" : String.Format("{0:$#,##0.00;($#,##0.00)}", x.UnpaidLateCharges),
                                    UnpaidInterest = x.Status == -1 ? "" : String.Format("{0:$#,##0.00;($#,##0.00)}", x.UnpaidInterest),
                                    SrLoanAmount = "",
                                    UnearnedDisc = x.Status == -1 ? "" : String.Format("{0:$#,##0.00;($#,##0.00)}", x.UnearnedDiscount),
                                    TotalPayment = x.Status == -1 ? "" : String.Format("{0:$#,##0.00;($#,##0.00)}", x.TotalPayment),
                                    Status = x.Status == -1 ? "Assigned" : LoanStatus[x.Status],
                                    LateChargeDays = x.Status == -1 ? "" : x.LateChargesDays.ToString(),
                                    LateChargeMin = x.Status == -1 ? "" : String.Format("{0:$#,##0.00;($#,##0.00)}", x.LateChargesMin),
                                    LateChargePct = x.Status == -1 ? "" : String.Format("{0:P3}", x.LateChargesPct),
                                    PaidToDate = x.Status == -1 ? "" : (x.PaidToDate != null ? String.Format("{0:MM/dd/yyyy}", x.PaidToDate) : ""),
                                    NextDueDate = x.Status == -1 ? "" : (x.NextDueDate != null ? String.Format("{0:MM/dd/yyyy}", x.NextDueDate) : ""),
                                    MaturityDate = x.Status == -1 ? "" : (x.MaturityDate != null ? String.Format("{0:MM/dd/yyyy}", x.MaturityDate) : ""),
                                    PaidOffDate = x.Status == -1 ? "" : (x.PaidOffDate != null ? String.Format("{0:MM/dd/yyyy}", x.PaidOffDate) : ""),
                                    PurchaseDate = x.Status == -1 ? "" : (x.Assignment != null ? String.Format("{0:MM/dd/yyyy}", x.Assignment) : ""),
                                    OriginationDate = x.Status == -1 ? "" : (x.OriginationDate != null ? String.Format("{0:MM/dd/yyyy}", x.OriginationDate) : ""),
                                    BoardingDate = x.Status == -1 ? "" : (x.BoardingDate != null ? String.Format("{0:MM/dd/yyyy}", x.BoardingDate) : ""),
                                    Address = x.Address,
                                    City = x.City,
                                    State = x.State,
                                    Zip = x.PropertyZip,
                                    ApprValue = x.Status == -1 ? "" : (x.AppraiserMarketValue == null ? "" : String.Format("{0:$#,##0.00;($#,##0.00)}", x.AppraiserMarketValue)),
                                    ApprSource = "",
                                    ApprDate = x.Status == -1 ? "" : (x.AppraiserDate != null ? String.Format("{0:MM/dd/yyyy}", x.AppraiserDate) : ""),
                                    LTV = x.Status == -1 ? "" : String.Format("{0:P3}", x.LTV / 100),

                                    Occupancy = x.OccupancyStatus == null? "" :"",//  PropertyOccupancy[x.OccupancyStatus ?? 0],
                                    PropertyType = x.Type == null ? "" : x.Type.ToString(),// PropertyType[x.Type ?? 0],

                                    ACHStatus = ACHStatusEnumList[Convert.ToInt16(x.ACHStatus)],
                                    Tags = x.Tags,

                                    RateType = RateTypeList[x.RateType],
                                    DeferredPrinBal = x.DeferredPrinBal,
                                    DeferredUnpaidInterest = x.DeferredUnpaidInt,
                                    DeferredUnpaidLateCharges = x.DeferredLateCharges,
                                    DeferredUnpaidLoanCharges = x.DeferredUnpaidCharges,
                                    PrimaryPurpose = x.PrimaryPurpose.ToString(),// CUtilitiesController.LoanPrimaryPurpose[x.PrimaryPurpose],
                                    InvestAssetNumber = x.InvestAssetNumber
                                }).AsQueryable();


                return list;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        private enum LoanPrimaryPurposeEnum
        {
            [Description("Consumer")]
            CONSUMER = 0,
            [Description("Business")]
            BUSINESS = 1
        }
        //private static class CUtilitiesController
        //{
        //    public static string[] PropertyType = Centurion.Utilities.CENTEnums.EnumDescriptionList(typeof(Centurion.Utilities.CENTEnums.PropertyTypeEnum));

        //    public static string[] LoanPrimaryPurpose = Centurion.Utilities.CENTEnums.EnumDescriptionList(typeof(LoanPrimaryPurposeEnum));

        //    public static string[] PropertyOccupancy = Centurion.Utilities.CENTEnums.EnumDescriptionList(typeof(Centurion.Utilities.CENTEnums.PropertyOccupancyStatusEnum));

        //    public static Dictionary<int, string> LoanStatus = new Dictionary<int, string>()//UtilitiesController.LoanStatus
        //{
        //    {0 , "Performing"},
        //    {1 , "Closed"},//Non Active
        //    {2 , "Paid Off"},
        //    {3 , "Transferred"},
        //    {4 , "Bankruptcy"},
        //    {5 , "Foreclosure"},
        //    {6 , "REO"},
        //    {7 , "Charge Off"},
        //    {8 , "Complete Charge Off"},
        //    {9 , "Transfer Out"},
        //    {10 ,"Payoff Demand"},
        //    {11 ,"Pre Boarding"},
        //    {12 ,"Final Boarding"},
        //    {13 ,"RESPA"},
        //    {14 ,"Loss-Mit Request"},
        //    {15 ,"Delinquent"}
        //};
        //}


    }
}
