using System;
using System.Collections.Generic;
using System.Text;

namespace CenturionPortal.ApiController.Model.Views
{
    public partial class vwl_LNSVendor
    {

        public static string QueryForSelectGraphQL
        {
            get
            {
               return @"
                uid
                departmentUid
                account
                alternativeAccount
                isCompany
                company
                contacName
                salutation
                firstName
                middleName
                lastName
                fullName
                street
                city
                state
                zipCode
                homePhone
                workPhone
                mobilePhone
                fax
                tIN
                tINType
                tINMask
                birthday
                email
                useSoldRate
                soldRate
                isLender
                isActive
                onHold
                callDaysAfterDue
                canCallAfterGrace
                timesToCall
                timesToCallPer
                servincingType
                whenDelinquent
                callsToBeHotTransfered
                modifiyDeedInLui
                collectionServices
                canPrepareFinancial
                canDesignRepaymenyt
                canReqBPO
                canForgiveDuePayments
                canForgiveDueCharges
                canForgivePrincipal
                canCreateForebearance
                canAcceptDeed
                canOfferCash
                canAllowShortSale
                reqCopyNotice
                reqCopyLate
                feePct
                feeFlat
                feeMin
                aCHReceivingDFI
                aCHAccountNumber
                aCHAccountRefNumber
                aCHIndividualIdNumber
                aCHIndividualName
                aCHBankAccountType
                aCHStatus
                aCHDisburstmentDay
                aCHDisburstmentFrequency
                aCHDisburstmentNextDay
                defaultBillingPlanUid
                defaultBillingPlanName
                type
                useAsDim
                send1099
                emailFormat
                deliveryOptions
                fCNoAlternatives
                fCReducedInt
                fCShortSale
                fCShortPayoff
                fCReducedPayment
                fCDeedInLieu
                fCMaturityExtension
                fCModifiedTerms
                fCPrincipalReduction
                fCCapitalization
                fCSent
                appTimeStamp
                appCreatedBy
                appCreationDate
                appLastUpdatedBy
                payee
                usePayee
                bigLenderUid
                statusOSC
                aCHSendDepositNotificationFlag
                additionalLenders
                receiveLateLetters
                isFrozenChecks
                vestingVendorCompany
                vestingVendorPersonal
                aCHAddendaInfo
                aCHAddendaEnable
                url
                operationAfter
                operationBefore
                daysBefore
                daysAfter
                timezone
                operationAfter2
                operationBefore2
                daysBefore2
                daysAfter2
                paymentStreet
                paymentCity
                paymentState
                paymentZipCode
                notes
                tINEncrypted

                ";
                
            }
        }

        public static string QueryResumenInformationForSelectGraphQL
        {
            get
            {
                return @"
                    uid,
                    account,
                    fullName,
                    departmentUid, 
                    street,
                    city,
                    state,
                    zipCode,
                    homePhone,
                    workPhone,
                    mobilePhone,
                    fax,
                    email";
            }
        }

        public string Uid { get; set; }
        public int DepartmentUid { get; set; }
        public string Account { get; set; }
        public string AlternativeAccount { get; set; }
        public bool IsCompany { get; set; }
        public string Company { get; set; }
        public string ContacName { get; set; }
        public string Salutation { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string HomePhone { get; set; }
        public string WorkPhone { get; set; }
        public string MobilePhone { get; set; }
        public string Fax { get; set; }
        public string TIN { get; set; }
        public int TINType { get; set; }
        public string TINMask { get; set; }
        public DateTime? Birthday { get; set; }
        public string Email { get; set; }
        public bool UseSoldRate { get; set; }
        public double SoldRate { get; set; }
        public bool IsLender { get; set; }
        public bool IsActive { get; set; }
        public bool OnHold { get; set; }
        public int CallDaysAfterDue { get; set; }
        public bool CanCallAfterGrace { get; set; }
        public int TimesToCall { get; set; }
        public int TimesToCallPer { get; set; }
        public int ServincingType { get; set; }
        public int WhenDelinquent { get; set; }
        public bool CallsToBeHotTransfered { get; set; }
        public bool ModifiyDeedInLui { get; set; }
        public int CollectionServices { get; set; }
        public bool CanPrepareFinancial { get; set; }
        public bool CanDesignRepaymenyt { get; set; }
        public bool CanReqBPO { get; set; }
        public bool CanForgiveDuePayments { get; set; }
        public bool CanForgiveDueCharges { get; set; }
        public bool CanForgivePrincipal { get; set; }
        public bool CanCreateForebearance { get; set; }
        public bool CanAcceptDeed { get; set; }
        public bool CanOfferCash { get; set; }
        public bool CanAllowShortSale { get; set; }
        public bool ReqCopyNotice { get; set; }
        public bool ReqCopyLate { get; set; }
        public decimal FeePct { get; set; }
        public decimal FeeFlat { get; set; }
        public decimal FeeMin { get; set; }
        public string ACHReceivingDFI { get; set; }
        public string ACHAccountNumber { get; set; }
        public string ACHAccountRefNumber { get; set; }
        public string ACHIndividualIdNumber { get; set; }
        public string ACHIndividualName { get; set; }
        public int ACHBankAccountType { get; set; }
        public int ACHStatus { get; set; }
        public int ACHDisburstmentDay { get; set; }
        public int ACHDisburstmentFrequency { get; set; }
        public DateTime? ACHDisburstmentNextDay { get; set; }
        public string DefaultBillingPlanUid { get; set; }
        public string DefaultBillingPlanName { get; set; }
        public int Type { get; set; }
        public bool UseAsDim { get; set; }
        public bool Send1099 { get; set; }
        public int EmailFormat { get; set; }
        public int DeliveryOptions { get; set; }
        public bool FCNoAlternatives { get; set; }
        public bool FCReducedInt { get; set; }
        public bool FCShortSale { get; set; }
        public bool FCShortPayoff { get; set; }
        public bool FCReducedPayment { get; set; }
        public bool FCDeedInLieu { get; set; }
        public bool FCMaturityExtension { get; set; }
        public bool FCModifiedTerms { get; set; }
        public bool FCPrincipalReduction { get; set; }
        public bool FCCapitalization { get; set; }
        public DateTime? FCSent { get; set; }
        public DateTime? AppTimeStamp { get; set; }
        public string AppCreatedBy { get; set; }
        public DateTime? AppCreationDate { get; set; }
        public string AppLastUpdatedBy { get; set; }
        //    public byte[] SysTimeStamp { get; set; }
        public string Payee { get; set; }
        public bool UsePayee { get; set; }
        public string BigLenderUid { get; set; }
        public int StatusOSC { get; set; }
        public int ACHSendDepositNotificationFlag { get; set; }
        public string AdditionalLenders { get; set; }
        public bool ReceiveLateLetters { get; set; }
        public bool IsFrozenChecks { get; set; }
        public string VestingVendorCompany { get; set; }
        public string VestingVendorPersonal { get; set; }
        public string ACHAddendaInfo { get; set; }
        public bool ACHAddendaEnable { get; set; }
        public string Url { get; set; }
        public TimeSpan? OperationAfter { get; set; }
        public TimeSpan? OperationBefore { get; set; }
        public int? DaysBefore { get; set; }
        public int? DaysAfter { get; set; }
        public string Timezone { get; set; }
        public TimeSpan? OperationAfter2 { get; set; }
        public TimeSpan? OperationBefore2 { get; set; }
        public int? DaysBefore2 { get; set; }
        public int? DaysAfter2 { get; set; }
        public string PaymentStreet { get; set; }
        public string PaymentCity { get; set; }
        public string PaymentState { get; set; }
        public string PaymentZipCode { get; set; }
        public string Notes { get; set; }
        public string TINEncrypted { get; set; }
    }
}
