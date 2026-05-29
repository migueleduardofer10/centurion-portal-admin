using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwa_ELSUser_GridType : ObjectGraphType<vwa_ELSUser_Grid>
    {
        public vwa_ELSUser_GridType()
        {        
            Name = nameof(vwa_ELSUser_GridType);

            Field(x => x.Uid, nullable: false);
            Field(x => x.Username, nullable: false);
            Field(x => x.FirstName, nullable: true);
            Field(x => x.LastName, nullable: true);
            Field(x => x.MiddleName, nullable: true);
            Field(x => x.Address1, nullable: true);
            Field(x => x.Email, nullable: false);
            Field(x => x.MobilePhone, nullable: true);
            Field(x => x.HomePhone, nullable: true);
            Field(x => x.IsActive, nullable: false, type: typeof(BooleanGraphType));
            Field(x => x.UserType, nullable: false);
            Field(x => x.LastAliveCheck, nullable: true, type: typeof(DateTimeGraphType));
            Field(x => x.LoggedIP, nullable: true);
        }
    }
}
