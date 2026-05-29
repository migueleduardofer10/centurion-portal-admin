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
exports.LenLoansSearch_Url = void 0;
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var React = require("react");
var react_redux_1 = require("react-redux");
var LenLoansSearchAction_1 = require("../../store/actions/lenders/LenLoansSearchAction");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var LenLoansSearchStore_1 = require("../../store/stores/lenders/LenLoansSearchStore");
var Functions_1 = require("../../utilities/Functions");
var UtilComponent_1 = require("../shared/UtilComponent");
var UserSetting_1 = require("../users/UserSetting");
var LenLoansSearch = function (props) {
    var State = react_redux_1.useSelector(LenLoansSearchStore_1.LenLoansSearch_StateObject);
    var Dispatch = react_redux_1.useDispatch();
    React.useEffect(function () {
        Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_CallJsonFillPropertyState(true));
    }, []);
    var _a = React.useState(''), FirstName_Value = _a[0], FirstName_SetValue = _a[1];
    var _b = React.useState(''), LastName_Value = _b[0], LastName_SetValue = _b[1];
    var _c = React.useState(''), Address_Value = _c[0], Address_SetValue = _c[1];
    var _d = React.useState(''), City_Value = _d[0], City_SetValue = _d[1];
    var _e = React.useState('0'), State_Value = _e[0], State_SetValue = _e[1];
    var RenderGrid_Event_DataStateChange = function (event) {
        Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value, event.dataState, false, false, undefined));
    };
    var RenderGrid_Event_PageChange = function (event) {
        Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value, __assign(__assign({}, State.GridState), { skip: event.page.skip, take: event.page.take }), false, false, undefined));
    };
    var RenderGrid_Event_Sort = function (event) {
        Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value, __assign(__assign({}, State.GridState), { sort: event.sort }), false, false, undefined));
    };
    var GridStateInitialValue = { skip: 0, take: 20 };
    var RenderCustomColumns_Event_applyChangedColumns = function (event) {
        Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_applyChangedColumns(State.Columns));
    };
    var RenderCustomColumns_Event_activateColumn = function (columnName) {
        Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_SetActiveColumn(columnName));
    };
    var RenderCustomColumns_Event_BnRevertColumns = function () {
        Refresh(true, true, GridStateInitialValue);
    };
    var RenderGrid_GridToolBar_BnRefresh = function () {
        Refresh(false, false, GridStateInitialValue);
    };
    var Refresh = function (getColumns, revertColumns, gridState) {
        Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value, gridState, revertColumns, getColumns, undefined));
    };
    var SaveColumns = function (newColumns) {
        Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_SetColumnsArray(newColumns));
    };
    var CanExport = function () {
        if (State.Rows.length === 0) {
            Functions_1.Notify.info("", "No data to export");
            return false;
        }
        else {
            return true;
        }
    };
    var ObjExcelExport = React.useRef(null);
    var lw = '6em';
    var tw = '13em';
    var ClassName1 = 'd-inline-block mr-2';
    return (React.createElement(React.Fragment, null,
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Loans Search', cardBodyClassName: 'p-1' },
            React.createElement(UserSetting_1.UserSetting_Card, { title: 'Filters', className: 'd-inline-flex mb-2', cardBodyClassName: 'p-1' },
                React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Last Name', value: LastName_Value, labelWidth: lw, textWidth: tw, maxLength: 50, onChange: function (e) { return LastName_SetValue(e.target.value); }, className: ClassName1 }),
                React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'First Name', value: FirstName_Value, labelWidth: lw, textWidth: tw, maxLength: 50, onChange: function (e) { return FirstName_SetValue(e.target.value); }, className: ClassName1 }),
                React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Address', value: Address_Value, labelWidth: lw, textWidth: tw, maxLength: 50, onChange: function (e) { return Address_SetValue(e.target.value); }, className: ClassName1 }),
                React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'City', value: City_Value, labelWidth: lw, textWidth: tw, maxLength: 50, onChange: function (e) { return City_SetValue(e.target.value); }, className: ClassName1 }),
                React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { label: 'State', value: State_Value, labelWidth: lw, textWidth: tw, dataSource: State.ArrInfState.map(function (x) {
                        return { Key: x.Abbreviation, Value: x.Name };
                    }), onChange: function (event) {
                        State_SetValue(event.target.value);
                    }, className: ClassName1 }),
                React.createElement("div", { className: ClassName1 },
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { title: 'Search', className: 'mr-2', onClick: function (event) {
                            Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value, GridStateInitialValue, false, false, undefined));
                        } }),
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { title: 'Clear', className: 'mr-2', onClick: function (event) {
                            LastName_SetValue('');
                            FirstName_SetValue('');
                            City_SetValue('');
                            Address_SetValue('');
                            State_SetValue('0');
                        } }),
                    React.createElement(UtilComponent_1.ExcelexExport_Button_001, { className: ClassName1, exportAllPages: function () {
                            if (CanExport()) {
                                Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value, { skip: 0 }, false, false, ObjExcelExport));
                            }
                        }, exportThisPage: function () {
                            if (CanExport()) {
                                Dispatch(LenLoansSearchAction_1.LenLoansSearch_Action_ExportThisPage(ObjExcelExport, State.Rows));
                            }
                        } }))),
            React.createElement(UserSetting_1.UserSetting_Card, { title: 'Results', cardBodyClassName: 'p-0' },
                React.createElement(UtilComponent_1.ExcelExport_001, { arrColumn: LenderCommon2_1.LenLoanSearch_ColumnConfiguration(), fileName: 'Len Loan Search.xlsx', objExcelExport: ObjExcelExport }),
                React.createElement(kendo_react_grid_1.Grid, __assign({ sortable: true, pageable: true, data: State.Rows, total: State.TotalRows }, State.GridState, { onSortChange: RenderGrid_Event_Sort, onPageChange: RenderGrid_Event_PageChange, onDataStateChange: RenderGrid_Event_DataStateChange }), UtilComponent_1.GridColumn_001(LenderCommon2_1.LenLoanSearch_ColumnConfiguration(), undefined))))));
};
exports.LenLoansSearch_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('LenLoanSearch'); //    '/lender/LenSoansSearch'
exports.default = LenLoansSearch;
//# sourceMappingURL=LenLoansSearch.js.map