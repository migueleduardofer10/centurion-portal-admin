using CenturionPortal.ApiController.Model.Views;
using System.Collections.Generic;

namespace CenturionPortal.ApiController.Model.Request
{
    public class DataSourceResultLoanPortfolio
    {
        public List<vwl_VendorPortfolio> Data { get; set; }
        public int Total { get; set; }

        public static string QueryForSelectGraphQL
        {
            get
            {
                return @"data
                {
                    " + vwl_VendorPortfolio.QueryForSelectGraphQL + @"
                },
                total";
            }
        }
    }

    public class CustomAggregate
    {
        public object Value { get; set; }
        public string Member { get; set; }
        public object FormattedValue { get; set; }
        public int ItemCount { get; set; }
        public string Caption { get; set; }
        public string FunctionName { get; set; }
        public string AggregateMethodName { get; set; }
    }
}
