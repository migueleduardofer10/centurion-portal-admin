using CenturionPortal.ApiController.Model.Views;
using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.Request
{
    public class ELSUserResultGraphRequest
    {
        public List<ELSUser_Grid> getELSUser_GridAll { get; set; }
        public GenericDataSourceResult<ELSUser_Grid> getELSUser_GridPage { get; set; }
    }
}
