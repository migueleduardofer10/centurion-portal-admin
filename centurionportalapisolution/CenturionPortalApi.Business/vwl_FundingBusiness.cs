using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataAccess;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
  public static  class vwl_FundingBusiness
    {
        public static async Task<DataSourceResult> Get_By_LoanUid(string loanUid, DataSourceRequest dataSourceRequest)
        {
            try
            {
                return await
                    vwl_FundingFacade
                    .Funding_By_LoanUid(loanUid)
                    .ToDataSourceResultAsync(dataSourceRequest);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
