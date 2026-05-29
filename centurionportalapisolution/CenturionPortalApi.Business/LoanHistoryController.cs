using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.DataAccess;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class LoanHistoryController
    {
        public static async Task<string> GetByVendor(string loanUid, bool excludeFunding, string userUid, int userType, string dataSourceRequest)
        {


            DataSourceRequest request = JsonConvert.DeserializeObject<DataSourceRequest>(dataSourceRequest, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.All
            });

            List<string> maps = await ELSServiceMapController.getValidLoansByUidAndType(userUid, userType);
            return JsonConvert.SerializeObject((await LoanHistoryFacade.GetAllByVendor(loanUid, excludeFunding, maps)).ToDataSourceResult(request));
        }

        public static async Task<DataSourceResult> GetByVendor2(string userUid, string loanUid, bool excludeFunding, DataSourceRequest dataSourceRequest)
        {
            return await LoanHistoryFacade.GetAllByVendor2(userUid, loanUid, excludeFunding, dataSourceRequest);
        }
    }
}
