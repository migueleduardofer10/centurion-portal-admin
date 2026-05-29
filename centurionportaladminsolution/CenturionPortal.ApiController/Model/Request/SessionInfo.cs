namespace CenturionPortal.ApiController.Model.Request
{
    public class SessionInfo
    {
        public string User { get; set; }
        public string Version { get; set; }
        public string Token { get; set; }
        public string Tokenro { get; set; }
        public string RefreshToken { get; set; }
        public int ExpiresIn { get; set; }
    }
}
