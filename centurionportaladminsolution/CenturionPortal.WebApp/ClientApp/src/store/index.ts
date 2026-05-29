import { PaymentToLender_Reducer, PaymentToLender_StateDefinition } from '../components/lenders/paymentsToLender/PaymentToLenderStore';
import PartialOwnershipPortfolio_Reducer, { PartialOwnershipPortfolio_StateDefinition } from '../components/loan/PartialOwnershipPortfolioStore';
import * as AppStore from './stores/app/AppStore';
import * as AuthStore from './stores/auth/AuthStore';
import * as PaidInvoicesStore from './stores/invoices/PaidInvoicesStore';
import * as PendingInvoicesStore from './stores/invoices/PendingInvoicesStore';
import * as LenDashboardStore from './stores/lenders/dashboard/LenDashboardStore';
import * as LenDasLoanStatesStore from './stores/lenders/dashboard/LenDasLoanStatesStore';
import * as LenDasLoanStatusStore from './stores/lenders/dashboard/LenDasLoanStatusStore';
import * as LenDasPaymentBorrowerStore from './stores/lenders/dashboard/LenDasPaymentBorrowerStore';
import * as LenDasPaymentLenderStore from './stores/lenders/dashboard/LenDasPaymentLenderStore';
import * as LenDasPaymentTimeStore from './stores/lenders/dashboard/LenDasPaymentTimeStore';
import * as LenAttachmentStore from './stores/lenders/LenAttachmentStore';
import * as LenChargesStore from './stores/lenders/LenChargesStore';
import LenFunding_Reducer, { LenFunding_StateDefinition } from './stores/lenders/LenFundingStore';
import LenLoansSearch_Reducer, { LenLoansSearch_StateDefinition } from './stores/lenders/LenLoansSearchStore';
import * as LenLoanStore from './stores/lenders/LenLoanStore';
import LenNotes_Reducer, { LenNotes_StateDefinition } from './stores/lenders/LenNotesStore';
import * as LenPaymentStore from './stores/lenders/LenPaymentStore';
import UserSetting_Reducer, { UserSetting_StateDefinition } from './stores/users/UserSettingStore';
import * as UserStore from './stores/users/UserStore';
import * as ACHStatusReportStore from './stores/reports/ACHStatusReportStore';
import * as ReportLoginStore from './stores/users/ReportLoginStore';

// The top-level state object
export interface ApplicationState {
    app: AppStore.State;
    auth: AuthStore.State
    users: UserStore.State;
    paidInvoices: PaidInvoicesStore.State,
    pendingInvoices: PendingInvoicesStore.State,
    lenAttachment: LenAttachmentStore.State;
    lenDashboard: LenDashboardStore.State;
    lenDasLoanStates: LenDasLoanStatesStore.State;
    lenDasLoanStatus: LenDasLoanStatusStore.State;
    lenDasPaymentTime: LenDasPaymentTimeStore.State;
    lenDasPaymentLender: LenDasPaymentLenderStore.State;
    lenDasPaymentBorrower: LenDasPaymentBorrowerStore.State;
    lenLoans: LenLoanStore.State;
    lenPayments: LenPaymentStore.State;
    lenFunding: LenFunding_StateDefinition;
    lenCharges: LenChargesStore.State;
    lenNotes: LenNotes_StateDefinition;
    lenLoansSearch: LenLoansSearch_StateDefinition;
    userSetting: UserSetting_StateDefinition;
    partialOwnershipPortfolio: PartialOwnershipPortfolio_StateDefinition,
    paymentToLender: PaymentToLender_StateDefinition,
    achStatusReport: ACHStatusReportStore.State,
    reportLogin: ReportLoginStore.State
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
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
    lenFunding: LenFunding_Reducer,
    lenCharges: LenChargesStore.reducer,
    lenNotes: LenNotes_Reducer,
    lenLoansSearch: LenLoansSearch_Reducer,
    userSetting: UserSetting_Reducer,
    partialOwnershipPortfolio: PartialOwnershipPortfolio_Reducer,
    paymentToLender: PaymentToLender_Reducer,
    achStatusReport: ACHStatusReportStore.reducer,
    reportLogin: ReportLoginStore.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
 
