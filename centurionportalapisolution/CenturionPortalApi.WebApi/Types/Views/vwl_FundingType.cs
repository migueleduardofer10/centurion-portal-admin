using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{

    


    public class vwl_FundingType : ObjectGraphType<vwl_Funding>
    {
        public vwl_FundingType()
        {

            Name = nameof(vwl_FundingType);


     

            Field(x => x.LenderUid, nullable: true);
            Field(x => x.LoanUid, nullable: true);
            Field(x => x.LenderAccount, nullable: true);
            Field(x => x.LenderCurrentBalance, nullable: true);
            Field(x => x.LenderName, nullable: true);
            Field(x => x.LenderAmountFunded, nullable: true);
            Field(x => x.SecondaryUid, nullable: true);
            Field(x => x.InvestorRate, nullable: true);
            Field(x => x.PercentageOwned, nullable: true);
            Field(x => x.PaymentInformation, nullable: true);
        }

    }
}


