using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Request;

namespace CenturionPortalApi.WebApi.Types.Request
{
    public class VCheckModelType : ObjectGraphType<VCheckModel>
    {
        public VCheckModelType()
        {
            Name = nameof(VCheckModelType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.Amount, nullable: true);
            Field(x => x.RegularPayment, nullable: true);
            Field(x => x.AddlCharges, nullable: true);
            Field(x => x.ServiceFee, nullable: true);
            Field(x => x.Notes, nullable: true);
            Field(x => x.InvoiceNumber, nullable: true);
            Field(x => x.InvoiceUid, nullable: true);
            Field(x => x.RoutingNumber, nullable: true);
            Field(x => x.RoutingConfirm, nullable: true);
            Field(x => x.AccountNumber, nullable: true);
            Field(x => x.AccountConfirm, nullable: true);
            Field(x => x.CheckNumber, nullable: true);
            Field(x => x.PayerName, nullable: true);
            Field(x => x.PayerAddress, nullable: true);
            Field(x => x.PayerCity, nullable: true);
            Field(x => x.PayerState, nullable: true);
            Field(x => x.PayerZip, nullable: true);
            Field(x => x.Phone, nullable: true);
            Field(x => x.Email, nullable: true);
            Field(x => x.AddlPrincipal, nullable: true);
            Field(x => x.AddlUnpaidInterest, nullable: true);
            Field(x => x.AddlImpound, nullable: true);
            Field(x => x.AddlReserve, nullable: true);
            Field(x => x.ToLateCharges, nullable: true);
            Field(x => x.AcceptTerms, nullable: true);
        }
    }
}
