using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using CenturionPortalApi.DataAccess.Repositories;
using CenturionPortalApi.DataAccess.Repositories.Contract;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Mutations;
using CenturionPortalApi.WebApi.Queries;
using CenturionPortalApi.WebApi.Schema;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Net;

namespace CenturionPortalApi.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();

            // For Async IO Operations
            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

            //Connection EnterpriseWCF 
            string wcf_url = Configuration["EndpointEnterprise_wcf:Endpoint_Current"];
            services.AddSingleton<IEndpointAddressWCF>(new EndpointAddressWCF(wcf_url));

            services.AddCustomAuthentication(Configuration); // configuration Authentication IdentityServer4
            services.AddCustomGraphQLServices(); // Graphql Configuration
            services.AddCustomGraphQLTypes(); //Graphql Types 
            services.AddCustomGraphQLAuth();   //Authentication Clases for Graphql  ValidationRule, AuthorizationSetting , Evaluator
            services.AddCustomGraphQLQueriesTypes(); //Graphql Sub Queries Types 

            services.AddScoped<AppQuery>();
            services.AddScoped<AppMutation>();
            services.AddScoped<AppSchema>(); ///NOT singleton

           

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseExceptionHandler(appError =>
            {
                //FORMATEO DEL MENSAJE DE ERROR

                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                    if (contextFeature != null)
                    {
                        var objError = new ErrorTracking()
                        {
                            title = "One or more errors occurred in the process",
                            type = ReasonPhrases.GetReasonPhrase(context.Response.StatusCode),
                            status = context.Response.StatusCode,
                            traceId = context.TraceIdentifier.Replace("-", "")
                        };

                        if (contextFeature.Error.Data != null && contextFeature.Error.Data.Contains(nameof(OptionalParameterInvalid)))
                        {
                            var arr = contextFeature.Error.Data[nameof(OptionalParameterInvalid)] as List<OptionalParameterInvalid>;
                            arr.ForEach(x => objError.errors.Add(x.Name, new string[] { x.Message }));

                        }
                        else
                        {
                            objError.errors.Add("Exception", new string[] { ErrorTracking.PrepareMessage(contextFeature.Error.Message) });
                        }


                        await context.Response.WriteAsync(objError.ToJson());
                    }
                });
            });


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();
            app.UseAuthentication();

            app.UseWebSockets();
            app.UseGraphQL<AppSchema>();
            app.UseGraphQLWebSockets<AppSchema>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //app.UseGraphQL<AppSchema>();

            //app.UseGraphQLWebSockets<AppSchema>();

            app.UseGraphQLPlayground(options: new GraphQLPlaygroundOptions()
            {
                Path = "/graphiql",
                GraphQLEndPoint = "/graphql"
            });
        }
    }
}
