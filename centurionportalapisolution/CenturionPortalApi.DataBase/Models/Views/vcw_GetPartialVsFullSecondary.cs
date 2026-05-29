using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public class vcw_GetPartialVsFullSecondary
    {
        public string LoanUid { get; set; }
        public string SecondaryUid { get; set; }
        public string PrimaryUid { get; set; }
        public string ParentUid { get; set; }
        public string PaymentUid { get; set; }



        public decimal BalanceFull { get; set; }
        public decimal PartialBalance { get; set; }

        public DateTime DateDue { get; set; }
        public DateTime DateReceived { get; set; }
        public DateTime StartDate { get; set; }

        public decimal FullPrincipal { get; set; }
        public decimal PartialPrincipal { get; set; }

    }
}
