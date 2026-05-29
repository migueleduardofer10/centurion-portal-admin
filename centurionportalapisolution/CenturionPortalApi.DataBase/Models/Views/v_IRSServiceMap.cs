using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
   public class  v_IRSServiceMap
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
