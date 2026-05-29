using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LoanNotesType : ObjectGraphType<vwl_LoanNotes>
    {
        public vwl_LoanNotesType()
        {
            Name = nameof(vwl_LoanNotesType);

            Field(x => x.UidNote, nullable: true);
            Field(x => x.UidLoan, nullable: true);
            Field(x => x.Date, type: typeof(DateGraphType), nullable: true);
            Field(x => x.Rep, nullable: true);
            Field(x => x.CreateBy, nullable: true);
            Field(x => x.Note, nullable: true);
            Field(x => x.Note_Plain, nullable: true);
            Field(x => x.Priority,type:typeof(IntGraphType),  nullable: true);
            Field(x => x.Description, nullable: true);
            Field(x => x.Type, nullable: true);
            Field(x => x.ContactPerson, nullable: true);
            Field(x => x.ContactNumber, nullable: true);
            Field(x => x.Subject, nullable: true);

        }
    }
}
