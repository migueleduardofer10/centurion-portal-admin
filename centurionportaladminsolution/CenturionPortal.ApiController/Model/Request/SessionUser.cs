namespace CenturionPortal.ApiController.Model.Request
{
    public class SessionUser
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Title { get; set; }
        public int UserType { get; set; }
    }
}
