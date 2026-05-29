using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CenturionPortal.WebApp.Repositories.Contract;

namespace CenturionPortal.WebApp.Repositories
{
    public class ConfigurationSettingsRepository : IConfigurationSettings
    {
        public string IdentityServerURL { get; set; }
        public string BlisWeb { get; set; }
        public string LirsWeb { get ; set ; }
        public string LirsAPI { get ; set ; }
        public string ConnectionStrings_LirsDb { get ; set ; }
        public string JWT_Key { get; set; }
        public string Recaptcha_SiteKey { get ; set ; }

        /*public ConfigurationSettingsRepository(string url)
        {
            this.IdentityServerURL = url;
        }*/

    }
}