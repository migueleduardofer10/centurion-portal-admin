using System;
using System.Collections.Generic;

namespace CenturionPortalApi.DataBase.Models.Custom_Entities
{
    public class PagedListObject<T>
    {
        public int PageNumber { get; set; }

        public IEnumerable<T> Objects { get; set; }

        public long TotalRows { get; set; }

        public int PageSize { get; set; }

        public Object Summary { get; set; }
    }

    public class PagedListParams
    {
        public int Skip { get; set; }

        public int Take{ get; set; }

        public PagedListParamField Sort { get; set; }
    }

    public class PagedListParamField
    {
        public string Field { get; set; }

        public string Dir{ get; set; }
    }
}
