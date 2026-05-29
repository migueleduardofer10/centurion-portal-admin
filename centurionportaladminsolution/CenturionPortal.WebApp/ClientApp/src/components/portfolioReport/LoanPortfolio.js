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
exports.LoanPortfolio_Url = void 0;
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var React = require("react");
var react_redux_1 = require("react-redux");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var UserSetting_1 = require("../users/UserSetting");
var LoanPortfolioAction_1 = require("./LoanPortfolioAction");
var UtilComponent_1 = require("../shared/UtilComponent");
var Functions_1 = require("../../utilities/Functions");
var LoanPortfolio = function () {
    var _a = React.useState([]), Rows_Value = _a[0], Rows_SetValue = _a[1];
    var _b = React.useState(0), TotalRows_Value = _b[0], TotalRows_SetValue = _b[1];
    var _c = React.useState({ skip: 0, take: 30 }), GridState_Value = _c[0], GridState_SetValue = _c[1];
    var _d = React.useState([]), ArrAccount_Value = _d[0], ArrAccount_SetValue = _d[1];
    var _e = React.useState([]), ArrCbLoansFilter_Value = _e[0], ArrCbLoansFilter_SetValue = _e[1];
    var _f = React.useState('0'), CbFrom_Value = _f[0], CbFrom_SetValue = _f[1];
    var _g = React.useState('0'), CbTo_Value = _g[0], CbTo_SetValue = _g[1];
    var _h = React.useState('0'), CbLenderUid_Value = _h[0], CbLenderUid_SetValue = _h[1];
    var _j = React.useState(false), ChkRange_Value = _j[0], ChkRange_SetValue = _j[1];
    var _k = React.useState(false), ChkIncludeInactives_Value = _k[0], ChkIncludeInactives_SetValue = _k[1];
    var ClassName = 'mr-2 d-inline-flex';
    var LabelWidth = '150px';
    var ControlWidth = '200px';
    var Dispatch = react_redux_1.useDispatch();
    React.useEffect(function () {
        Dispatch(LoanPortfolioAction_1.LoanPortfolio_Action_Load(function (arrCbLoansFilter, arrAccount) {
            ArrCbLoansFilter_SetValue(arrCbLoansFilter);
            ArrAccount_SetValue(arrAccount);
            if (arrAccount.length != 0) {
                CbFrom_SetValue(arrAccount[0].Key);
                CbTo_SetValue(arrAccount[0].Key);
            }
        }));
    }, []);
    var Refresh = function (gridState, objExcelExport) {
        if (objExcelExport === void 0) { objExcelExport = undefined; }
        if (!ObjExcelExport) {
            Clear();
        }
        Dispatch(LoanPortfolioAction_1.LoanPortfolio_Action_Search(objExcelExport, CbLenderUid_Value, ChkRange_Value, CbFrom_Value, String(Number(CbTo_Value) + 1), ChkIncludeInactives_Value, gridState, function (rows, totalRows) {
            var _a;
            if (!objExcelExport) {
                TotalRows_SetValue(totalRows);
                Rows_SetValue(rows);
                GridState_SetValue(gridState);
            }
            else {
                (_a = objExcelExport.current) === null || _a === void 0 ? void 0 : _a.save(rows);
                Functions_1.Notify.success("", "Export Complete");
            }
        }));
    };
    var Clear = function () {
        TotalRows_SetValue(0);
        Rows_SetValue([]);
    };
    var RenderGrid_Event_PageChange = function (event) {
        Refresh(__assign(__assign({}, GridState_Value), { skip: event.page.skip, take: event.page.take }));
    };
    var RenderGrid_Event_DataStateChange = function (event) {
        Refresh(event.dataState);
    };
    var ObjExcelExport = React.useRef(null);
    var CanExport = function () {
        if (Rows_Value.length === 0) {
            Functions_1.Notify.info("", "No data to export");
            return false;
        }
        else {
            return true;
        }
    };
    return (React.createElement(UserSetting_1.UserSetting_Card, { title: 'Loan Portfolio', cardBodyClassName: 'p-1 ' },
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Filters', cardBodyClassName: 'p-1 mb-1    ' },
            React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { labelWidth: LabelWidth, textWidth: ControlWidth, dataSource: ArrCbLoansFilter_Value, className: ClassName, label: 'Select Investor', value: CbLenderUid_Value, onChange: function (event) {
                    Clear();
                    CbLenderUid_SetValue(event.currentTarget.value);
                } }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Range', value: ChkRange_Value, className: ClassName, id: 'ID0B1D213BB20FB409A86B34C3E0A68DD8C', onChange: function (event) {
                    if (ArrAccount_Value.length != 0) {
                        ChkRange_SetValue(event.currentTarget.checked);
                    }
                } }),
            React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { labelWidth: '60px', textWidth: ControlWidth, dataSource: ArrAccount_Value, className: ClassName, disabled: !ChkRange_Value, label: 'From', value: CbFrom_Value, onChange: function (event) {
                    Clear();
                    CbFrom_SetValue(event.currentTarget.value);
                } }),
            React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { labelWidth: '50px', textWidth: ControlWidth, dataSource: ArrAccount_Value, className: ClassName, disabled: !ChkRange_Value, label: 'To', value: CbTo_Value, onChange: function (event) {
                    Clear();
                    CbTo_SetValue(event.currentTarget.value);
                } }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Include Inactives', value: ChkIncludeInactives_Value, className: ClassName, id: 'IDD712036A31424D0DBF6752D5131885FE4', onChange: function (event) {
                    ChkIncludeInactives_SetValue(event.currentTarget.checked);
                } }),
            React.createElement("div", { className: ClassName },
                React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { title: 'Search', className: ClassName, onClick: function (event) {
                        Refresh(GridState_Value, undefined);
                    } }),
                React.createElement(UtilComponent_1.ExcelexExport_Button_001, { className: ClassName, exportAllPages: function () {
                        if (CanExport()) {
                            Refresh(GridState_Value, ObjExcelExport);
                        }
                    }, exportThisPage: function () {
                        if (CanExport()) {
                            Dispatch(Functions_1.GlobalAnimation_Loading());
                            ObjExcelExport === null || ObjExcelExport === void 0 ? void 0 : ObjExcelExport.current.save(Rows_Value);
                            Dispatch(Functions_1.GlobalAnimation_Loaded());
                            Functions_1.Notify.success("", "Export Complete");
                        }
                    } }))),
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Results', cardBodyClassName: 'p-1' },
            React.createElement(UtilComponent_1.ExcelExport_001, { arrColumn: LenderCommon2_1.RPTCustomFullLoanPortfolio_ColumnConfiguration(), fileName: 'Loan Portfolio', objExcelExport: ObjExcelExport }),
            React.createElement(kendo_react_grid_1.Grid, __assign({ sortable: false, pageable: true, data: Rows_Value, total: TotalRows_Value }, GridState_Value, { onPageChange: RenderGrid_Event_PageChange, onDataStateChange: RenderGrid_Event_DataStateChange }), LenderCommon2_1.RPTCustomFullLoanPortfolio_ColumnConfiguration().map(function (obj) {
                return React.createElement(kendo_react_grid_1.GridColumn, { key: obj.ColumnName, title: obj.Title, width: '150px', className: 'text-right', field: obj.ColumnName });
            })))));
};
exports.LoanPortfolio_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('ReporLoanPortfolio');
exports.default = LoanPortfolio;
//# sourceMappingURL=LoanPortfolio.js.map