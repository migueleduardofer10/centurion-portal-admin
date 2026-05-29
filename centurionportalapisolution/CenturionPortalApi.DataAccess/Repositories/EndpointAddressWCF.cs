using CenturionPortalApi.DataAccess.Repositories.Contract;

namespace CenturionPortalApi.DataAccess.Repositories
{
    public class EndpointAddressWCF : IEndpointAddressWCF
    {
        public string EnterpriseURL { get; }
        public EndpointAddressWCF(string url)
        {
            this.EnterpriseURL = url;
        }
    }

    public class EndpointIdentityServer : IEndpointIdentityServer
    {
        public string IdentityServerURL { get; }
        public EndpointIdentityServer(string url)
        {
            this.IdentityServerURL = url;
        }
    }
}
