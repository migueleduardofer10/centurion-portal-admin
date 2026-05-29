"use strict";
//ORIGINAL//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
exports.LenFunding_Url = void 0;
var kendo_react_excel_export_1 = require("@progress/kendo-react-excel-export");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var React = require("react");
var react_redux_1 = require("react-redux");
var LenFundingAction_1 = require("../../store/actions/lenders/LenFundingAction");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var LenFundingStore_1 = require("../../store/stores/lenders/LenFundingStore");
var Functions_1 = require("../../utilities/Functions");
var Grid001_1 = require("../genericComponents/Grid001");
var LenFunding = function (props) {
    var ObjState = react_redux_1.useSelector(LenFundingStore_1.LenFunding_StateObject);
    var dispatch = react_redux_1.useDispatch();
    var LoanUid = props.location.state.LoanUid;
    React.useEffect(function () {
        Refresh(true, false, LenderCommon2_1.StateInitialValue);
        return function () {
        };
    }, []);
    var Refresh = function (getColumns, revertColumns, state) {
        dispatch(LenFundingAction_1.LenFunding_Action_CallJson(LoanUid, getColumns, state, revertColumns));
    };
    var RenderExcelExport_Event_BnExportAllRows = function (excelExporter) {
        //   dispatch(LenFungind_Action_ExportExcelAll(loanUid, GetToken(), excelExporter))
        dispatch(LenFundingAction_1.LenFunding_Action_CallJson(LoanUid, false, ObjState.GridState, false, excelExporter));
    };
    var RenderGrid_Event_PageChange = function (event) {
        dispatch(LenFundingAction_1.LenFunding_Action_CallJson(LoanUid, false, __assign(__assign({}, ObjState.GridState), { skip: event.page.skip, take: event.page.take }), false));
    };
    var RenderGrid_Event_Sort = function (event) {
        dispatch(LenFundingAction_1.LenFunding_Action_CallJson(LoanUid, false, __assign(__assign({}, ObjState.GridState), { sort: event.sort }), false));
    };
    var RenderGrid_Event_DataStateChange = function (event) {
        dispatch(LenFundingAction_1.LenFunding_Action_CallJson(LoanUid, false, event.dataState, false));
    };
    var RenderCustomColumns_Event_applyChangedColumns = function (event) {
        dispatch(LenFundingAction_1.LenFunding_Action_applyChangedColumns(ObjState.Columns));
    };
    var RenderCustomColumns_Event_activateColumn = function (columnName) {
        dispatch(LenFundingAction_1.LenFunding_Action_SetActiveColumn(columnName));
    };
    var RenderCustomColumns_Event_BnRevertColumns = function () {
        Refresh(true, true, LenderCommon2_1.StateInitialValue);
    };
    var RenderGrid_GridToolBar_BnRefresh = function () {
        Refresh(false, false, LenderCommon2_1.StateInitialValue);
    };
    var SaveColumns = function (newColumns) {
        dispatch(LenFundingAction_1.LenFunding_Action_SetColumnsArray(newColumns));
    };
    return (React.createElement(Grid001_1.default, { key: 1, LoanUid: LoanUid, Rows: ObjState.Rows, AllRows: ObjState.AllRows, Columns: ObjState.Columns, ActiveColumn: ObjState.ActiveColumn, GridState: ObjState.GridState, ExcelExport_FileName: 'Len Funding.xlsx', RenderCustomColumns_Event_activateColumn: function (columnName) { return RenderCustomColumns_Event_activateColumn(columnName); }, RenderCustomColumns_Event_applyChangedColumns: function (event) { return RenderCustomColumns_Event_applyChangedColumns(event); }, RenderCustomColumns_Event_BnRevertColumns: function () { return RenderCustomColumns_Event_BnRevertColumns(); }, RenderExcelExport_Event_BnExportAllRows: function (excelExporter) { return RenderExcelExport_Event_BnExportAllRows(excelExporter); }, RenderGrid_GridToolBar_BnRefresh: function () { return RenderGrid_GridToolBar_BnRefresh(); }, RenderGrid_Event_DataStateChange: function (event) { return RenderGrid_Event_DataStateChange(event); }, RenderGrid_Event_PageChange: function (event) { return RenderGrid_Event_PageChange(event); }, RenderGrid_Event_Sort: function (event) { return RenderGrid_Event_Sort(event); }, TotalRows: ObjState.TotalRows, TabIndex: 1, Title: 'Borrower Payment History', RenderCustomColumns_SaveColumns: function (newColumns) { return SaveColumns(newColumns); }, RenderExcelExport_Element_ExportColumn: ObjState.Columns.filter(function (x) { return x.Checked === true && x.ParteDelGrid === true; })
            .map(function (column) {
            if (column.IsNumber) {
                return (React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: column.ColumnName, field: column.ColumnName, title: column.ColumnName, width: column.Width, headerCellOptions: { textAlign: 'center' }, footer: function () {
                        return Functions_1.Utils.currencyFormat(ObjState.TotalSum[column.ColumnName]);
                    } }));
            }
            else {
                return (React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: column.ColumnName, field: column.ColumnName, title: column.ColumnName, width: column.Width, headerCellOptions: { textAlign: 'center' } }));
            }
        }), RenderGrid_Element_GridColumn: ObjState.Columns.filter(function (x) { return x.Checked === true && x.ParteDelGrid === true; })
            .map(function (column, index) { return (React.createElement(kendo_react_grid_1.GridColumn, { title: column.Title, key: column.ColumnName, field: column.ColumnName, className: column.ClassName, width: (column.Width * 2) + 'px', format: column.GridColumnFormat, columnMenu: function (props) {
                return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
            }, footerCell: function (sender) {
                return (React.createElement("td", { style: sender.style, colSpan: sender.colSpan, className: "text-right font-weight-bold" }, Functions_1.Utils.currencyFormat(ObjState.TotalSum[sender === null || sender === void 0 ? void 0 : sender.field])));
            } })); }) }));
};
exports.LenFunding_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('LenFunding');
exports.default = LenFunding;
//# sourceMappingURL=LenFunding.js.map