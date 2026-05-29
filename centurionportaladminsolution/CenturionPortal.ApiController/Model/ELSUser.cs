using System;

namespace CenturionPortal.ApiController.Model
{
    public class ELSUser
    {
      
        public string UserType_ToSring
        {
            get
            {

                switch (this.UserType)
                {
                    case 0: return "Admin";
                    case 1: return "Lirs User";
                    case 2: return "Broker";
                    case 3: return "Lender";
                    default: return "";
                }
            }
        }
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
        public string StrPermissions { get; set; }
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
        public int? DepartmentUid { get; set; }
        public string DepartmentLogo { get; set; }
        public string DepartmentBanner { get; set; }
        public string DepartmentAdminUserUid { get; set; }
        public string DepartmentBrokerUid { get; set; }
        public bool IsOwner { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string AppLastUpdatedBy { get; set; }
        public bool IncludeOriginalVendor { get; set; }
        public bool ShowFundingInformation { get; set; }
        public bool ShowLenderStatement { get; set; }
        public string RePassword { get; set; }
        public string ReEmail { get; set; }
        public string Token { get; set; }
        //public string UrlReset { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }

        public bool? PassExpirEnable { get; set; }
        public int? PassExpirationTime { get; set; }
        public int? PassExpirationUnit { get; set; }
        public bool? PassLockoutEnable { get; set; }
        public int? PassLockoutAttempts { get; set; }
        public int? PassLockoutMinutes { get; set; }
        public bool? PassComLenEnable { get; set; }
        public int? PassComLenFrom { get; set; }
        public int? PassComLenTo { get; set; }
        public bool? PassComLowerEnable { get; set; }
        public bool? PassComDigitEnable { get; set; }
        public bool? PassPreviousEnable { get; set; }
        public int? PassPreviousPsw { get; set; }
        public bool? PassComSpecialEnable { get; set; }
        public bool? PassOverride { get; set; }

        public static string QueryForSelectSettingsAccountGraphQL
        {
            get
            {
                return @"
                    uid,

                    fullName,
                    userType_ToSring
                    username,
                    email,

                    question1,
                    question1String,
                    answer1,

                    question2,
                    question2String,
                    answer2,

                    question3,
                    question3String,
                    answer3,

                    homePhone,
                    firstName,
                    address1,
                    address2,
                    middleName,
                    title,
                    lastName,
                    ext,

                    mobilePhone,
                    lastLogin,
	                lastLogout,
	                loggedIP 


";
            }
        }


    }
}
