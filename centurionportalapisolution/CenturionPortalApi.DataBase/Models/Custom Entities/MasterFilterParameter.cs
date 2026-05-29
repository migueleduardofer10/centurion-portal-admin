using CenturionPortalApi.DataBase.Models.Utilities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models
{
    public class MasterFilterParameter
    {
        public string UserUid { get; set; }
        public int UserType { get; set; }
        public string Header { get; set; }
        public bool ShowLenders { get; set; }
        public bool IncludeAllParent { get; set; }
        public masterFilterLoanOption OptionFilterLoan { get; set; }
        public bool IncludeAllLoans { get; set; }
        public bool ShowOnHold { get; set; }
        public bool IncludeBalanceCero { get; set; }
        public List<ELSServiceMap> Map { get; set; }

        public enum masterFilterLoanOption
        {
            NONE = 0,
            ONLY_FROM = 1,
            WITH_RANGE = 2
        }
        public Enums.LoanStatusEnum? FilterLoanStatus { get; set; }
    }
}
