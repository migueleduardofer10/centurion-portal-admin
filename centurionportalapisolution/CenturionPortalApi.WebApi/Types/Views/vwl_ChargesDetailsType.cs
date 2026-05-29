using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_ChargesDetailsType : ObjectGraphType<vwl_ChargesDetails>
    {
        public vwl_ChargesDetailsType()
        {

            Name = nameof(vwl_ChargesDetailsType);

            Field(x => x.Uid, nullable: true);
            Field(x => x.ChargeUid, nullable: true);
            Field(x => x.Date, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.Reference, nullable: true);
            Field(x => x.VendorName, nullable: true);
            Field(x => x.Amount, nullable: true);
            Field(x => x.PrinVendor, nullable: true);
            Field(x => x.IntVendor, nullable: true);
            Field(x => x.PrinBehalf, nullable: true);
            Field(x => x.IntBehalf, nullable: true);



        }
    }
}


