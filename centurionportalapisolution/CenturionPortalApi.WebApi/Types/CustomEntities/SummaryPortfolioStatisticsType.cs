using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Custom_Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.CustomEntities
{
    public class SummaryPortfolioStatisticsType : ObjectGraphType<SummaryPortfolioStatistics>
    {
        public SummaryPortfolioStatisticsType()
        {

            Name = nameof(SummaryPortfolioStatisticsType);

            Field(x => x.Id, type: typeof(IntGraphType), nullable: true);
            Field(x => x.Status, type: typeof(StringGraphType), nullable: true);
            Field(x => x.TotalLoans, type: typeof(IntGraphType), nullable: true);
            Field(x => x.OriginalBalance, type: typeof(DecimalGraphType), nullable: true);
            Field(x => x.PrincipalBalance, type: typeof(DecimalGraphType), nullable: true);
            Field(x => x.SUMNoteRate, type: typeof(DecimalGraphType), nullable: true);
        }

    }
    }

