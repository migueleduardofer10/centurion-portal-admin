using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Request;

namespace CenturionPortalApi.WebApi.Types.Request
{
    public class CreditCardModelType : ObjectGraphType<CreditCardModel>
    {
        public CreditCardModelType()
        {
            Name = nameof(CreditCardModelType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.Amount, nullable: true);
            Field(x => x.RegularPayment, nullable: true);
            Field(x => x.AddlCharges, nullable: true);
            Field(x => x.ServiceFee, nullable: true);
            Field(x => x.Notes, nullable: true);
            Field(x => x.InvoiceNumber, nullable: true);
            Field(x => x.InvoiceUid, nullable: true);
            Field(x => x.Email, nullable: true);
            Field(x => x.Type, nullable: true);
            Field(x => x.Number, nullable: true);
            Field(x => x.Cvv, nullable: true);
            Field(x => x.Expiration, nullable: true);
            Field(x => x.ExpirationMonth, nullable: true);
            Field(x => x.ExpirationYear, nullable: true);
            Field(x => x.OnName, nullable: true);
            Field(x => x.LastName, nullable: true);
            Field(x => x.BillingAddress, nullable: true);
            Field(x => x.City, nullable: true);
            Field(x => x.State, nullable: true);
            Field(x => x.Zip, nullable: true);
            Field(x => x.Description, nullable: true);
            Field(x => x.AcceptTerms, nullable: true);
        }
    }
}
