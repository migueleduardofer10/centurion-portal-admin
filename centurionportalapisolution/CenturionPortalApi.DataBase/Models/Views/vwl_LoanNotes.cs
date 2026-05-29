using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
 public    class vwl_LoanNotes
    {

       public long UidNote { get; set; }
        public string UidLoan { get; set; }

       
        public DateTime Date { get; set; }

        public string Rep { get; set; }
        public string CreateBy { get; set; }
        public string Note { get; set; }
        public string Note_Plain { get; set; }
       public Int16 Priority { get; set; }
        public string? Description { get; set; }
       public bool? Type { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNumber { get; set; }
        public string Subject { get; set; }

    }
}
