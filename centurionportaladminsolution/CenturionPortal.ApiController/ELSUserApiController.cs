using GraphQL;
using GraphQL.Client.Http;
using IdentityModel.Client;
using Kendo.Mvc.UI;
using CenturionPortal.ApiController.Model;
using CenturionPortal.ApiController.Model.Request;
using CenturionPortal.ApiController.Model.Utilities;
using CenturionPortal.ApiController.Model.Views;
using CenturionPortal.ApiController.Models.Utilities;

using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CenturionPortal.ApiController.Model.CustomEntities;
using Microsoft.Extensions.Configuration;

namespace CenturionPortal.ApiController
{
    public class ELSUserApiController
    {

        private static string CLIENT_ID = "CenturionPortal.client";
        private static string CLIENT_PASS = "KVFTRP0rAl290720clientPKRJ";
        private static string CLIENT_SCOPE_LOGIN = "offline_access portal_operation openid"; //offline_access: get a refresh token |  openid: it's no neccesary maybe a future
        private static string CLIENT_SCOPE_NOLOGIN = "portal_complement"; //it's no t necessaty a refresh Token
        private static string CLIENT_SCOPE_LOGINAS = "blis_complement lirs_complement"; //scope for get token in login as process

        public static async Task Save(GraphQLHttpClient apiClient, string accessToken, ELSUser user, string mappingUids)
        {

            try
            {
                GraphQLRequest request = new GraphQLRequest
                {
                    Query = @"
                        mutation execute($user:String!, $mappingUids:String!) 
                        {
                            eLSUser_Save(user:$user, mappingUids:$mappingUids)
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        user = JsonConvert.SerializeObject(user),
                        mappingUids
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");
                var response = await apiClient.SendMutationAsync<ObjectRequest>(request);
                UtilitiesApiController.VerifyResponse(response);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static async Task<bool> Update_Email(GraphQLHttpClient apiClient, string accessToken, string uid, string email)
        {
            try
            {
                GraphQLRequest request = null;

                request = new GraphQLRequest
                {
                    Query = @"
                        mutation execute(  $uid:String!, $email:String! ) 
                        {
                            eLSUser_Update_Email(uid:$uid, email:$email)                            
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        uid,
                        email
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendMutationAsync<ObjectRequest>(request);

                UtilitiesApiController.VerifyResponse(response);

                return response.Data.eLSUser_Update_Email;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static async Task<string> PersonalInformation_GetPhotoByUid(GraphQLHttpClient apiClient, string accessToken, string uid)
        {
            try
            {
                GraphQLRequest request = null;

                request = new GraphQLRequest
                {
                    Query = @"
                        query execute($uid:String!) 
                        {
                            getELSUser_GetPhotoByUid( uid:$uid )                            
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        uid
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                UtilitiesApiController.VerifyResponse(response);

                return response.Data.getELSUser_GetPhotoByUid;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static async Task<bool> Update_PersonalInformation(GraphQLHttpClient apiClient,
         string accessToken,
         string uid,
         string firstName, string lastName,
         string address1, string address2,
         string title, string ext,
            string homePhone, string mobilePhone, string email, byte[] photo)
        {
            try
            {
                GraphQLRequest request = null;

                request = new GraphQLRequest
                {
                    Query = @"
                        mutation execute(  $uid:String!, 
                                            $firstName:String!, 
                                            $lastName:String!, $address1:String!, 
                                            $address2:String!, $title:String!, 
                                            $ext:String!, $homePhone:String!, 
                                            $mobilePhone:String!, $email:String!, $photo:String!   ) 
                        {
                            eLSUser_Update_PersonalInformation(
                                            uid:$uid, 
                                            firstName:$firstName, 
                                            lastName:$lastName, address1:$address1, 
                                            address2:$address2, title:$title, 
                                            ext:$ext, homePhone:$homePhone, 
                                            mobilePhone:$mobilePhone, email:$email, photo:$photo )                            
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        uid,
                        firstName,
                        lastName,
                        address1,
                        address2,
                        title,
                        ext,
                        homePhone,
                        mobilePhone,
                        email,
                        photo = photo == null ? "" : BitConverter.ToString(photo)
                    }
                };

                //string str = BitConverter.ToString(photo);

                //String[] arr = str.Split('-');
                //byte[] array = new byte[arr.Length];
                //for (int i = 0; i < arr.Length; i++) array[i] = Convert.ToByte(arr[i], 16);



                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendMutationAsync<ObjectRequest>(request);

                UtilitiesApiController.VerifyResponse(response);

                return response.Data.eLSUser_Update_Email;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public static async Task<bool> Update_RecoverySetting(
            GraphQLHttpClient apiClient,
            string accessToken,
            string uid,
            string email,
            int question1, string question1String, string answer1,
            int question2, string question2String, string answer2,
            int question3, string question3String, string answer3)
        {
            try
            {
                GraphQLRequest request = null;

                request = new GraphQLRequest
                {
                    Query = @"
                        mutation execute(  $uid:String!, 
                                            $email:String!, 
                                            $question1:Int!, $question1String:String!, $answer1:String!, 
                                            $question2:Int!, $question2String:String!, $answer2:String!, 
                                            $question3:Int!, $question3String:String!, $answer3:String!
                                              ) 
                        {
                            eLSUser_Update_RecoverySetting(
                                            uid:$uid, 
                                            email:$email
                                            question1:$question1, question1String:$question1String, answer1:$answer1,
                                            question2:$question2, question2String:$question2String, answer2:$answer2,
                                            question3:$question3, question3String:$question3String, answer3:$answer3)                            
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        uid,
                        email,
                        question1,
                        question1String,
                        answer1,
                        question2,
                        question2String,
                        answer2,
                        question3,
                        question3String,
                        answer3
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendMutationAsync<ObjectRequest>(request);

                UtilitiesApiController.VerifyResponse(response);

                return response.Data.eLSUser_Update_RecoverySetting;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static async Task<bool> Update_Password(
         GraphQLHttpClient apiClient,
         string accessToken,
         string uid,
         string currentPassword, string newPassword, string confirmPassword)
        {
            try
            {
                GraphQLRequest request = null;

                request = new GraphQLRequest
                {
                    Query = @"
                        mutation execute(  $uid:String!, 
                                            $currentPassword:String!, 
                                            $newPassword:String!, 
                                            $confirmPassword:String!
                                              ) 
                        {
                            eLSUser_Update_Password(
                                            uid:$uid, 
                                            currentPassword:$currentPassword, 
                                            newPassword:$newPassword,
                                            confirmPassword:$confirmPassword
                                            )                            
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        uid,
                        currentPassword,
                        newPassword,
                        confirmPassword
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendMutationAsync<ObjectRequest>(request);

                UtilitiesApiController.VerifyResponse(response);

                return response.Data.eLSUser_Update_Password;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public static async Task<ELSUser> GetByUid(GraphQLHttpClient apiClient,
            string accessToken,
            string uid)
        {

            try
            {
                GraphQLRequest request = null;

                var fields = ELSUser.QueryForSelectSettingsAccountGraphQL;

                request = new GraphQLRequest
                {
                    Query = @"
                        query execute(  $uid:String! ) 
                        {
                            getELSUser_GetByUid(uid:$uid)
                            {
                                 " + fields + @"                                
                            }                           
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        uid
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");

                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);

                UtilitiesApiController.VerifyResponse(response);

                return response.Data.getELSUser_GetByUid;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        public static async Task Delete(GraphQLHttpClient apiClient, string accessToken, string uid)
        {
            try
            {
                GraphQLRequest request = new GraphQLRequest
                {
                    Query = @"
                        mutation execute(  $uid:String! ) 
                        {
                            eLSUser_Delete(uid:$uid)                          
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        uid
                    }
                };

                apiClient.HttpClient.DefaultRequestHeaders.Add("Authorization", $"bearer {accessToken}");
                var response = await apiClient.SendMutationAsync<ObjectRequest>(request);
                UtilitiesApiController.VerifyResponse(response);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static async Task<List<CustomLoanUser>> GetLoansByUser(GraphQLHttpClient apiClient, string userUid, int userType)
        {
            try
            {
                var request = new GraphQLRequest
                {
                    Query = @"
                        query execute ($userUid:String!, $userType:Int!)
                        {
                            getLoansByUser(userUid:$userUid, userType:$userType)
                            {
                            " + UtilitiesApiController.GetFields(typeof(CustomLoanUser)) + @"
                            }
                        }",
                    OperationName = "execute",
                    Variables = new
                    {
                        userUid,
                        userType
                    }
                };

                var response = await apiClient.SendQueryAsync<ObjectRequest>(request);
                UtilitiesApiController.VerifyResponse(response);

                return response.Data.getLoansByUser;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        public static async Task<SessionInfo> Login(string identityServerURL, string username, string password, string JWT_key)
        {


            var client = new HttpClient();
            DiscoveryDocumentRequest discoReq = new DiscoveryDocumentRequest();
            discoReq.Address = identityServerURL;
            discoReq.Policy.RequireHttps = false;

            var disco = await client.GetDiscoveryDocumentAsync(discoReq);
            if (disco == null)
                UtilitiesApiController.ShowValidation("couldn't connect with authtentication server - please try again");

            IDictionary<string, string> additionalParams = new Dictionary<string, string>();
            additionalParams.Add("type", ((int)Enums.UserTypeEnum.ADMIN).ToString());

            var tokenROResponse = await client.RequestPasswordTokenAsync(
                 new PasswordTokenRequest
                 {
                     Address = disco.TokenEndpoint,
                     ClientId = CLIENT_ID,
                     ClientSecret = CLIENT_PASS,
                     Scope = CLIENT_SCOPE_LOGIN,
                     UserName = username,
                     Password = password,
                     Parameters = additionalParams
                 }
            );

            if (tokenROResponse.IsError)
                UtilitiesApiController.ShowValidation(tokenROResponse.ErrorDescription);
            //UtilitiesApiController.ShowValidation("Incorrect Username or password");

            string tokenro = tokenROResponse.AccessToken;
            string refreshtoken = tokenROResponse.RefreshToken;
            int expiresIn = tokenROResponse.ExpiresIn;

            //user info 
            var responseUserInfo = await client.GetUserInfoAsync(
                  new UserInfoRequest
                  {
                      Address = disco.UserInfoEndpoint,
                      Token = tokenro
                  }
            );

            if (responseUserInfo.IsError)
                UtilitiesApiController.ShowValidation("We coundn't recovery user information, please try again.");

            var claims = responseUserInfo.Claims;

            //ApiController.Model.ELSUser user = await ApiController.ELSUserController.Login(_client, auth.Username, auth.Password);
            ELSUser user = UtilitiesApiController.GetELSUser(claims.ToList());
            SessionUser sessionUser = UtilitiesApiController.GetSessionUser(claims.ToList());

            string token = Token(user, JWT_key);
            string version = UtilitiesApiController.GetAssemblyVersion();

            return new SessionInfo
            {
                User = JsonConvert.SerializeObject(sessionUser),
                Version = version,
                Token = token,
                Tokenro = tokenro,
                RefreshToken = refreshtoken,
                ExpiresIn = expiresIn
            };
        }
        public static async Task Logout(string identityServerURL, string access_token = "")
        {
            var client = new HttpClient();
            DiscoveryDocumentRequest discoReq = new DiscoveryDocumentRequest();
            discoReq.Address = identityServerURL;
            discoReq.Policy.RequireHttps = false;


            var disco = await client.GetDiscoveryDocumentAsync(discoReq);
            if (disco != null && !string.IsNullOrEmpty(access_token))
            {

                //Revocate Token
                var getRevocate = await client.RevokeTokenAsync(new TokenRevocationRequest
                {
                    Address = disco.RevocationEndpoint,
                    ClientId = CLIENT_ID,
                    ClientSecret = CLIENT_PASS,
                    Token = access_token
                });
            }
        }


        public static async Task<string> getTokenComplementLoginAs(string identityServerURL, string username, string adminUsername, string cipherPassword)
        {
            var client = new HttpClient();
            DiscoveryDocumentRequest discoReq = new DiscoveryDocumentRequest();
            discoReq.Address = identityServerURL;
            discoReq.Policy.RequireHttps = false;

            var disco = await client.GetDiscoveryDocumentAsync(discoReq);
            if (disco == null)
                UtilitiesApiController.ShowValidation("couldn't connect with authtentication server - please try again");


            IDictionary<string, string> additionalParams = new Dictionary<string, string>();
            additionalParams.Add("portal_username", adminUsername);
            additionalParams.Add("portal_pass", cipherPassword);
            additionalParams.Add("portal_userref", username);

            var tokenROResponse = await client.RequestClientCredentialsTokenAsync(
                 new ClientCredentialsTokenRequest
                 {
                     Address = disco.TokenEndpoint,
                     ClientId = CLIENT_ID,
                     ClientSecret = CLIENT_PASS,
                     Scope = CLIENT_SCOPE_LOGINAS,
                     Parameters = additionalParams
                 }
            );

            if (tokenROResponse.IsError)
                UtilitiesApiController.ShowValidation("Error on get Authroization for client - try again");

            //Este token usar para el redirect 
            //si gustan guardarlo en la tabla ELSToken....es opcional porque la validacion lo hace el identity
            //Token dura 5 min
            string tokenro = tokenROResponse.AccessToken;
            return tokenro;
        }


        public static async Task<object> GetAll(GraphQLHttpClient apiClient)
        {
            try
            {
                var request = new GraphQLRequest
                {
                    Query = @"query 
                    getELSUser_GridAll
                    {
                        getELSUser_GridAll
                        {
                            " + ELSUser_Grid.QueryForSelectGraphQL + @"
                        }
                    }",
                    OperationName = "getELSUserAll"
                };

                var response = await apiClient.SendQueryAsync<ELSUserResultGraphRequest>(request);

                return new { Result = response.Data.getELSUser_GridAll };
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }

        public static async Task<object> GetPage(GraphQLHttpClient apiClient, bool getColumns, [DataSourceRequest] DataSourceRequest dataSourceRequest)
        {
            try
            {
                var request = new GraphQLRequest
                {
                    Query = @"query 
                    getELSUser_GridPage($dataSourceResquest:String!) 
                    {
                        getELSUser_GridPage(dataSourceResquest:$dataSourceResquest)
                        {
                            " + ELSUser_Grid.QueryForSelectGraphQL + @"
                        }
                    }",
                    OperationName = "getELSUserPage",
                    Variables = new
                    {
                        dataSourceRequest = UtilitiesApiController.SerializeDataSourceRequest(dataSourceRequest)
                    }
                };

                var response = await apiClient.SendQueryAsync<ELSUserResultGraphRequest>(request);

                return new { Result = response.Data.getELSUser_GridPage };
            }
            catch (System.Exception ex)
            {

                throw ex;
            }
        }

        public static string Token(ELSUser user, string strKey)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, "2"));
            claims.Add(new Claim("UserID", user.Uid.ToString()));
            claims.Add(new Claim("Email", (user.Email ?? "")));
            claims.Add(new Claim("Username", (user.Username ?? "")));
            claims.Add(new Claim("FirstName", (user.FirstName ?? "")));
            claims.Add(new Claim("MiddleName", (user.MiddleName ?? "")));
            claims.Add(new Claim("LastName", (user.LastName ?? "")));
            claims.Add(new Claim("FullName", (user.FullName ?? "")));
            claims.Add(new Claim("Title", (user.Title ?? "")));
            claims.Add(new Claim("Address1", (user.Address1 ?? "")));
            claims.Add(new Claim("Address2", (user.Address2 ?? "")));
            claims.Add(new Claim("HomePhone", (user.HomePhone ?? "")));
            claims.Add(new Claim("MobilePhone", (user.MobilePhone ?? "")));
            claims.Add(new Claim("Ext", (user.Ext ?? "")));
            claims.Add(new Claim("Photo", (user.Photo ?? "")));
            claims.Add(new Claim("IsActive", user.IsActive.ToString()));
            claims.Add(new Claim("EnableReason", user.EnableReason.ToString()));
            claims.Add(new Claim("EnableBy", (user.EnableBy ?? "")));
            claims.Add(new Claim("ShowFundingInformation", user.ShowFundingInformation.ToString()));
            claims.Add(new Claim("ShowLenderStatement", user.ShowLenderStatement.ToString()));
            claims.Add(new Claim("IncludeOriginalVendor", user.IncludeOriginalVendor.ToString()));


            var expireDate = DateTime.UtcNow.AddMinutes(30);
            var tokenHandler = new JwtSecurityTokenHandler();

            var securityKey = Encoding.UTF8.GetBytes(strKey);
            //var securityKey = Encoding.UTF8.GetBytes(UtilitiesApiController.AppSetting("JWT:key"));
            var signingCred = new SigningCredentials(new SymmetricSecurityKey(securityKey), SecurityAlgorithms.HmacSha256); //HmacSha256Signature

            var jwtSecurityToken = new JwtSecurityToken(
               issuer: null,
               audience: null,
               claims: claims,
               expires: expireDate,
               signingCredentials: signingCred
            );


            return tokenHandler.WriteToken(jwtSecurityToken);
        }
    }


    public class ObjectRequest
    {
        public ELSUser getELSUser_Find { get; set; }
        public ELSUser getELSUser_GetByUid { get; set; }
        public bool eLSUser_Update_Email { get; set; }
        public bool eLSUser_Update_PersonalInformation { get; set; }
        public bool eLSUser_Update_RecoverySetting { get; set; }
        public bool eLSUser_Update_Password { get; set; }
        public bool eLSUser_Delete { get; set; }
        public string getELSUser_GetPhotoByUid { get; set; }
        public string getLoginAsCode { get; set; }
        public List<CustomLoanUser> getLoansByUser { get; set; }

    }

}
