
using GraphQL;
using CenturionPortalApi.WebApi.Mutations;
using CenturionPortalApi.WebApi.Queries;


namespace CenturionPortalApi.WebApi.Schema
{
    public class AppSchema : GraphQL.Types.Schema
    {
        public AppSchema(IDependencyResolver resolver) : base(resolver)
        {

            Query = resolver.Resolve<AppQuery>();
            Mutation = resolver.Resolve<AppMutation>();

        }
    }
}
