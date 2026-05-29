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
var kendo_react_excel_export_1 = require("@progress/kendo-react-excel-export");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var React = require("react");
var react_redux_1 = require("react-redux");
var react_bootstrap_1 = require("react-bootstrap");
var Functions_1 = require("../../utilities/Functions");
var LenOptions_1 = require("../lenders/LenOptions");
var BreadCrumb_1 = require("../shared/BreadCrumb");
var Grid001 = function (props) {
    var dispatch = react_redux_1.useDispatch();
    var RenderExcelExport_ObjAllRows = React.useRef(null);
    var RenderExcelExport_ObjCurrentRow = React.useRef(null);
    var RenderExcelExport_Event_BnExport = function (currentPage) {
        var _a;
        if (currentPage) {
            dispatch(Functions_1.GlobalAnimation_Loading());
            (_a = RenderExcelExport_ObjCurrentRow.current) === null || _a === void 0 ? void 0 : _a.save();
            dispatch(Functions_1.GlobalAnimation_Loaded());
            Functions_1.Notify.success("", "Export Complete");
        }
        else {
            props.RenderExcelExport_Event_BnExportAllRows(RenderExcelExport_ObjAllRows === null || RenderExcelExport_ObjAllRows === void 0 ? void 0 : RenderExcelExport_ObjAllRows.current);
        }
    };
    var RenderExcelExport = function (currentRow) { return (React.createElement(kendo_react_excel_export_1.ExcelExport, { ref: currentRow ? RenderExcelExport_ObjCurrentRow : RenderExcelExport_ObjAllRows, data: currentRow ? props === null || props === void 0 ? void 0 : props.Rows : props === null || props === void 0 ? void 0 : props.AllRows, fileName: props.ExcelExport_FileName }, props.RenderExcelExport_Element_ExportColumn)); };
    var RenderGrid_Event_PageChange = function (event) {
        props.RenderGrid_Event_PageChange(event);
    };
    var RenderGrid_Event_Sort = function (event) {
        props.RenderGrid_Event_Sort(event);
    };
    var RenderGrid_Event_DataStateChange = function (event) {
        props.RenderGrid_Event_DataStateChange(event);
    };
    var _a = React.useState(), updateState = _a[1];
    var forceUpdate = React.useCallback(function () { return updateState({}); }, []);
    var Grid_onExpandChange = function (event) {
        event.dataItem.expanded = !event.dataItem.expanded;
        forceUpdate();
    };
    var RenderGrid = function () {
        return (React.createElement(React.Fragment, null,
            RenderExcelExport(true),
            RenderExcelExport(false),
            props.GridDetailRowProps
                ? //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    (React.createElement(kendo_react_grid_1.Grid, __assign({ sortable: true, pageable: true, data: props.Rows, total: props.TotalRows }, props.GridState, { onSortChange: RenderGrid_Event_Sort, onPageChange: RenderGrid_Event_PageChange, onDataStateChange: RenderGrid_Event_DataStateChange, expandField: "expanded", onExpandChange: function (event) { return Grid_onExpandChange(event); }, detail: props.GridDetailRowProps }),
                        React.createElement(kendo_react_grid_1.GridToolbar, null,
                            React.createElement("ul", { className: "list-inline mb-0" },
                                React.createElement("li", { className: "list-inline-item ml-0" },
                                    React.createElement("button", { className: "btn btn-primary", onClick: function (event) { return RenderGrid_GridToolBar_Event_Refresh(event); } },
                                        React.createElement("i", { className: "ti ti-reload" }),
                                        React.createElement("span", { className: "d-none d-md-inline" }, " Refresh"))),
                                React.createElement("li", { className: "list-inline-item ml-0" },
                                    React.createElement(react_bootstrap_1.Dropdown, null,
                                        React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdownMenuExport" },
                                            React.createElement("i", { className: "fa fa-file-excel" }),
                                            React.createElement("span", { className: "d-none d-md-inline" }, " Export")),
                                        React.createElement(react_bootstrap_1.Dropdown.Menu, null,
                                            React.createElement(react_bootstrap_1.Dropdown.Item, { onClick: function () { return RenderExcelExport_Event_BnExport(true); } },
                                                React.createElement("i", { className: "ti ti-layout-width-full mr-2" }),
                                                " This page"),
                                            React.createElement(react_bootstrap_1.Dropdown.Item, { onClick: function () { return RenderExcelExport_Event_BnExport(false); } },
                                                React.createElement("i", { className: "ti ti-layers-alt mr-2" }),
                                                " All pages")))),
                                React.createElement("li", { className: "list-inline-item dropdown mega-dropdown customize-column ml-0" }, RenderCustomColumns()))),
                        props.RenderGrid_Element_GridColumn))
                : //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                    (React.createElement(kendo_react_grid_1.Grid, __assign({ sortable: true, pageable: true, data: props.Rows, total: props.TotalRows }, props.GridState, { onSortChange: RenderGrid_Event_Sort, onPageChange: RenderGrid_Event_PageChange, onDataStateChange: RenderGrid_Event_DataStateChange }),
                        React.createElement(kendo_react_grid_1.GridToolbar, null,
                            React.createElement("ul", { className: "list-inline mb-0" },
                                React.createElement("li", { className: "list-inline-item ml-0" },
                                    React.createElement("button", { className: "btn btn-primary", onClick: function (event) { return RenderGrid_GridToolBar_Event_Refresh(event); } },
                                        React.createElement("i", { className: "ti ti-reload" }),
                                        React.createElement("span", { className: "d-none d-md-inline" }, " Refresh"))),
                                React.createElement("li", { className: "list-inline-item ml-0" },
                                    React.createElement(react_bootstrap_1.Dropdown, null,
                                        React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdownMenuExport" },
                                            React.createElement("i", { className: "fa fa-file-excel" }),
                                            React.createElement("span", { className: "d-none d-md-inline" }, " Export")),
                                        React.createElement(react_bootstrap_1.Dropdown.Menu, null,
                                            React.createElement(react_bootstrap_1.Dropdown.Item, { onClick: function () { return RenderExcelExport_Event_BnExport(true); } },
                                                React.createElement("i", { className: "ti ti-layout-width-full mr-2" }),
                                                " This page"),
                                            React.createElement(react_bootstrap_1.Dropdown.Item, { onClick: function () { return RenderExcelExport_Event_BnExport(false); } },
                                                React.createElement("i", { className: "ti ti-layers-alt mr-2" }),
                                                " All pages")))),
                                React.createElement("li", { className: "list-inline-item dropdown mega-dropdown customize-column ml-0" }, RenderCustomColumns()))),
                        props.RenderGrid_Element_GridColumn))));
    };
    var RenderGrid_GridToolBar_Event_Refresh = function (event) {
        event.preventDefault();
        props.RenderGrid_GridToolBar_BnRefresh(event);
    };
    var _b = React.useState(false), RenderCustomColumns_Property_show = _b[0], RenderCustomColumns_Property_setShow = _b[1];
    var RenderCustomColumns_Event_applyChangedColumns = function (event) {
        event.preventDefault();
        props.RenderCustomColumns_Event_applyChangedColumns(event);
        RenderCustomColumns_Property_setShow(false);
    };
    var RenderCustomColumns_Event_activateColumn = function (columnName) {
        props.RenderCustomColumns_Event_activateColumn(columnName);
    };
    var RenderCustomColumns_Event_BnRevertColumns = function (event) {
        event.preventDefault();
        props.RenderCustomColumns_Event_BnRevertColumns();
        RenderCustomColumns_Property_setShow(false);
    };
    var ObjUl = React.useRef(null);
    var ColumnMove = function (columnName, moveUp) {
        var _a, _b;
        var move = moveUp ? -1 : 1;
        var arrColumns = props.Columns.sort(Functions_1.Utils.compareColumn);
        var objColumn = arrColumns.filter(function (x) { return x.ColumnName === columnName; })[0];
        if (objColumn) {
            var objColumnAux = arrColumns[objColumn.Position + move - 1];
            if (objColumnAux) {
                objColumn.Position += move;
                objColumnAux.Position -= move;
                arrColumns = arrColumns.sort(Functions_1.Utils.compareColumn);
                props.RenderCustomColumns_SaveColumns(arrColumns);
                var height = (((_a = ObjUl.current) === null || _a === void 0 ? void 0 : _a.scrollHeight) / arrColumns.length);
                var index_1 = 0;
                arrColumns.forEach(function (obj, i) {
                    if (obj.ColumnName === columnName) {
                        index_1 = i;
                        return;
                    }
                });
                var y = height * (index_1 - 1);
                (_b = ObjUl.current) === null || _b === void 0 ? void 0 : _b.scroll(0, y);
            }
        }
    };
    var RenderCustomColumns_Event_BnMoveColumnUp = function (event) {
        event.preventDefault();
        ColumnMove(props.ActiveColumn, true);
    };
    var RenderCustomColumns_Event_BnMovColumnDown = function (event) {
        event.preventDefault();
        ColumnMove(props.ActiveColumn, false);
    };
    var ChecketAllColumns = function (value) {
        var newColumns = props.Columns.map(function (column) {
            column.Checked = value;
            return column;
        }).sort(Functions_1.Utils.compareColumn);
        props.RenderCustomColumns_SaveColumns(newColumns);
    };
    var RenderCustomColumns_Event_BnCheckAllColumn = function (event) {
        event.preventDefault();
        ChecketAllColumns(true);
    };
    var RenderCustomColumns_Event_BnUncheckAllColumn = function (event) {
        event.preventDefault();
        ChecketAllColumns(false);
    };
    var RenderCustomColumns_Event_checkColumn = function (event, columnName) {
        var obj = props.Columns.filter(function (x) { return x.ColumnName === columnName; })[0];
        if (obj) {
            obj.Checked = event.target.checked;
        }
        props.RenderCustomColumns_SaveColumns(props.Columns);
    };
    var RenderCustomColumns = function () {
        return (React.createElement(react_bootstrap_1.Dropdown, { show: RenderCustomColumns_Property_show },
            React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdownCustomColumns", className: "waves-effect waves-dark", onClick: function () { RenderCustomColumns_Property_setShow(true); } },
                React.createElement("i", { className: "fa fa-columns" }),
                React.createElement("span", { className: "d-none d-md-inline" }, " Colums")),
            React.createElement("form", { name: "customizeColumns", onSubmit: function (event) { return RenderCustomColumns_Event_applyChangedColumns(event); } },
                React.createElement(react_bootstrap_1.Dropdown.Menu, { className: "animated bounceInDown" },
                    React.createElement("div", { className: "mega-dropdown-menu row" },
                        React.createElement("div", { className: "col-md-7" },
                            React.createElement("ul", { ref: ObjUl, className: "list-group" }, props.Columns &&
                                props.Columns.filter(function (x) { return x.ParteDelGrid === true; })
                                    .map(function (column) { return (React.createElement("li", { key: column.ColumnName, className: "list-group-item " + (props.ActiveColumn === column.ColumnName ? " active" : ""), onClick: function () { return RenderCustomColumns_Event_activateColumn(column.ColumnName); } },
                                    React.createElement("div", { className: "form-check" },
                                        React.createElement("input", { className: "form-check-input", type: "checkbox", checked: column.Checked, onChange: function (event) { return RenderCustomColumns_Event_checkColumn(event, column.ColumnName); } }),
                                        React.createElement("label", { className: "form-check-label" }, column.Title)))); }))),
                        React.createElement("div", { className: "col-md-5 mt-2" },
                            React.createElement("div", { className: "row" },
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { type: "submit", className: "btn btn-secondary btn-block btn-sm" },
                                        React.createElement("i", { className: "ti ti-save" }),
                                        " Apply")),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block btn-sm mt-1", onClick: function (event) { return RenderCustomColumns_Event_BnRevertColumns(event); } },
                                        React.createElement("i", { className: "fa fa-undo" }),
                                        " Cancel")),
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement("button", { className: "btn btn-info btn-block mt-1", onClick: function (event) { return RenderCustomColumns_Event_BnMoveColumnUp(event); } },
                                        React.createElement("i", { className: "fa fa-arrow-up" }))),
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement("button", { className: "btn btn-info btn-block mt-1", onClick: function (event) { return RenderCustomColumns_Event_BnMovColumnDown(event); } },
                                        React.createElement("i", { className: "fa fa-arrow-down" }))),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block btn-sm mt-1", onClick: function (event) { return RenderCustomColumns_Event_BnCheckAllColumn(event); } },
                                        React.createElement("i", { className: "ti ti-check-box" }),
                                        " Check All")),
                                React.createElement("div", { className: "col-md-12" },
                                    React.createElement("button", { className: "btn btn-secondary btn-block btn-sm mt-1", onClick: function (event) { return RenderCustomColumns_Event_BnUncheckAllColumn(event); } },
                                        React.createElement("i", { className: "ti ti-control-stop" }),
                                        " Uncheck All")))))))));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(BreadCrumb_1.default, { title: props.Title }),
        React.createElement("div", { className: "card-group" },
            React.createElement("div", { className: "card" },
                React.createElement("div", { className: "card-header p-0" },
                    React.createElement(LenOptions_1.default, { option: props.TabIndex, loanUid: props.LoanUid })),
                React.createElement("div", { className: "card-body" }, RenderGrid())))));
};
exports.default = Grid001;
//# sourceMappingURL=Grid001.js.map