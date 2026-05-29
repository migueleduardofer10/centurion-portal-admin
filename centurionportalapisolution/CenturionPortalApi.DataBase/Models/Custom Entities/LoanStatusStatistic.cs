using System.ComponentModel.DataAnnotations.Schema;

namespace CenturionPortalApi.DataBase.Models.Custom_Entities
{
    public class LoanStatusStatistic
    {
        public int Status { get; set; }
        public int Count { get; set; }
        [NotMapped]
        public bool IsActive { get; set; }
    }
}
