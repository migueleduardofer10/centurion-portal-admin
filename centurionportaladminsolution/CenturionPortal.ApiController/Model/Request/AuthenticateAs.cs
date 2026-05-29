namespace CenturionPortal.ApiController.Model.Request
{
    public class AuthenticateAs
    {
        public string AdminUsername { get; set; }
        public string Username { get; set; }
        public int UserType { get; set; }
    }
}
