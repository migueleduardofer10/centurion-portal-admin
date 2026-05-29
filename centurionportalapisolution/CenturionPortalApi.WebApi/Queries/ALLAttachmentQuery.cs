using Centurion.Utilities;
using GraphQL.Authorization;
using GraphQL.Types;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataAccess.Repositories.Contract;
using CenturionPortalApi.DataBase.Models.Views;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.Views;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Queries
{
    public class ALLAttachmentQuery : ObjectGraphType, ILirsContractQuery
    {
        private IEndpointAddressWCF EndpointAddressWCF;

        public ALLAttachmentQuery(IEndpointAddressWCF _endpointAddressWCF, IHttpContextAccessor _httpContextAccessor)
        {
            EndpointAddressWCF = _endpointAddressWCF;
            FieldAsync<DataSourceResultType<vwl_ALLAttachmentType>>(
                "getALLAttachment_ByLenderUidAndViewType",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "lenderUid" },
                    new QueryArgument<DateGraphType> { Name = "appCreationDateFrom" },
                    new QueryArgument<DateGraphType> { Name = "appCreationDateTo" },
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "viewType" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "dataSourceRequest" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var lenderUid = context.GetArgument<string>("lenderUid");
                        var appCreationDateFrom = context.GetArgument<DateTime>("appCreationDateFrom");
                        var appCreationDateTo = context.GetArgument<DateTime>("appCreationDateTo");
                        var viewType = context.GetArgument<int>("viewType");                        
                        var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");

                        if (appCreationDateFrom == null)
                        {
                            appCreationDateFrom = new DateTime(DateTime.Now.Year, 1, 1);
                            appCreationDateTo = DateTime.Now.Date;
                        }
                        appCreationDateTo = appCreationDateTo.Date.AddDays(1);

                        IQueryable<vwl_ALLAttachment> query = null;
                        if (!string.IsNullOrEmpty(lenderUid))
                        {
                            query = ALLAttachmentController.GetByViewTypeAndParentUid(viewType, lenderUid, -1, appCreationDateFrom, appCreationDateTo);
                        }
                        else {
                            string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                            int userType = Convert.ToInt32(_httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "UserType").Select(x => x.Value).FirstOrDefault());
                            
                            List<string> parentUids = await ELSServiceMapController.GetValidLender_ByUidAndTypeAndViewType_Only_ParentUids(userUid, userType, viewType);
                            query = ALLAttachmentController.GetByViewTypeAndParentUids(viewType, parentUids, -1, appCreationDateFrom, appCreationDateTo);
                        }
                        return await query.ToDataSourceResultAsync(KendoUtilities.DeserializeDataSourceRequestFromstring(dataSourceRequest));

                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);


            FieldAsync<StringGraphType>(
                "getALLAttachment_FileByUid",
                description: "return pdf attachment information.",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        string userId = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        string attachmentUid = context.GetArgument<string>("uid");
                        string dataDecoded = await ALLAttachmentController.DownloadByUid(_endpointAddressWCF.EnterpriseURL, attachmentUid, userId);
                        return dataDecoded;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);
        }
    }
}
