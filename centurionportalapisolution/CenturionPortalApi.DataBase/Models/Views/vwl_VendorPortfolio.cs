using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CenturionPortalApi.DataBase.Models.Views
{
    public partial class vwl_VendorPortfolio
    {
        public string LoanUid { get; set; }
        public string LendingUid { get; set; }
        public string OfficerUid { get; set; }
        public string LenderUid { get; set; }
        public string Account { get; set; }
        public string PrevAccount { get; set; }
        public string OrigLender { get; set; }
        public string DepartmentName { get; set; }
        public int DepartmentUid { get; set; }
        public string OrigVendorUid { get; set; }
        public string Name { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string SSN { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime? MaturityDate { get; set; }
        public decimal TotalOriginalBalance { get; set; }
        public decimal OriginalBalance { get; set; }
        public decimal CurrentBalance { get; set; }
        public bool IsOnHold { get; set; }
        public DateTime? NextDueDate { get; set; }
        public string InvestAssetNumber { get; set; }
        public DateTime? Assignment { get; set; }
        public bool IsActive { get; set; }
        public double NoteRate { get; set; }
        public double SoldRate { get; set; }
        public double GeneralSoldRate { get; set; }
        public decimal PrincipalBalance { get; set; }
        public decimal? TotalPayment { get; set; }
        public int Status { get; set; }
        public DateTime? LastDateReceived { get; set; }
        public DateTime? PaidOffDate { get; set; }
        public bool IsForeclosure { get; set; }
        public string Tags { get; set; }
        public double CalcInterestRate { get; set; }
        public bool? ActiveDefaultInterestRate { get; set; }
        public double DefaultInterestRate { get; set; }
        public DateTime? AssignedDate { get; set; }
        public int PrimaryPurpose { get; set; }
        public DateTime? FirstPaymentDate { get; set; }
        public DateTime? OriginationDate { get; set; }
        [NotMapped]
        public DateTime? Today { get; set; }
        [NotMapped]
        public int RemindersCount { get; set; }
        [NotMapped]
        public int? DaysLate
        {
            get
            {
                TimeSpan? time = (this.Today - this.NextDueDate);
                if (time == null) return null;
                return time.Value.Days < 0 ? 0 : time.Value.Days;
            }
        }
    }
}
