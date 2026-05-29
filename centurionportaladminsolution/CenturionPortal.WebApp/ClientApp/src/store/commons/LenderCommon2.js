"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LenNotes_ColumnConfiguration = exports.LeFunding_ColumnConfiguration = exports.RPTCustomFullLoanPortfolio_ColumnConfiguration = exports.PaymentToLender_ColumnConfiguration = exports.VCW_VendorPortfolioSecondary_ColumnConfiguration = exports.PartialOwnershipPortfolio_ColumnConfiguration = exports.PartialOwnershipPortfolio_ColumnConfiguration_Group3 = exports.PartialOwnershipPortfolio_ColumnConfiguration_Group2 = exports.PartialOwnershipPortfolio_ColumnConfiguration_Group1 = exports.LenLoanSearch_ColumnConfiguration = exports.FetchHeaders = exports.StateInitialValue = exports.Utilities_Url_CreateUniquePath = exports.Utilities_Convert_NullToString = exports.Utilities_Convert_StringToStringDateTimeFormat = exports.Utilities_Convert_StringToStringDateFormat = exports.Utilities_Convert_DateToStringDateFormat = exports.Utilities_DefaultCero = exports.Utilities_DefaultOneSpace = void 0;
var kendo_intl_1 = require("@telerik/kendo-intl");
var Functions_1 = require("../../utilities/Functions");
exports.Utilities_DefaultOneSpace = function (value) { return (!value && (value === '' || value.trim() === '') ? ' ' : value); };
exports.Utilities_DefaultCero = function (value) { return (!value && (value === '' || value.trim() === '') ? '0' : value); };
/**
 * format: yyyy/MM/dd
 * @param value: string
 */
exports.Utilities_Convert_DateToStringDateFormat = function (value) {
    try {
        if (value && value != null)
            return kendo_intl_1.formatDate(value, "yyyy/MM/dd");
        else
            return '';
    }
    catch (_a) {
        return '';
    }
};
/**
 * format: yyyy/MM/dd
 * @param value: string
 */
exports.Utilities_Convert_StringToStringDateFormat = function (value) {
    try {
        if (value && value != null && typeof value === 'string' && value.trim() != '')
            return kendo_intl_1.formatDate(new Date(value), "yyyy/MM/dd");
        else
            return '';
    }
    catch (_a) {
        return '';
    }
};
/**
 * format: yyyy/MM/dd HH:mm
 * @param value: string
 */
exports.Utilities_Convert_StringToStringDateTimeFormat = function (value) {
    try {
        if (value && value != null && typeof value === 'string' && value.trim() != '')
            return kendo_intl_1.formatDate(new Date(value), "yyyy/MM/dd HH:mm");
        else
            return '';
    }
    catch (_a) {
        return '';
    }
};
/**
 *
 * @param value: any
 * @param defaultValue: empty string ''
 */
exports.Utilities_Convert_NullToString = function (value, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    return value === undefined || value === null ? defaultValue : String(value).trim();
};
exports.Utilities_Url_CreateUniquePath = function (staticUrl) {
    return '/' + staticUrl;
    // return '/' + v1( ).replace(/#|-/g, '')
};
exports.StateInitialValue = {
    skip: 0, take: 30
};
exports.FetchHeaders = function () {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + Functions_1.Auth.getJWT()
    };
};
var GridFormat_Decimal = "{0:c}";
var GridFormat_Number = "{0:n}";
var GridFormat_Percentaje = "{0:p}";
var GridFormat_DateTime = '{0:d}';
var GridFormat_Date = '{0:d}';
var GridFilter_Boolean = 'boolean';
var GridFilter_Text = 'text';
var GridFilter_Numeric = 'numeric';
var GridFilter_Date = 'date';
var FormatExcel_Number = "$#,##0.00";
var Text_Center = "text-center";
var Text_Right = "text-right";
var Text_Left = "text-left";
//------------------------------------------------------------------------------------------------------------------------------
/**
 * Columnas de la clase LenLanSearch
 * */
exports.LenLoanSearch_ColumnConfiguration = function () { return ([
    { Position: 1, Width: 100, ColumnName: 'Account', Title: 'Loan Number', ParteDelGrid: true, Checked: true },
    { Position: 2, Width: 100, ColumnName: 'Name', Title: 'Name', ParteDelGrid: true, Checked: true },
    { Position: 3, Width: 100, ColumnName: 'City', Title: 'City', ParteDelGrid: true, Checked: true },
    { Position: 4, Width: 100, ColumnName: 'State', Title: 'State', ParteDelGrid: true, Checked: true },
    { Position: 5, Width: 100, ColumnName: 'MaturityDate', Title: 'Maturity Date', ParteDelGrid: true, Checked: true },
    { Position: 6, Width: 100, ColumnName: 'PrimaryPurpose', Title: 'Primary Purpose', ParteDelGrid: true, Checked: true },
    { Position: 7, Width: 100, ColumnName: 'OriginalBalance', Title: 'Original Balance', ParteDelGrid: true, Checked: true },
    { Position: 8, Width: 100, ColumnName: 'CurrentBalance', Title: 'Current Balance', ParteDelGrid: true, Checked: true },
    // { position: 1, width: 100, columnName: '', title: 'Days Late' },
    { Position: 9, Width: 100, ColumnName: 'NextDueDate', Title: 'Next Due Date', ParteDelGrid: true, Checked: true },
    { Position: 10, Width: 100, ColumnName: 'NoteRate', Title: 'Note Rate', ParteDelGrid: true, Checked: true },
    //  { position: 1, width: 100, columnName: '', title: 'Investor Rate' },
    { Position: 11, Width: 100, ColumnName: 'TotalPayment', Title: 'Total Payment', ParteDelGrid: true, Checked: true },
    { Position: 12, Width: 100, ColumnName: 'Status', Title: 'Status', ParteDelGrid: true, Checked: true },
    //{ position: 1, width: 100, columnName: '', title: 'Closed Date' },
    //{ position: 1, width: 100, columnName: '', title: 'Closed Reason' },
    // { position: 1, width: 100, columnName: '', title: 'Default Interest Active Status' },
    { Position: 13, Width: 100, ColumnName: 'DefaultInterestRate', Title: 'Default Interest Rate', ParteDelGrid: true, Checked: true }
]); };
//PartialOwnershipPortfolio**********************************************************************************************
exports.PartialOwnershipPortfolio_ColumnConfiguration_Group1 = 'Loan Information';
exports.PartialOwnershipPortfolio_ColumnConfiguration_Group2 = 'Primary Investor';
exports.PartialOwnershipPortfolio_ColumnConfiguration_Group3 = 'Secondary Investor';
var AddColumnNumber = function (Position, ColumnName, Title, IsAgregateSum, ExtraConfiguration) {
    if (ExtraConfiguration === void 0) { ExtraConfiguration = {}; }
    return (ExtraConfiguration = __assign(__assign({}, ExtraConfiguration), { Checked: true, Position: Position, ColumnName: ColumnName, Title: Title, IsAgregateSum: IsAgregateSum, IsNumber: true, GridColumnFormat: GridFormat_Number, GridColumnFilter: GridFilter_Numeric }));
};
var AddColumnDecimal = function (Position, ColumnName, Title, IsAgregateSum, ExtraConfiguration) {
    if (ExtraConfiguration === void 0) { ExtraConfiguration = {}; }
    return (ExtraConfiguration = __assign(__assign({}, ExtraConfiguration), { Checked: true, Position: Position, ColumnName: ColumnName, Title: Title, IsAgregateSum: IsAgregateSum, IsNumber: true, GridColumnFormat: GridFormat_Decimal, GridColumnFilter: GridFilter_Numeric }));
};
var AddColumnPercentaje = function (Position, ColumnName, Title, ExtraConfiguration) {
    if (ExtraConfiguration === void 0) { ExtraConfiguration = {}; }
    return (ExtraConfiguration = __assign(__assign({}, ExtraConfiguration), { Checked: true, Position: Position, ColumnName: ColumnName, Title: Title, IsNumber: true, GridColumnFormat: GridFormat_Percentaje, GridColumnFilter: GridFilter_Numeric, GridColumnTextAlign: Text_Right }));
};
var AddColumnString = function (Position, ColumnName, Title, ExtraConfiguration) {
    if (ExtraConfiguration === void 0) { ExtraConfiguration = {}; }
    return (ExtraConfiguration = __assign(__assign({}, ExtraConfiguration), { Checked: true, Position: Position, ColumnName: ColumnName, Title: Title, 
        // IsNumber: true,
        // GridColumnFormat: GridFormat_,
        GridColumnFilter: GridFilter_Text }));
};
var AddColumnBoolean = function (Position, ColumnName, Title, ExtraConfiguration) {
    if (ExtraConfiguration === void 0) { ExtraConfiguration = {}; }
    return (ExtraConfiguration = __assign(__assign({}, ExtraConfiguration), { Checked: true, Position: Position, ColumnName: ColumnName, Title: Title, IsBool: true, 
        //GridColumnFormat: GridFormat_,
        GridColumnFilter: GridFilter_Boolean }));
};
var AddColumnDate = function (Position, ColumnName, Title, ExtraConfiguration) {
    if (ExtraConfiguration === void 0) { ExtraConfiguration = {}; }
    return (ExtraConfiguration = __assign(__assign({}, ExtraConfiguration), { Checked: true, Position: Position, ColumnName: ColumnName, Title: Title, IsDate: true, 
        //GridColumnFormat: GridFormat_,g
        GridColumnFormat: GridFormat_Date, GridColumnFilter: GridFilter_Date }));
};
exports.PartialOwnershipPortfolio_ColumnConfiguration = function () { return ([
    AddColumnString(1, 'Account', 'Loan Number', { MultiColumnHeader1_Index: 1 }),
    AddColumnString(2, 'BorrowerFullName', 'Borrower Name', { MultiColumnHeader1_Index: 1 }),
    AddColumnString(3, 'City', 'Prop City', { MultiColumnHeader1_Index: 1 }),
    AddColumnString(4, 'State', 'Prop State', { MultiColumnHeader1_Index: 1 }),
    AddColumnDecimal(5, 'LoanPartialBalance', 'Original Balance', true, { MultiColumnHeader1_Index: 1 }),
    AddColumnDecimal(6, 'LoanCurrentBalance', 'Current UPB', true, { MultiColumnHeader1_Index: 1 }),
    AddColumnString(7, 'DaysLate', 'Days Late', { MultiColumnHeader1_Index: 1 }),
    AddColumnDate(8, 'NextDueDate', 'Next Due Date', { MultiColumnHeader1_Index: 1 }),
    AddColumnNumber(9, 'Status', 'Loan Status', false, { MultiColumnHeader1_Index: 1 }),
    //-------------------------------------------------------------------------------------------------------------------
    AddColumnString(10, 'PrimaryAccount', 'Investor Number', { MultiColumnHeader1_Index: 2 }),
    AddColumnDecimal(11, 'PrimaryOriginalBalance', 'Original Balance', true, { MultiColumnHeader1_Index: 2 }),
    AddColumnDecimal(12, 'RemainingEquityPortion', 'Investor Residual', true, { MultiColumnHeader1_Index: 2 }),
    AddColumnPercentaje(13, 'LenderRate', 'Note Rate', { MultiColumnHeader1_Index: 2 }),
    //-------------------------------------------------------------------------------------------------------------------
    AddColumnString(14, 'SecondaryAccount', 'Investor Number', { MultiColumnHeader1_Index: 3 }),
    AddColumnDecimal(15, 'SecondaryOriginalBalance', 'Original Investment', true, { MultiColumnHeader1_Index: 3 }),
    AddColumnDecimal(16, 'SecondaryCurrentBalance', 'Current UPB', true, { MultiColumnHeader1_Index: 3 }),
    AddColumnPercentaje(17, 'SecondaryRate', 'Secondary Rate', { MultiColumnHeader1_Index: 3 }),
    AddColumnDecimal(18, 'TotalPayment', 'Total Payment', true, { MultiColumnHeader1_Index: 3 }),
    AddColumnNumber(19, 'TermsLeft', 'Terms Left', false, { MultiColumnHeader1_Index: 3 })
]); };
//VCW_VendorPortfolioSecondary******************************************************************************************************************
exports.VCW_VendorPortfolioSecondary_ColumnConfiguration = function () { return ([
    AddColumnString(1, 'PrimaryAccount', 'Investor Number', { MultiColumnHeader1_Index: 1 }),
    AddColumnDecimal(2, 'PrimaryOriginalBalance', 'Original Balance', true, { MultiColumnHeader1_Index: 1 }),
    AddColumnDecimal(3, 'RemainingEquityPortion', 'Investor Residual', true, { MultiColumnHeader1_Index: 1 }),
    AddColumnDecimal(4, 'LenderRate', 'Note Rate', true, { MultiColumnHeader1_Index: 1 }),
    //-------------------------------------------------------------------------------------------------------------------
    AddColumnString(5, 'SecondaryAccount', 'Investor Number', { MultiColumnHeader1_Index: 2 }),
    AddColumnDecimal(6, 'LoanPartialBalance', 'Original Balance', true, { MultiColumnHeader1_Index: 2 }),
    AddColumnDecimal(7, 'SecondaryOriginalBalance', 'Original Investment', true, { MultiColumnHeader1_Index: 2 }),
    AddColumnDecimal(8, 'SecondaryCurrentBalance', 'Current UPB', true, { MultiColumnHeader1_Index: 2 }),
    AddColumnPercentaje(9, 'SecondaryRate', 'Secondary Rate', { MultiColumnHeader1_Index: 2 }),
    AddColumnDecimal(10, 'TotalPayment', 'Total Payment', true, { MultiColumnHeader1_Index: 2 }),
    AddColumnNumber(11, 'TermsLeft', 'Terms Left', false, { MultiColumnHeader1_Index: 2 })
]); };
//PaymentToLender******************************************************************************************************************
exports.PaymentToLender_ColumnConfiguration = function () { return ([
    AddColumnDate(1, 'CheckDate', 'Check Date'),
    AddColumnString(2, 'CheckNo', 'Check Number'),
    AddColumnString(3, 'Account', 'Borrower Account'),
    AddColumnString(4, 'PaymentCode', 'Payment Type'),
    AddColumnDecimal(5, 'CheckAmount', 'Check Amount', true),
    AddColumnDecimal(6, 'ToServiceFee', 'Service Fees', true),
    AddColumnDecimal(7, 'ToInterest', 'Applied to Interest', true),
    AddColumnDecimal(8, 'ToPrincipal', 'Applied to Principal', true),
    AddColumnDecimal(9, 'ToLateCharge', 'Applied to Principal', true),
    AddColumnDecimal(10, 'ToChargesPrincipal', 'Charges Principal', true),
    AddColumnDecimal(11, 'ToChargesInterest', 'Charges Interest', false),
    AddColumnDecimal(12, 'ToPrepay', 'Applied to Prepay Fee', false),
    AddColumnDecimal(13, 'ToOtherTaxable', 'Other Taxable', false),
    AddColumnDecimal(14, 'ToOtherTaxFree', 'Other Non-Taxable', false),
    AddColumnDecimal(15, 'ToOtherPayments', 'Other Payments', false),
    AddColumnDecimal(16, 'ToTrust', 'Applied to Trust', false)
]); };
//RPTCustomFullLoanPortfolio******************************************************************************************************************
exports.RPTCustomFullLoanPortfolio_ColumnConfiguration = function () { return ([
    AddColumnString(1, 'Account', 'Account'),
    AddColumnString(2, 'DepartmentName', 'ID'),
    AddColumnString(3, 'PrevAccount', 'Previous Account'),
    AddColumnString(4, 'OrigLender', 'Original Lender'),
    AddColumnString(5, 'LenderAccount', 'Lender Account'),
    AddColumnString(6, 'LenderName', 'Lender Name'),
    AddColumnString(7, 'LenderOwnerPct', 'Lender Ownership Pct'),
    AddColumnString(8, 'LenderFundDate', 'Lender Funding Date'),
    AddColumnString(9, 'Name', 'Borrower Name'),
    AddColumnString(10, 'BorrowerAddress', 'Borrower Address'),
    AddColumnString(11, 'BorrowerCity', 'Borrower City'),
    AddColumnString(12, 'BorrowerState', 'Borrower State'),
    AddColumnString(13, 'BorrowerZip', 'Borrower Zip'),
    AddColumnString(14, 'HomePhone', 'Home'),
    AddColumnString(15, 'WorkPhone', 'Work'),
    AddColumnString(16, 'MobilePhone', 'Mobil'),
    AddColumnString(17, 'BorrowerFax', 'Fax'),
    AddColumnString(18, 'TotalOriginalBalance', 'Original Balance'),
    AddColumnString(19, 'OriginalBalance', 'Starting Balance'),
    AddColumnString(20, 'CurrentBalance', 'Current Balance'),
    AddColumnString(21, 'NoteRate', 'Note Rate'),
    AddColumnString(22, 'SoldRate', 'Investor Rate'),
    AddColumnString(23, 'Position', 'Position'),
    AddColumnString(24, 'PaymmentImpound', 'Escrow Payment'),
    AddColumnString(25, 'PaymmentReserve', 'Suspense Pmt.'),
    AddColumnString(26, 'UnpaidCharges', 'Loan Charges'),
    AddColumnString(27, 'UnpaidLateCharges', 'Unpaid Late Charges'),
    AddColumnString(28, 'UnpaidInterest', 'Unpaid Interest'),
    AddColumnString(29, 'SrLoanAmount', 'Sr.Loan Amount'),
    AddColumnString(30, 'UnearnedDisc', 'Unearned Disc.'),
    AddColumnString(31, 'TotalPayment', 'Regular Payment'),
    AddColumnString(32, 'Status', 'Status'),
    AddColumnString(33, 'LateChargeDays', 'Grace Days'),
    AddColumnString(34, 'LateChargeMin', 'Minimum Late Charge'),
    AddColumnString(35, 'LateChargePct', 'Late Charge %'),
    AddColumnString(36, 'PaidToDate', 'Paid To Date'),
    AddColumnString(37, 'BoardingDate', 'Boarding  Date'),
    AddColumnString(38, 'NextDueDate', 'Next Due Date'),
    AddColumnString(39, 'MaturityDate', 'Maturity Date'),
    AddColumnString(40, 'PaidOffDate', 'Paid Off Date'),
    AddColumnString(41, 'PurchaseDate', 'Purchase Date'),
    AddColumnString(42, 'OriginationDate', 'Origination Date'),
    AddColumnString(43, 'Address', 'Prop.Address'),
    AddColumnString(44, 'City', 'Prop.City'),
    AddColumnString(45, 'State', 'Prop.State'),
    AddColumnString(46, 'Zip', 'Prop.Zip'),
    AddColumnString(47, 'ApprValue', 'Appr.Value'),
    AddColumnString(48, 'ApprSource', 'Appr.Source'),
    AddColumnString(49, 'ApprDate', 'Appr.Date'),
    AddColumnString(50, 'LTV', 'LTV'),
    AddColumnString(51, 'Occupancy', 'Occupancy'),
    AddColumnString(52, 'PropertyType', 'Prop.Type'),
    AddColumnString(53, 'ACHStatus', 'ACH status'),
    AddColumnString(54, 'Tags', 'Categories'),
    AddColumnString(55, 'RateType', 'Rate Type'),
    AddColumnString(56, 'DeferredPrinBal', 'Deferred Principal Balance'),
    AddColumnString(57, 'DeferredUnpaidInterest', 'Deferred Unpaid Interest'),
    AddColumnString(58, 'DeferredUnpaidLateCharges', 'Deferred Unpaid Late Charges'),
    AddColumnString(59, 'DeferredUnpaidLoanCharges', 'Deferred Unpaid Loan Charges'),
    AddColumnString(60, 'PrimaryPurpose', 'Primary Purpose'),
    AddColumnString(61, 'InvestAssetNumber', 'Invest Asset Number'),
]); };
//**********************************************************************************************
/**
 * Columnas de la clase LenFunding
 * */
exports.LeFunding_ColumnConfiguration = function () { return ([
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 1, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Lender Uid', ColumnName: 'LenderUid' },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 2, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Loan Uid', ColumnName: 'LoanUid' },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 3, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Account', ColumnName: 'LenderAccount', ParteDelGrid: true },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 4, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Lender Name', ColumnName: 'LenderName', ParteDelGrid: true },
    { ExcelColumnFormat: FormatExcel_Number, GridColumnFormat: GridFormat_Decimal, Total: false, IsNumber: true, Checked: true, Position: 5, ClassName: Text_Right, GridColumnFilter: 'text', Width: 100, Title: 'Amount Funded', ColumnName: 'LenderAmountFunded', ParteDelGrid: true },
    { ExcelColumnFormat: FormatExcel_Number, GridColumnFormat: GridFormat_Percentaje, Total: false, IsNumber: true, Checked: true, Position: 6, ClassName: Text_Right, GridColumnFilter: 'text', Width: 100, Title: '% Owned', ColumnName: 'PercentageOwned', ParteDelGrid: true },
    { ExcelColumnFormat: FormatExcel_Number, GridColumnFormat: GridFormat_Decimal, Total: false, IsNumber: true, Checked: true, Position: 7, ClassName: Text_Right, GridColumnFilter: 'text', Width: 100, Title: 'Investor Rate', ColumnName: 'InvestorRate', ParteDelGrid: true },
    { ExcelColumnFormat: FormatExcel_Number, GridColumnFormat: GridFormat_Decimal, Total: false, IsNumber: true, Checked: true, Position: 8, ClassName: Text_Right, GridColumnFilter: 'text', Width: 100, Title: 'Current Balance', ColumnName: 'LenderCurrentBalance', ParteDelGrid: true },
    { ExcelColumnFormat: FormatExcel_Number, GridColumnFormat: GridFormat_Decimal, Total: false, IsNumber: true, Checked: true, Position: 9, ClassName: Text_Right, GridColumnFilter: 'text', Width: 100, Title: 'Payment Information', ColumnName: 'PaymentInformation', ParteDelGrid: true },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 10, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Secondary Uid', ColumnName: 'SecondaryUid' }
]); };
//------------------------------------------------------------------------------------------------------------------------------
/**
 * Columnas de la clase LenNotes
 * */
exports.LenNotes_ColumnConfiguration = function () { return ([
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 1, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Uid Note', ColumnName: 'UidNote' },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 2, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Uid Loan', ColumnName: 'UidLoan' },
    { ExcelColumnFormat: '', GridColumnFormat: '{0:yyyy-MM-dd HH:mm}', Total: false, IsNumber: false, Checked: true, Position: 3, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Date', ColumnName: 'Date', ParteDelGrid: true },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 4, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'FCI Rep', ColumnName: 'Rep', ParteDelGrid: true },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 5, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Create By', ColumnName: 'CreateBy' },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 6, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Note', ColumnName: 'Note' },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 7, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Note_Plain', ColumnName: 'Note_Plain' },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 8, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Priority', ColumnName: 'Priority' },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 9, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Description', ColumnName: 'Description' },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 10, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Type', ColumnName: 'Type', ParteDelGrid: true },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 11, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Contact Person', ColumnName: 'ContactPerson', ParteDelGrid: true },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 12, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Contact Number', ColumnName: 'ContactNumber', ParteDelGrid: true },
    { ExcelColumnFormat: '', GridColumnFormat: '', Total: false, IsNumber: false, Checked: true, Position: 13, ClassName: Text_Left, GridColumnFilter: 'text', Width: 100, Title: 'Subject', ColumnName: 'Subject', ParteDelGrid: true }
]); };
//# sourceMappingURL=LenderCommon2.js.map