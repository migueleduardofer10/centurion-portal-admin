using System.ComponentModel.DataAnnotations;

namespace CenturionPortalApi.DataBase.Models.Request
{
    public class PayPalModel
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
        public string Email { get; set; }
        public bool AcceptTerms { get; set; }
    }
}
