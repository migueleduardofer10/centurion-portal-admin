using GraphQL.Types;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.UI;
using CenturionPortalApi.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types
{

    

    public class AggregateResultType : ObjectGraphType<AggregateResult>
    {
        public AggregateResultType()
        {
            Name = nameof(AggregateResultType) ;
            Description = "Data Source Aggregate Result";

            //Field(x => x.AggregateMethodName, nullable: false);
            //Field(x => x.Caption, nullable: false);
            //Field(x => x.FormattedValue, type: typeof(StringGraphType), nullable: false);
            //Field(x => x.FunctionName, nullable: false);
            //Field(x => x.ItemCount, nullable: false);
            //Field(x => x.Member, nullable: false);
            //Field(x => x.Value, type: typeof(StringGraphType), nullable: false);


            Field(x => x.AggregateMethodName, nullable: true);
            Field(x => x.Caption, nullable: true);
            Field(x => x.FormattedValue, type: typeof(StringGraphType), nullable: true);
            Field(x => x.FunctionName, nullable: true);
            Field(x => x.ItemCount, nullable: true);
            Field(x => x.Member, nullable: true);
            Field(x => x.Value, type: typeof(StringGraphType), nullable: true);
        }
    }

    public class DataSourceResultType<TType> : ObjectGraphType<DataSourceResult>
        where TType : IGraphType
    {
        public DataSourceResultType()
        {
            Name = typeof(TType).Name +  "DataSourceResultType";

            
            //Field(x => x.Data, type: typeof(ListGraphType<TType>), nullable: false);
            //Field(x => x.Total, nullable: false);
            ////Faltan agregar
            //Field(x => x.AggregateResults, type: typeof(ListGraphType<AggregateResultType>), nullable: false);



            Field(x => x.Data, type: typeof(ListGraphType<TType>), nullable: true);
            Field(x => x.Total, nullable: true);
            //Faltan agregar
            Field(x => x.AggregateResults, type: typeof(ListGraphType<AggregateResultType>), nullable: true);


        }
    }


}
