using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataAccess.Repositories.Contract;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Queries.Contract;
using CenturionPortalApi.WebApi.Types;
using CenturionPortalApi.WebApi.Types.Request;
using CenturionPortalApi.WebApi.Types.Views;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CenturionPortalApi.WebApi.Queries
{
    public class LoanInvoicesQuery : ObjectGraphType, ILirsContractQuery
    {
        private IEndpointAddressWCF EndpointAddressWCF;

        public LoanInvoicesQuery(IEndpointAddressWCF enterpriseWCFUrl, IHttpContextAccessor _httpContextAccessor)
        {
            this.EndpointAddressWCF = enterpriseWCFUrl;

            FieldAsync<DataSourceResultType<vwl_CreditCardInvoicesType>>(
                "getPendingInvoices",
                description: "return all pay pending invoices",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "lenderUid", DefaultValue = "all" },
                    new QueryArgument<BooleanGraphType> { Name = "onlyPositive", DefaultValue = true },
                    new QueryArgument<StringGraphType> { Name = "dataSourceRequest" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        var lenderUid = context.GetArgument<string>("lenderUid");
                        var onlyPositive = context.GetArgument<bool>("onlyPositive");
                        var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");

                        if (string.IsNullOrEmpty(userUid))
                            throw new Exception("User ID could not be empty.");


                        var result = await LoanInvoicesController.getPendingInvoices(KendoUtilities.GetDataSourceRequest(dataSourceRequest), userUid, lenderUid, onlyPositive);

                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

            FieldAsync<DataSourceResultType<vwl_PaidInvoicesType>>(
                "getPaidInvoices",
                description: "return all pay paid invoices",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "lenderUid", DefaultValue = "all" },
                    new QueryArgument<StringGraphType> { Name = "dataSourceRequest", DefaultValue = true }
                ),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        var lenderUid = context.GetArgument<string>("lenderUid");
                        var dataSourceRequest = context.GetArgument<string>("dataSourceRequest");

                        if (string.IsNullOrEmpty(userUid))
                            throw new Exception("User ID could not be empty.");


                        var result = await LoanInvoicesController.getPaidInvoices(KendoUtilities.GetDataSourceRequest(dataSourceRequest), userUid, lenderUid);

                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

            FieldAsync<ListGraphType<vwl_LBMInvoiceDependenciesType>>(
                "getInvoiceDetails",
                description: "return all invoice details",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "invoiceUid" },
                    new QueryArgument<StringGraphType> { Name = "customerUid" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var invoiceUid = context.GetArgument<string>("invoiceUid");
                        var customerUid = context.GetArgument<string>("customerUid");
                        var result = await LoanInvoicesController.getInvoiceDetails(invoiceUid, customerUid);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

            FieldAsync<ListGraphType<vwl_LBMInvoiceDetailsType>>(
                "getDetailsByInvoice",
                description: "return details by invoice uid to export excel",
                arguments: new QueryArguments(
                    new QueryArgument<StringGraphType> { Name = "invoiceUid" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var invoiceUid = context.GetArgument<string>("invoiceUid");
                        var result = await LoanInvoicesController.getDetailsByInvoice(invoiceUid);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

            FieldAsync<VCheckModelType>(
                "getVCheckInvoiceModel",
                description: "return vcheck inoive model",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "customerUid" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "listInvoiceUid" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var customerUid = context.GetArgument<string>("customerUid");
                        var listInvoiceUid = JsonConvert.DeserializeObject<List<string>>(context.GetArgument<string>("listInvoiceUid"));
                        var result = await LoanInvoicesController.getVCheckInvoiceModel(EndpointAddressWCF.EnterpriseURL, customerUid, listInvoiceUid);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

            FieldAsync<PayPalModelType>(
                "getPayPalInvoiceModel",
                description: "return paypal inoive model",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "customerUid" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "listInvoiceUid" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var customerUid = context.GetArgument<string>("customerUid");
                        var listInvoiceUid = JsonConvert.DeserializeObject<List<string>>(context.GetArgument<string>("listInvoiceUid"));
                        var result = await LoanInvoicesController.getPayPalInvoiceModel(EndpointAddressWCF.EnterpriseURL, customerUid, listInvoiceUid);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

            FieldAsync<CreditCardModelType>(
                "getCreditCardInvoiceModel",
                description: "return paypal inoive model",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "customerUid" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "listInvoiceUid" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var customerUid = context.GetArgument<string>("customerUid");
                        var listInvoiceUid = JsonConvert.DeserializeObject<List<string>>(context.GetArgument<string>("listInvoiceUid"));
                        var result = await LoanInvoicesController.getCreditCardInvoiceModel(EndpointAddressWCF.EnterpriseURL, customerUid, listInvoiceUid);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

            FieldAsync<StringGraphType>(
                "getPaymentTerms",
                description: "return payment terms and conditions",
                arguments: new QueryArguments(
                    new QueryArgument<IntGraphType> { Name = "paymentType" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        int paymentType = context.GetArgument<int>("paymentType");
                        var result = await LoanInvoicesController.getPaymentTerms(paymentType);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(UtilitiesController.IsValidation(ex) ? ex.Message : ""));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);
        }
    }
}
