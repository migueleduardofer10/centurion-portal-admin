using ElmahCore.Mvc;
using ElmahCore.Sql;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;
using CenturionPortal.ApiController.Models.Utilities;
using CenturionPortal.WebApp.Middleware;
using CenturionPortal.WebApp.Repositories;
using CenturionPortal.WebApp.Repositories.Contract;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using reCAPTCHA.AspNetCore;
using System;
using System.Text;

namespace CenturionPortal.WebApp
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
            .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var vobjSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Key"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(x =>
            {
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    IssuerSigningKey = vobjSecurityKey,
                    ClockSkew = TimeSpan.Zero,

                };
            });

            //for sessions
            services.AddDistributedMemoryCache();
            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromMinutes(30);//You can set Time   
            });

            services.AddHttpContextAccessor();
            services.AddControllersWithViews();

            services.AddControllers().AddJsonOptions(jsonOptions =>
            {
                jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null;
                jsonOptions.JsonSerializerOptions.IgnoreNullValues = true;
            }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            //get Configuration Info
            string identityConnection = Configuration["IdentityServerURL"];
            string portalApiURL= Configuration["LirsAPI"];
            string lirsWEB = Configuration["LirsWeb"];
            string blisWEB = Configuration["BlisWeb"];
            string fciWebDBConnection = Configuration["ConnectionStrings:LirsDb"];
            string jwt_key = Configuration["JWT:Key"];
            string ReCaptcha_SiteKey = Configuration["Recaptcha:SiteKey"];

            services.AddSingleton<IConfigurationSettings>
                    (new ConfigurationSettingsRepository {
                        BlisWeb = blisWEB,
                        LirsWeb = lirsWEB,
                        IdentityServerURL = identityConnection,
                        LirsAPI = portalApiURL,
                        ConnectionStrings_LirsDb = fciWebDBConnection,
                        JWT_Key = jwt_key,
                        Recaptcha_SiteKey = ReCaptcha_SiteKey
                    });


            //Conection for API
            services.AddScoped(x => new GraphQLHttpClient(portalApiURL, new NewtonsoftJsonSerializer()));

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            //Indicamos la conexión en donde se guardará el log de error del Elmah
            services.AddElmah<SqlErrorLog>(configuration =>
            {
                configuration.ConnectionString = Configuration["ConnectionStrings:LirsDb"];
            });

            services.AddRecaptcha(Configuration.GetSection("Recaptcha"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAntiforgery antiforgery)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                Enums.RenderToJavascript();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseElmah(); //Para indicar el uso del Elmah que guardará cada exception no controlada en la BD
            app.UseSecurityUserMiddleware(); //Para controlar el acceso de los usuarios a los controladores

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors();

            app.UseSession();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
