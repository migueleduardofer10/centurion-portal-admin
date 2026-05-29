using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_ALLAttachmentType : ObjectGraphType<vwl_ALLAttachment>
    {
        public vwl_ALLAttachmentType()
        {
            Name = nameof(vwl_ALLAttachmentType);
            Field(x => x.Uid, nullable: false, type: typeof(StringGraphType));
            Field(x => x.ParentUid, nullable: false, type: typeof(StringGraphType));
            Field(x => x.ParentAccount, nullable: false, type: typeof(StringGraphType));
            Field(x => x.Module, nullable: false, type: typeof(IntGraphType));
            Field(x => x.CategoryUid, nullable: false, type: typeof(IntGraphType));
            Field(x => x.BatchType, nullable: false, type: typeof(IntGraphType));
            Field(x => x.Description, nullable: true, type: typeof(StringGraphType));
            Field(x => x.Name, nullable: true, type: typeof(StringGraphType));
            Field(x => x.Type, nullable: true, type: typeof(StringGraphType));
            Field(x => x.AppCreationDate, nullable: true, type: typeof(DateTimeGraphType));
            Field(x => x.Path, nullable: true, type: typeof(StringGraphType));
        }
    }
}
