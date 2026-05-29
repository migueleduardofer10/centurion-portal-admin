using GraphQL;
using GraphQL.Authorization;
using GraphQL.Server;
using GraphQL.Validation;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.CustomEntities;
using CenturionPortalApi.WebApi.Types.Input;
using CenturionPortalApi.WebApi.Types.Reports;
using CenturionPortalApi.WebApi.Types.Request;
using CenturionPortalApi.WebApi.Types.Utilities;
using CenturionPortalApi.WebApi.Types.Views;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebSockets;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;

namespace CenturionPortalApi.WebApi
{
    public static class Startup_ConfigureServiceExtension
    {

        public static void AddCustomAuthentication(this IServiceCollection services, IConfiguration Configuration)
        {
            string identit_url = Configuration["IdentityServerURL"];
            string identityServerURL = identit_url;
            //string identityServerURL = "http://190.117.169.183:5050";
            //string identityServerURL = "http://127.0.0.1:5050";

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
             .AddIdentityServerAuthentication(options =>
             {
                 options.Authority = identityServerURL; //URL TO IdentityServer
                 options.RequireHttpsMetadata = false;
                 options.ApiName = "CenturionLIRSAPI";
                 options.ApiSecret = "InternalLIRSAPI160720MK"; //apisecret is for instrospection call if not setting then authentication will be only for JWT 
                 options.CacheDuration = TimeSpan.FromMinutes(10); // that's the default ..this is important for introspection review on docs.
             }
            );
        }

        public static void AddCustomGraphQLServices(this IServiceCollection services)
        {
            services.AddScoped<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));
            services.AddGraphQL(o => { o.ExposeExceptions = false; })
             .AddUserContextBuilder(httpContext => new GraphQLUserContext
             {
                 User = httpContext.User
             })
            .AddWebSockets()
            .AddDataLoader()
            .AddGraphTypes(ServiceLifetime.Scoped);
        }


        public static void AddCustomGraphQLTypes(this IServiceCollection services)
        {
            services.AddScoped<ELSColumnType>();
            services.AddScoped<ELSColumnInputType>();
            services.AddScoped<ELSGridType>();

            services.AddScoped<AggregateResultType>();

            services.AddScoped<RPTCustomLenderDisbursementType>();

            services.AddScoped<vwa_ELSUser_GridType>();
            services.AddScoped<DataSourceResultType<vwa_ELSUser_GridType>>();

            services.AddScoped<vwl_ALLAttachmentType>();
            services.AddScoped<DataSourceResultType<vwl_ALLAttachmentType>>();

            services.AddScoped<vwl_FundingType>();
            services.AddScoped<DataSourceResultType<vwl_FundingType>>();

            services.AddScoped<vwl_LoanNotesType>();
            services.AddScoped<DataSourceResultType<vwl_LoanNotesType>>();

            services.AddScoped<vwl_VendorPortfolioType>();
            services.AddScoped<DataSourceResultType<vwl_VendorPortfolioType>>();

            services.AddScoped<vwl_LoanHistoryType>();
            services.AddScoped<DataSourceResultType<vwl_LoanHistoryType>>();

            services.AddScoped<vwl_LoanChargesType>();
            services.AddScoped<DataSourceResultType<vwl_LoanChargesType>>();

            services.AddScoped<vwl_ChargesDetailsType>();
            services.AddScoped<DataSourceResultType<vwl_ChargesDetailsType>>();

            services.AddScoped<vw_INFStateType>();
            services.AddScoped<DataSourceResultType<vw_INFStateType>>();

            services.AddScoped<vwl_LNSOfficersType>();
            services.AddScoped<DataSourceResultType<vwl_LNSOfficersType>>();

            services.AddScoped<vwl_LNSLoanType>();
            services.AddScoped<DataSourceResultType<vwl_LNSLoanType>>();

            services.AddScoped<vwa_ELSUser_GridType>();
            services.AddScoped<DataSourceResultType<vwa_ELSUser_GridType>>();

            services.AddScoped<vwl_LNSVendorType>();
            services.AddScoped<DataSourceResultType<vwl_LNSVendorType>>();

            services.AddScoped<ELSServiceMapType>();
            services.AddScoped<DataSourceResultType<ELSServiceMapType>>();

            services.AddScoped<ELSUserType>();
            services.AddScoped<DataSourceResultType<ELSUserType>>();

            services.AddScoped<ResponseObservationType>();
            services.AddScoped<DataSourceResultType<ResponseObservationType>>();


            services.AddScoped<RESLoanByStateType>();
            services.AddScoped<vwl_LoanPaymentOnTimeType>();
            services.AddScoped<LoanStatusStatisticType>();
            services.AddScoped<VendorHistoryStatisticsType>();

            services.AddScoped<vwl_PaidInvoicesType>();
            services.AddScoped<DataSourceResultType<vwl_PaidInvoicesType>>();

            services.AddScoped<vwl_CreditCardInvoicesType>();
            services.AddScoped<DataSourceResultType<vwl_CreditCardInvoicesType>>();

            services.AddScoped<VCheckModelType>();
            services.AddScoped<PayPalModelType>();
            services.AddScoped<CreditCardModelType>();
            services.AddScoped<VCheckModelInputType>();
            services.AddScoped<PayPalModelInputType>();
            services.AddScoped<CreditCardModelInputType>();

            services.AddScoped<vcw_VendorPortfolioSecondaryType>();
            services.AddScoped<DataSourceResultType<vcw_VendorPortfolioSecondaryType>>();

            services.AddScoped<vwl_LBMInvoiceType>();
            services.AddScoped<vwl_LBMInvoiceDetailType>();
            services.AddScoped<vwl_LNSPaymentType>();
            services.AddScoped<vwl_LBMPaymentLogType>();
            services.AddScoped<vwl_LBMInvoiceDependenciesType>();

            services.AddScoped<v_LNSBorrowerType>();
            services.AddScoped<DataSourceResultType<v_LNSBorrowerType>>();

            services.AddScoped<v_LNSPropertyType>();
            services.AddScoped<DataSourceResultType<v_LNSPropertyType>>();

            services.AddScoped<GraphSecondaryLoanType>();

            services.AddScoped<vw_VendorHistoryType>();
            services.AddScoped<DataSourceResultType<vw_VendorHistoryType>>();



            services.AddScoped<SummaryPortfolioStatisticsType>();
            services.AddScoped<DataSourceResultType<SummaryPortfolioStatisticsType>>();

            services.AddScoped<SummaryPortfolioStatisticsType>();



            services.AddScoped<RPTCustomFullLoanPortfolioType>();
            services.AddScoped<DataSourceResultType<RPTCustomFullLoanPortfolioType>>();

            services.AddScoped<CustomACHStatusType>();
            services.AddScoped<DataSourceResultType<CustomACHStatusType>>();
            


        }

        public static void AddCustomGraphQLQueriesTypes(this IServiceCollection services)
        {
            
                 services.AddTransient<ILirsContractQuery, RPTCustomFullLoanPortfolioQuery>();


            services.AddTransient<ILirsContractQuery, vCW_LenderDisbursementQuery>();
            services.AddTransient<ILirsContractQuery, OtherStatisticsQuery>();
            services.AddTransient<ILirsContractQuery, SummaryPortfolioStatisticsQuery>();
            services.AddTransient<ILirsContractQuery, vw_VendorHistoryQuery>();
            services.AddTransient<ILirsContractQuery, v_LNSBorrowerQuery>();
            services.AddTransient<ILirsContractQuery, v_LNSPropertyQuery>();
            services.AddTransient<ILirsContractQuery, vcw_VendorPortfolioSecondaryQuery>();



            services.AddTransient<ILirsContractQuery, ALLAttachmentQuery>();
            services.AddTransient<ILirsContractQuery, ALLDepartmentQuery>();
            services.AddTransient<ILirsContractQuery, ELSColumnQuery>();
            services.AddTransient<ILirsContractQuery, ELSServiceMapQuery>();
            services.AddTransient<ILirsContractQuery, ELSUser_GridQuery>();
            services.AddTransient<ILirsContractQuery, ELSUserQuery>();
            services.AddTransient<ILirsContractQuery, FundingQuery>();
            services.AddTransient<ILirsContractQuery, INFStateQuery>();
            services.AddTransient<ILirsContractQuery, LNSLoanQuery>();
            services.AddTransient<ILirsContractQuery, LNSOfficersQuery>();
            services.AddTransient<ILirsContractQuery, LNSVendorQuery>();
            services.AddTransient<ILirsContractQuery, LoanChargesQuery>();
            services.AddTransient<ILirsContractQuery, LoanHistoryQuery>();
            services.AddTransient<ILirsContractQuery, LoanInvoicesQuery>();
            services.AddTransient<ILirsContractQuery, LoanNotesQuery>();
            services.AddTransient<ILirsContractQuery, VendorPortfolioQuery>();
            services.AddTransient<ILirsContractQuery, DashboardQuery>();
            services.AddTransient<ILirsContractQuery, ReportQuery>();
        }


        public static void AddCustomGraphQLAuth(this IServiceCollection services)
        {

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.TryAddSingleton<IAuthorizationEvaluator, AuthorizationEvaluator>();
            services.AddTransient<IValidationRule, AuthorizationValidationRule>();
            services.TryAddSingleton(_ =>
            {
                var authSettings = new AuthorizationSettings();

                authSettings.AddPolicy(
                    Policies.lirsOperation, policy => policy.RequireClaim("scope", Roles.lirs_operation));

                authSettings.AddPolicy(
                    Policies.lirsComplement, policy => policy.RequireClaim("scope", Roles.lirs_complement));


                return authSettings;
            });

        }

    }
}
