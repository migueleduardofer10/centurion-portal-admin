using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Custom_Entities;

namespace CenturionPortalApi.WebApi.Types.CustomEntities
{
    public class CustomACHStatusType : ObjectGraphType<CustomACHStatus>
    {
        public CustomACHStatusType()
        {
            Name = nameof(CustomACHStatus);

            Field(x => x.LoanUid, nullable: true);
            Field(x => x.LoanAccount, nullable: true);
            Field(x => x.ACH_Status, nullable: true);
            Field(x => x.Borrower_Name, nullable: true);
            Field(x => x.ACH_NextDebitDate, type: typeof(DateTimeGraphType), nullable: true);
            Field(x => x.ACH_CustomPayment, nullable: true);
            Field(x => x.ACH_PaymentAmount, nullable: true);
        }
    }
}
