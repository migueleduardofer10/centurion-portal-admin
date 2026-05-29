"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumToArray = exports.StatusEnum = exports.UserTypeEnum = exports.EnumTypeMessage = exports.TypeCreditCardEnum = exports.PaymentTypeEnum = exports.GridEntityTypeEnum = exports.LoanPrimaryPurposeEnum = exports.LoanStatusEnum = exports.AttachmentViewEnum = void 0;
var AttachmentViewEnum;
(function (AttachmentViewEnum) {
    AttachmentViewEnum[AttachmentViewEnum["PENDING_DISBURSEMENT_TO_LENDER"] = 0] = "PENDING_DISBURSEMENT_TO_LENDER";
    AttachmentViewEnum[AttachmentViewEnum["BORROWER_NOTICES"] = 1] = "BORROWER_NOTICES";
    AttachmentViewEnum[AttachmentViewEnum["NOTIFICATION_OF_DEPOSIT"] = 2] = "NOTIFICATION_OF_DEPOSIT";
    AttachmentViewEnum[AttachmentViewEnum["ALL_ATTACHMENT"] = 3] = "ALL_ATTACHMENT";
    AttachmentViewEnum[AttachmentViewEnum["LENDER_STATEMENTS"] = 4] = "LENDER_STATEMENTS";
    AttachmentViewEnum[AttachmentViewEnum["TAX_FORMS"] = 5] = "TAX_FORMS";
})(AttachmentViewEnum = exports.AttachmentViewEnum || (exports.AttachmentViewEnum = {}));
var LoanStatusEnum;
(function (LoanStatusEnum) {
    LoanStatusEnum[LoanStatusEnum["ASSIGNED"] = -1] = "ASSIGNED";
    LoanStatusEnum[LoanStatusEnum["ACTIVE"] = 0] = "ACTIVE";
    LoanStatusEnum[LoanStatusEnum["NON_ACTIVE"] = 1] = "NON_ACTIVE";
    LoanStatusEnum[LoanStatusEnum["PAID_OFF"] = 2] = "PAID_OFF";
    LoanStatusEnum[LoanStatusEnum["TRANSFERED"] = 3] = "TRANSFERED";
    LoanStatusEnum[LoanStatusEnum["BANKRUPTCY"] = 4] = "BANKRUPTCY";
    LoanStatusEnum[LoanStatusEnum["FORECLOSURE"] = 5] = "FORECLOSURE";
    LoanStatusEnum[LoanStatusEnum["REO"] = 6] = "REO";
    LoanStatusEnum[LoanStatusEnum["CHARGE_OFF"] = 7] = "CHARGE_OFF";
    LoanStatusEnum[LoanStatusEnum["COMPLETE_CHARGE_OFF"] = 8] = "COMPLETE_CHARGE_OFF";
    LoanStatusEnum[LoanStatusEnum["TRANSFERED_OUT"] = 9] = "TRANSFERED_OUT";
    LoanStatusEnum[LoanStatusEnum["PAYOFF_DEMAND"] = 10] = "PAYOFF_DEMAND";
    LoanStatusEnum[LoanStatusEnum["PRE_BOARDING"] = 11] = "PRE_BOARDING";
    LoanStatusEnum[LoanStatusEnum["FINAL_BOARDING"] = 12] = "FINAL_BOARDING";
    LoanStatusEnum[LoanStatusEnum["RESPA"] = 13] = "RESPA";
    LoanStatusEnum[LoanStatusEnum["LOAN_MOD_REQUEST"] = 14] = "LOAN_MOD_REQUEST";
    LoanStatusEnum[LoanStatusEnum["DELIQUENCY"] = 15] = "DELIQUENCY";
})(LoanStatusEnum = exports.LoanStatusEnum || (exports.LoanStatusEnum = {}));
var LoanPrimaryPurposeEnum;
(function (LoanPrimaryPurposeEnum) {
    LoanPrimaryPurposeEnum[LoanPrimaryPurposeEnum["CONSUMER"] = 0] = "CONSUMER";
    LoanPrimaryPurposeEnum[LoanPrimaryPurposeEnum["BUSINESS"] = 1] = "BUSINESS";
})(LoanPrimaryPurposeEnum = exports.LoanPrimaryPurposeEnum || (exports.LoanPrimaryPurposeEnum = {}));
var GridEntityTypeEnum;
(function (GridEntityTypeEnum) {
    GridEntityTypeEnum[GridEntityTypeEnum["LNS_LOAN"] = 500] = "LNS_LOAN";
    GridEntityTypeEnum[GridEntityTypeEnum["LEN_LOANS_SEARCH"] = 501] = "LEN_LOANS_SEARCH";
    GridEntityTypeEnum[GridEntityTypeEnum["VWL_LOAN_HISTORY"] = 502] = "VWL_LOAN_HISTORY";
    GridEntityTypeEnum[GridEntityTypeEnum["VWL_CHARGES_DETAILS"] = 503] = "VWL_CHARGES_DETAILS";
    GridEntityTypeEnum[GridEntityTypeEnum["VWL_LOANNOTES"] = 504] = "VWL_LOANNOTES";
    GridEntityTypeEnum[GridEntityTypeEnum["VWL_FUNDING"] = 505] = "VWL_FUNDING";
    GridEntityTypeEnum[GridEntityTypeEnum["VWL_CREDITCARDINVOICES"] = 506] = "VWL_CREDITCARDINVOICES";
    GridEntityTypeEnum[GridEntityTypeEnum["VWL_PAIDINVOICES"] = 507] = "VWL_PAIDINVOICES";
    GridEntityTypeEnum[GridEntityTypeEnum["VCW_VENDORPORTFOLIOSECONDARY"] = 508] = "VCW_VENDORPORTFOLIOSECONDARY";
    GridEntityTypeEnum[GridEntityTypeEnum["ELS_USER"] = 1000] = "ELS_USER";
})(GridEntityTypeEnum = exports.GridEntityTypeEnum || (exports.GridEntityTypeEnum = {}));
var PaymentTypeEnum;
(function (PaymentTypeEnum) {
    PaymentTypeEnum[PaymentTypeEnum["VCHECK"] = 0] = "VCHECK";
    PaymentTypeEnum[PaymentTypeEnum["PAYPAL"] = 1] = "PAYPAL";
    PaymentTypeEnum[PaymentTypeEnum["CREDIT_CARD"] = 2] = "CREDIT_CARD";
})(PaymentTypeEnum = exports.PaymentTypeEnum || (exports.PaymentTypeEnum = {}));
var TypeCreditCardEnum;
(function (TypeCreditCardEnum) {
    TypeCreditCardEnum[TypeCreditCardEnum["VISA"] = 0] = "VISA";
    TypeCreditCardEnum[TypeCreditCardEnum["MASTER"] = 1] = "MASTER";
    TypeCreditCardEnum[TypeCreditCardEnum["AMERICAN_EXPRESS"] = 2] = "AMERICAN_EXPRESS";
})(TypeCreditCardEnum = exports.TypeCreditCardEnum || (exports.TypeCreditCardEnum = {}));
var EnumTypeMessage;
(function (EnumTypeMessage) {
    EnumTypeMessage[EnumTypeMessage["NOTHING"] = 0] = "NOTHING";
    EnumTypeMessage[EnumTypeMessage["INFORMATION"] = 1] = "INFORMATION";
    EnumTypeMessage[EnumTypeMessage["WARNING"] = 2] = "WARNING";
    EnumTypeMessage[EnumTypeMessage["ERROR"] = 3] = "ERROR";
    EnumTypeMessage[EnumTypeMessage["SUCCESS"] = 4] = "SUCCESS";
})(EnumTypeMessage = exports.EnumTypeMessage || (exports.EnumTypeMessage = {}));
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum[UserTypeEnum["ADMIN"] = 0] = "ADMIN";
    UserTypeEnum[UserTypeEnum["BROKER"] = 1] = "BROKER";
    UserTypeEnum[UserTypeEnum["LENDER"] = 2] = "LENDER";
    UserTypeEnum[UserTypeEnum["BORROWER"] = 3] = "BORROWER";
    UserTypeEnum[UserTypeEnum["SUPPORT"] = 99] = "SUPPORT";
})(UserTypeEnum = exports.UserTypeEnum || (exports.UserTypeEnum = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum[StatusEnum["INACTIVE"] = 0] = "INACTIVE";
    StatusEnum[StatusEnum["ACTIVE"] = 1] = "ACTIVE";
})(StatusEnum = exports.StatusEnum || (exports.StatusEnum = {}));
function EnumToArray(typeEnum, replaceGuionForSpace) {
    if (replaceGuionForSpace === void 0) { replaceGuionForSpace = true; }
    var values = [];
    for (var key in typeEnum) {
        if (typeof typeEnum[key] === 'string')
            values.push({ value: Number(key), label: (replaceGuionForSpace ? GetEnumDescription(typeEnum[key]) : typeEnum[key]) });
    }
    return values;
}
exports.EnumToArray = EnumToArray;
function GetEnumDescription(label) {
    return label.split('_').map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); }).join(' ');
}
//# sourceMappingURL=Enums.js.map