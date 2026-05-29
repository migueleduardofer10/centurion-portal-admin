namespace CenturionPortalApi.DataBase.Models.Custom_Entities
{
    public class RESLoanByState
    {
        public string StateUid { get; set; }
        public string StateName { get; set; }
        public decimal UPB { get; set; }
        public decimal UPBDelinquency { get; set; }
        public int TotalLoans { get; set; }
        public int TotalDelinquency { get; set; }
    }
}
