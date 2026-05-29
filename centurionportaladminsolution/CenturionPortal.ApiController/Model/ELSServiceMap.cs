using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model
{
    public partial class ELSServiceMap
    {
        public string UserUid { get; set; }
        public string ParentUid { get; set; }
        public int? Type { get; set; }
        public string Account { get; set; }
        public string FullName { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
    }
}
