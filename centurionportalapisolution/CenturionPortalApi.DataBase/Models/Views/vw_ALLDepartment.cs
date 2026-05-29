using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public class vw_ALLDepartment
    {
        public int Uid { get; set; }
        public string Name { get; set; }
        public byte[] Logo { get; set; }
        public byte[] Banner { get; set; }
        public string Description { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string CompanyCity { get; set; }
        public string CompanyState { get; set; }
        public string CompanyZip { get; set; }
        public string ConpanyPhone { get; set; }
        public string CompanyExt { get; set; }
        public string BrokerUid { get; set; }
        public string TrustAccountUid { get; set; }
        public string Footer { get; set; }
        public string Fax { get; set; }
        public string AuthorName { get; set; }
        public string AuthorTitle { get; set; }
        public string AuthorPhonev { get; set; }
        public string AuthorFax { get; set; }
        public string AuthorEmailv { get; set; }

        public int intBeginningCode { get; set; }
        public int intBoardingCode { get; set; }
        public string CompanyNMLS { get; set; }
        public string CompanyDRE { get; set; }
        public string CompanyWebSite { get; set; }
        public string SpocUid { get; set; }
        public string BillingPrefix { get; set; }
        public string ELSOwnerUid { get; set; }
        public string SmtpUid { get; set; }

    }
}
