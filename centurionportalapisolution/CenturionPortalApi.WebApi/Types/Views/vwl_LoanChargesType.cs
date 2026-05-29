using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{




    public class vwl_LoanChargesType : ObjectGraphType<vwl_LoanCharges>
    {
        public vwl_LoanChargesType()
        {

            Name = nameof(vwl_LoanChargesType);
             
            Field(x => x.Uid, nullable: true);
            Field(x => x.LoanUid, nullable: true);
            Field(x => x.Date, type: typeof(DateGraphType), nullable: true);
            Field(x => x.Reference, nullable: true);
            Field(x => x.Description, nullable: true);
            Field(x => x.ChargeType, nullable: true);
            Field(x => x.InterestRate, type: typeof(DecimalGraphType), nullable: true);
            Field(x => x.InterestFrom, type: typeof(DateGraphType), nullable: true);
            Field(x => x.Deferred, nullable: true);
            Field(x => x.OwedToAccount, nullable: true);
            Field(x => x.OriginalAmount, nullable: true);
            Field(x => x.Balance, nullable: true);
            Field(x => x.VendorBalance, nullable: true);
            Field(x => x.AccruedInterest, nullable: true);
            Field(x => x.TotalDue, nullable: true);
            Field(x => x.LoanNoteType, nullable: true);









        }

    }
}


