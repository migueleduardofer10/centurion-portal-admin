using System;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public class vwa_ELSUser_Grid
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
    }
}
