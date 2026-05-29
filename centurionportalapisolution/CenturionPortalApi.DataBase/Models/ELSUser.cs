using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CenturionPortalApi.DataBase.Models
{
    public partial class ELSUser
    {
        [NotMapped]
        public string UserType_ToSring { get {

                switch (this.UserType)
                {
                    case 0:return "Admin";
                    case 1: return "Lirs User";
                    case 2: return "Broker";
                    case 3: return "Lender";
                    default: return "";
                }
            } }
        
        public string Uid { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Title { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string HomePhone { get; set; }
        public string MobilePhone { get; set; }
        public string Ext { get; set; }
        public string Photo { get; set; }
        public DateTime? LastLogin { get; set; }
        public DateTime? LastLogout { get; set; }
        public bool LoggedIn { get; set; }
        public string LoggedIP { get; set; }
        public bool IsActive { get; set; }
        public int EnableReason { get; set; }
        public string EnableBy { get; set; }
        public string Password { get; set; }
        public DateTime? PassExpiration { get; set; }
        public string Permissions { get; set; }
        public int UserType { get; set; }
        public bool? LogErrors { get; set; }
        public int? Question1 { get; set; }
        public string Question1String { get; set; }
        public string Answer1 { get; set; }
        public int? Question2 { get; set; }
        public string Question2String { get; set; }
        public string Answer2 { get; set; }
        public int? Question3 { get; set; }
        public string Question3String { get; set; }
        public string Answer3 { get; set; }
        public string ConfirmCode { get; set; }
        public DateTime? ConfirmDate { get; set; }
        public DateTime? ResetPassDate { get; set; }
        public string ResetPassCode { get; set; }
        public int AttemptLoginCount { get; set; }
        public DateTime? LastBlockedDate { get; set; }
        public string LastBlockedIP { get; set; }
        public DateTime? LastAliveCheck { get; set; }
       // public int? DepartmentUid { get; set; }
       // public string DepartmentLogo { get; set; }
     //   public string DepartmentBanner { get; set; }
        //public string DepartmentAdminUserUid { get; set; }
     //   public string DepartmentBrokerUid { get; set; }
      //  public bool IsOwner { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string AppLastUpdatedBy { get; set; }
        [NotMapped]
        public byte[] SysTimeStamp { get; set; }
        public bool IncludeOriginalVendor { get; set; }
        public bool ShowFundingInformation { get; set; }
        public bool ShowLenderStatement { get; set; }

        [NotMapped]
        public string RePassword { get; set; }
        [NotMapped]
        public string Token { get; set; }
    }
}
