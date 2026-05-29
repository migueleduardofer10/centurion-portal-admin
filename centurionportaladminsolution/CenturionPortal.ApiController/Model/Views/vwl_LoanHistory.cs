using System;

namespace CenturionPortal.ApiController.Model.Views
{
    public partial class vwl_LoanHistory
    {
        public decimal ToPrincipal { get; set; }
        public decimal Balance { get; set; }
        public decimal ToInterest { get; set; }
        public decimal ToReserve { get; set; }
        public decimal ToCapitalExp { get; set; }
        public decimal ToRepair { get; set; }
        public decimal ToMiscellaneous { get; set; }
        public decimal ToSecurityDeposit { get; set; }
        public decimal ToAdvanceRentReserve { get; set; }
        public decimal ToPropertyManagement { get; set; }
        public decimal ToExpenseReserve { get; set; }
        public decimal ToTaxReserve { get; set; }
        public decimal ToInsuranceReserve { get; set; }
        public decimal ToTaxAdvanceReserve { get; set; }
        public decimal ToInsuranceAdvanceReserve { get; set; }
        public decimal ReserveRestricted { get; set; }
        public decimal ToImpound { get; set; }
        public decimal? ToTrust { get; set; }
        public decimal ToLateCharge { get; set; }
        public decimal ToChargesPrincipal { get; set; }
        public decimal ToChargesInterest { get; set; }
        public decimal ToPrepay { get; set; }
        public decimal ToUnpaidInterest { get; set; }
        public decimal ToUnpaidFees { get; set; }
        public decimal ToBrokerFee { get; set; }
        public decimal ToLenderFee { get; set; }
        public decimal ToOtherPayments { get; set; }
        public decimal ToOtherTaxable { get; set; }
        public decimal ToOtherTaxFree { get; set; }
        public decimal ToUnpaidEscrowInt { get; set; }
        public DateTime? DateDue { get; set; }
        public string Notes { get; set; }
        public bool HasImgCheck { get; set; }
        public decimal LateCharge { get; set; }
        public string Code { get; set; }
        public int OtherPaymentType { get; set; }
        public decimal? TotalAmount { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string LoanUid { get; set; }
        public string Uid { get; set; }
        public string Reference { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? DateDeposited { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public DateTime? ReleaseDateExt { get; set; }
        public int Type { get; set; }
        public int? DayVariance { get; set; }
        public bool? IsACH { get; set; }
        public string SplitUid { get; set; }
    }
}
