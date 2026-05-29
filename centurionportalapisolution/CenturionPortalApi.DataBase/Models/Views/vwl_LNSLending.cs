using System;
using System.Collections.Generic;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_LNSLending
    {
        public string Uid { get; set; }
        public string LenderUid { get; set; }
        public string LoanUid { get; set; }
        public string TrustAccountUid { get; set; }
        public string LendingBKUid { get; set; }
        public decimal Funds { get; set; }
        public decimal Draws { get; set; }
        public decimal TransferedFunds { get; set; }
        public decimal DeferredFunds { get; set; }
        public decimal WaivedFunds { get; set; }
        public bool RoundError { get; set; }
        public int RateType { get; set; }
        public double RateValue { get; set; }
        public bool GSTaxUse { get; set; }
        public decimal BrokerFeePct { get; set; }
        public decimal BrokerFeePctNPerf { get; set; }
        public decimal BrokerFeeFlat { get; set; }
        public decimal BrokerFeeFlatNPerf { get; set; }
        public decimal BrokerFeeMin { get; set; }
        public decimal BrokerFeeMinNPerf { get; set; }
        public decimal BrokerResFee { get; set; }
        public decimal BrokerResAddFee { get; set; }
        public int BrokerResAddDays { get; set; }
        public decimal BrokerResAddFee_2 { get; set; }
        public int BrokerResAddDays_2 { get; set; }
        public decimal BrokerResAddFee_3 { get; set; }
        public int BrokerResAddDays_3 { get; set; }
        public string VendorUid { get; set; }
        public decimal VendorFeePct { get; set; }
        public decimal VendorFeeFlat { get; set; }
        public decimal VendorFeeMin { get; set; }
        public decimal BFeesHeloc { get; set; }
        public decimal BFeesArm { get; set; }
        public decimal BFeesEscrowImp { get; set; }
        public decimal BFeesOther { get; set; }
        public bool OnePeriod { get; set; }
        public string SecondaryUid { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string AppLastUpdatedBy { get; set; }
        public byte[] SysTimeStamp { get; set; }
        public decimal CloseWaived { get; set; }
        public DateTime? AssignedDate { get; set; }
        public string LenderToVendorUid { get; set; }
        public decimal LenderToVendorFeePct { get; set; }
        public decimal LenderToVendorFeeFlat { get; set; }
        public decimal LenderToVendorFeeMin { get; set; }
    }
}
