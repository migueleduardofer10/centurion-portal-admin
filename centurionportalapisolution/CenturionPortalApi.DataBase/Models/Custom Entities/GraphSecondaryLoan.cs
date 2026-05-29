using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Custom_Entities
{
   public  class GraphSecondaryLoan
    {

        public decimal BalanceFull { get; set; }
        public DateTime DateReceived { get; set; }
        public DateTime DateDue { get; set; }
        public decimal PartialBalance { get; set; }



    }
}
