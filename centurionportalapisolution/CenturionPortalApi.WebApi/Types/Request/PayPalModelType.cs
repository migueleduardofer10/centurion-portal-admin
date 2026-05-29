using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Request;

namespace CenturionPortalApi.WebApi.Types.Request
{
    public class PayPalModelType : ObjectGraphType<PayPalModel>
    {
        public PayPalModelType()
        {
            Name = nameof(PayPalModelType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.Amount, nullable: true);
            Field(x => x.RegularPayment, nullable: true);
            Field(x => x.AddlCharges, nullable: true);
            Field(x => x.ServiceFee, nullable: true);
            Field(x => x.Notes, nullable: true);
            Field(x => x.InvoiceNumber, nullable: true);
            Field(x => x.InvoiceUid, nullable: true);
            Field(x => x.Email, nullable: true);
            Field(x => x.AcceptTerms, nullable: true);
        }
    }
}
