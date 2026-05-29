using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CenturionPortalApi.DataAccess
{
  public static  class INFStateFacade
    {
        public static IQueryable<vw_INFState> GetAll()
        {
            return new  LirsDbContext().vw_INFState.OrderBy(x=>x.Name).AsQueryable();
        }


    }
}
