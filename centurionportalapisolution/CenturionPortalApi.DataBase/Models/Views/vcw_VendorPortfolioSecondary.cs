using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public class vcw_VendorPortfolioSecondary
    {
        public string? LoanUid { get; set; }
        public string? OfficerUid { get; set; }
        public string? SecondaryUid { get; set; }
        public string? PrimaryUid { get; set; }
        public string? LendingUid { get; set; }
        public string? Account { get; set; }
        public string? BorrowerFullName { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }



        public decimal? LoanOriginalBalance { get; set; }
        public decimal? LoanPartialBalance { get; set; }
        public decimal? LoanCurrentBalance { get; set; }
        public int? DaysLate { get; set; }


        public DateTime? NextDueDate { get; set; }
        public string? PrimaryAccount { get; set; }
        public decimal? PrimaryOriginalBalance { get; set; }
        public decimal? RemainingEquityPortion { get; set; }
        public double? LenderRate { get; set; }
        public string? SecondaryAccount { get; set; }
       public decimal? SecondaryOriginalBalance { get; set; }
        public decimal? SecondaryCurrentBalance { get; set; }







        public double? SecondaryRate { get; set; }
        public int? SecondaryTermBought { get; set; }
        public double? SecondaryPercentageOwned { get; set; }



        public decimal? SecondaryPmtBought { get; set; }
        public decimal? SecondaryUnpaidLateCharge { get; set; }
        public decimal? SecondaryUnpaidInterest { get; set; }




        public decimal? TotalPayment { get; set; }
        public int? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? Maturity { get; set; }
        public bool? IsForeclosure { get; set; }
        public int? TermsLeft { get; set; }

    }
}
