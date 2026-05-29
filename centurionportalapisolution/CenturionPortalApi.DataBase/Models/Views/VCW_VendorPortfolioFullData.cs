using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class VCW_VendorPortfolioFullData
    {
       
        
        public string? LoanUid { get; set; }

        
        public string? OfficerUid { get; set; }

        
        public string? LenderUid { get; set; }

        
        public string? Account { get; set; }

        
        public string? PrevAccount { get; set; }

        
        public string? InvestAssetNumber { get; set; }
        
        public string? OrigLender { get; set; }

        
        public string? DepartmentName { get; set; }

        
        public string? Name { get; set; }

        
        public string? LastName { get; set; }

        
        public string? OrigVendorUid { get; set; }

        
        public string? BorrowerAddress { get; set; }

        
        public string? BorrowerCity { get; set; }

        
        public string? BorrowerState { get; set; }

        
        public string? BorrowerZip { get; set; }

        
        public string? BorrowerEmail { get; set; }

        
        public string? HomePhone { get; set; }

        
        public string? WorkPhone{ get; set; }
            
        public string? MobilePhone { get; set; }

        
        public string? Fax { get; set; }

        
        public int Position { get; set; }

        
        public decimal?PaymentImpound { get; set; }
        
        public decimal?PaymentReserve { get; set; }

        
        public decimal?UnpaidCharges { get; set; }

        
        public decimal?UnpaidLateCharges { get; set; }

        
        public decimal?UnpaidInterest { get; set; }
        
        public decimal?UnearnedDiscount { get; set; }

        
        public int LateChargesDays { get; set; }
        
        public decimal?LateChargesMin { get; set; }
        
        public double? LateChargesPct { get; set; }

        
        public DateTime? NextDueDate { get; set; }

        
        public DateTime? MaturityDate { get; set; }

        
        public DateTime? PaidToDate { get; set; }

        
        public DateTime? PaidOffDate { get; set; }

        
        public decimal?PrincipalBalance { get; set; }

        
        public DateTime? Assignment { get; set; }
        
        public DateTime? OriginationDate { get; set; }

        
        public string? Address { get; set; }

        
        public string? City { get; set; }
        
        public string? State { get; set; }

        
        public string? PropertyZip { get; set; }

        
        public int RateType { get; set; }

        
        public int NoteType { get; set; }

        
        public decimal? AppraiserMarketValue { get; set; }

        
        public DateTime? AppraiserDate { get; set; }

        
        public int? ValuationType { get; set; }

        
        public decimal? LTV { get; set; }

        
        public int? OccupancyStatus { get; set; }

        
        public int? Type { get; set; }

        
        public string? SSN { get; set; }

        
        public decimal?TotalOriginalBalance { get; set; }

        
        public decimal?OriginalBalance { get; set; }
        
        public decimal?CurrentBalance { get; set; }

        
        public decimal?VendorFeePct { get; set; }

        
        public bool? IsActive { get; set; }

        
        public double? NoteRate { get; set; }

        
        public double? SoldRate { get; set; }

        
        public decimal? TotalPayment { get; set; }

        
        public int Status { get; set; }
        
        public bool? IsForeclosure { get; set; }

        
        public DateTime? BoardingDate { get; set; }

        
        public int ACHStatus { get; set; }

        
        public string? Tags { get; set; }

        
        public string? LenderAccount { get; set; }

        
        public string? LenderName { get; set; }

        
        public decimal? LenderOwnerPct { get; set; }

        
        public DateTime? LenderFundDate { get; set; }

        
        public int? DrawStatus { get; set; }

        
        public DateTime? CloseDate { get; set; }
        
        public decimal? MaximumDraw { get; set; }
        
        public string? FullName { get; set; }

        
        public string? CoBorrower { get; set; }
        
        public double? CalcInterestRate { get; set; }
        
        public bool? ActiveDefaultInterestRate { get; set; }

        
        public decimal?ReserveBalanceRestricted { get; set; }

        
        public double? DefaultInterestRate { get; set; }

        
        public decimal?DeferredPrinBal { get; set; }

        
        public decimal?DeferredUnpaidInt { get; set; }

        
        public decimal?DeferredLateCharges { get; set; }

        
        public decimal? DeferredUnpaidCharges { get; set; }

        
        public int PrimaryPurpose { get; set; }

        
        public DateTime? ClosingDate { get; set; }

        
        public int? ClosedReason { get; set; }

        
        public bool? DefaultIntLastEffectiveStatus { get; set; }

   


    }
}
