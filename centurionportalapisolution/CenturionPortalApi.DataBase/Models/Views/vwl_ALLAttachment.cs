using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_ALLAttachment
    {
        public string Uid { get; set; }
        public string ParentUid { get; set; }
        public string ParentAccount { get; set; }
        public int Module { get; set; }
        public short CategoryUid { get; set; }
        public int BatchType { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string Path { get; set; }

    }
}
