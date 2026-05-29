using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.Views
{
    public partial class ELSUser_Grid
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
                return @"
                    uid,
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
                    loggedIP";
            }
        }
    }
}
