using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.Views
{
    public class vw_VendorHistory
    {
        public DateTime? CheckDate { get; set; }
        public string? CheckNo { get; set; }
        public string? CheckMemo { get; set; }
        public string? PaymentCode { get; set; }


        public decimal? ToInterest { get; set; }
        public decimal? ToPrincipal { get; set; }
        public decimal? ToServiceFee { get; set; }
        public decimal? ToLateCharge { get; set; }
        public decimal? ToChargesPrincipal { get; set; }
        public decimal? ToChargesInterest { get; set; }
        public decimal? ToPrepay { get; set; }
        public decimal? ToOtherTaxable { get; set; }
        public decimal? ToTrust { get; set; }
        public decimal? ToOtherPayments { get; set; }
        public decimal? ToOtherTaxFree { get; set; }
        public decimal? ToEscrowInt { get; set; }
        public decimal? ToUnpaidFees { get; set; }
        public decimal? CheckAmount { get; set; }



        public DateTime? PaymentDate { get; set; }
        public DateTime? PaymentDue { get; set; }


        public string? AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }


        public DateTime? AppTimeStamp { get; set; }
        public string? Uid { get; set; }
        public string? VendorUid { get; set; }


        public decimal? Balance { get; set; }
        public decimal? ToGSTax { get; set; }


        public string? Account { get; set; }
        public string? BorrowerName { get; set; }
        public string? BorrowerFullName { get; set; }
        public string? AccountName { get; set; }
        public string? BrokerRepresentative { get; set; }
        public string? Notes { get; set; }


    }
}
