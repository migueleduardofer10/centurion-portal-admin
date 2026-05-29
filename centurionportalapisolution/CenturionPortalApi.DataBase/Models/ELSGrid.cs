using System;
using System.Collections.Generic;

namespace CenturionPortalApi.DataBase.Models
{
    public partial class ELSGrid
    {
        public ELSGrid()
        {
            ELSColumn = new HashSet<ELSColumn>();
        }

        public string Uid { get; set; }
        public string UserUid { get; set; }
        public int GridEnum { get; set; }
        public string GridName { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string AppLastUpdatedBy { get; set; }

        public virtual ICollection<ELSColumn> ELSColumn { get; set; }
    }
}
