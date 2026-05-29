using GraphQL.Types;
using CenturionPortalApi.DataBase.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CenturionPortalApi.WebApi.Types.Views
{
    public class vwl_LNSVendorType : ObjectGraphType<vwl_LNSVendor>
    {
        public vwl_LNSVendorType()
        {

            Name = nameof(vwl_LNSVendorType);
             


            Field(x => x.Uid, nullable: true);
            Field(x => x.DepartmentUid, nullable: true);
            Field(x => x.Account, nullable: true);
            Field(x => x.AlternativeAccount, nullable: true);
            Field(x => x.IsCompany, nullable: true);
            Field(x => x.Company, nullable: true);
            Field(x => x.ContacName, nullable: true);
            Field(x => x.Salutation, nullable: true);
            Field(x => x.FirstName, nullable: true);
            Field(x => x.MiddleName, nullable: true);
            Field(x => x.LastName, nullable: true);
            Field(x => x.FullName, nullable: true);
            Field(x => x.Street, nullable: true);
            Field(x => x.City, nullable: true);
            Field(x => x.State, nullable: true);
            Field(x => x.ZipCode, nullable: true);
            Field(x => x.HomePhone, nullable: true);
            Field(x => x.WorkPhone, nullable: true);
            Field(x => x.MobilePhone, nullable: true);
            Field(x => x.Fax, nullable: true);
            Field(x => x.TIN, nullable: true);
            Field(x => x.TINType, nullable: true);
            Field(x => x.TINMask, nullable: true);
            Field(x => x.Birthday, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.Email, nullable: true);
            Field(x => x.UseSoldRate, nullable: true);
            Field(x => x.SoldRate, type: (typeof(DecimalGraphType)), nullable: true);
            Field(x => x.IsLender, nullable: true);
            Field(x => x.IsActive, nullable: true);
            Field(x => x.OnHold, nullable: true);
            Field(x => x.CallDaysAfterDue, nullable: true);
            Field(x => x.CanCallAfterGrace, nullable: true);
            Field(x => x.TimesToCall, nullable: true);
            Field(x => x.TimesToCallPer, nullable: true);
            Field(x => x.ServincingType, nullable: true);
            Field(x => x.WhenDelinquent, nullable: true);
            Field(x => x.CallsToBeHotTransfered, nullable: true);
            Field(x => x.ModifiyDeedInLui, nullable: true);
            Field(x => x.CollectionServices, nullable: true);
            Field(x => x.CanPrepareFinancial, nullable: true);
            Field(x => x.CanDesignRepaymenyt, nullable: true);
            Field(x => x.CanReqBPO, nullable: true);
            Field(x => x.CanForgiveDuePayments, nullable: true);
            Field(x => x.CanForgiveDueCharges, nullable: true);
            Field(x => x.CanForgivePrincipal, nullable: true);
            Field(x => x.CanCreateForebearance, nullable: true);
            Field(x => x.CanAcceptDeed, nullable: true);
            Field(x => x.CanOfferCash, nullable: true);
            Field(x => x.CanAllowShortSale, nullable: true);
            Field(x => x.ReqCopyNotice, nullable: true);
            Field(x => x.ReqCopyLate, nullable: true);
            Field(x => x.FeePct, nullable: true);
            Field(x => x.FeeFlat, nullable: true);
            Field(x => x.FeeMin, nullable: true);
            Field(x => x.ACHReceivingDFI, nullable: true);
            Field(x => x.ACHAccountNumber, nullable: true);
            Field(x => x.ACHAccountRefNumber, nullable: true);
            Field(x => x.ACHIndividualIdNumber, nullable: true);
            Field(x => x.ACHIndividualName, nullable: true);
            Field(x => x.ACHBankAccountType, nullable: true);
            Field(x => x.ACHStatus, nullable: true);
            Field(x => x.ACHDisburstmentDay, nullable: true);
            Field(x => x.ACHDisburstmentFrequency, nullable: true);
            Field(x => x.ACHDisburstmentNextDay, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.DefaultBillingPlanUid, nullable: true);
            Field(x => x.DefaultBillingPlanName, nullable: true);
            Field(x => x.Type, nullable: true);
            //Field(x => x.UseAsDim, nullable: true);
            Field(x => x.Send1099, nullable: true);
            Field(x => x.EmailFormat, nullable: true);
            Field(x => x.DeliveryOptions, nullable: true);
            Field(x => x.FCNoAlternatives, nullable: true);
            Field(x => x.FCReducedInt, nullable: true);
            Field(x => x.FCShortSale, nullable: true);
            Field(x => x.FCShortPayoff, nullable: true);
            Field(x => x.FCReducedPayment, nullable: true);
            Field(x => x.FCDeedInLieu, nullable: true);
            Field(x => x.FCMaturityExtension, nullable: true);
            Field(x => x.FCModifiedTerms, nullable: true);
            Field(x => x.FCPrincipalReduction, nullable: true);
            Field(x => x.FCCapitalization, nullable: true);
            Field(x => x.FCSent, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.AppTimeStamp, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.AppCreatedBy, nullable: true);
            Field(x => x.AppCreationDate, type: (typeof(DateTimeGraphType)), nullable: true);
            Field(x => x.AppLastUpdatedBy, nullable: true);
          //  Field(x => x.SysTimeStamp,   nullable: true);//byte[]
            Field(x => x.Payee, nullable: true);
            Field(x => x.UsePayee, nullable: true);
            Field(x => x.BigLenderUid, nullable: true);
            Field(x => x.StatusOSC, nullable: true);
            Field(x => x.ACHSendDepositNotificationFlag, nullable: true);
            Field(x => x.AdditionalLenders, nullable: true);
            Field(x => x.ReceiveLateLetters, nullable: true);
            Field(x => x.IsFrozenChecks, nullable: true);
            Field(x => x.VestingVendorCompany, nullable: true);
            Field(x => x.VestingVendorPersonal, nullable: true);
            Field(x => x.ACHAddendaInfo, nullable: true);
            Field(x => x.ACHAddendaEnable, nullable: true);
            Field(x => x.Url, nullable: true);
            Field(x => x.OperationAfter, nullable: true);//TimeSpan
            Field(x => x.OperationBefore, nullable: true);//TimeSpan
            Field(x => x.DaysBefore, nullable: true);
            Field(x => x.DaysAfter, nullable: true);
            Field(x => x.Timezone, nullable: true);
            Field(x => x.OperationAfter2, nullable: true);//TimeSpan
            Field(x => x.OperationBefore2, nullable: true);//TimeSpan
            Field(x => x.DaysBefore2, nullable: true);
            Field(x => x.DaysAfter2, nullable: true);
            Field(x => x.PaymentStreet, nullable: true);
            Field(x => x.PaymentCity, nullable: true);
            Field(x => x.PaymentState, nullable: true);
            Field(x => x.PaymentZipCode, nullable: true);
            Field(x => x.Notes, nullable: true);
            Field(x => x.TINEncrypted, nullable: true);


        }
    }
}
