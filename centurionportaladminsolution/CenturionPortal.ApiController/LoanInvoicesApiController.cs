using GraphQL;
using GraphQL.Client.Http;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.ApiController.Model.Views;
using CenturionPortal.ApiController.Models.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CenturionPortal.ApiController
{
    public class LoanInvoicesApiController
    {
        public static async Task<object> getPendingInvoices(
            GraphQLHttpClient apiClient, string access_token, DataSourceRequest dataSourceRequest = null, bool getColumns = false, string lenderUid = "all", bool onlyPositive = true)
        {
            GraphQLRequest request = null;
            var vwl_ServiceMapProperties = UtilitiesApiController.GetFields(typeof(ELSServiceMap));
            var vwl_PendingInvoicesProperties = UtilitiesApiController.QueryForSelectGraphQL<vwl_CreditCardInvoices>();

            if (getColumns == false)
            {
                request = new GraphQLRequest
                {
                    Query = @"query 
                        getPendingInvoices($dataSourceRequest:String, $lenderUid:String!, $onlyPositive:Boolean!) 
                        {
                            getPendingInvoices(dataSourceRequest:$dataSourceRequest, lenderUid:$lenderUid, onlyPositive:$onlyPositive)
                            {
                                " + vwl_PendingInvoicesProperties + @"
                            }
                        }",
                    OperationName = "getPendingInvoices",
                    Variables = new
                    {
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest),
                        lenderUid,
                        onlyPositive
                    }
                };
            }
            else
            {
                var ELSColumnProperties = UtilitiesApiController.GetFields(typeof(ELSColumn));

                request = new GraphQLRequest
                {
                    Query = @"query 
                        getPendingInvoices($dataSourceRequest:String, $lenderUid:String!, $onlyPositive:Boolean!, $entityType:Int!) 
                        {
                            getGrid(entityType:$entityType) 
                            {
                                " + ELSColumnProperties + @" 
                            },
                            getPendingInvoices(dataSourceRequest:$dataSourceRequest, lenderUid:$lenderUid, onlyPositive:$onlyPositive)
                            {
                                " + vwl_PendingInvoicesProperties + @"
                            },
                            getValidLendersByLender
                            {
                                " + vwl_ServiceMapProperties + @"
                            }
                        }",
                    OperationName = "getPendingInvoices",
                    Variables = new
                    {
                        entityType = (int)Enums.GridEntityTypeEnum.VWL_CREDITCARDINVOICES,
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest),
                        lenderUid = "",
                        onlyPositive
                    }
                };
            }

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<InvoicesResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return new
            {
                Result = response.Data.getPendingInvoices,
                Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid,
                Lenders = response.Data.getValidLendersByLender == null ? new List<ELSServiceMap>() : response.Data.getValidLendersByLender
            };
        }

        public static async Task<object> getPaidInvoices(
            GraphQLHttpClient apiClient, string access_token, DataSourceRequest dataSourceRequest = null, bool getColumns = false, string lenderUid = "all")
        {
            GraphQLRequest request = null;
            var vwl_ServiceMapProperties = UtilitiesApiController.GetFields(typeof(ELSServiceMap));
            var vwl_PaidInvoicesProperties = UtilitiesApiController.QueryForSelectGraphQL<vwl_PaidInvoices>();

            if (getColumns == false)
            {
                request = new GraphQLRequest
                {
                    Query = @"query 
                        getPaidInvoices($dataSourceRequest:String, $lenderUid:String!) 
                        {
                            getPaidInvoices(dataSourceRequest:$dataSourceRequest, lenderUid:$lenderUid)
                            {
                                " + vwl_PaidInvoicesProperties + @"
                            }
                        }",
                    OperationName = "getPaidInvoices",
                    Variables = new
                    {
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest),
                        lenderUid
                    }
                };
            }
            else
            {
                var ELSColumnProperties = UtilitiesApiController.GetFields(typeof(ELSColumn));

                request = new GraphQLRequest
                {
                    Query = @"query 
                        getPaidInvoices($dataSourceRequest:String, $lenderUid:String!, $entityType:Int!) 
                        {
                            getGrid(entityType:$entityType) 
                            {
                                " + ELSColumnProperties + @" 
                            },
                            getPaidInvoices(dataSourceRequest:$dataSourceRequest, lenderUid:$lenderUid)
                            {
                                " + vwl_PaidInvoicesProperties + @"
                            },
                            getValidLendersByLender
                            {
                                " + vwl_ServiceMapProperties + @"
                            }
                        }",
                    OperationName = "getPaidInvoices",
                    Variables = new
                    {
                        entityType = (int)Enums.GridEntityTypeEnum.VWL_PAIDINVOICES,
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequestFromString(dataSourceRequest),
                        lenderUid
                    }
                };
            }

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<InvoicesResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return new
            {
                Result = response.Data.getPaidInvoices,
                Columns = response.Data.getGrid == null ? new List<ELSColumn>() : response.Data.getGrid,
                Lenders = response.Data.getValidLendersByLender == null ? new List<ELSServiceMap>() : response.Data.getValidLendersByLender
            };
        }

        public static async Task<List<vwl_LBMInvoiceDependencies>> getInvoiceDetails(
            GraphQLHttpClient apiClient, string access_token, string invoiceUid, string customerUid)
        {
            var vwl_InvoiceDependenciesProperties = UtilitiesApiController.QueryForInvoiceDetails();

            GraphQLRequest request = new GraphQLRequest
            {
                Query = @"query 
                        getInvoiceDetails($invoiceUid:String, $customerUid:String!) 
                        {
                            getInvoiceDetails(invoiceUid:$invoiceUid, customerUid:$customerUid)
                            {
                                " + vwl_InvoiceDependenciesProperties + @"
                            }
                        }",
                OperationName = "getInvoiceDetails",
                Variables = new
                {
                    invoiceUid,
                    customerUid
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<InvoicesResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return response.Data.getInvoiceDetails;
        }

        public static async Task<List<vwl_LBMInvoiceDetails>> getDetailsByInvoice(
            GraphQLHttpClient apiClient, string access_token, string invoiceUid)
        {
            var vwl_InvoiceDetailsProperties = UtilitiesApiController.GetFields(typeof(vwl_LBMInvoiceDetails));

            GraphQLRequest request = new GraphQLRequest
            {
                Query = @"query 
                        getDetailsByInvoice($invoiceUid:String) 
                        {
                            getDetailsByInvoice(invoiceUid:$invoiceUid)
                            {
                                " + vwl_InvoiceDetailsProperties + @"
                            }
                        }",
                OperationName = "getDetailsByInvoice",
                Variables = new
                {
                    invoiceUid
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<InvoicesResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return response.Data.getDetailsByInvoice;
        }

        public static async Task<object> getVCheckInvoiceModel(
            GraphQLHttpClient apiClient, string access_token, string customerUid, string listInvoiceUid)
        {
            string InvoiceInformationProperties = UtilitiesApiController.GetFields(typeof(VCheckModel));
            string StateProperties = UtilitiesApiController.GetFields(typeof(vw_INFState));

            GraphQLRequest request = new GraphQLRequest
            {
                Query = @"query 
                        getVCheckInvoiceModel($customerUid:String!, $listInvoiceUid:String!, $addRowAll:Boolean!, $paymentType:Int!) 
                        {
                            getVCheckInvoiceModel(customerUid:$customerUid, listInvoiceUid:$listInvoiceUid)
                            {
                                " + InvoiceInformationProperties + @"
                            },
                            getINFState(addRowAll:$addRowAll)
                            {
                                " + StateProperties + @"
                            },
                            getPaymentTerms(paymentType:$paymentType)
                        }",
                OperationName = "getVCheckInvoiceModel",
                Variables = new
                {
                    customerUid,
                    listInvoiceUid,
                    addRowAll = false,
                    paymentType = (int)Enums.PaymentTypeEnum.VCHECK
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<InvoicesResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return new
            {
                paymentModel = response.Data.getVCheckInvoiceModel,
                paymentTerms = response.Data.getPaymentTerms,
                states = response.Data.getINFState
            };
        }

        public static async Task<object> getPayPalInvoiceModel(
            GraphQLHttpClient apiClient, string access_token, string customerUid, string listInvoiceUid)
        {
            var InvoiceInformationProperties = UtilitiesApiController.GetFields(typeof(PayPalModel));

            GraphQLRequest request = new GraphQLRequest
            {
                Query = @"query 
                        getPayPalInvoiceModel($customerUid:String!, $listInvoiceUid:String!, $paymentType:Int!) 
                        {
                            getPayPalInvoiceModel(customerUid:$customerUid, listInvoiceUid:$listInvoiceUid)
                            {
                                " + InvoiceInformationProperties + @"
                            },
                            getPaymentTerms(paymentType:$paymentType)
                        }",
                OperationName = "getPayPalInvoiceModel",
                Variables = new
                {
                    customerUid,
                    listInvoiceUid,
                    paymentType = (int)Enums.PaymentTypeEnum.PAYPAL
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<InvoicesResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return new
            {
                paymentModel = response.Data.getPayPalInvoiceModel,
                paymentTerms = response.Data.getPaymentTerms
            };
        }

        public static async Task<object> getCreditCardInvoiceModel(
            GraphQLHttpClient apiClient, string access_token, string customerUid, string listInvoiceUid)
        {
            string InvoiceInformationProperties = UtilitiesApiController.GetFields(typeof(CreditCardModel));
            string StateProperties = UtilitiesApiController.GetFields(typeof(vw_INFState));

            GraphQLRequest request = new GraphQLRequest
            {
                Query = @"query 
                        getCreditCardInvoiceModel($customerUid:String!, $listInvoiceUid:String!, $addRowAll:Boolean!, $paymentType:Int!) 
                        {
                            getCreditCardInvoiceModel(customerUid:$customerUid, listInvoiceUid:$listInvoiceUid)
                            {
                                " + InvoiceInformationProperties + @"
                            },
                            getINFState(addRowAll:$addRowAll)
                            {
                                " + StateProperties + @"
                            },
                            getPaymentTerms(paymentType:$paymentType)
                        }",
                OperationName = "getCreditCardInvoiceModel",
                Variables = new
                {
                    customerUid,
                    listInvoiceUid,
                    addRowAll = false,
                    paymentType = (int)Enums.PaymentTypeEnum.CREDIT_CARD
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<InvoicesResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return new
            {
                paymentModel = response.Data.getCreditCardInvoiceModel,
                paymentTerms = response.Data.getPaymentTerms,
                states = response.Data.getINFState
            };
        }

        public static async Task<string> applyPaymentByVCheck(
            GraphQLHttpClient apiClient, string access_token, VCheckModel vCheckModel)
        {
            GraphQLRequest request = new GraphQLRequest
            {
                Query = @"mutation 
                        applyPaymentByVCheck($vCheckModel:VCheckModelInputType!) 
                        {
                            applyPaymentByVCheck(vCheckModel:$vCheckModel)
                        }",
                OperationName = "applyPaymentByVCheck",
                Variables = new
                {
                    vCheckModel
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<InvoicesResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return response.Data.applyPaymentByVCheck;
        }

        public static async Task<string> applyPaymentByPayPal(
            GraphQLHttpClient apiClient, string access_token, PayPalModel payPalModel)
        {
            GraphQLRequest request = new GraphQLRequest
            {
                Query = @"mutation 
                        applyPaymentByPayPal($payPalModel:PayPalModelInputType!) 
                        {
                            applyPaymentByPayPal(payPalModel:$payPalModel)
                        }",
                OperationName = "applyPaymentByPayPal",
                Variables = new
                {
                    payPalModel
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<InvoicesResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return response.Data.applyPaymentByPayPal;
        }

        public static async Task<string> applyPaymentByCreditCard(
            GraphQLHttpClient apiClient, string access_token, CreditCardModel creditCardModel)
        {
            GraphQLRequest request = new GraphQLRequest
            {
                Query = @"mutation 
                        applyPaymentByCreditCard($creditCardModel:CreditCardModelInputType!) 
                        {
                            applyPaymentByCreditCard(creditCardModel:$creditCardModel)
                        }",
                OperationName = "applyPaymentByCreditCard",
                Variables = new
                {
                    creditCardModel
                }
            };

            apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {access_token}");
            var response = await apiClient.SendQueryAsync<InvoicesResponse>(request);
            UtilitiesApiController.VerifyResponse(response);

            return response.Data.applyPaymentByCreditCard;
        }
    }

    public class InvoicesResponse
    {
        public List<ELSColumn> getGrid { get; set; }
        public List<ELSServiceMap> getValidLendersByLender { get; set; }
        public GenericDataSourceResult<vwl_PaidInvoices> getPaidInvoices { get; set; }
        public GenericDataSourceResult<vwl_CreditCardInvoices> getPendingInvoices { get; set; }
        public List<vwl_LBMInvoiceDependencies> getInvoiceDetails { get; set; }
        public List<vwl_LBMInvoiceDetails> getDetailsByInvoice { get; set; }
        public VCheckModel getVCheckInvoiceModel { get; set; }
        public PayPalModel getPayPalInvoiceModel { get; set; }
        public CreditCardModel getCreditCardInvoiceModel { get; set; }
        public List<vw_INFState> getINFState { get; set; }
        public string getPaymentTerms { get; set; }
        public string applyPaymentByVCheck { get; set; }
        public string applyPaymentByPayPal { get; set; }
        public string applyPaymentByCreditCard { get; set; }
    }
}
