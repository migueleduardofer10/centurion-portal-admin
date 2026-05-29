using System;
using System.ComponentModel.DataAnnotations;

namespace CenturionPortalApi.DataBase.Models.Request
{
    public class CreditCardModel
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
        [Required]
        public int Type { get; set; }
        [Required]
        public string Number { get; set; }
        [Required]
        public string Cvv { get; set; }
        public DateTime? Expiration { get; set; }
        [Required]
        public int? ExpirationMonth { get; set; }
        [Required]
        public int? ExpirationYear { get; set; }
        [Required]
        public string OnName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string BillingAddress { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string Zip { get; set; }
        public string Description { get; set; }
        public bool AcceptTerms { get; set; }
    }
}
