using GraphQL.Authorization;
using GraphQL.Types;
using CenturionPortalApi.Business;
using CenturionPortalApi.DataAccess;
using CenturionPortalApi.DataAccess.Repositories.Contract;
using CenturionPortalApi.DataBase.Models;
using CenturionPortalApi.DataBase.Models.Request;
using CenturionPortalApi.WebApi.Helper;
using CenturionPortalApi.WebApi.Types.Input;
using CenturionPortalApi.WebApi.Types.Utilities;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CenturionPortalApi.WebApi.Mutations
{
    public class AppMutation : ObjectGraphType
    {
        private IEndpointAddressWCF EndpointAddressWCF;

        private void ELSUser()
        {
            FieldAsync<BooleanGraphType>(
                           "eLSUser_Update_Email",
                           arguments: new QueryArguments(
                               new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" },
                                new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "email" }),
                           resolve: async context =>
                           {
                               try
                               {
                                   var uid = context.GetArgument<string>("uid");
                                   var email = context.GetArgument<string>("email");

                                   await ELSGridController.Update_Email(uid, email);//loanRepository.insert(listLoan);

                                   return true;
                               }
                               catch (Exception ex)
                               {
                                   context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                                   return false;
                               }
                           }
                       );

            FieldAsync<BooleanGraphType>(
                         "eLSUser_Update_PersonalInformation",
                         arguments: new QueryArguments(
                            new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" },
                            new QueryArgument<StringGraphType> { Name = "firstName" },
                             new QueryArgument<StringGraphType> { Name = "lastName" },
                              new QueryArgument<StringGraphType> { Name = "address1" },
                               new QueryArgument<StringGraphType> { Name = "address2" },
                                new QueryArgument<StringGraphType> { Name = "title" },
                                 new QueryArgument<StringGraphType> { Name = "ext" },
                                  new QueryArgument<StringGraphType> { Name = "homePhone" },
                                   new QueryArgument<StringGraphType> { Name = "mobilePhone" },
                                    new QueryArgument<StringGraphType> { Name = "email" }
                                                     ),
                         resolve: async context =>
                         {
                             try
                             {
                                 var uid = context.GetArgument<string>("uid");
                                 var firstName = context.GetArgument<string>("firstName");
                                 var lastName = context.GetArgument<string>("lastName");
                                 var address1 = context.GetArgument<string>("address1");
                                 var address2 = context.GetArgument<string>("address2");
                                 var title = context.GetArgument<string>("title");
                                 var ext = context.GetArgument<string>("ext");
                                 var homePhone = context.GetArgument<string>("homePhone");
                                 var mobilePhone = context.GetArgument<string>("mobilePhone");
                                 var email = context.GetArgument<string>("email");


                                 await ELSGridController.Update_PersonalInformation(uid, firstName, lastName, address1, address2, title, ext, homePhone, mobilePhone, email);//loanRepository.insert(listLoan);

                                 return true;
                             }
                             catch (Exception ex)
                             {
                                 context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                                 return false;
                             }
                         }
                     );


            FieldAsync<BooleanGraphType>(
                       "eLSUser_Update_RecoverySetting",
                       arguments: new QueryArguments(
                        new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" },
                        new QueryArgument<StringGraphType> { Name = "email" },

                        new QueryArgument<IntGraphType> { Name = "question1" },
                        new QueryArgument<StringGraphType> { Name = "question1String" },
                        new QueryArgument<StringGraphType> { Name = "answer1" },

                        new QueryArgument<IntGraphType> { Name = "question2" },
                        new QueryArgument<StringGraphType> { Name = "question2String" },
                        new QueryArgument<StringGraphType> { Name = "answer2" },

                        new QueryArgument<IntGraphType> { Name = "question3" },
                        new QueryArgument<StringGraphType> { Name = "question3String" },
                        new QueryArgument<StringGraphType> { Name = "answer3" }
                                                   ),
                       resolve: async context =>
                       {
                           try
                           {
                               var uid = context.GetArgument<string>("uid");
                               var email = context.GetArgument<string>("email");

                               var question1 = context.GetArgument<int>("question1");
                               var question1String = context.GetArgument<string>("question1String");
                               var answer1 = context.GetArgument<string>("answer1");

                               var question2 = context.GetArgument<int>("question2");
                               var question2String = context.GetArgument<string>("question2String");
                               var answer2 = context.GetArgument<string>("answer2");

                               var question3 = context.GetArgument<int>("question3");
                               var question3String = context.GetArgument<string>("question3String");
                               var answer3 = context.GetArgument<string>("answer3");

                               await ELSGridController.Update_RecoverySetting(uid, email,
                                   question1, question1String, answer1,
                                   question2, question2String, answer2,
                                   question3, question3String, answer3);

                               return true;
                           }
                           catch (Exception ex)
                           {
                               context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                               return false;
                           }
                       }
                   );


            FieldAsync<BooleanGraphType>(
                    "eLSUser_Update_Password",
                    arguments: new QueryArguments(
                     new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" },
                     new QueryArgument<StringGraphType> { Name = "currentPassword" },
                     new QueryArgument<StringGraphType> { Name = "newPassword" },
                     new QueryArgument<StringGraphType> { Name = "confirmPassword" }

                                                ),
                    resolve: async context =>
                    {
                        try
                        {
                            var uid = context.GetArgument<string>("uid");

                            var currentPassword = context.GetArgument<string>("currentPassword");
                            var newPassword = context.GetArgument<string>("newPassword");
                            var confirmPassword = context.GetArgument<string>("confirmPassword");

                            await ELSGridController.Update_Password(uid, currentPassword,newPassword,confirmPassword);

                            return true;
                        }
                        catch (Exception ex)
                        {
                            context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                            return false;
                        }
                    }
                );

        }

        private void PaymentInvoices()
        {
            FieldAsync<StringGraphType>(
                "applyPaymentByVCheck",
                arguments: new QueryArguments(
                    new QueryArgument<VCheckModelInputType> { Name = "vCheckModel" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var vCheckModel = context.GetArgument<VCheckModel>("vCheckModel");
                        var result = await LoanInvoicesController.applyPaymentByVCheck(EndpointAddressWCF.EnterpriseURL, vCheckModel);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

            FieldAsync<StringGraphType>(
                "applyPaymentByPayPal",
                arguments: new QueryArguments(
                    new QueryArgument<PayPalModelInputType> { Name = "payPalModel" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var payPalModel = context.GetArgument<PayPalModel>("payPalModel");
                        var result = await LoanInvoicesController.applyPaymentByPayPal(EndpointAddressWCF.EnterpriseURL, payPalModel);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);

            FieldAsync<StringGraphType>(
                "applyPaymentByCreditCard",
                arguments: new QueryArguments(
                    new QueryArgument<CreditCardModelInputType> { Name = "creditCardModel" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        var creditCardModel = context.GetArgument<CreditCardModel>("creditCardModel");
                        var result = await LoanInvoicesController.applyPaymentByCreditCard(EndpointAddressWCF.EnterpriseURL, creditCardModel);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return null;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);
        }

        public AppMutation(IEndpointAddressWCF enterpriseWCFUrl, IHttpContextAccessor _httpContextAccessor)
        {
            this.EndpointAddressWCF = enterpriseWCFUrl;

            ELSUser();

            PaymentInvoices();

            FieldAsync<BooleanGraphType>(
                "insertGrid",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "gridEnum" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "columns" }
                ),
                resolve: async context =>
                {
                    try
                    {
                        string userUid = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "sub").Select(x => x.Value).FirstOrDefault().ToString();
                        string username = _httpContextAccessor.HttpContext.User.Claims.Where(x => x.Type == "Username").Select(x => x.Value).FirstOrDefault().ToString();

                        int gridEnum = context.GetArgument<int>("gridEnum");
                        var listColumns = JsonConvert.DeserializeObject<List<ELSColumn>>(context.GetArgument<string>("columns"));

                        await ELSGridController.Save(userUid, username, gridEnum, listColumns);//loanRepository.insert(listLoan);

                        return true;
                    }
                    catch (Exception ex)
                    {
                        context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                        return false;
                    }
                }
            ).AuthorizeWith(Policies.lirsOperation);


            FieldAsync<BooleanGraphType>(
               "eLSServiceMap_Delete",
               arguments: new QueryArguments(
                                           new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "userUid" },
                                           new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "parentUid" }),
               resolve: async context =>
               {
                   try
                   {

                       var userUid = context.GetArgument<string>("userUid");
                       var parentUid = context.GetArgument<string>("parentUid");
                       return await ELSServiceMapController.Delete(userUid, parentUid);
                   }
                   catch (Exception ex)
                   {
                       context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                       return null;
                   }
               }
           );



            FieldAsync<BooleanGraphType>(
             "eLSUser_Delete",
             arguments: new QueryArguments(
            new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "uid" }),
             resolve: async context =>
             {
                 try
                 {

                     var uid = context.GetArgument<string>("uid");

                     return await ELSUserFacade.Delete(uid);
                 }
                 catch (Exception ex)
                 {
                     context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                     return null;
                 }
             }
         );



            FieldAsync<ListGraphType<ResponseObservationType>>(
             "eLSUser_Save",
             arguments: new QueryArguments(
            new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "user" },
              new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "mappingUids" }),
             resolve: async context =>
             {
                 try
                 {
                     var strUser = context.GetArgument<string>("user");
                     var mappingUids = context.GetArgument<string>("mappingUids");


                     var user = JsonConvert.DeserializeObject<ELSUser>(strUser);

                     ELSUser saveUser = new ELSUser();

                     if (user.Username != null)
                         user.Username = user.Username.Trim();

                     if (!string.IsNullOrEmpty(user.Uid))
                         saveUser = await ELSUserFacade.Find(user.Uid);
                     else
                         saveUser.Uid = string.IsNullOrEmpty(user.Uid) ? UtilitiesController.GetUid() : user.Uid;

                     var observations = await ELSUserController.ValidateUser(user, saveUser);

                     if (observations.Count > 0)
                         return observations;

                     saveUser = ELSUserController.SetUserData(user, saveUser);

                     if (string.IsNullOrEmpty(user.Uid))
                         //saveUser.Email = saveUser.Username;
                         await ELSUserFacade.Insert(saveUser);
                     else
                         await ELSUserFacade.Update(saveUser);

                     await ELSUserController.AssignLoans(user.Uid, user.UserType, mappingUids);

                     return observations;
                 }
                 catch (Exception ex)
                 {
                     context.Errors.Add(new GraphQL.ExecutionError(ex.Message));
                     return null;
                 }
             }
         );





        }


    }
}
