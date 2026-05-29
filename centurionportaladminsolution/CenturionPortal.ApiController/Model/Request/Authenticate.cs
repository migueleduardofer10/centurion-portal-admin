using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.Request
{
    public class Authenticate
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
