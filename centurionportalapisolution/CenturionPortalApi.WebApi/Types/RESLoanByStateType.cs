using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Custom_Entities;

namespace CenturionPortalApi.WebApi.Types
{
    public class RESLoanByStateType : ObjectGraphType<RESLoanByState>
    {
        public RESLoanByStateType()
        {
            Name = nameof(RESLoanByStateType);
            Description = "RES Loan By State Type";

            Field(x => x.StateUid, nullable: true);
            Field(x => x.StateName, nullable: true);
            Field(x => x.UPB, nullable: true);
            Field(x => x.UPBDelinquency, nullable: true);
            Field(x => x.TotalLoans, nullable: true);
            Field(x => x.TotalDelinquency, nullable: true);
        }
    }
}
