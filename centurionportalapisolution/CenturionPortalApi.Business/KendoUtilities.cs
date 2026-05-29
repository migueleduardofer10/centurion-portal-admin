using Kendo.Mvc;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.UI;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.Business
{
    public static class KendoUtilities
    {

        //public static string QueryForSelectGraphQL<T>()
        //{

        //    Type modelType = typeof(T);

        //    string strAttrib = string.Join(",",
        //      modelType.GetProperties()
        //               .Select(p => (Char.ToLowerInvariant(p.Name[0]) + p.Name.Substring(1))));

        //    return @"
        //            data
        //            {
        //                " + strAttrib + @"
        //            },
        //            total";

        //}

        public static DataSourceRequest GetDataSourceRequest(string dataSourceRequest)
        {
            Kendo.Mvc.UI.DataSourceRequest request = null;
            try
            {
                //Si lanza excepcion es xq no lo puede serializa, entonces es de las Apps
                request = KendoUtilities.DeserializeDataSourceRequestFromstring(dataSourceRequest);
            }
            catch { }
            //dataSourceRequest="sort=Account-asc&page=1&pageSize=10&aggregate="
            if (request == null) request = KendoUtilities.GetDataSourceRequestFromQueryString(dataSourceRequest);

            return request;
        }

        public static DataSourceRequest GetDataSourceRequestFromQueryString(string query)
        {
            DataSourceRequest obj = new DataSourceRequest();
            var queryString = System.Web.HttpUtility.ParseQueryString(query);

            var pageStr = queryString["Page"];
            if (!string.IsNullOrEmpty(pageStr))
            {
                obj.Page = Convert.ToInt32(pageStr);
            }

            var pageSizeStr = queryString["PageSize"];
            if (!string.IsNullOrEmpty(pageSizeStr))
            {
                obj.PageSize = Convert.ToInt32(pageSizeStr);
            }

            var SortStr = queryString["Sort"];
            if (!string.IsNullOrEmpty(SortStr))
            {
                obj.Sorts = new List<SortDescriptor>();
                var SortSplit = SortStr.Split("~");
                foreach (var sortItem in SortSplit)
                {
                    if (!string.IsNullOrEmpty(sortItem))
                    {
                        var sortItemSplit = sortItem.Split("-");
                        SortDescriptor sortObject = new SortDescriptor();
                        sortObject.Member = sortItemSplit[0];
                        if (sortItemSplit.Length > 1 && sortItemSplit[1] == "desc") sortObject.SortDirection = ListSortDirection.Descending;
                        else sortObject.SortDirection = ListSortDirection.Ascending;
                        obj.Sorts.Add(sortObject);
                    }
                }
            }

            var FilterStr = queryString["Filter"];
            if (!string.IsNullOrEmpty(FilterStr))
            {

                obj.Filters = new List<IFilterDescriptor>();
                obj.Filters.Add(GetCompositeFilterDescriptor(FilterStr));

                //if (FilterStr.Contains("("))
                //{

                //}
                //else
                //{
                //    obj.Filters.Add(GetFilterDescriptor(FilterStr));
                //}

            }

            //propertiesDataSource.Add("Group");
            //propertiesDataSource.Add("Aggregate");

            return obj;
        }

        private static CompositeFilterDescriptor GetCompositeFilterDescriptor(string filterStr)
        {
            while (filterStr.StartsWith("(") && filterStr.EndsWith(")"))
            {
                filterStr = filterStr.Substring(1, filterStr.Length - 1);
                filterStr = filterStr.Substring(0, filterStr.Length - 1);
            }

            if (filterStr.Contains("("))
            {
                CompositeFilterDescriptor compositeFilter = new CompositeFilterDescriptor();

                string splitValue = "~and~";
                compositeFilter.LogicalOperator = FilterCompositionLogicalOperator.And;
                if (filterStr.Contains("~or~"))
                {
                    splitValue = "~or~";
                    compositeFilter.LogicalOperator = FilterCompositionLogicalOperator.Or;
                }
                return compositeFilter;
            }
            else
            {
                return GetFilterDescriptor(filterStr);
            }

        }

        private static CompositeFilterDescriptor GetFilterDescriptor(string filterStr)
        {
            CompositeFilterDescriptor compositeFilter = new CompositeFilterDescriptor();
            string splitValue = "~and~";
            compositeFilter.LogicalOperator = FilterCompositionLogicalOperator.And;
            if (filterStr.Contains("~or~"))
            {
                splitValue = "~or~";
                compositeFilter.LogicalOperator = FilterCompositionLogicalOperator.Or;
            }
            var FilterSplit = filterStr.Split(splitValue);

            foreach (var filterItem in FilterSplit)
            {
                if (!string.IsNullOrEmpty(filterItem))
                {
                    var filterItemSplit = filterItem.Split("~");
                    FilterDescriptor filterObject = new FilterDescriptor();
                    filterObject.Member = filterItemSplit[0];
                    if (filterItemSplit.Length > 1)
                    {
                        if (filterItemSplit[1] == "contain") filterObject.Operator = FilterOperator.Contains;
                        else if (filterItemSplit[1] == "doesnotcontain") filterObject.Operator = FilterOperator.DoesNotContain;
                        else if (filterItemSplit[1] == "eq") filterObject.Operator = FilterOperator.IsEqualTo;
                        else if (filterItemSplit[1] == "neq") filterObject.Operator = FilterOperator.IsNotEqualTo;
                        else if (filterItemSplit[1] == "startswith") filterObject.Operator = FilterOperator.StartsWith;
                        else if (filterItemSplit[1] == "gte") filterObject.Operator = FilterOperator.IsGreaterThanOrEqualTo;
                        else if (filterItemSplit[1] == "gt") filterObject.Operator = FilterOperator.IsGreaterThan;
                        else if (filterItemSplit[1] == "lte") filterObject.Operator = FilterOperator.IsLessThanOrEqualTo;
                        else if (filterItemSplit[1] == "lt") filterObject.Operator = FilterOperator.IsLessThan;
                        else if (filterItemSplit[1] == "isnull") filterObject.Operator = FilterOperator.IsNull;
                        else if (filterItemSplit[1] == "isnotnull") filterObject.Operator = FilterOperator.IsNotNull;
                    }
                    if (filterItemSplit.Length > 2)
                    {
                        if (filterItemSplit[2].StartsWith("datetime"))
                        {
                            var value = filterItemSplit[2].Replace("datetime", "").Replace("'", "");
                            //DateTime valueConverted = Convert.ToDateTime(value);
                            filterObject.MemberType = typeof(DateTime);
                            filterObject.Value = value;
                            //filterObject.ConvertedValue = valueConverted;
                        }
                        else if (filterItemSplit[2].StartsWith("'"))
                        {
                            var value = filterItemSplit[2].Replace("'", "");
                            //DateTime valueConverted = Convert.ToDateTime(value);
                            //filterObject.MemberType = typeof(string);
                            filterObject.Value = value;
                        }
                        else
                        {
                            var value = filterItemSplit[2].Replace("'", "");
                            //DateTime valueConverted = Convert.ToDateTime(value);
                            //filterObject.MemberType = typeof(int);
                            filterObject.Value = value;
                        }
                    }
                    compositeFilter.FilterDescriptors.Add(filterObject);
                }
            }
            return compositeFilter;
        }






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


        public static string SerializeDataSourceRequestFromString(DataSourceRequest dataSourceRequest)
        {
            var str = dataSourceRequest == null ? "" : JsonConvert.SerializeObject(dataSourceRequest, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.All
            });
            return str;
        }

        public static DataSourceRequest DeserializeDataSourceRequestFromstring(string dataSourceRequest)
        {
            if (string.IsNullOrEmpty(dataSourceRequest))
            {
                return new DataSourceRequest();
            }
            else
            {
                var request = JsonConvert.DeserializeObject<DataSourceRequest>(dataSourceRequest, new JsonSerializerSettings
                {
                    TypeNameHandling = TypeNameHandling.All
                });

                return request;
            }
        }
    }
}
