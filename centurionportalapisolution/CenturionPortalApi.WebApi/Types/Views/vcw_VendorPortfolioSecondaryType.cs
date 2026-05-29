using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vcw_VendorPortfolioSecondaryType : ObjectGraphType<DataBase.Models.Views.vcw_VendorPortfolioSecondary>
    {
        public vcw_VendorPortfolioSecondaryType()
        {

            Name = nameof(vcw_VendorPortfolioSecondaryType);




           
            Field(x => x.LoanUid, nullable: true, type: typeof(StringGraphType));
            Field(x => x.OfficerUid, nullable: true, type: typeof(StringGraphType));
            Field(x => x.SecondaryUid, nullable: true, type: typeof(StringGraphType));
            Field(x => x.PrimaryUid, nullable: true, type: typeof(StringGraphType));
            Field(x => x.LendingUid, nullable: true, type: typeof(StringGraphType));
            Field(x => x.Account, nullable: true, type: typeof(StringGraphType));
            Field(x => x.BorrowerFullName, nullable: true, type: typeof(StringGraphType));
            Field(x => x.City, nullable: true, type: typeof(StringGraphType));
            Field(x => x.State, nullable: true, type: typeof(StringGraphType));



            Field(x => x.LoanOriginalBalance, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.LoanPartialBalance, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.LoanCurrentBalance, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.DaysLate, nullable: true, type: typeof(IntGraphType));
            Field(x => x.NextDueDate, nullable: true, type: typeof(DateTimeGraphType));
            Field(x => x.PrimaryAccount, nullable: true, type: typeof(StringGraphType));
            Field(x => x.PrimaryOriginalBalance, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.RemainingEquityPortion, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.LenderRate, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.SecondaryAccount, nullable: true, type: typeof(StringGraphType));
            Field(x => x.SecondaryOriginalBalance, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.SecondaryCurrentBalance, nullable: true, type: typeof(DecimalGraphType));




            Field(x => x.SecondaryRate, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.SecondaryTermBought, nullable: true, type: typeof(IntGraphType));
            Field(x => x.SecondaryPercentageOwned, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.SecondaryPmtBought, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.SecondaryUnpaidLateCharge, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.SecondaryUnpaidInterest, nullable: true, type: typeof(DecimalGraphType));




            Field(x => x.TotalPayment, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.Status, nullable: true, type: typeof(IntGraphType));
            Field(x => x.StartDate, nullable: true, type: typeof(DateTimeGraphType));
            Field(x => x.Maturity, nullable: true, type: typeof(DateTimeGraphType));
            Field(x => x.IsForeclosure, nullable: true, type: typeof(BooleanGraphType));
            Field(x => x.TermsLeft, nullable: true, type: typeof(IntGraphType));


        }
    }
}
