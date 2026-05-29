using System;

namespace CenturionPortal.ApiController.Model
{
    public partial class GridColumnForView
    {
        public string Uid { get; set; }
        public string GridUid { get; set; }
        public string ColumnName { get; set; }
        public int Position { get; set; }
        public bool Checked { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string AppLastUpdatedBy { get; set; }

        public static string QueryForSelectGraphQL
        {
            get
            {
                return @"uid,
                    gridUid,
                    columnName,
                    position,
                    checked,
                    appTimeStamp,
                    appCreatedBy,
                    appCreationDate,
                    appLastUpdatedBy";
            }
        }

    }
}
