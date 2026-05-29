using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_VendorPortfolioType : ObjectGraphType<vwl_VendorPortfolio>
    {
        public vwl_VendorPortfolioType()
        {
            Name = nameof(vwl_VendorPortfolioType);



            Field(x => x.LoanUid, nullable: true);
            Field(x => x.LendingUid, nullable: true);
            Field(x => x.OfficerUid, nullable: true);
            Field(x => x.LenderUid, nullable: true);
            Field(x => x.Account, nullable: true);
            Field(x => x.PrevAccount, nullable: true);
            Field(x => x.OrigLender, nullable: true);
            Field(x => x.DepartmentName, nullable: true);
            Field(x => x.DepartmentUid, nullable: true);
            Field(x => x.OrigVendorUid, nullable: true);
            Field(x => x.Name, nullable: true);
            Field(x => x.FullName, nullable: true);
            Field(x => x.FirstName, nullable: true);
            Field(x => x.LastName, nullable: true);
            Field(x => x.Address, nullable: true);
            Field(x => x.SSN, nullable: true);
            Field(x => x.City, nullable: true);
            Field(x => x.State, nullable: true);
            Field(x => x.MaturityDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.TotalOriginalBalance, nullable: true);
            Field(x => x.OriginalBalance, nullable: true);
            Field(x => x.CurrentBalance, nullable: true);
            Field(x => x.IsOnHold, nullable: true);
            Field(x => x.NextDueDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.InvestAssetNumber, nullable: true);
            Field(x => x.Assignment, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.IsActive, nullable: true);
            Field(x => x.NoteRate, nullable: true);
            Field(x => x.SoldRate, nullable: true);
            Field(x => x.GeneralSoldRate, nullable: true);
            Field(x => x.PrincipalBalance, nullable: true);
            Field(x => x.TotalPayment, nullable: true);
            Field(x => x.Status, nullable: true);
            Field(x => x.LastDateReceived, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.PaidOffDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.IsForeclosure, nullable: true);
            Field(x => x.Tags, nullable: true);
            Field(x => x.CalcInterestRate, nullable: true);
            Field(x => x.ActiveDefaultInterestRate, nullable: true);
            Field(x => x.DefaultInterestRate, nullable: true);
            Field(x => x.AssignedDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.PrimaryPurpose, nullable: true);
            Field(x => x.FirstPaymentDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.OriginationDate, type: typeof(DateTimeGraphType), nullable: true);

            Field(x => x.Today, type: typeof(DateTimeGraphType), nullable: true);

            Field(x => x.RemindersCount, nullable: true);

            Field(x => x.DaysLate, nullable: true);






        }

    }
}
