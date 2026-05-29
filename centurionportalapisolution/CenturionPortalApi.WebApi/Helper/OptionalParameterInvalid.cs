using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Helper
{
    public class OptionalParameterInvalid
    {
        public OptionalParameterInvalid(string name, string message)
        {

            this.Message = message;
            this.Name = name;
        }
        public string Name { get; }
        public string Message { get; } 
    }

}
