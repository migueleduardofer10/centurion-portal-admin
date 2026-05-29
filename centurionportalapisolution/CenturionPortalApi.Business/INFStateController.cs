using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataBase.Models.Views;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CenturionPortalApi.Business
{
  public  static class INFStateController

    {

        public static async Task< List<vw_INFState> >GetAll()
        {
            return await 
            INFStateFacade.GetAll()  .ToListAsync();
        }

    }
}
