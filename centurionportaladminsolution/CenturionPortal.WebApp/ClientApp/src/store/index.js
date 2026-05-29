"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducers = void 0;
var PaymentToLenderStore_1 = require("../components/lenders/paymentsToLender/PaymentToLenderStore");
var PartialOwnershipPortfolioStore_1 = require("../components/loan/PartialOwnershipPortfolioStore");
var AppStore = require("./stores/app/AppStore");
var AuthStore = require("./stores/auth/AuthStore");
var PaidInvoicesStore = require("./stores/invoices/PaidInvoicesStore");
var PendingInvoicesStore = require("./stores/invoices/PendingInvoicesStore");
var LenDashboardStore = require("./stores/lenders/dashboard/LenDashboardStore");
var LenDasLoanStatesStore = require("./stores/lenders/dashboard/LenDasLoanStatesStore");
var LenDasLoanStatusStore = require("./stores/lenders/dashboard/LenDasLoanStatusStore");
var LenDasPaymentBorrowerStore = require("./stores/lenders/dashboard/LenDasPaymentBorrowerStore");
var LenDasPaymentLenderStore = require("./stores/lenders/dashboard/LenDasPaymentLenderStore");
var LenDasPaymentTimeStore = require("./stores/lenders/dashboard/LenDasPaymentTimeStore");
var LenAttachmentStore = require("./stores/lenders/LenAttachmentStore");
var LenChargesStore = require("./stores/lenders/LenChargesStore");
var LenFundingStore_1 = require("./stores/lenders/LenFundingStore");
var LenLoansSearchStore_1 = require("./stores/lenders/LenLoansSearchStore");
var LenLoanStore = require("./stores/lenders/LenLoanStore");
var LenNotesStore_1 = require("./stores/lenders/LenNotesStore");
var LenPaymentStore = require("./stores/lenders/LenPaymentStore");
var UserSettingStore_1 = require("./stores/users/UserSettingStore");
var UserStore = require("./stores/users/UserStore");
var ACHStatusReportStore = require("./stores/reports/ACHStatusReportStore");
var ReportLoginStore = require("./stores/users/ReportLoginStore");
// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
exports.reducers = {
    app: AppStore.reducer,
    auth: AuthStore.reducer,
    users: UserStore.reducer,
    paidInvoices: PaidInvoicesStore.reducer,
    pendingInvoices: PendingInvoicesStore.reducer,
    lenAttachment: LenAttachmentStore.reducer,
    lenDashboard: LenDashboardStore.reducer,
    lenDasLoanStates: LenDasLoanStatesStore.reducer,
    lenDasLoanStatus: LenDasLoanStatusStore.reducer,
    lenDasPaymentTime: LenDasPaymentTimeStore.reducer,
    lenDasPaymentLender: LenDasPaymentLenderStore.reducer,
    lenDasPaymentBorrower: LenDasPaymentBorrowerStore.reducer,
    lenLoans: LenLoanStore.reducer,
    lenPayments: LenPaymentStore.reducer,
    lenFunding: LenFundingStore_1.default,
    lenCharges: LenChargesStore.reducer,
    lenNotes: LenNotesStore_1.default,
    lenLoansSearch: LenLoansSearchStore_1.default,
    userSetting: UserSettingStore_1.default,
    partialOwnershipPortfolio: PartialOwnershipPortfolioStore_1.default,
    paymentToLender: PaymentToLenderStore_1.PaymentToLender_Reducer,
    achStatusReport: ACHStatusReportStore.reducer,
    reportLogin: ReportLoginStore.reducer
};
//# sourceMappingURL=index.js.map