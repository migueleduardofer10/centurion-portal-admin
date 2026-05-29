using CenturionPortalApi.DataBase.Models.Utilities;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_LNSLoan
    {
        public string? Uid { get; set; }
      //  public int? DepartmentUid { get; set; }
        public string? OrigVendorUid { get; set; }
        public string? TrustAccountUid { get; set; }
        public string? BrokerRepresentative { get; set; }
        public string? BorrowerUid { get; set; }
        public bool? BorrowerIsCompany { get; set; }
        public string? BorrowerCompany { get; set; }
        public string? BorrowerContacName { get; set; }
        public string? BorrowerName { get; set; }
        public string? BorrowerLastName { get; set; }
        public string? BorrowerFullName { get; set; }
        public string? BorrowerAddress { get; set; }
        public string? BorrowerCity { get; set; }
        public string? BorrowerState { get; set; }
        public string? BorrowerZip { get; set; }
        public string? BorrowerHomePhone { get; set; }
        public string? BorrowerEmail { get; set; }
        public int? BorrowerEmailFormat { get; set; }
        public int? BorrowerDeliveryOptions { get; set; }
        public decimal? BorrowerMonthlyIncome { get; set; }
        public string? BorrowerTIN { get; set; }
        public int? BorrowerTINType { get; set; }
        public string? BorrowerTINMask { get; set; }
        public int? BorrowerPrefLang { get; set; }
        public string? PropertyState { get; set; }
        public string? PropertyStreet { get; set; }
        public string? PropertyCity { get; set; }
        public string? PropertyZip { get; set; }
        public int? PropertyOccupancy { get; set; }
        public int? PropertyType { get; set; }
        public string? Account { get; set; }
        public string? PrevAccount { get; set; }
        public string? PrevServCompany { get; set; }
        public bool? PrevServIsNew { get; set; }
        public DateTime? PrevServTransfer { get; set; }
        public decimal? StartingBalance { get; set; }
        public decimal? OriginalBalance { get; set; }
        public decimal? PrincipalBalance { get; set; }
        public decimal? ReserveBalanceRestricted { get; set; }
        public decimal? ReserveBalance { get; set; }
        public decimal? ImpoundBalance { get; set; }
        public decimal? DeferredPrinBal { get; set; }
        public decimal? DeferredLateCharges { get; set; }
        public decimal? DeferredUnpaidInt { get; set; }
        public double? NoteRate { get; set; }
        public bool? UseSoldRate { get; set; }
        public double? SoldRate { get; set; }
        public decimal? UnearnedDiscount { get; set; }
        public decimal? UnpaidCharges { get; set; }
        public decimal? UnpaidLateCharges { get; set; }
        public decimal? UnpaidInterest { get; set; }
        public decimal? UnpaidFees { get; set; }
        public decimal? Payment { get; set; }
        public decimal? PaymentReserve { get; set; }
        public decimal? PaymentImpound { get; set; }
        public decimal? PaymentOthers { get; set; }
        public DateTime? IODateToChange { get; set; }
        public DateTime? OriginationDate { get; set; }
        public DateTime? FirstPaymentDate { get; set; }
        public DateTime? PaidToDate { get; set; }
        public DateTime? NextDueDate { get; set; }
        public DateTime? MaturityDate { get; set; }
        public DateTime? PaidOffDate { get; set; }
        public DateTime? Assignment { get; set; }
        public DateTime? BoardingDate { get; set; }
    //    public int? DaysToFirstCall { get; set; }
        public DateTime? PaymentRevision { get; set; }
        public int? LienPosition { get; set; }
        public int? PaymentFrequency { get; set; }
        public int? PaymentDay { get; set; }
        public double? PrepymtPerc { get; set; }
        public int? PrepymtNumMonths { get; set; }
        public int? PrepymtBasedType { get; set; }
        public int? PrepymtMaxType { get; set; }
        public DateTime? PrepymtExpDate { get; set; }
        public double? PrepymtInvestorPerc { get; set; }
        public double? PrepymtVendorPerc { get; set; }
        public int? PrepymtPenalty { get; set; }
        public int? ProductType { get; set; }
        public int? NoteType { get; set; }
        public int? AmortizationType { get; set; }
        public int? RateType { get; set; }
        public int? AccruedMethod { get; set; }
        public bool? NegativeToPrincipal { get; set; }
        public int? LateChargesDays { get; set; }
        public decimal? LateChargesDaily { get; set; }
        public decimal? LateChargesMin { get; set; }
        public decimal? LateChargeMax { get; set; }
        public double? LateChargesPct { get; set; }
        public double? LateChargesCompanyPct { get; set; }
        public double? LateChargesLenderPct { get; set; }
        public double? LateChargesVendorPct { get; set; }
        public int? LateChargesDays2 { get; set; }
        public decimal? LateChargesAmt2 { get; set; }
        public double? LateChargesPct2 { get; set; }
        public bool? NoPyramiding { get; set; }
        public double? DefaultIntRate { get; set; }
        public int? DefaultIntDays { get; set; }
        public int? DefaultIntModifier { get; set; }
        public int? DefaultIntDateFrom { get; set; }
        public DateTime? DefaultCustomDateFrom { get; set; }
        public int? TermInMonths { get; set; }
        public DateTime? FCSDateRescinded { get; set; }
        public int? FCSState { get; set; }
        public DateTime? ESCNextInterestDate { get; set; }
        public decimal? ESCUnpaidInterest { get; set; }
        public decimal? ESCPaidInterest { get; set; }
        public double? ESCInterestRate { get; set; }
        public int? ESCFrequency { get; set; }
        public bool? ESCActive { get; set; }
        public int? ESCCalculationMethod { get; set; }
        public DateTime? ESCInterestFrom { get; set; }
        public int? ESCDayDue { get; set; }
        public bool? AutoUnpaidInterest { get; set; }
        public bool? IsUnpaidInterest { get; set; }
        public bool? Is30DayMonths { get; set; }
        public bool? Is365DayYears { get; set; }
        public int? Purpose { get; set; }
        public int? Modification { get; set; }
        public int? Status { get; set; }
        public bool? RepaymentStatus { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsOnHold { get; set; }
        public bool? IsForeclosure { get; set; }
        public bool? IsBankruptcy { get; set; }
        public bool? IsREO { get; set; }
        public bool? IsInstitutional { get; set; }
        public bool? IsChargeOff { get; set; }
        public bool? IsCompleteChargeOff { get; set; }
        public string? InvestAssetNumber { get; set; }
        public int? DocumentationType { get; set; }
    //    public string? UserCollector { get; set; }
   //     public string? UserCollectorUid { get; set; }
 //       public DateTime? LastRevision { get; set; }
      //  public DateTime? FollowUpDate { get; set; }
      //  public int? LastCallCode { get; set; }
    //    public int? LastRevisionCode { get; set; }
        public int? BoardingStepUid { get; set; }
        public int? ACHStatus { get; set; }
        public int? CallDaysAfterDue { get; set; }
        public bool? CanCallAfterGrace { get; set; }
        public int? TimesToCall { get; set; }
        public int? TimesToCallPer { get; set; }
        public int? ServincingType { get; set; }
     //   public int? PTPGraceDays { get; set; }
     //   public bool? AutoFollowUp { get; set; }
        public bool? FloatSendNotice { get; set; }
        public bool? SendLateNotice { get; set; }
        public bool? SendPayStatement { get; set; }
        public bool? Form1098 { get; set; }
        public int? WhenDelinquent { get; set; }
        public bool? CallsToBeHotTransfered { get; set; }
        public bool? ModifiyDeedInLui { get; set; }
        public int? CollectionServices { get; set; }
        public bool? CanPrepareFinancial { get; set; }
        public bool? CanDesignRepaymenyt { get; set; }
        public bool? CanReqBPO { get; set; }
        public bool? CanForgiveDuePayments { get; set; }
        public bool? CanForgiveDueCharges { get; set; }
        public bool? CanForgivePrincipal { get; set; }
        public bool? CanCreateForebearance { get; set; }
        public bool? CanAcceptDeed { get; set; }
        public bool? CanOfferCash { get; set; }
        public bool? CanAllowShortSale { get; set; }
        public bool? ReqCopyNotice { get; set; }
        public bool? ReqCopyLate { get; set; }
        public double? APR { get; set; }
        public decimal? ExtraCost { get; set; }
        public double? FICAScore { get; set; }
        public int? FICAAgency { get; set; }
        public DateTime? FICAScoreDate { get; set; }
        public double? FICAOriginalScore { get; set; }
        public int? FICAOriginalAgency { get; set; }
        public DateTime? FICAOriginalScoreDate { get; set; }
        public string? ACHReceivingDFI { get; set; }
        public string? ACHAccountNumber { get; set; }
        public string? ACHAccountRefNumber { get; set; }
        public string? ACHIndividualIdNumber { get; set; }
        public string? ACHIndividualName { get; set; }
        public int? ACHBankAccountType { get; set; }
        public decimal? ACHPaymentAmount { get; set; }
        public DateTime? ACHFinishDate { get; set; }
        public int? ACHPaymentDay { get; set; }
        public DateTime? ACHNextDueDate { get; set; }
        public int? ACHPaymentFrequency { get; set; }
        public int? ACHPaymentType { get; set; }
        public bool? ACHCustomPayment { get; set; }
        public bool? ACHAllowPymtInBk { get; set; }
        public int? DRETransType { get; set; }
        public decimal? DRESellingPrice { get; set; }
        public decimal? DRECommissionReceived { get; set; }
        public decimal? DRECostsBorrowerPaid { get; set; }
        public decimal? DRECostsBrokerRetained { get; set; }
        public decimal? DRENotePurcharsePrice { get; set; }
        public decimal? DRENoteSellingPrice { get; set; }
        public bool? DRERefinanceBrokerLoan { get; set; }
        public bool? DREBrokerFundedLoanResale { get; set; }
        public int? DREOriginalRetain { get; set; }
        public bool? Article7 { get; set; }
        public bool? Section32 { get; set; }
        public bool? DRESec4970 { get; set; }
        public int? RiskProfile { get; set; }
        public string? IndexARMUid { get; set; }
        public double? FloatStepRate { get; set; }
        public bool? FloatUserIndex { get; set; }
        public DateTime? FloatStepEnd { get; set; }
        public int? FloatDaysAfterRateChange { get; set; }
        public double? FloatIndex { get; set; }
        public double? FloatMargin { get; set; }
        public double? FloatCeiling { get; set; }
        public double? FloatFloor { get; set; }
        public bool? FloatEnableFirstRateCap { get; set; }
        public decimal? FloatFirstRateMinCap { get; set; }
        public decimal? FloatFirstRateMaxCap { get; set; }
        public decimal? FloatPeriodicMinCap { get; set; }
        public decimal? FloatPeriodicMaxCap { get; set; }
        public decimal? FloatRoundRateFactor { get; set; }
        public int? FloatRoundMethod { get; set; }
        public DateTime? FloatNextAdjRate { get; set; }
        public int? FloatFreqRateChange { get; set; }
        public bool? FloatEnableSurplus { get; set; }
        public decimal? FloatSurplus { get; set; }
        public int? FloatDaysAfterPymtChange { get; set; }
        public bool? FloatEnabledPymtAdj { get; set; }
        public decimal? FloatCapForPayment { get; set; }
        public DateTime? FloatNextAdjPayment { get; set; }
        public int? FloatFreqPymtChange { get; set; }
        public decimal? FloatCapForNegAmort { get; set; }
        public bool? FloatEnableRecast { get; set; }
        public int? FloatFreqRecast { get; set; }
        public DateTime? FloatNextAdjRecast { get; set; }
        public DateTime? FloatStopRecast { get; set; }
        public bool? FloatEnableLastRecast { get; set; }
        public DateTime? FloatLastRecast { get; set; }
        public bool? ARMOptionActive { get; set; }
        public DateTime? FloatFirstNoticeSent { get; set; }
        public bool? FloatAdjFromNextChange { get; set; }
        public int? LINDrawPeriod { get; set; }
        public decimal? LINDrawMin { get; set; }
        public decimal? LINDrawMax { get; set; }
        public bool? LINDrawMaxActive { get; set; }
        public bool? LINDrawFeeActive { get; set; }
        public decimal? LINDrawFeePct { get; set; }
        public decimal? LINDrawFeePlus { get; set; }
        public decimal? LINDrawFeeMin { get; set; }
        public DateTime? LINDrawBookingDate { get; set; }
        public int? LINRepayPeriod { get; set; }
        public int? LINRepaymentType { get; set; }
        public decimal? LINCreditLim { get; set; }
        public int? LINBillFreq { get; set; }
        public DateTime? LINBillDate { get; set; }
        public int? LINBillStart { get; set; }
        public DateTime? LINNextBillingDate { get; set; }
        public bool? LINMaintenanceFeeActive { get; set; }
        public decimal? LINMaintenanceFeeAmount { get; set; }
        public int? LINMaintenanceFeeFreq { get; set; }
        public DateTime? LINMaintenanceFeeNextChargeDate { get; set; }
        public int? LINCalcMethod { get; set; }
        public bool? LINExFinanceCharges { get; set; }
        public bool? LINExImpoundBalances { get; set; }
        public bool? LINExReserveBalances { get; set; }
        public bool? LINExLateCharges { get; set; }
        public decimal? LINEarlyFees { get; set; }
        public int? LINEarlyMonths { get; set; }
        public bool? LINMultiBilling { get; set; }
        public DateTime? ESCNextProject { get; set; }
        public bool? ESCSendStatement { get; set; }
        public bool? SendReceipt { get; set; }
        public bool? SubServicerActive { get; set; }
        public string? SubServicerOf { get; set; }
        public string? BoardingRep { get; set; }
        public bool? SCRA { get; set; }
        public int? BrokerType { get; set; }
        public string? BrokerUid { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string? AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string? AppLastUpdatedBy { get; set; }
   //     public byte[] SysTimeStamp { get; set; }
        public bool? IsFpaExempt { get; set; }
        public bool? ExemptCFPB { get; set; }
        public DateTime? FloatDateRateChanged { get; set; }
        public DateTime? FloatDateNextAdjustment { get; set; }
        public double? PrepymtCompanyPct { get; set; }
        public decimal? LateChargesCompanyMaxDist { get; set; }
        public decimal? CapitalExpeditures { get; set; }
        public decimal? RepairManteinance { get; set; }
        public decimal? Miscellaneous { get; set; }
        public decimal? SecurityDeposit { get; set; }
        public decimal? AdvanceRentReserve { get; set; }
        public decimal? PropertyManagement { get; set; }
        public decimal? ExpenseReserve { get; set; }
        public decimal? TaxReserve { get; set; }
        public decimal? InsuranceReserve { get; set; }
        public decimal? TrustBalance { get; set; }
        public DateTime? LastStatementDate { get; set; }
        public double? DefaultIntLenderPct { get; set; }
        public decimal? UnpaidDefaultInt { get; set; }
        public string? PropertyCounty { get; set; }
        public bool? DefaultIntAllowLateCharges { get; set; }
        public double? DefaultIntVendorPct { get; set; }
        public double? DefaultIntCompanyPct { get; set; }
        public decimal? DefaultIntCompanyMaxDist { get; set; }
        public string? LossMitText { get; set; }
        public bool? LINDoNotCollapse { get; set; }
        public bool? LateChargesPostMaturity { get; set; }
        public DateTime? ServiceTansferDate { get; set; }
        public string? ServiceTansferVendorUid { get; set; }
        public decimal? TaxAdvanceReserve { get; set; }
        public decimal? InsuranceAdvanceReserve { get; set; }
        public DateTime? ServiceTransferFirstPaymentDate { get; set; }
        public decimal? PrepymtIntGuaranteeAmt { get; set; }
        public DateTime? ClosingDate { get; set; }
        public string? FederalLicensedUid { get; set; }
        public bool? Form1099 { get; set; }
        public bool? DefaultIntIsEnabled { get; set; }
        public int? DefaultIntEffectiveDays { get; set; }
        public int? DefaultIntEffectiveDateFrom { get; set; }
        public int? DefaultIntOptionDays { get; set; }
        public int? DefaultIntEffectiveOptionDays { get; set; }
        public DateTime? DefaultIntLastImplementationDate { get; set; }
        public DateTime? DefaultIntLastEffectiveDate { get; set; }
        public string? BorrowerTinEncrypted { get; set; }
        public bool? DefaultIntLastEffectiveStatus { get; set; }
        public int? PrimaryPurpose { get; set; }
        public bool? IsCoveredCFPB { get; set; }
        public int? ClosedReason { get; set; }

        [NotMapped]
        public string? DepartmentName { get; set; }
        [NotMapped]
        public decimal? AccruedLateCharges { get; set; }


        //Change this to change the reference NOW date for calculating CalcNoteRate
        [NotMapped]
        public DateTime? nowDate = null;
        [NotMapped]
        public DateTime? LimitDefaultDate
        {
            get
            {
                if (this.DefaultIntIsEnabled ?? false /*this.DefaultIntModifier != (int?)Enums.LendingRateTypesEnum.NONE*/)
                {
                    if (nowDate != null && !(this.DefaultIntLastEffectiveStatus ?? false)) this.CalculateDefaultIntDates();

                    if (this.DefaultIntLastEffectiveStatus ?? false && this.DefaultIntLastImplementationDate.HasValue)
                    {
                        return this.DefaultIntLastEffectiveDate.Value;
                    }
                }
                return null;
            }
        }
        [NotMapped]
        public double? CalcNoteRate
        {
            get
            {
                return GetCurrentRate();
            }
        }
        [NotMapped]
        public double? DefaultIntRateCombined
        {
            get
            {
                if (this.DefaultIntIsEnabled ?? false)
                {
                    switch (DefaultIntModifier)
                    {
                        case 1://modifier
                            return NoteRate + DefaultIntRate;
                        case 2:
                            return DefaultIntRate;
                        default: return 0;
                    }
                }
                else return 0;
            }
        }

        public void CalculateDefaultIntDates()
        {
            if (this.DefaultIntIsEnabled??false)
            {
                this.DefaultIntLastEffectiveDate = this.CalculateDefaultIntEffectiveDate();
                this.DefaultIntLastImplementationDate = this.CalculateDefaultIntImplementationDate();
            }
            else
            {
                this.DefaultIntLastEffectiveDate = null;
                this.DefaultIntLastImplementationDate = null;
            }
            if (this.DefaultIntLastImplementationDate != null && this.DefaultIntLastImplementationDate <= (this.nowDate ?? DateTime.Now.Date))
                this.DefaultIntLastEffectiveStatus = true;
            else
            {
                this.DefaultIntLastEffectiveStatus = false;
                this.DefaultIntLastEffectiveDate = null;
                this.DefaultIntLastImplementationDate = null;
            }
        }

        public DateTime? CalculateDefaultIntEffectiveDate()
        {
            DateTime? effectiveRule = null;
            if (this.DefaultIntIsEnabled ?? false /*this.DefaultIntModifier != (int?)Enums.LendingRateTypesEnum.NONE*/)
            {

                if (this.DefaultIntEffectiveDateFrom == (int?)Enums.DefaultIntDateFromEnum.IMPLEMENTATION_RULE)
                {
                    effectiveRule = CalculateDefaultIntImplementationDate();
                }
                else if (this.NextDueDate.HasValue && this.DefaultIntEffectiveDateFrom == (int?)Enums.DefaultIntDateFromEnum.NEXTDUEDATE)
                {
                    effectiveRule = (DateTime?)this.NextDueDate.Value;
                }
                else if (this.MaturityDate.HasValue && this.DefaultIntEffectiveDateFrom == (int?)Enums.DefaultIntDateFromEnum.MATURITY_DATE)
                {
                    effectiveRule = (DateTime?)this.MaturityDate.Value;
                }
                else if (this.PaidToDate.HasValue && this.DefaultIntEffectiveDateFrom == (int?)Enums.DefaultIntDateFromEnum.PAID_TO_DATE) //[Ticket #61333]
                {
                    effectiveRule = (DateTime?)this.PaidToDate.Value;
                }
                else
                {
                    return null;
                }
                if (effectiveRule != null)
                {
                    if (DefaultIntEffectiveOptionDays == (int?)Enums.DefaultIntOptionDaysEnums.MONTHS) effectiveRule = effectiveRule.Value.AddMonths(DefaultIntEffectiveDays??0);
                    else 
                        effectiveRule = effectiveRule.Value.AddDays(DefaultIntEffectiveDays??0);
                    // comentado por [Ticket #72779] 
                    //effectiveRule = effectiveRule.Value.AddDays(1);
                    return effectiveRule;
                }
            }
            return effectiveRule;
        }

        public DateTime? CalculateDefaultIntImplementationDate()
        {
            DateTime? implementationDate = null;
            if (/*this.DefaultIntDateFrom == (int?)Model.Enums.DefaultIntDateFromEnum.CUSTOM_DATE && */ DefaultCustomDateFrom.HasValue /*Custom*/)
                implementationDate = DefaultCustomDateFrom.Value;//days = dttNow.Value.Subtract(DefaultCustomDateFrom.Value).Days;
            else
            {
                if (this.DefaultIntDateFrom == (int?)Enums.DefaultIntDateFromEnum.NEXTDUEDATE && NextDueDate.HasValue /*Next Due*/)
                    implementationDate = NextDueDate.Value;//days = dttNow.Value.Subtract(NextDueDate.Value).Days;
                else if (this.DefaultIntDateFrom == (int?)Enums.DefaultIntDateFromEnum.MATURITY_DATE && MaturityDate.HasValue/*Maturity*/)
                    implementationDate = MaturityDate.Value;//days = dttNow.Value.Subtract(MaturityDate.Value).Days;
                else if (this.DefaultIntDateFrom == (int?)Enums.DefaultIntDateFromEnum.PAID_TO_DATE && PaidToDate.HasValue /*Paid To Date*/)
                    implementationDate = PaidToDate.Value;// days = dttNow.Value.Subtract(PaidToDate.Value).Days;

                if (implementationDate != null)
                {
                    if (DefaultIntOptionDays == (int?)Enums.DefaultIntOptionDaysEnums.MONTHS) implementationDate = implementationDate.Value.AddMonths(DefaultIntDays??0);
                    else implementationDate = implementationDate.Value.AddDays(DefaultIntDays??0);
                }
            }
            return implementationDate;
        }

        private double? GetCurrentRate(bool? ommitedEffectiveDate = false)
        {
            double? defaultIntRateCombined = this.DefaultIntRateCombined;
            if (defaultIntRateCombined == 0) return NoteRate;

            DateTime? dttNow = nowDate;
            if (dttNow == null) dttNow = DateTime.Now.Date;

            //int? days = dttNow.Value.Subtract(NextDueDate.Value).Days; // Dias que se paso

            // Dias que se paso a partir del Next Due o del Maturity 
            int? days = 0;

            //if (this.LimitDefaultImplementationDate != null) days = dttNow.Value.Subtract(this.LimitDefaultImplementationDate.Value).Days;

            //Se supone que si nowdate es null lo estan llamando desde un getbyuid
            if (nowDate != null && !(this.DefaultIntLastEffectiveStatus ?? false)) this.CalculateDefaultIntDates();

            if ((this.DefaultIntLastEffectiveStatus ?? false) && this.DefaultIntLastImplementationDate.HasValue)
            {
                days = dttNow.Value.Subtract(this.DefaultIntLastImplementationDate.Value).Days;
                //if(IsPayoffPayment)
                //    days = dttNow.Value.Subtract(this.DefaultIntLastImplementationDate.Value).Days;
                //else
                //    days = this.NextDueDate.Value.Subtract(this.DefaultIntLastImplementationDate.Value).Days;
            }

            if (days > 0 /*DefaultIntDays*/ && ((ommitedEffectiveDate ?? false) || this.PaidToDate >= this.DefaultIntLastEffectiveDate))
            {
                return defaultIntRateCombined;
            }
            return NoteRate;
        }
    }
}
