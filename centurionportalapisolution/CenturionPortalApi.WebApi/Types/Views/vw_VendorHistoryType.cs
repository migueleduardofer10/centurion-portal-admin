using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vw_VendorHistoryType : ObjectGraphType<DataBase.Models.Views.vw_VendorHistory>
    {
        public vw_VendorHistoryType()
        {

            Name = nameof(vw_VendorHistoryType);


 


               Field(x => x. CheckDate , nullable: true, type: typeof(DateTimeGraphType));
        Field(x => x. CheckNo , nullable: true, type: typeof(StringGraphType));
        Field(x => x. CheckMemo , nullable: true, type: typeof(StringGraphType));
        Field(x => x. PaymentCode , nullable: true, type: typeof(StringGraphType));


        Field(x => x. ToInterest , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToPrincipal , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToServiceFee , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToLateCharge , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToChargesPrincipal , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToChargesInterest , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToPrepay , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToOtherTaxable , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToTrust , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToOtherPayments , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToOtherTaxFree , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToEscrowInt , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToUnpaidFees , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. CheckAmount , nullable: true, type: typeof(DecimalGraphType));



        Field(x => x. PaymentDate , nullable: true, type: typeof(DateTimeGraphType));
        Field(x => x. PaymentDue , nullable: true, type: typeof(DateTimeGraphType));


        Field(x => x. AppCreatedBy , nullable: true, type: typeof(StringGraphType));
        Field(x => x. AppCreationDate , nullable: true, type: typeof(DateTimeGraphType));


        Field(x => x. AppTimeStamp , nullable: true, type: typeof(DateTimeGraphType));
        Field(x => x. Uid , nullable: true, type: typeof(StringGraphType));
        Field(x => x. VendorUid , nullable: true, type: typeof(StringGraphType));


        Field(x => x. Balance , nullable: true, type: typeof(DecimalGraphType));
        Field(x => x. ToGSTax , nullable: true, type: typeof(DecimalGraphType));


        Field(x => x. Account , nullable: true, type: typeof(StringGraphType));
        Field(x => x. BorrowerName , nullable: true, type: typeof(StringGraphType));
        Field(x => x. BorrowerFullName , nullable: true, type: typeof(StringGraphType));
        Field(x => x. AccountName , nullable: true, type: typeof(StringGraphType));
        Field(x => x. BrokerRepresentative , nullable: true, type: typeof(StringGraphType));
        Field(x => x. Notes , nullable: true, type: typeof(StringGraphType));


    }



}
}
