using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CenturionPortal.ApiController.Model
{    
    public class AccountAssigned
    {        
        public string UserUid { get; set; }                       
        public string ParentUid { get; set; }
        public int UserType { get; set; }
        public string Account { get; set; }
        public string FullName { get; set; }

        public static string QueryForSelectGraphQL
        {
            get
            {
                return @"userUid,
                    userType,
                    parentUid,
                    account,
                    fullName
                    ";
            }
        }
    }
}
