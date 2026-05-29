namespace CenturionPortal.ApiController.Model.Views
{
    public class vwa_AllLoginUser
    {
        public string Month { get; set; }
        public string Year { get; set; }
        public string DayName { get; set; }
        public string Day { get; set; }
        public string Hour { get; set; }
        public int NroMonth { get; set; }
        public int NroSuccess { get; set; }
        public int NroFail { get; set; }
        public string UserName { get; set; }
        public string IsActiveName { get; set; }
        public string UserTypeName { get; set; }

        public bool IsActive { get; set; }
        public int UserType { get; set; }

        public int NroSuccessIsActive { get; set; }
        public int NroFailIsActive { get; set; }

        public int NroSuccessNoActive { get; set; }
        public int NroFailNoActive { get; set; }
    }
}
