using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model
{
    public partial class ELSGrid
    {
        public string Uid { get; set; }
        public string UserUid { get; set; }
        public int GridEnum { get; set; }
        public string GridName { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string AppLastUpdatedBy { get; set; }
    }
}
