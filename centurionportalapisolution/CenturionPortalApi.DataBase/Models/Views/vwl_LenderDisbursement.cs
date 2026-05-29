using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_LenderDisbursement
    {
        public string Uid { get; set; }
        public string VendorUid             { get;set; }	
        public string FullName              { get;set; }
        public string LastName              { get;set; }
        public string VendorAccount         { get;set; }	
        public string LoanUid               { get;set; }
        public string LoanAccount           { get;set; }
        public string PrevAccount           { get;set; }
        public string InvestAssetNumber     { get;set; }
        public string BorrowerName          { get;set; }
        public string OfficerUid            { get;set; }
        public DateTime? CheckDate          { get;set; }
        public string CheckNo               { get;set; }
        public string CheckMemo             { get;set; }
        public string PaymentCode           { get;set; }
        public decimal ToInterest           { get;set; }
        public decimal ToPrincipal          { get;set; }
        public decimal ToServiceFee         { get;set; }
        public decimal ToLateCharge         { get;set; }
        public decimal ToChargesPrincipal   { get;set; }
        public decimal ToChargesInterest    { get;set; }
        public decimal ToPrepay             { get;set; }
        public decimal ToOtherTaxable       { get;set; }
        public decimal ToTrust              { get;set; }
        public decimal ToOtherPayments      { get;set; }
        public decimal ToOtherTaxFree       { get;set; }
        public decimal ToEscrowInt          { get;set; }
        public decimal ToUnpaidFees         { get;set; }
        public decimal? CheckAmount         { get;set; }
        public DateTime? PaymentDate        { get;set; }
        public DateTime? PaymentDue         { get;set; }
        public string AppCreatedBy          { get;set; }
        public DateTime? AppCreationDate    { get;set; }
        public DateTime? AppTimeStamp       { get;set; }
        public string Expr1                 { get;set; }
        public decimal? Balance             { get;set; }
        public decimal? ToGSTax             { get;set; }
    }
}
