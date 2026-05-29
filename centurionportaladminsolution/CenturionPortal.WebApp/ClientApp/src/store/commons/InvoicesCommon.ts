export interface PendingInvoices {
    Uid: string;
    CustomerUid: string;
    Memo: string;
    Description: string;
    OriginalAmount: number;
    Amount: number;
    DateDue: Date;
    Date: Date;
    DepartmentUid?: number;
    Account: string;
    VendorUid: string;
    FullName: string;
    Email: string;
    NumInvoice: string;
    Reference: string;
    PaymentUid: string;
    CCFollowUpDate?: Date;
    SendLastEmailDate?: Date;
    ExcludeLateCharge: boolean;
    ApprovalAllowed: number;
    Is_CreditCard?: boolean;
    CCDeclined?: boolean;
    AppCreationDate?: Date;
    IsFrozenChecks?: boolean;
    Selected?: boolean;

    DepartmentUid_String?: string;
    IsFrozenChecks_String?: string;
    DateDue_String?: string;
    Date_String?: string;
    SendLastEmailDate_String?: string;

    IsLoading?: boolean;
    Details?: InvoiceDetail[];
    Columns?: any[];
}

export interface PaidInvoices {
    Uid: string;
    DepartmentUid?: number;
    FullName: string;
    DateDue: Date;
    Date: Date;
    CustomerUid: string;
    Description: string;
    Amount: number;
    AmountDue: number;
    Account: string;
    Reference: string;
    NumInvoice: string;
    DateReceived?: Date;
    AppCreationDate?: Date;
    SendLastEmailDate?: Date;
    WriteOffDate?: Date;
    ExportUid: string;
    PaymentUid: string;
    WasPayment?: boolean;
    Is_ACH?: boolean;

    DepartmentUid_String?: string;
    DateDue_String?: string;
    Date_String?: string;
    DateReceived_String?: string;
    SendLastEmailDate_String?: string;

    IsLoading?: boolean;
    Details?: InvoiceDetail[];
    Columns?: any[];
}

export interface InvoiceDetail {
    AppCreationDate: Date;
    DateReceived: Date;
    Reference: string;
    Memo: string;
    ReferenceLog: string;
    Amount: number;

    AppCreationDate_String?: string;
    DateReceived_String?: string;
}

export interface InvoiceDetails {
    Uid: string;
    BeginDate: Date;
    EndDate: Date;
    Name: string;
    Account: string;
    LoanAcct: string;
    Borrower: string;
    PropStreet: string;
    PropCity: string;
    PropState: string;
    PropZip: string;
    LoanStatus: string;
    Description: string;
    Quantity: number;
    Amount: number;

    BeginDate_String?: string;
    EndDate_String?: string;
}

export interface INFState {
    Abbreviation: string;
    Name: string;
}

export interface VCheckModel {
    Uid: string;
    Amount: number;
    RegularPayment: number;
    AddlCharges: number;
    ServiceFee: number;
    Notes: string;
    InvoiceNumber: string;
    InvoiceUid: string;

    RoutingNumber: string;
    RoutingConfirm: string;
    AccountNumber: string;
    AccountConfirm: string;
    CheckNumber: string;
    PayerName: string;
    PayerAddress: string;
    PayerCity: string;
    PayerState: string;
    PayerZip: string;
    Phone: string;
    Email: string;
    AddlPrincipal: number;
    AddlUnpaidInterest: number;
    AddlImpound: number;
    AddlReserve: number;
    ToLateCharges: number;
    AcceptTerms: boolean;
}

export interface PayPalModel {
    Uid: string;
    Amount: number;
    RegularPayment: number;
    AddlCharges: number;
    ServiceFee: number;
    Notes: string;
    InvoiceNumber: string;
    InvoiceUid: string;

    Email: string;
    AcceptTerms: boolean;
}

export interface CreditCardModel {
    Uid: string;
    Amount: number;
    RegularPayment: number;
    AddlCharges: number;
    ServiceFee: number;
    Notes: string;
    InvoiceNumber: string;
    InvoiceUid: string;

    Email: string;
    Type: number;
    Number: string;
    Cvv: string;
    Expiration?: Date;
    ExpirationMonth?: number;
    ExpirationYear?: number;
    OnName: string;
    LastName: string;
    BillingAddress: string;
    City: string;
    State: string;
    Zip: string;
    Description: string;
    AcceptTerms: boolean;

    Expiration_String: string;
}

export const newVCheckModel: VCheckModel = {
    Uid: '',
    Amount: 0,
    RegularPayment: 0,
    AddlCharges: 0,
    ServiceFee: 0,
    Notes: '',
    InvoiceNumber: '',
    InvoiceUid: '',

    RoutingNumber: '',
    RoutingConfirm: '',
    AccountNumber: '',
    AccountConfirm: '',
    CheckNumber: '',
    PayerName: '',
    PayerAddress: '',
    PayerCity: '',
    PayerState: '',
    PayerZip: '',
    Phone: '',
    Email: '',
    AddlPrincipal: 0,
    AddlUnpaidInterest: 0,
    AddlImpound: 0,
    AddlReserve: 0,
    ToLateCharges: 0,
    AcceptTerms: false,
}

export const newPayPalModel: PayPalModel = {
    Uid: '',
    Amount: 0,
    RegularPayment: 0,
    AddlCharges: 0,
    ServiceFee: 0,
    Notes: '',
    InvoiceNumber: '',
    InvoiceUid: '',

    Email: '',
    AcceptTerms: false,
}

export const newCreditCardModel: CreditCardModel = {
    Uid: '',
    Amount: 0,
    RegularPayment: 0,
    AddlCharges: 0,
    ServiceFee: 0,
    Notes: '',
    InvoiceNumber: '',
    InvoiceUid: '',

    Email: '',
    Type: 0,
    Number: '',
    Cvv: '',
    OnName: '',
    LastName: '',
    BillingAddress: '',
    City: '',
    State: '',
    Zip: '',
    Description: '',
    AcceptTerms: false,

    Expiration_String: ''
}

export const initialPendingInvoicesColumns: any[] = [
    { IsNumber: false, Checked: true, HasCustomValue: false, Position: 1, ClassName: "text-center", Align: "center", Filter: 'text', Width: 100, Title: 'Invoice',        ColumnName: 'NumInvoice' },
    { IsNumber: false, Checked: true, HasCustomValue: false, Position: 2, ClassName: "text-left",   Align: "left",   Filter: 'text', Width: 300, Title: 'Full Name',      ColumnName: 'FullName' },
    { IsNumber: false, Checked: true, HasCustomValue: false, Position: 3, ClassName: "text-center", Align: "center", Filter: 'text', Width: 100, Title: 'Account',        ColumnName: 'Account' },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 4, ClassName: "text-center", Align: "center", Filter: 'text', Width: 100, Title: 'Is Frozen',      ColumnName: 'IsFrozenChecks' },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 5, ClassName: "text-center", Align: "center", Filter: 'text', Width: 150, Title: 'Department',     ColumnName: 'DepartmentUid' },
    { IsNumber: true,  Checked: true, HasCustomValue: false, Position: 6, ClassName: "text-right",  Align: "right",  Filter: 'text', Width: 100, Title: 'Amount',         ColumnName: 'Amount',            Format: "{0:c}", FormatExcel: "$#,##0.00" },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 7, ClassName: "text-center", Align: "center", Filter: 'date', Width: 100, Title: 'Date',           ColumnName: 'Date' },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 8, ClassName: "text-center", Align: "center", Filter: 'date', Width: 100, Title: 'Date Due',       ColumnName: 'DateDue' },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 9, ClassName: "text-center", Align: "center", Filter: 'text', Width: 150, Title: 'Last Date Sent', ColumnName: 'SendLastEmailDate' }
];

export const initialPaidInvoicesColumns: any[] = [
    { IsNumber: false, Checked: true, HasCustomValue: false, Position: 1, ClassName: "text-center", Align: "center", Filter: 'text', Width: 100, Title: 'Invoice',        ColumnName: 'NumInvoice' },
    { IsNumber: false, Checked: true, HasCustomValue: false, Position: 2, ClassName: "text-left",   Align: "left",   Filter: 'text', Width: 300, Title: 'Full Name',      ColumnName: 'FullName' },
    { IsNumber: false, Checked: true, HasCustomValue: false, Position: 3, ClassName: "text-center", Align: "center", Filter: 'text', Width: 100, Title: 'Account',        ColumnName: 'Account' },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 4, ClassName: "text-center", Align: "center", Filter: 'text', Width: 150, Title: 'Department',     ColumnName: 'DepartmentUid' },
    { IsNumber: true,  Checked: true, HasCustomValue: false, Position: 5, ClassName: "text-center", Align: "center", Filter: 'text', Width: 100, Title: 'Amount',         ColumnName: 'Amount',       Format: "{0:c}", FormatExcel: "$#,##0.00" },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 6, ClassName: "text-center", Align: "center", Filter: 'date', Width: 100, Title: 'Date',           ColumnName: 'Date' },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 7, ClassName: "text-center", Align: "center", Filter: 'date', Width: 100, Title: 'Date Due',       ColumnName: 'DateDue' },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 8, ClassName: "text-center", Align: "center", Filter: 'text', Width: 150, Title: 'Date Received',  ColumnName: 'DateReceived' },
    { IsNumber: false, Checked: true, HasCustomValue: true,  Position: 9, ClassName: "text-center", Align: "center", Filter: 'text', Width: 150, Title: 'Last Date Sent', ColumnName: 'SendLastEmailDate' },
];

export const initialInvoiceDetailColumns: any[] = [
    { HasCustomValue: true,  ClassName: "text-center", Width: 120, Title: 'Payment Creation',          ColumnName: 'AppCreationDate' },
    { HasCustomValue: true,  ClassName: "text-center", Width: 120, Title: 'Date Received',             ColumnName: 'DateReceived' },
    { HasCustomValue: false, ClassName: "text-center", Width: 150, Title: 'Reference',                 ColumnName: 'Reference' },
    { HasCustomValue: false, ClassName: "text-center", Width: 200, Title: 'Memo',                      ColumnName: 'Memo' },
    { HasCustomValue: false, ClassName: "text-center", Width: 200, Title: 'Reference (Confirmation)',  ColumnName: 'ReferenceLog' },
    { HasCustomValue: false, ClassName: "text-right",  Width: 120, Title: 'Payment Amount',            ColumnName: 'Amount',       Format: "{0:c}" }
];

export const initialInvoiceDetailsColumns: any[] = [
    { IsNumber: false, HasCustomValue: true,  Align: "center", Width: 100, Title: 'Begin Date',   ColumnName: 'BeginDate' },
    { IsNumber: false, HasCustomValue: true,  Align: "center", Width: 100, Title: 'End Date',     ColumnName: 'EndDate' },
    { IsNumber: false, HasCustomValue: false, Align: "left",   Width: 250, Title: 'Name',         ColumnName: 'Name' },
    { IsNumber: false, HasCustomValue: false, Align: "center", Width: 100, Title: 'Account',      ColumnName: 'Account' },
    { IsNumber: false, HasCustomValue: false, Align: "center", Width: 100, Title: 'Loan Account', ColumnName: 'LoanAcct' },
    { IsNumber: false, HasCustomValue: false, Align: "left",   Width: 350, Title: 'Borrower',     ColumnName: 'Borrower' },
    { IsNumber: false, HasCustomValue: false, Align: "left",   Width: 300, Title: 'Prop Street',  ColumnName: 'PropStreet' },
    { IsNumber: false, HasCustomValue: false, Align: "center", Width: 100, Title: 'Prop City',    ColumnName: 'PropCity' },
    { IsNumber: false, HasCustomValue: false, Align: "center", Width: 150, Title: 'Prop State',   ColumnName: 'PropState' },
    { IsNumber: false, HasCustomValue: false, Align: "center", Width: 100, Title: 'Prop Zip',     ColumnName: 'PropZip' },
    { IsNumber: false, HasCustomValue: false, Align: "center", Width: 150, Title: 'Loan Status',  ColumnName: 'LoanStatus' },
    { IsNumber: false, HasCustomValue: false, Align: "left",   Width: 300, Title: 'Description',  ColumnName: 'Description' },
    { IsNumber: true,  HasCustomValue: false, Align: "center", Width: 80,  Title: 'Quantity',     ColumnName: 'Quantity' },
    { IsNumber: true,  HasCustomValue: false, Align: "right",  Width: 100, Title: 'Amount',       ColumnName: 'Amount',       Format: "{0:c}", FormatExcel: "$#,##0.00" },
];
