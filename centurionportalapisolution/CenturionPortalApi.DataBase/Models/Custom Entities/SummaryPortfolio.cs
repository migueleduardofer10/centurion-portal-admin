using System;

namespace CenturionPortalApi.DataBase.Models.Custom_Entities
{
    public class SummaryPortfolio
    {
        public Int32 Loans { get; set; }
        public decimal OriginalBalance { get; set; }
        public decimal TotalOriginalBalance { get; set; }
        public decimal PrincipalBalance { get; set; }
        public double NoteRate { get; set; }
        public double SoldRate { get; set; }


        public decimal LoanUPB { get; set; }
        public decimal TotalPayment { get; set; }


        public decimal LoanPartialBalance { get; set; }
        public decimal LoanOriginalBalance { get; set; }
        public decimal LoanCurrentBalance { get; set; }
        public decimal PrimaryOriginalBalance { get; set; }
        public decimal RemainingEquityPortion { get; set; }
        public decimal SecondaryOriginalBalance { get; set; }
        public decimal SecondaryCurrentBalance { get; set; }
        public double SecondaryRate { get; set; }

        public double LenderRate { get; set; }
    }
}
