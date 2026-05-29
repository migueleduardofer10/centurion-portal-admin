using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LNSLoanType : ObjectGraphType<vwl_LNSLoan>
    {
        public vwl_LNSLoanType()
        {

            Name = nameof(vwl_LNSLoanType);




            Field(x => x.Uid, nullable: true);
            Field(x => x.Account, nullable: true);
            Field(x => x.BorrowerFullName, nullable: true);



            Field(x => x.OriginalBalance, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.LienPosition, nullable: true);
            Field(x => x.UnpaidLateCharges, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.PrincipalBalance, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.ImpoundBalance, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.UnpaidCharges, type: (typeof(DecimalGraphType)), nullable: true);

            Field(x => x.NoteRate, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.ReserveBalance, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.UnpaidInterest, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.PaidToDate, type: (typeof(DateGraphType)), nullable: true);
            Field(x => x.MaturityDate, type: (typeof(DateGraphType)), nullable: true);
            Field(x => x.OriginationDate, type: (typeof(DateGraphType)), nullable: true);

            Field(x => x.NextDueDate, type: (typeof(DateGraphType)), nullable: true);
           



            Field(x => x.Payment, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.PaymentImpound, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.PaymentReserve, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.PaymentOthers, type: (typeof(DecimalGraphType)), nullable: true);

            Field(x => x.PaidOffDate, type: (typeof(DateGraphType)), nullable: true);






            Field(x => x.LateChargesMin, type: (typeof(DecimalGraphType)), nullable: true);
              Field(x => x.LateChargesDays, nullable: true);





            Field(x => x.BorrowerAddress, nullable: true);
            Field(x => x.BorrowerCity, nullable: true);
            Field(x => x.BorrowerState, nullable: true);
            Field(x => x.BorrowerZip, nullable: true);
            Field(x => x.BorrowerUid, nullable: true);

            Field(x => x.TrustAccountUid, nullable: true);
         

            /*
             OriginalBalance
             
             */

        }

    }
}
