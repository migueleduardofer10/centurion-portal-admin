using CenturionPortalApi.DataBase.Context;
using CenturionPortalApi.DataBase.Models.Utilities;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Linq;

namespace CenturionPortalApi.DataAccess
{
    public static class vwl_VendorPortfolioFacade
    {
        //public static IQueryable<vwl_VendorPortfolio> GetAll_Query(int userType, string userUid)
        //{
        //    var context = new LirsDbContext();

        //    var q1 = context.vwl_VendorPortfolio.AsQueryable();
        //    var q2 = context.ELSServiceMap.Where(x => x.UserUid == userUid && x.Type == userType).Select(m => m.ParentUid).AsQueryable();


        //    if (userType == (int)ELSEnums.UserTypeEnum.LENDER)//Filter by List of Lenders
        //    {
        //        q1 = q1.Where(c => q2.Contains(c.LenderUid));
        //    }
        //    else if (userType == (int)ELSEnums.UserTypeEnum.BROKER)//Filter by List of officers
        //    {
        //        q1 = q1.Where(c => q2.Contains(c.OfficerUid));
        //    }
        //    else if (userType == (int)ELSEnums.UserTypeEnum.BORROWER)//Filter by List of officers
        //    {
        //        q1 = q1.Where(c => q2.Contains(c.LoanUid) && (c.IsForeclosure == false));
        //    }

        //    q1 = q1.OrderBy(x => x.FullName);

        //    return q1;
        //}

        public static IQueryable<vwl_VendorPortfolio> Get()
        {
            var context = new LirsDbContext();

            var query = context.vwl_VendorPortfolio.AsQueryable();




            return query;
        }

        public static IQueryable<vwl_VendorPortfolio> GetPage(int userType, string uid)
        {

            var context = new LirsDbContext();



            var serviceMapQuery = context.ELSServiceMap.Where(sm => sm.UserUid == uid && sm.Type == userType).Select(sm => sm.ParentUid).AsQueryable();


            IQueryable<vwl_VendorPortfolio> vendorPorfolioQuery = null;

            switch ((Enums.UserTypeEnum)userType)
            {
                case Enums.UserTypeEnum.LENDER:
                    vendorPorfolioQuery = context.vwl_VendorPortfolio.Where(vp => serviceMapQuery.Contains(vp.LenderUid)).AsQueryable();

                    break;
                case Enums.UserTypeEnum.BROKER:
                    vendorPorfolioQuery = context.vwl_VendorPortfolio.Where(vp => serviceMapQuery.Contains(vp.OfficerUid)).AsQueryable();


                    break;
                case Enums.UserTypeEnum.BORROWER:
                    vendorPorfolioQuery = context.vwl_VendorPortfolio.Where(vp => serviceMapQuery.Contains(vp.LoanUid) && vp.IsForeclosure == true).AsQueryable();

                    break;
            }

            vendorPorfolioQuery = vendorPorfolioQuery.OrderBy(vp => vp.Name);

            return vendorPorfolioQuery;


            //var q = (from vendorPorfolio in context.vwl_VendorPortfolio
            //         join serviceMap in serviceMapQuery on vendorPorfolio. ).AsQueryable();


            // LirsDbContext context = new LirsDbContext();

            //IQueryable<vwl_VendorPortfolio> query = context.vwl_VendorPortfolio.AsQueryable();






            //if (userType == (int)ELSEnums.UserTypeEnum.LENDER)//Filter by List of Lenders
            //{
            //    query = query.Where(c => maps.Contains(c.LenderUid));
            //}
            //else if (userType == (int)ELSEnums.UserTypeEnum.BROKER)//Filter by List of officers
            //{
            //    query = query.Where(c => maps.Contains(c.OfficerUid));
            //}
            //else if (userType == (int)ELSEnums.UserTypeEnum.BORROWER)//Filter by List of officers
            //{
            //    query = query.Where(c => maps.Contains(c.LoanUid) && (c.IsForeclosure == false));
            //}

            //int totalRows = await query.CountAsync();
            /*
            PagedListParamField sort = pageParams.Sort;
            if (sort != null && !string.IsNullOrEmpty(sort.Field) && !string.IsNullOrEmpty(sort.Dir))
            {
                sort.Field = sort.Field.Substring(0, 1).ToUpper() + sort.Field.Substring(1);

                if (sort.Dir == "asc")
                    query = query.OrderBy(x => EF.Property<object>(x, sort.Field));
                else if (sort.Dir == "desc")
                    query = query.OrderByDescending(x => EF.Property<object>(x, sort.Field));
            }

            if (pageParams.Skip >= 0)
                query = query.Skip(pageParams.Skip);

            if (pageParams.Take > 0)
                query = query.Take(pageParams.Take);*/

            //  IEnumerable<vwl_VendorPortfolio> loans = await query.ToListAsync();


        }

    }
}
