using System;

namespace CenturionPortalApi.DataBase.Models
{
    public partial class ELSColumn
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

        public virtual ELSGrid GridU { get; set; }
    }
}
