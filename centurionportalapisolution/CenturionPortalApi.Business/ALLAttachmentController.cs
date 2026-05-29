using Centurion.Utilities;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public class ALLAttachmentController
    {
        public static async Task<string> DownloadByUid(string enterpriseURL, string attachmentUid, string userId)
        {

            //Validaciones de id de Attachment e id de Usuario
            vwl_ALLAttachment objAttachment = ALLAttachmentFacade.GetByUid(attachmentUid);
            if (objAttachment == null)
                return string.Empty;


            if (!UtilitiesController.ValidateUserByLoanAccount(userId, objAttachment.ParentAccount))
                throw new Exception("Attachment not found");


            string path = (objAttachment.Path == null) ? "" : objAttachment.Path;

            //test
            //bool test = true;
            //if (test) path = "D:\\Attachments\\01d77c041cb74503bb62236f36ab91c2.pdf";

            string dataBase64 = await CenturionAttachmentServiceController.GetAttachment(enterpriseURL, path);
            return dataBase64;

        }

        public static vwl_ALLAttachment GetByUid(string Uid)
        {
            return ALLAttachmentFacade.GetByUid(Uid);
        }

        public static IQueryable<vwl_ALLAttachment> GetByViewTypeAndParentUid(int viewType, string ParentUid, int category = -1, DateTime? appCreationDateFrom = null, DateTime? appCreationDateTo = null)
        {
            return GetByViewTypeAndParentUids(viewType, new List<string> { ParentUid }, category, appCreationDateFrom, appCreationDateTo);
        }

        public static IQueryable<vwl_ALLAttachment> GetByViewTypeAndParentUids(int viewType, List<string> ParentUids, int category = -1, DateTime? appCreationDateFrom = null, DateTime? appCreationDateTo = null)
        {
            IQueryable<vwl_ALLAttachment> query = ALLAttachmentFacade.GetAllByParentUids(ParentUids, category);

            if (viewType == (int)Enums.AttachmentViewEnum.LENDER_STATEMENTS)
            {
                query = from x in query
                        where 
                        (
                            x.BatchType == (int)CENTEnums.AttachmentBatchTypeEnum.VENDOR_STATEMENT
                            || x.Description.Contains("Statement of Account")
                            || x.Name.Contains("Statement of Account")
                            || x.Path.Contains("Statement of Account")
                        )
                        && x.AppCreationDate >= appCreationDateFrom && x.AppCreationDate <= appCreationDateTo
                        select x;
            }
            else if (viewType == (int)Enums.AttachmentViewEnum.NOTIFICATION_OF_DEPOSIT)
            {
                query = from x in query
                        where x.BatchType == (int)Enums.AttachmentBatchTypeEnum.NOTIFICATION_OF_ELECTRONIC_DEPOSIT
                        && x.AppCreationDate >= appCreationDateFrom && x.AppCreationDate <= appCreationDateTo
                        select x;
            }
            else if (viewType == (int)Enums.AttachmentViewEnum.TAX_FORMS)
            {
                query = from x in query
                        where
                        (
                            x.BatchType == (int)Enums.AttachmentBatchTypeEnum.INVESTOR_1099_INT 
                            || x.BatchType == (int)Enums.AttachmentBatchTypeEnum.VENDOR_1099_MISC 
                            || x.Description.Contains("1099INT") 
                            || x.Description.Contains("1099MISC")
                        )
                        select x;
            }
            return query;
        }
    }
}
