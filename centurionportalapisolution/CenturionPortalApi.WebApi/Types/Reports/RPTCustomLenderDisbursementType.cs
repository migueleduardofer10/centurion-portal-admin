using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Custom_Entities;

namespace CenturionPortalApi.WebApi.Types.Reports
{
    public class RPTCustomLenderDisbursementType : ObjectGraphType<RPTCustomLenderDisbursement>
    {
        public RPTCustomLenderDisbursementType()
        {
            Name = nameof(RPTCustomLenderDisbursementType);
            Description = "";

            Field(x => x.Uid, nullable: true, type: typeof(StringGraphType)); 
            Field(x => x.LenderUid, nullable: true, type: typeof(StringGraphType));
            Field(x => x.LoanUid, nullable: true, type: typeof(StringGraphType));
            Field(x => x.CheckDate, nullable: true, type: typeof(DateTimeGraphType));
            Field(x => x.NextPaymentDue, nullable: true, type: typeof(DateTimeGraphType));
            //Field(x => x.StringNextPaymentDue, nullable: true, type: typeof(StringGraphType));
            Field(x => x.CheckNumber, nullable: true, type: typeof(StringGraphType));
            Field(x => x.LenderAccount, nullable: true, type: typeof(StringGraphType));
            Field(x => x.LoanAccount, nullable: true, type: typeof(StringGraphType));
            Field(x => x.PrevLoanAccount, nullable: true, type: typeof(StringGraphType));
            Field(x => x.InvestorAssetNumber, nullable: true, type: typeof(StringGraphType));
            Field(x => x.CheckAmount, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.ServiceFees, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.Interest, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.Principal, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.LateCharges, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.PrincipalCharges, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.InterestCharges, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.PrepayFee, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.OtherTaxable, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.OtherNonTaxable, nullable: true, type: typeof(DecimalGraphType));
            Field(x => x.OtherPayments, nullable: true, type: typeof(DecimalGraphType));
        }
    }
}
