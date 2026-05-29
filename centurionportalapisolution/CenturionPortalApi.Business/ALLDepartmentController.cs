using Kendo.Mvc.Extensions;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public static class ALLDepartmentController
    {

        public static async Task<List<vw_ALLDepartment>> GetAll_Columns_Uid_Name()
        {
            return await
            ALLDepartmentFacade.GetAll()
            .Select(x => new vw_ALLDepartment { Name = x.Name, Uid = x.Uid })
            .OrderBy(x => x.Name)
            .ToListAsync();
        }

    }
}
