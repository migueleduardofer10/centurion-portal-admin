using GraphQL;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.ApiController.Model.Views;
using CenturionPortal.ApiController.Models.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GraphQL.Client.Http;
using System.Net.Http;
using System.Security.Cryptography;

namespace CenturionPortal.ApiController
{
    public class UtilitiesApiController
    {

        public static byte[] Convert_String_To_ByteArray(string value)
        {
            byte[] result = Array.ConvertAll<string, byte>(value.Split('-'), s => Convert.ToByte(s, 16));
            return result;
        }

        public static string Convert_NullToString(string value, string defaultValue = "")
        {
            return value == null ? "" : (defaultValue != "" ? defaultValue : value.Trim());
        }

        public static string Get_AccessToken_FromHttpContext(HttpContext httpContext)
        {
            return httpContext.Session.GetString("accesstoken");
        }
        public static string Get_Uid_FromHttpContext(HttpContext httpContext)
        {
            return httpContext.User.Claims.Where(x => x.Type == "UserID").Select(x => x.Value).FirstOrDefault().ToString();
        }

        #region 



        public class CustomAggregate
        {
            public object Value { get; set; }
            public string Member { get; set; }
            public object FormattedValue { get; set; }
            public int ItemCount { get; set; }
            public string Caption { get; set; }
            public string FunctionName { get; set; }
            public string AggregateMethodName { get; set; }
        }

        public class GenericDataSourceResult<T>
        {

            public List<T> Data { get; set; }
            public int Total { get; set; }

            public List<CustomAggregate> AggregateResults { get; set; }


        }


        public static string SerializeDataSourceRequestFromString(DataSourceRequest dataSourceRequest)
        {
            var str = dataSourceRequest == null ? "" : JsonConvert.SerializeObject(dataSourceRequest, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.All
            });
            return str;
        }

        public static DataSourceRequest DeserializeDataSourceRequestFromstring(string dataSourceRequest)
        {
            if (string.IsNullOrEmpty(dataSourceRequest))
            {
                return new DataSourceRequest();
            }
            else
            {
                var request = JsonConvert.DeserializeObject<DataSourceRequest>(dataSourceRequest, new JsonSerializerSettings
                {
                    TypeNameHandling = TypeNameHandling.All
                });

                return request;
            }
        }

        #endregion



        /*public static string AppSetting(string key)
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            IConfigurationRoot configurationRoot = configurationBuilder.Build();
            return configurationRoot.GetSection(key).Value;
        }*/

        public static string GetFields(Type modelType)
        {
            try
            {

                string strAttrib = string.Join(",",
                  modelType.GetProperties()
                           .Where(p => !p.Name.Contains("_String"))
                           .Select(p => (Char.ToLowerInvariant(p.Name[0]) + p.Name.Substring(1))));

                return strAttrib;
            }
            catch (Exception ex)
            {

            }
            return "";

        }

        public static void VerifyResponse<T>(GraphQLResponse<T> response, string messageError = "")
        {
            if (response.Errors != null && response.Errors.Length > 0)
            {
                string message = response.Errors.First().Message;
                bool isValidation = message.Contains("|Validation");

                Exception ex = new Exception(string.IsNullOrEmpty(message) ? "An error has ocurred" : message.Replace("|Validation", ""));
                if (isValidation) ex.Data["isValidation"] = true;

                throw ex;
            }

            if (response.Data == null)
                throw new Exception(string.IsNullOrEmpty(messageError) ? "An error has ocurred!" : messageError);
        }

        public static bool IsValidation(Exception ex)
        {
            return ex.Data["isValidation"] == null ? false : Convert.ToBoolean(ex.Data["isValidation"]);
        }

        public static void ShowValidation(string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                Exception ex = new Exception(string.IsNullOrEmpty(message) ? "An error has ocurred" : message);
                if (!string.IsNullOrEmpty(message))
                    ex.Data["isValidation"] = true;
                throw ex;
            }
        }


        /// <summary>
        /// Retorna un objeto de tipo Blis.DataBase.Models.ELSUser 
        /// </summary>
        /// <param name="UserLogin_"></param>
        /// <returns></returns>
        public static ELSUser GetELSUser(ClaimsPrincipal UserLogin_)
        {
            ELSUser ELSUser_ = null;
            if (UserLogin_ != null && UserLogin_.Claims.Count() > 0)
            {
                ELSUser_ =
                    new ELSUser
                    {
                        Uid = UserLogin_.Claims.FirstOrDefault(x => x.Type == "UserID").Value,
                        UserType = Convert.ToInt32(UserLogin_.Claims.FirstOrDefault(x => x.Type == System.Security.Claims.ClaimTypes.Role).Value),
                        Username = UserLogin_.Claims.FirstOrDefault(x => x.Type == "Username").Value,
                        FirstName = UserLogin_.Claims.FirstOrDefault(x => x.Type == "FirstName").Value,
                        MiddleName = UserLogin_.Claims.FirstOrDefault(x => x.Type == "MiddleName").Value,
                        LastName = UserLogin_.Claims.FirstOrDefault(x => x.Type == "LastName").Value,
                        FullName = UserLogin_.Claims.FirstOrDefault(x => x.Type == "FullName").Value,
                        Title = UserLogin_.Claims.FirstOrDefault(x => x.Type == "Title").Value,
                        Address1 = UserLogin_.Claims.FirstOrDefault(x => x.Type == "Address1").Value,
                        Address2 = UserLogin_.Claims.FirstOrDefault(x => x.Type == "Address2").Value,
                        HomePhone = UserLogin_.Claims.FirstOrDefault(x => x.Type == "HomePhone").Value,
                        MobilePhone = UserLogin_.Claims.FirstOrDefault(x => x.Type == "MobilePhone").Value,
                        Ext = UserLogin_.Claims.FirstOrDefault(x => x.Type == "Ext").Value,
                        Photo = UserLogin_.Claims.FirstOrDefault(x => x.Type == "Photo").Value,
                        IsActive = Convert.ToBoolean(UserLogin_.Claims.FirstOrDefault(x => x.Type == "IsActive").Value),
                        EnableReason = Convert.ToInt32(UserLogin_.Claims.FirstOrDefault(x => x.Type == "EnableReason").Value),
                        EnableBy = UserLogin_.Claims.FirstOrDefault(x => x.Type == "EnableBy").Value,

                        //Lender Access
                        ShowFundingInformation = Convert.ToBoolean(UserLogin_.Claims.FirstOrDefault(x => x.Type == "ShowFundingInformation").Value),
                        ShowLenderStatement = Convert.ToBoolean(UserLogin_.Claims.FirstOrDefault(x => x.Type == "ShowLenderStatement").Value),

                        //ValidateAdmUser(user, saveUser);
                        Email = UserLogin_.Claims.FirstOrDefault(x => x.Type == "Email").Value,
                        IncludeOriginalVendor = Convert.ToBoolean(UserLogin_.Claims.FirstOrDefault(x => x.Type == "IncludeOriginalVendor").Value)
                    };
            }
            return ELSUser_;
        }

        public static ELSUser GetELSUser(List<Claim> claims)
        {
            if (claims == null || claims.Count() == 0) return null;

            return new ELSUser
            {
                UserType = Convert.ToInt32(claims.FirstOrDefault(x => x.Type == "UserType").Value),
                Uid = claims.FirstOrDefault(x => x.Type == "sub").Value,
                Username = claims.FirstOrDefault(x => x.Type == "Username").Value,
                FirstName = claims.FirstOrDefault(x => x.Type == "FirstName").Value,
                MiddleName = claims.FirstOrDefault(x => x.Type == "MiddleName").Value,
                LastName = claims.FirstOrDefault(x => x.Type == "LastName").Value,
                FullName = claims.FirstOrDefault(x => x.Type == "FullName").Value,
                Title = claims.FirstOrDefault(x => x.Type == "Title").Value,
                Address1 = claims.FirstOrDefault(x => x.Type == "Address1").Value,
                Address2 = claims.FirstOrDefault(x => x.Type == "Address2").Value,
                HomePhone = claims.FirstOrDefault(x => x.Type == "HomePhone").Value,
                MobilePhone = claims.FirstOrDefault(x => x.Type == "MobilePhone").Value,
                Ext = claims.FirstOrDefault(x => x.Type == "Ext").Value,
                Photo = claims.FirstOrDefault(x => x.Type == "Photo").Value,
                IsActive = Convert.ToBoolean(claims.FirstOrDefault(x => x.Type == "IsActive").Value),
                EnableReason = Convert.ToInt32(claims.FirstOrDefault(x => x.Type == "EnableReason").Value),
                EnableBy = claims.FirstOrDefault(x => x.Type == "EnableBy").Value,

                //Lender Access
                ShowFundingInformation = Convert.ToBoolean(claims.FirstOrDefault(x => x.Type == "ShowFundingInformation").Value),
                ShowLenderStatement = Convert.ToBoolean(claims.FirstOrDefault(x => x.Type == "ShowLenderStatement").Value),

                //ValidateAdmUser(user, saveUser);
                Email = claims.FirstOrDefault(x => x.Type == "Email").Value,
                IncludeOriginalVendor = Convert.ToBoolean(claims.FirstOrDefault(x => x.Type == "IncludeOriginalVendor").Value)
            };
        }

        public static SessionUser GetSessionUser(List<Claim> claims)
        {
            if (claims == null || claims.Count() == 0) return null;

            return new SessionUser
            {
                UserType = Convert.ToInt32(claims.FirstOrDefault(x => x.Type == "UserType").Value),
                Username = claims.FirstOrDefault(x => x.Type == "Username").Value,
                FirstName = claims.FirstOrDefault(x => x.Type == "FirstName").Value,
                MiddleName = claims.FirstOrDefault(x => x.Type == "MiddleName").Value,
                LastName = claims.FirstOrDefault(x => x.Type == "LastName").Value,
                FullName = claims.FirstOrDefault(x => x.Type == "FullName").Value,
                Title = claims.FirstOrDefault(x => x.Type == "Title").Value,
            };
        }

        public static string GetAssemblyVersion()
        {
            string assemblyV = System.Reflection.Assembly.GetExecutingAssembly().GetName().Version.ToString();
            System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(assembly.Location);
            string fileV = fvi.FileVersion;
            string lastV = string.Empty;
            if (!string.IsNullOrEmpty(fileV))
            {
                var splitV = fileV.Split('.');
                if (splitV != null && splitV.Count() > 0)
                {
                    lastV = ":" + splitV[splitV.Length - 1];
                }
            }
            return "v " + assemblyV + lastV;
        }

        public static string SerializeDataSourceRequest(DataSourceRequest dataSourceRequest)
        {
            return dataSourceRequest == null ? "" : JsonConvert.SerializeObject(dataSourceRequest, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.All
            });
        }

        public static string QueryForSelectGraphQL<T>()
        {
            var fields = GetFields(typeof(T));
            return @"data
                {
                    " + fields + @"
                },
                total,
                aggregateResults{
                    value,
                    member,
                    formattedValue,
                    itemCount,
                    caption,
                    functionName,
                    aggregateMethodName
                }"
            ;

            //Type modelType = typeof(T);

            //string strAttrib = string.Join(",",
            //    modelType.GetProperties()
            //           .Select(p => (char.ToLowerInvariant(p.Name[0]) + p.Name.Substring(1)))
            //    );

            //return @"
            //        data
            //        {
            //            " + strAttrib + @"
            //        },
            //        total";

        }

        public static string QueryForSelectGraphQLFromString(string fields)
        {

            return @"data
                {
                    " + fields + @"
                },
                total,
                aggregateResults{
                    value,
                    member,
                    formattedValue,
                    itemCount,
                    caption,
                    functionName,
                    aggregateMethodName
                }"
            ;

            //Type modelType = typeof(T);

            //string strAttrib = string.Join(",",
            //    modelType.GetProperties()
            //           .Select(p => (char.ToLowerInvariant(p.Name[0]) + p.Name.Substring(1)))
            //    );

            //return @"
            //        data
            //        {
            //            " + strAttrib + @"
            //        },
            //        total";

        }

        public static string QueryForInvoiceDetails()
        {
            var invoice = GetFields(typeof(vwl_LBMInvoice));
            var invoiceDetails = GetFields(typeof(vwl_LBMInvoiceDetail));
            var payment = GetFields(typeof(vwl_LNSPayment));
            var paymentLog = GetFields(typeof(vwl_LBMPaymentLog));

            return @"
                invoice
                {
                    " + invoice + @"
                },
                invoiceDetails
                {
                    " + invoiceDetails + @"
                },
                payment
                {
                    " + payment + @"
                },
                paymentLog
                {
                    " + paymentLog + @"
                }";
        }

        public static void RenderAppSettingsOnClient()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            IConfigurationRoot configurationRoot = configurationBuilder.Build();

            string path = Path.Combine(Directory.GetCurrentDirectory(), @"ClientApp\src\utilities\AppSettings.ts");

            if (File.Exists(path)) File.Delete(path);

            using (StreamWriter sw = File.CreateText(path))
            {
                sw.WriteLine("export const AppSettings = {");
                sw.WriteLine("\tRecaptcha: {");
                sw.WriteLine("\t\tSecretKey: '" + configurationRoot.GetSection("Recaptcha:SecretKey").Value + "',");
                sw.WriteLine("\t\tSiteKey: '" + configurationRoot.GetSection("Recaptcha:SiteKey").Value + "',");
                sw.WriteLine("\t}");
                sw.Write("}");
            }
        }

        public static string GetModelStateError(ModelStateDictionary modelState)
        {
            return modelState.Values.SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage).First();
        }

        public static async Task<string> ApiGetInfo(GraphQLHttpClient apiClient, string accessToken = "")
        {
            try
            {
                HttpClient client = new HttpClient();
                var query = "?query={getInfo}";
                var data = new StringContent("", Encoding.UTF8, "application/json");
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                var response = await client.PostAsync(apiClient.Options.EndPoint + query, data);
                string result = response.Content.ReadAsStringAsync().Result;
                return result;
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}
