using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
    public class ALLAttachmentFacade
    {
        public static vwl_ALLAttachment GetByUid(string Uid)
        {
            try
            {
                return new LirsDbContext().vwl_ALLAttachment.Where(x => x.Uid == Uid).FirstOrDefault();
            }
            catch (Exception Ex) { throw Ex; }
        }

        public static IQueryable<vwl_ALLAttachment> GetAllByParentUid(string ParentUid, int category = -1)
        {
            try
            {
                return GetAllByParentUids(new List<string> { ParentUid }, category);
            }
            catch (Exception ex) { throw ex; }
        }

        public static IQueryable<vwl_ALLAttachment> GetAllByParentUids(List<string> ParentUids, int category = -1)
        {
            LirsDbContext context = new LirsDbContext();
            try
            {
                if (category == -1)
                    return (from a in context.vwl_ALLAttachment where ParentUids.Contains(a.ParentUid) && a.Module != 2 orderby a.AppCreationDate descending select a);
                else
                    return (from a in context.vwl_ALLAttachment where ParentUids.Contains(a.ParentUid) && a.CategoryUid == category && a.Module != 2 orderby a.AppCreationDate descending select a);
            }
            catch (Exception ex) { throw ex; }
        }
    }
}
