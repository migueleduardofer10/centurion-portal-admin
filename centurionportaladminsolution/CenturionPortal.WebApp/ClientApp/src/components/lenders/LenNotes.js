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
exports.LenNotes_Url = void 0;
var kendo_react_excel_export_1 = require("@progress/kendo-react-excel-export");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var React = require("react");
var react_redux_1 = require("react-redux");
var LenNotesAction_1 = require("../../store/actions/lenders/LenNotesAction");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var LenNotesStore_1 = require("../../store/stores/lenders/LenNotesStore");
var Grid001_1 = require("../genericComponents/Grid001");
var LenNotes = function (props) {
    var ObjState = react_redux_1.useSelector(LenNotesStore_1.LenNotes_StateObject);
    var dispatch = react_redux_1.useDispatch();
    var loanUid = props.location.state.LoanUid;
    React.useEffect(function () {
        Refresh(true, false, LenderCommon2_1.StateInitialValue);
        return function () {
        };
    }, []);
    var Refresh = function (getColumns, revertColumns, state) {
        dispatch(LenNotesAction_1.LenFungind_Action_CallJson(loanUid, getColumns, state, revertColumns));
    };
    var RenderExcelExport_Event_BnExportAllRows = function (excelExporter) {
        dispatch(LenNotesAction_1.LenFungind_Action_CallJson(loanUid, false, ObjState.GridState, false, excelExporter));
    };
    var RenderGrid_Event_PageChange = function (event) {
        dispatch(LenNotesAction_1.LenFungind_Action_CallJson(loanUid, false, __assign(__assign({}, ObjState.GridState), { skip: event.page.skip, take: event.page.take }), false));
    };
    var RenderGrid_Event_Sort = function (event) {
        dispatch(LenNotesAction_1.LenFungind_Action_CallJson(loanUid, false, __assign(__assign({}, ObjState.GridState), { sort: event.sort }), false));
    };
    var RenderGrid_Event_DataStateChange = function (event) {
        dispatch(LenNotesAction_1.LenFungind_Action_CallJson(loanUid, false, event.dataState, false));
    };
    var RenderCustomColumns_Event_applyChangedColumns = function (event) {
        dispatch(LenNotesAction_1.LenNotes_Action_applyChangedColumns(ObjState.Columns));
    };
    var RenderCustomColumns_Event_activateColumn = function (columnName) {
        dispatch(LenNotesAction_1.LenNotes_Action_SetActiveColumn(columnName));
    };
    var RenderCustomColumns_Event_BnRevertColumns = function () {
        Refresh(true, true, LenderCommon2_1.StateInitialValue);
    };
    var RenderGrid_GridToolBar_BnRefresh = function () {
        Refresh(false, false, LenderCommon2_1.StateInitialValue);
    };
    var SaveColumns = function (newColumns) {
        dispatch(LenNotesAction_1.LenNotes_Action_SetColumnsArray(newColumns));
    };
    var ChargesDetailsGrid = function () { return (React.createElement(kendo_react_grid_1.Grid, { data: ObjState.Rows },
        React.createElement(kendo_react_grid_1.GridColumn, { title: "Date", key: "Date", field: "Subject", className: "text-center", width: "40px", format: "{0:d}" }))); };
    var GridDetailRowProps = function (props) {
        //    <p dangerouslySetInnerHTML={{ __html: obj.Note }}> </p>
        var obj = props.dataItem;
        return (React.createElement("section", null,
            React.createElement("div", { dangerouslySetInnerHTML: { __html: obj.Note_Plain && obj.Note_Plain != '' ? obj.Note_Plain : 'Sorry, no records found' } })));
    };
    return (React.createElement(Grid001_1.default, { GridDetailRowProps: GridDetailRowProps, key: 1, LoanUid: loanUid, Rows: ObjState.Rows, AllRows: ObjState.AllRows, Columns: ObjState.Columns, ActiveColumn: ObjState.ActiveColumn, GridState: ObjState.GridState, ExcelExport_FileName: 'Len Notes.xlsx', RenderCustomColumns_Event_activateColumn: function (columnName) { return RenderCustomColumns_Event_activateColumn(columnName); }, RenderCustomColumns_Event_applyChangedColumns: function (event) { return RenderCustomColumns_Event_applyChangedColumns(event); }, RenderCustomColumns_Event_BnRevertColumns: function () { return RenderCustomColumns_Event_BnRevertColumns(); }, RenderExcelExport_Event_BnExportAllRows: function (excelExporter) { return RenderExcelExport_Event_BnExportAllRows(excelExporter); }, RenderGrid_GridToolBar_BnRefresh: function () { return RenderGrid_GridToolBar_BnRefresh(); }, RenderGrid_Event_DataStateChange: function (event) { return RenderGrid_Event_DataStateChange(event); }, RenderGrid_Event_PageChange: function (event) { return RenderGrid_Event_PageChange(event); }, RenderGrid_Event_Sort: function (event) { return RenderGrid_Event_Sort(event); }, TotalRows: ObjState.TotalRows, TabIndex: 3, Title: 'Borrower Payment History', RenderCustomColumns_SaveColumns: function (newColumns) { return SaveColumns(newColumns); }, RenderExcelExport_Element_ExportColumn: ObjState.Columns &&
            ObjState.Columns.filter(function (x) { return x.Checked === true && x.ParteDelGrid === true; })
                .map(function (column) {
                return (React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: column.ColumnName, field: column.ColumnName, title: column.ColumnName, width: column.Width, headerCellOptions: { textAlign: 'center' } }));
            }), RenderGrid_Element_GridColumn: ObjState.Columns && ObjState.Columns.filter(function (x) { return x.Checked === true && x.ParteDelGrid === true; })
            .map(function (column, index) {
            return (column.ColumnName === "Date" ?
                React.createElement(kendo_react_grid_1.GridColumn, { title: column.Title, key: column.ColumnName, field: "Date", width: (column.Width * 2) + 'px', filter: "date", format: "{0:d-MM-y}", columnMenu: function (props) {
                        return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
                    } })
                :
                    React.createElement(kendo_react_grid_1.GridColumn, { title: column.Title, key: column.ColumnName, field: column.ColumnName, className: column.ClassName, width: (column.Width * 2) + 'px', format: column.GridColumnFormat, columnMenu: function (props) {
                            return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
                        } }));
        }) }));
};
exports.LenNotes_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('LenNotes');
exports.default = LenNotes;
//# sourceMappingURL=LenNotes.js.map