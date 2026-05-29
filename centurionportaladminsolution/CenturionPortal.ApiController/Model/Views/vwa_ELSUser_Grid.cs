using CenturionPortal.ApiController.Model.Utilities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.Views
{
    public class UserGrid
    {
        public string Uid { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Address1 { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public string HomePhone { get; set; }
        public bool IsActive { get; set; }
        public int UserType { get; set; }
        public DateTime? LastAliveCheck { get; set; }
        public string? LoggedIP { get; set; }

        public static string QueryForSelectGraphQL
        {
            get
            {
                return @"uid,
                    username,
                    firstName,
                    lastName,
                    middleName,
                    address1,
                    email,
                    mobilePhone,
                    homePhone,
                    isActive,
                    userType,
                    lastAliveCheck,
                    loggedIP
                    ";
            }
        }        
    }

    public class UserInfoWithAccounts
    {
        public string Uid { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string Address1 { get; set; }
        public string Email { get; set; }
        public string MobilePhone { get; set; }
        public string HomePhone { get; set; }
        public bool IsActive { get; set; }
        public int UserType { get; set; }
        public DateTime? LastAliveCheck { get; set; }
        public string? LoggedIP { get; set; }
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
        public List<AccountAssigned> AccountAssigneds { get; set; }
        public List<PermissionWeb> PermissionsWeb { get; set; }

        public static string QueryForSelectGraphQL
        {
            get
            {
                return @"uid,
                    username,
                    firstName,
                    lastName,
                    middleName,
                    address1,
                    email,
                    mobilePhone,
                    homePhone,
                    isActive,
                    userType,
                    lastAliveCheck,
                    loggedIP,
                    passExpirEnable,
                    passExpirationTime,
                    passExpirationUnit,
                    passLockoutEnable,
                    passLockoutAttempts,
                    passLockoutMinutes,
                    passComLenEnable,
                    passComLenFrom,
                    passComLenTo,
                    passComLowerEnable,
                    passComDigitEnable,
                    passPreviousEnable,
                    passPreviousPsw,
                    passComSpecialEnable,
                    passOverride,
                    accountAssigneds {
                    " + AccountAssigned.QueryForSelectGraphQL + @"
                    },
                    permissionsWeb {
                    " + PermissionWeb.QueryForSelectGraphQL + @"
                    },
                    ";
            }
        }
    }
}
