using System.Collections.Generic;

namespace CenturionPortal.ApiController.Model.Request
{
    public class GenericDataSourceResult<T>
    {
        public List<T> Data { get; set; }
        public int Total { get; set; }
        public List<GenericDataSourceResult_AggregateResult> AggregateResults { get; set; }

        public class GenericDataSourceResult_AggregateResult
        {
            public decimal? Value { get; set; }
            public string Member { get; set; }
            public string AggregateMethodName { get; set; }
        }
    }
}
