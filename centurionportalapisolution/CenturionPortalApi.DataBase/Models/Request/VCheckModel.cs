using Centurion.Utilities.VCheck;
using System.ComponentModel.DataAnnotations;

namespace CenturionPortalApi.DataBase.Models.Request
{
    public class VCheckModel
    {
        [Required]
        public string Uid { get; set; }
        [Required]
        public decimal Amount { get; set; }
        public decimal RegularPayment { get; set; }
        [Required]
        public decimal AddlCharges { get; set; }
        [Required]
        public decimal ServiceFee { get; set; }
        public string Notes { get; set; }
        [Required]
        public string InvoiceNumber { get; set; }
        [Required]
        public string InvoiceUid { get; set; }

        [Required]
        [RoutingNumber]
        public string RoutingNumber { get; set; }
        [Required]
        [RoutingNumber(ErrorMessage = "Confirm routing number is invalid.")]
        public string RoutingConfirm { get; set; }
        [Required]
        [AccountNumber]
        public string AccountNumber { get; set; }
        [Required]
        [AccountNumber(ErrorMessage = "Confirm account number must be 4 ~ 17 digits.")]
        public string AccountConfirm { get; set; }
        [Required]
        [RegularExpression(@"^\d{3,10}$")]
        public string CheckNumber { get; set; }
        [Required]
        [StringLength(45)]
        public string PayerName { get; set; }
        [Required]
        [StringLength(45)]
        public string PayerAddress { get; set; }
        [Required]
        [StringLength(45)]
        public string PayerCity { get; set; }
        [Required]
        [StringLength(2)]
        public string PayerState { get; set; }
        [Required]
        [StringLength(10)]
        public string PayerZip { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public decimal AddlPrincipal { get; set; }
        [Required]
        public decimal AddlUnpaidInterest { get; set; }
        [Required]
        public decimal AddlImpound { get; set; }
        [Required]
        public decimal AddlReserve { get; set; }
        [Required]
        public decimal ToLateCharges { get; set; }
        public bool AcceptTerms { get; set; }
    }
}
