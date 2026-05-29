using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
  public static   class OtherStatisticsController
    {

        public static async Task<List<OtherStatistics>> getOtherStatistics(string userUid,
          Centurion.Utilities.CENTEnums.UserTypeEnum userType)
        {
            return await OtherStatisticsFacade.getOtherStatistics(userUid, userType).ToListAsync();
        }

        }
}
