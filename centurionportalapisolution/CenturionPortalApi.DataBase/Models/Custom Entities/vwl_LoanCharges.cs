using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_LoanCharges
    {
        [NotMapped]
        public IEnumerable<vwl_ChargesDetails> ChargesDetails { get; set; }
    }
}
