import * as Enums from '../../utilities/Enums';

const loanStatus = Enums.EnumToArray(Enums.LoanStatusEnum).map(item => {
    return { status: item.value, statusDesc: item.label.toUpperCase() };
});

const lonaPrimaryPurpose = Enums.EnumToArray(Enums.LoanPrimaryPurposeEnum).map(item => {
    return { primaryPurpose: item.value, primaryPurposeDesc: item.label.toUpperCase() };
});

const deferred = [
    { Deferred: true, DeferredDesc: "YES" },
    { Deferred: false, DeferredDesc: "NO" },
]

const isACH = [
    { IsACH: true, IsACHStr: "YES" },
    { IsACH: false, IsACHStr: "NO" },
];

export interface LoanState {
    stateUid: string;
    stateName: string;
    uPB: number;
    uPBDelinquency: number;
    totalLoans: number;
    totalDelinquency: number;
}

export interface LoanCharge {
    Date?: Date;
    Reference: string;
    Description: string;
    ChargeType: string;
    InterestRate: number;
    InterestFrom?: Date;
    DeferredValue: boolean;
    Deferred: any;
    OriginalAmount: number;
    Balance: number;
    AccruedInterest: number;
    TotalDue: number;
    ChargesDetails: ChargesDetails[];
    ChargesDetailsIsLoading: boolean;
    Uid: string;

}

export interface ChargesDetails {
    Date?: Date;
    Reference: string;
    VendorName: string
    Amount?: number;
    PrinVendor: number;
    IntVendor: number;
    PrinBehalf: number;
    IntBehalf: number;
}



export interface PaymentTime {
    State: string;
    StateName: string;
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
}

export interface VendorHistory {
    legend: string;
    totalAmount: number;
    toInterest: number;
    toPrincipal: number;
    toLateCharge: number;
    other: number;
    startDate?: Date;
    endtDate?: Date;
}

export interface LoanStatus {
    status: number;
    count: number;
    active?: boolean;
}

export interface LNSVendor {
    LoanUid: string;
    LendingUid: string;
    OfficerUid: string;
    LenderUid: string;
    Account: string;
    PrevAccount: string;
    OrigLender: string;
    DepartmentName: string;
    DepartmentUid: number;
    OrigVendorUid: string;
    Name: string;
    FullName: string;
    FirstName: string;
    LastName: string;
    Address: string;
    SSN: string;
    CCity: string;
    State: string;
    MaturityDate?: Date;
    TotalOriginalBalance: number;
    OriginalBalance: number;
    CurrentBalance: number;
    IsOnHold: boolean;
    NextDueDate?: Date;
    InvestAssetNumber: string;
    Assignment?: Date;
    IsActive: boolean;
    NoteRate: number;
    SoldRate: number;
    GeneralSoldRate: number;
    PrincipalBalance: number;
    TotalPayment?: number;
    Status: number;
    StatusDesc?: string;
    LastDateReceived?: Date;
    PaidOffDate?: Date;
    IsForeclosure: boolean;
    Tags: string;
    CalcInterestRate: number;
    ActiveDefaultInterestRate?: boolean;
    DefaultInterestRate: number;
    AssignedDate?: Date;
    PrimaryPurpose: number;
    PrimaryPurposeDesc?: string;
    FirstPaymentDate?: Date;
    OriginationDate?: Date;
    Today?: Date;
    RemindersCount: number;
    DaysLate?: number;
}

export interface LoanPayments {
    DateReceived?: Date;
    DateDue?: Date;
    DayVariance: number;
    DayVarianceStr: string;
    Reference: string;
    IsACHValue: boolean;
    IsACH: any;
    Code: string;
    TotalAmount: number;
    ToInterest: number;
    ToPrincipal: number;
    LateCharge: number;
    ToLateCharge: number;
    ToReserve: number;
    ToImpound: number;
    ToPrepay: number;
    ToChargesPrincipal: number;
    ToChargesInterest: number;
    ToBrokerFee: number;
    ToLenderFee: number;
    ToOtherTaxable: number;
    ToOtherTaxFree: number;
    ToOtherPayments: number;
    ToUnpaidInterest: number;
    Notes: string;
}

export const newLNSLoan: LNSVendor = {
    LoanUid: '',
    LendingUid: '',
    OfficerUid: '',
    LenderUid: '',
    Account: '',
    PrevAccount: '',
    OrigLender: '',
    DepartmentName: '',
    DepartmentUid: 0,
    OrigVendorUid: '',
    Name: '',
    FullName: '',
    FirstName: '',
    LastName: '',
    Address: '',
    SSN: '',
    CCity: '',
    State: '',
    TotalOriginalBalance: 0,
    OriginalBalance: 0,
    CurrentBalance: 0,
    IsOnHold: false,
    InvestAssetNumber: '',
    IsActive: false,
    NoteRate: 0,
    SoldRate: 0,
    GeneralSoldRate: 0,
    PrincipalBalance: 0,
    TotalPayment: 0,
    Status: 0,
    IsForeclosure: false,
    Tags: '',
    CalcInterestRate: 0,
    ActiveDefaultInterestRate: false,
    DefaultInterestRate: 0,
    PrimaryPurpose: 0,
    RemindersCount: 0,
    DaysLate: 0
}

export const initialColumnsLoan: any[] = [
    { total: false, isNumber: false, checked: true, position: 1, className: "text-center",  filter: 'text',     width: 125, title: 'Loan Number',           columnName: 'Account' },
    { total: false, isNumber: false, checked: true, position: 2, className: "text-left",    filter: 'text',     width: 200, title: 'Name',                  columnName: 'Name' },
    { total: false, isNumber: false, checked: true, position: 3, className: "text-left",    filter: 'text',     width: 150, title: 'City',                  columnName: 'City' },
    { total: false, isNumber: false, checked: true, position: 4, className: "text-center",  filter: 'text',     width: 80,  title: 'State',                 columnName: 'State' },
    { total: false, isNumber: false, checked: true, position: 5, className: "text-center",  filter: 'date',     width: 100, title: 'Maturity Date',         columnName: 'MaturityDate',         format: "{0:d}" },
    { total: false, isNumber: false, checked: true, position: 5, className: "text-center",  filter: 'text',     width: 100, title: 'Primary Loan Purpose',  columnName: 'PrimaryPurposeDesc',   enum: lonaPrimaryPurpose },
    { total: true,  isNumber: true,  checked: true, position: 6, className: "text-right",   filter: 'numeric',  width: 150, title: 'Original Balance',      columnName: 'TotalOriginalBalance', format: "{0:c}",    formatExcel: "$#,##0.00" },
    { total: true,  isNumber: true,  checked: true, position: 7, className: "text-right",   filter: 'numeric',  width: 150, title: 'Current Balance',       columnName: 'CurrentBalance',       format: "{0:c}",    formatExcel: "$#,##0.00" },
    { total: false, isNumber: false, checked: true, position: 8, className: "text-center",  filter: 'text',     width: 80,  title: 'Days Late',             columnName: 'daysLate' },
    { total: false, isNumber: false, checked: true, position: 9, className: "text-center",  filter: 'date',     width: 100, title: 'Next Due Date',         columnName: 'NextDueDate',          format: "{0:d}" },
    { total: true,  isNumber: true,  checked: true, position: 10, className: "text-center", filter: 'numeric',  width: 80,  title: 'Note Rate',             columnName: 'NoteRate',             format: "{0:p2}",   formatExcel: "0.00%" },
    { total: true,  isNumber: true,  checked: true, position: 11, className: "text-center", filter: 'numeric',  width: 80,  title: 'Investor Rate',         columnName: 'SoldRate',             format: "{0:p2 }",  formatExcel: "0.00%" },
    { total: true,  isNumber: true,  checked: true, position: 12, className: "text-right",  filter: 'numeric',  width: 100, title: 'Total Payment',         columnName: 'TotalPayment',         format: "{0:c}",    formatExcel: "$#,##0.00" },
    { total: false, isNumber: false, checked: true, position: 13, className: "text-center", filter: 'text',     width: 150, title: 'Loan Status',           columnName: 'StatusDesc',           enum: loanStatus },
];

export const initialColumnsPayments: any[] = [
    { total: false, position: 1,  checked: true, className: "text-center", alignExcel: "center", filter: 'date', width: 100, title: 'Date Received',            columnName: 'DateReceived',         format: "{0:d}" },
    { total: false, position: 2,  checked: true, className: "text-center", alignExcel: "center", filter: 'date', width: 100, title: 'Date Due',                 columnName: 'DateDue',              format: "{0:d}" },
    { total: false, position: 3,  checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 120, title: 'Pmt Day Variance',         columnName: 'DayVariance' },
    { total: false, position: 4,  checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 100, title: 'Reference',                columnName: 'Reference' },
    { total: false, position: 5,  checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 70,  title: 'ACH',                      columnName: 'IsACHStr',             enum: isACH },
    { total: false, position: 6,  checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 120, title: 'Payment Type',             columnName: 'Code' },
    { total: true,  position: 7,  checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Total Pmt',                columnName: 'TotalAmount',          format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 8,  checked: true, className: "text-right",  alignExcel: "right",  filter: 'date', width: 100, title: 'Interest Received',        columnName: 'ToInterest',           format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 9,  checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Principal Received',       columnName: 'ToPrincipal',          format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 10, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Accrued Late Charges',     columnName: 'LateCharge',           format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 11, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Late Charges Paid',        columnName: 'ToLateCharge',         format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 12, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Reserve Pmt',              columnName: 'ToReserve',            format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 13, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Escrow Pmt',               columnName: 'ToImpound',            format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 14, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'PPP Pmt',                  columnName: 'ToPrepay',             format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 15, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Charges Prin Pmt',         columnName: 'ToChargesPrincipal',   format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 16, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Charges Int Pmt',          columnName: 'ToChargesInterest',    format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 17, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Broker Fees',              columnName: 'ToBrokerFee',          format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 18, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Lender Fees',              columnName: 'ToLenderFee',          format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 19, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Other (Taxable)',          columnName: 'ToOtherTaxable',       format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 20, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Other (Non-Taxable)',      columnName: 'ToOtherTaxFree',       format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 21, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Other Pmt',                columnName: 'ToOtherPayments',      format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true,  position: 22, checked: true, className: "text-right",  alignExcel: "right",  filter: 'text', width: 100, title: 'Accrued Unpaid Interest',  columnName: 'ToUnpaidInterest',     format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: false, position: 23, checked: true, className: "text-left",   alignExcel: "left",   filter: 'text', width: 200, title: 'Additional Information',   columnName: 'Notes' },
];


export const initialColumnsCharge: any[] = [
    { total: false, position: 1, checked: true, className: "text-center", alignExcel: "center", filter: 'date', width: 100, title: 'Charged Date', columnName: 'Date', format: "{0:d}" },
    { total: false, position: 2, checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 120, title: 'Reference', columnName: 'Reference' },
    { total: false, position: 3, checked: true, className: "text-left", alignExcel: "left", filter: 'text', width: 200, title: 'Description', columnName: 'Description' },
    { total: false, position: 4, checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 120, title: 'Type', columnName: 'ChargeType' },
    { total: false, position: 5, checked: true, className: "text-right", alignExcel: "right", filter: 'text', width: 100, title: 'Int. Rate', columnName: 'InterestRate', format: "{0:p2}", formatExcel: "0.00%" },
    { total: false, position: 6, checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 100, title: 'Int. From', columnName: 'InterestFrom', format: "{0:d}" },
    { total: false, position: 7, checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 70, title: 'Deferred', columnName: 'Deferred', enum: deferred },
    { total: true, position: 8, checked: true, className: "text-right", alignExcel: "right", filter: 'date', width: 100, title: 'Original Balance', columnName: 'OriginalAmount', format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true, position: 9, checked: true, className: "text-right", alignExcel: "right", filter: 'text', width: 100, title: 'Unpaid Balance', columnName: 'Balance', format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true, position: 10, checked: true, className: "text-right", alignExcel: "right", filter: 'text', width: 100, title: 'Accrued Interest', columnName: 'AccruedInterest', format: "{0:c}", formatExcel: "$#,##0.00" },
    { total: true, position: 11, checked: true, className: "text-right", alignExcel: "right", filter: 'text', width: 100, title: 'Total Due', columnName: 'TotalDue', format: "{0:c}", formatExcel: "$#,##0.00" },
];