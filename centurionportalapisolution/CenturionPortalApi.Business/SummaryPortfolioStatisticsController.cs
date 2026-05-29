using Centurion.Utilities;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
    public static class SummaryPortfolioStatisticsController
    {

        public static async Task<List<SummaryPortfolioStatistics>> GetPortfolioStatisticsbyLenderUidAsync(string userUid, Centurion.Utilities.CENTEnums.UserTypeEnum userType)
        {
            try
            {

                var arr = await SummaryPortfolioStatisticsFacade.GetPortfolioStatisticsbyLenderUid(userUid, userType).ToListAsync();

                var addBefore = new List<AddItemsForEnums>();
                addBefore.Add(new AddItemsForEnums("ASSIGNED", -1, "Assigned"));
                var addAfter = new List<AddItemsForEnums>();
                addAfter.Add(new AddItemsForEnums("DELIQUENCY", 15, "Delinquency"));
                var dictenums =Centurion.Utilities.CENTEnums. EnumValuesDictionary(typeof( Centurion.Utilities.CENTEnums.LoanStatusEnum), addBefore, addAfter);

                arr.ForEach(x =>
                {
                    switch (x.Id)
                    {
                        case -1:
                            x.Status = "ASSIGNED";
                            break;
                        case 15:
                            x.Status = "DELIQUENCY";
                            break;
                        default:
                            x.Status =dictenums[ x.Id??0];
                            break;
                    }
                });


                return arr;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}
