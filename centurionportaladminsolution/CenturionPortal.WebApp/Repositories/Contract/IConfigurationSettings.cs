using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortal.WebApp.Repositories.Contract
{
    public interface IConfigurationSettings
    {
        string IdentityServerURL { get;}
        string LirsAPI { get; set; }
        string BlisWeb { get; set; }
        string LirsWeb { get; set; }
        string ConnectionStrings_LirsDb { get; set; }
        string JWT_Key { get; set; }
        string Recaptcha_SiteKey { get; set; }

    }
}
