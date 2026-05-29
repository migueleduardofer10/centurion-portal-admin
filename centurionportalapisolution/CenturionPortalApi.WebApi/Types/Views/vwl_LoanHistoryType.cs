using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LoanHistoryType : ObjectGraphType<vwl_LoanHistory>
    {
        public vwl_LoanHistoryType()
        {
            Name = nameof(vwl_LoanHistoryType);

            Field(x => x.ToPrincipal, nullable: true);
            Field(x => x.Balance, nullable: true);
            Field(x => x.ToInterest, nullable: true);
            Field(x => x.ToReserve, nullable: true);
            Field(x => x.ToCapitalExp, nullable: true);
            Field(x => x.ToRepair, nullable: true);
            Field(x => x.ToMiscellaneous, nullable: true);
            Field(x => x.ToSecurityDeposit, nullable: true);
            Field(x => x.ToAdvanceRentReserve, nullable: true);
            Field(x => x.ToPropertyManagement, nullable: true);
            Field(x => x.ToExpenseReserve, nullable: true);
            Field(x => x.ToTaxReserve, nullable: true);
            Field(x => x.ToInsuranceReserve, nullable: true);
            Field(x => x.ToTaxAdvanceReserve, nullable: true);
            Field(x => x.ToInsuranceAdvanceReserve, nullable: true);
            Field(x => x.ReserveRestricted, nullable: true);
            Field(x => x.ToImpound, nullable: true);
            Field(x => x.ToTrust, nullable: true);
            Field(x => x.ToLateCharge, nullable: true);
            Field(x => x.ToChargesPrincipal, nullable: true);
            Field(x => x.ToChargesInterest, nullable: true);
            Field(x => x.ToPrepay, nullable: true);
            Field(x => x.ToUnpaidInterest, nullable: true);
            Field(x => x.ToUnpaidFees, nullable: true);
            Field(x => x.ToBrokerFee, nullable: true);
            Field(x => x.ToLenderFee, nullable: true);
            Field(x => x.ToOtherPayments, nullable: true);
            Field(x => x.ToOtherTaxable, nullable: true);
            Field(x => x.ToOtherTaxFree, nullable: true);
            Field(x => x.ToUnpaidEscrowInt, nullable: true);
            Field(x => x.DateDue, type: typeof(DateGraphType), nullable: true);
            Field(x => x.Notes, nullable: true);
            Field(x => x.HasImgCheck, nullable: true);
            Field(x => x.LateCharge, nullable: true);
            Field(x => x.Code, nullable: true);
            Field(x => x.OtherPaymentType, nullable: true);
            Field(x => x.TotalAmount, nullable: true);
            Field(x => x.AppCreationDate, type: typeof(DateGraphType), nullable: true);
            Field(x => x.LoanUid, nullable: true);
            Field(x => x.Uid, nullable: true);
            Field(x => x.Reference, nullable: true);
            Field(x => x.DateReceived, type: typeof(DateGraphType), nullable: true);
            Field(x => x.DateDeposited, type: typeof(DateGraphType), nullable: true);
            Field(x => x.ReleaseDate, type: typeof(DateGraphType), nullable: true);
            Field(x => x.ReleaseDateExt, type: typeof(DateGraphType), nullable: true);
            Field(x => x.Type, nullable: true);
            Field(x => x.DayVariance, nullable: true);
            Field(x => x.IsACH, nullable: true);
            Field(x => x.SplitUid, nullable: true);
        }
    }
}
