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
exports.PartialOwnershipPortfolio_Action_FillCombos = exports.PartialOwnershipPortfolio_Action_ExportThisPage = exports.PartialOwnershipPortfolio_Action_Search = exports.PartialOwnershipPortfolio_Action_Details = exports.PartialOwnershipPortfolio_Action_Graph = exports.PartialOwnershipPortfolio_Action_SetActiveColumn = exports.PartialOwnershipPortfolio_Type_SetActiveColumn = exports.PartialOwnershipPortfolio_Action_SetDetailDictionary = exports.PartialOwnershipPortfolio_Type_SetDetailDictionary = exports.PartialOwnershipPortfolio_Action_SetArr = exports.PartialOwnershipPortfolio_Type_SetArr = exports.PartialOwnershipPortfolio_Action_SetRows = exports.PartialOwnershipPortfolio_Type_SetRows = exports.PartialOwnershipPortfolio_Action_SetColumns = exports.PartialOwnershipPortfolio_Type_SetColumns = exports.PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue = void 0;
var kendo_data_query_1 = require("@progress/kendo-data-query");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var Functions_1 = require("../../utilities/Functions");
//***************************************************************************************************************************************************************************
var Title = 'Partial Ownership Portfolio';
var Type = 'PartialOwnershipPortfolio/';
exports.PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue = { skip: 0, take: 30 };
//***************************************************************************************************************************************************************************
exports.PartialOwnershipPortfolio_Type_SetColumns = Type + 'SetColumns';
exports.PartialOwnershipPortfolio_Action_SetColumns = function (Columns) {
    return ({
        type: exports.PartialOwnershipPortfolio_Type_SetColumns,
        Columns: Columns
    });
};
//***************************************************************************************************************************************************************************
exports.PartialOwnershipPortfolio_Type_SetRows = Type + 'SetRows';
exports.PartialOwnershipPortfolio_Action_SetRows = function (Rows, TotalSum, GridState, TotalRows, GridDetailDictionary) {
    return ({
        type: exports.PartialOwnershipPortfolio_Type_SetRows,
        Rows: Rows,
        TotalSum: TotalSum,
        GridState: GridState,
        TotalRows: TotalRows,
        GridDetailDictionary: GridDetailDictionary
    });
};
//***************************************************************************************************************************************************************************
exports.PartialOwnershipPortfolio_Type_SetArr = Type + 'SetArr';
exports.PartialOwnershipPortfolio_Action_SetArr = function (ArrStatus, ArrState, ArrBalance) {
    return ({
        type: exports.PartialOwnershipPortfolio_Type_SetArr,
        ArrState: ArrState,
        ArrStatus: ArrStatus,
        ArrBalance: ArrBalance
    });
};
//***************************************************************************************************************************************************************************
exports.PartialOwnershipPortfolio_Type_SetDetailDictionary = Type + 'SetDetailDictionary';
exports.PartialOwnershipPortfolio_Action_SetDetailDictionary = function (GridDetailDictionary) {
    return ({
        type: exports.PartialOwnershipPortfolio_Type_SetDetailDictionary,
        GridDetailDictionary: GridDetailDictionary
    });
};
//***************************************************************************************************************************************************************************
exports.PartialOwnershipPortfolio_Type_SetActiveColumn = Type + 'SetActiveColumn';
exports.PartialOwnershipPortfolio_Action_SetActiveColumn = function (ActiveColumn) {
    return ({
        type: exports.PartialOwnershipPortfolio_Type_SetActiveColumn,
        ActiveColumn: ActiveColumn
    });
};
//***************************************************************************************************************************************************************************
exports.PartialOwnershipPortfolio_Action_Graph = function (loanUid, afterActions) { return function (dispatch, getState) {
    var url = "/api/Lender/loans/secondaryLoansView_graphSecondaryLoan/" + loanUid;
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        if (data.ObjOptional.Result != null) {
            data.ObjOptional.Result.forEach(function (x) {
                x.DateDue = LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(x.DateDue);
                x.DateReceived = LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(x.DateReceived);
            });
        }
        afterActions(data.ObjOptional.Result);
    }).catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
exports.PartialOwnershipPortfolio_Action_Details = function (loanUid, afterActions) { return function (dispatch, getState) {
    var arrAggregateSum = [];
    LenderCommon2_1.VCW_VendorPortfolioSecondary_ColumnConfiguration().filter(function (x) { return x.IsAgregateSum; }).forEach(function (x) { return arrAggregateSum.push({ field: x.ColumnName, aggregate: "sum" }); });
    var dsrs = { aggregates: arrAggregateSum };
    var url = "/api/Lender/loans/secondaryLoansView_subReports/" + loanUid + "/?" + kendo_data_query_1.toDataSourceRequestString(dsrs);
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        var loan = data.ObjOptional.Loan;
        var property = data.ObjOptional.Property;
        var borrower = data.ObjOptional.Borrower;
        var report1_agregate_sum = {};
        if (data.ObjOptional.VendorPortfolioSecondary.Total != 0) {
            data.ObjOptional.VendorPortfolioSecondary.AggregateResults.map(function (x) { return report1_agregate_sum[x.Member] = x.Value; });
        }
        var report1 = data.ObjOptional.VendorPortfolioSecondary.Data;
        var report2 = [];
        report2.push({
            Group1_Label: 'Original Loan Amount', Group1_Value: Functions_1.Utils.currencyFormat(loan.OriginalBalance),
            Group2_Label: 'Loan Position', Group2_Value: String(Number(loan.LienPosition) + 1),
            Group3_Label: 'Accrued Late Charges', Group3_Value: Functions_1.Utils.currencyFormat(loan.UnpaidLateCharges),
            Group4_Label: '', Group4_Value: '',
        }, {
            Group1_Label: 'Current Loan Amount', Group1_Value: Functions_1.Utils.currencyFormat(loan.PrincipalBalance),
            Group2_Label: 'Escrow Balance', Group2_Value: Functions_1.Utils.currencyFormat(loan.ImpoundBalance),
            Group3_Label: 'Loan Charges', Group3_Value: Functions_1.Utils.currencyFormat(loan.UnpaidCharges),
            Group4_Label: '', Group4_Value: '',
        }, {
            Group1_Label: 'Note Rate', Group1_Value: String(Number(loan.NoteRate) / 100) + '%',
            Group2_Label: 'Suspense Balance', Group2_Value: Functions_1.Utils.currencyFormat(loan.ReserveBalance),
            Group3_Label: 'Unpaid Interest', Group3_Value: Functions_1.Utils.currencyFormat(loan.UnpaidInterest),
            Group4_Label: '', Group4_Value: '',
        });
        var report3 = [];
        report3.push({
            Group1_Label: 'Paid To', Group1_Value: LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(loan.PaidToDate),
            Group2_Label: 'Loan Marutity', Group2_Value: LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(loan.MaturityDate),
            Group3_Label: 'Loan Origination', Group3_Value: LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(loan.OriginationDate),
            Group4_Label: '', Group4_Value: '',
        }, {
            Group1_Label: 'Next Payment Due', Group1_Value: LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(loan.NextDueDate),
            Group2_Label: 'Loan Payoff', Group2_Value: LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(loan.PaidOffDate),
            Group3_Label: '', Group3_Value: '',
            Group4_Label: '', Group4_Value: '',
        });
        var report4 = [];
        report4.push({
            Group1_Label: 'Loan', Group1_Value: LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(loan.PaidToDate),
            Group2_Label: 'Type', Group2_Value: LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(loan.MaturityDate),
            Group3_Label: 'APN', Group3_Value: LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(loan.OriginationDate),
            Group4_Label: 'FAX', Group4_Value: '',
        }, {
            Group1_Label: 'Borrower', Group1_Value: borrower.FullName,
            Group2_Label: 'Occupancy', Group2_Value: 'occupacity',
            Group3_Label: 'LTV',
            Group3_Value: String(property.ValuationAmount != 0 ? loan.PrincipalBalance / property.ValuationAmount : 0),
            Group4_Label: 'Email', Group4_Value: '',
        }, {
            Group1_Label: 'TIN', Group1_Value: borrower.TIN,
            Group2_Label: 'Appr. Value', Group2_Value: Functions_1.Utils.currencyFormat(property.ValuationAmount),
            Group3_Label: 'HOME', Group3_Value: borrower.HomePhone,
            Group4_Label: '', Group4_Value: '',
        }, {
            Group1_Label: 'Mail Address', Group1_Value: loan.BorrowerAddress + ', ' + loan.BorrowerCity + ', ' + loan.BorrowerState + ', ' + loan.BorrowerZip,
            Group2_Label: 'Appr. Date', Group2_Value: LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(property.ValuationDate),
            Group3_Label: 'Work', Group3_Value: borrower.WorkPhone,
            Group4_Label: '', Group4_Value: '',
        }, {
            Group1_Label: 'Prop. Address',
            Group1_Value: property.Street,
            Group2_Label: 'App. Source', Group2_Value: data.ObjOptional.ValuationType,
            Group3_Label: 'Mobile', Group3_Value: borrower.MobilePhone,
            Group4_Label: '', Group4_Value: '',
        });
        afterActions(report1_agregate_sum, report1, report2, report3, report4);
    }).catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//***************************************************************************************************************************************************************************
var GetStatusName = function (value) {
    switch (value) {
        case -1: return 'Asigned';
        case 0: return "Performing";
        case 1: return "Closed"; //Non Active
        case 2: return "Paid Off";
        case 3: return "Transferred";
        case 4: return "Bankruptcy";
        case 5: return "Foreclosure";
        case 6: return "REO";
        case 7: return "Charge Off";
        case 8: return "Complete Charge Off";
        case 9: return "Transfer Out";
        case 10: return "Payoff Demand";
        case 11: return "Pre Boarding";
        case 12: return "Final Boarding";
        case 13: return "RESPA";
        case 14: return "Loss-Mit Request";
        case 15: return "Delinquent";
        default: return '';
    }
};
var GetStatusArray = function () { return ([{ Key: "-2", Value: "All" },
    { Key: "-1", Value: "Asigned" },
    { Key: "0", Value: "Performing" },
    { Key: '1', Value: "Closed" },
    { Key: '2', Value: "Paid Off" },
    { Key: '3', Value: "Transferred" },
    { Key: '4', Value: "Bankruptcy" },
    { Key: '5', Value: "Foreclosure" },
    { Key: '6', Value: "REO" },
    { Key: '7', Value: "Charge Off" },
    { Key: '8', Value: "Complete Charge Off" },
    { Key: '9', Value: "Transfer Out" },
    { Key: '10', Value: "Payoff Demand" },
    { Key: '11', Value: "Pre Boarding" },
    { Key: '12', Value: "Final Boarding" },
    { Key: '13', Value: "RESPA" },
    { Key: '14', Value: "Loss-Mit Request" },
    { Key: '15', Value: "Delinquent" },
]); };
exports.PartialOwnershipPortfolio_Action_Search = function (state, status, balance, gridState, excelExporter_allRows) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    //totales
    var arrAggregateSum = [];
    LenderCommon2_1.PartialOwnershipPortfolio_ColumnConfiguration().filter(function (x) { return x.IsAgregateSum; }).forEach(function (x) { return arrAggregateSum.push({ field: x.ColumnName, aggregate: "sum" }); });
    gridState = __assign(__assign({}, gridState), { aggregates: arrAggregateSum });
    if (excelExporter_allRows) {
        gridState = __assign(__assign({}, gridState), { skip: 0, take: undefined });
    }
    var url = "/api/Lender/loans/secondaryLoansView_search/" + state + "/" + status + "/" + balance + "/?" + kendo_data_query_1.toDataSourceRequestString(gridState);
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        if (data.ObjOptional.Result.Total != 0) {
            var totalSum_1 = {};
            data.ObjOptional.Result.AggregateResults.map(function (x) { return totalSum_1[x.Member] = x.Value; });
            var dateColumnName_1 = LenderCommon2_1.PartialOwnershipPortfolio_ColumnConfiguration().filter(function (x) { return x.IsDate; })[0].ColumnName;
            data.ObjOptional.Result.Data.forEach(function (x) {
                x[dateColumnName_1] = LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(x[dateColumnName_1]);
                x['Status'] = GetStatusName(x['Status']);
            });
            if (!excelExporter_allRows) {
                dispatch(exports.PartialOwnershipPortfolio_Action_SetRows(data.ObjOptional.Result.Data, totalSum_1, gridState, data.ObjOptional.Result.Total, {}));
            }
            else { // (excelExporter_allRows) {
                //dispatch(LenLoansSearch_Action_SetAllRows(data.ObjOptional.Result.Data as []))
                excelExporter_allRows === null || excelExporter_allRows === void 0 ? void 0 : excelExporter_allRows.current.save(data.ObjOptional.Result.Data);
                //excelExporter_allRows.save()
                //dispatch(LenLoansSearch_Action_SetAllRows([]))
                dispatch(Functions_1.GlobalAnimation_Loaded());
                Functions_1.Notify.success("", "Export Complete");
            }
        }
        dispatch(Functions_1.GlobalAnimation_Loaded());
    }).catch(function (error) {
        Functions_1.Utils.showError(dispatch, error, Title);
    });
}; };
exports.PartialOwnershipPortfolio_Action_ExportThisPage = function (excelExporter_allRows, data) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    excelExporter_allRows === null || excelExporter_allRows === void 0 ? void 0 : excelExporter_allRows.current.save(data);
    dispatch(Functions_1.GlobalAnimation_Loaded());
    Functions_1.Notify.success("", "Export Complete");
}; };
exports.PartialOwnershipPortfolio_Action_FillCombos = function () { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    dispatch(exports.PartialOwnershipPortfolio_Action_SetColumns(LenderCommon2_1.PartialOwnershipPortfolio_ColumnConfiguration()));
    var url = "/api/Lender/loans/secondaryLoansView_fillCombos";
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        var INFState = data.ObjOptional.INFState.map(function (x) { return ({ Key: x.Abbreviation, Value: x.Name }); });
        var balanceFilter = [
            { Key: '-1', Value: 'Display Open & Closed Loans' },
            { Key: '0', Value: 'Display All Open Loans' },
            { Key: '1', Value: 'Display All Closed Loans' }
        ];
        dispatch(exports.PartialOwnershipPortfolio_Action_SetArr(GetStatusArray(), INFState, balanceFilter));
        dispatch(Functions_1.GlobalAnimation_Loaded());
    }).catch(function (error) {
        Functions_1.Utils.showError(dispatch, error, Title);
    });
}; };
//# sourceMappingURL=PartialOwnershipPortfolioAction.js.map