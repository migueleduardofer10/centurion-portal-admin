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
exports.PaymentToLender_Url = void 0;
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var React = require("react");
var react_redux_1 = require("react-redux");
var UtilComponent_1 = require("../../../components/shared/UtilComponent");
var LenderCommon2_1 = require("../../../store/commons/LenderCommon2");
var Functions_1 = require("../../../utilities/Functions");
var UserSetting_1 = require("../../users/UserSetting");
var PaymentToLenderAction_1 = require("./PaymentToLenderAction");
var PaymentToLenderStore_1 = require("./PaymentToLenderStore");
var PaymentToLender = function () {
    var State = react_redux_1.useSelector(PaymentToLenderStore_1.PaymentToLender_StateObject);
    var Dispatch = react_redux_1.useDispatch();
    var _a = React.useState('0'), Account_Value = _a[0], Account_SetValue = _a[1];
    var _b = React.useState(false), OnlyPending_Value = _b[0], OnlyPending_SetValue = _b[1];
    React.useEffect(function () {
        Dispatch(PaymentToLenderAction_1.PaymentToLender_Action_Load());
    }, []);
    var Clear = function () {
        Dispatch(PaymentToLenderAction_1.PaymentToLender_Action_SetResult([], 0, {}));
    };
    var Search = function (gs, objExcelExport) {
        if (objExcelExport === void 0) { objExcelExport = undefined; }
        Dispatch(PaymentToLenderAction_1.PaymentToLender_Action_Search(gs, Account_Value, OnlyPending_Value, objExcelExport));
    };
    var ObjExcelExport = React.useRef(null);
    var ClassName = 'mr-1 d-inline-flex';
    var RenderGrid_Event_PageChange = function (event) {
        Search(__assign(__assign({}, State.GridState), { skip: event.page.skip, take: event.page.take }));
    };
    var RenderGrid_Event_Sort = function (event) {
        Search(__assign(__assign({}, State.GridState), { sort: event.sort }));
    };
    var RenderGrid_Event_DataStateChange = function (event) {
        Search(event.dataState);
    };
    var Excel_ExportThisPage = function () {
        if (CanExport()) {
            Dispatch(PaymentToLenderAction_1.PaymentToLender_Action_ExportThisPage(ObjExcelExport, State.Rows));
        }
    };
    var Excel_ExportAllPages = function () {
        if (CanExport()) {
            Search(State.GridState, ObjExcelExport);
        }
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
    return (React.createElement(UserSetting_1.UserSetting_Card, { title: 'Payment to Lender', cardBodyClassName: 'p-1 ' },
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Filters', cardBodyClassName: 'p-1  align-items-center', className: 'mb-1' },
            React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { label: 'Accounts', value: Account_Value, labelWidth: '100px', textWidth: '300px', dataSource: State.ArrIELSServiceMap, onChange: function (event) {
                    Clear();
                    Account_SetValue(event.currentTarget.value);
                }, className: ClassName }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Only Pending', value: OnlyPending_Value, className: ClassName, id: 'OnlyPending', onChange: function (event) {
                    Clear();
                    OnlyPending_SetValue(event.target.checked);
                } }),
            React.createElement("div", { className: ClassName },
                React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { title: 'Search', className: ClassName, onClick: function (event) {
                        Clear();
                        Search(State.GridState);
                    } }),
                React.createElement(UtilComponent_1.ExcelexExport_Button_001, { className: ClassName, exportAllPages: Excel_ExportAllPages, exportThisPage: Excel_ExportThisPage }))),
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Results', cardBodyClassName: 'p-0' },
            React.createElement(UtilComponent_1.ExcelExport_001, { totalSum: State.TotalSum, arrColumn: LenderCommon2_1.PaymentToLender_ColumnConfiguration(), fileName: 'Partial ownership Portfolio', objExcelExport: ObjExcelExport }),
            React.createElement(kendo_react_grid_1.Grid, __assign({ sortable: true, pageable: true, data: State.Rows, total: State.TotalRows }, State.GridState, { onSortChange: RenderGrid_Event_Sort, onPageChange: RenderGrid_Event_PageChange, onDataStateChange: RenderGrid_Event_DataStateChange }), UtilComponent_1.GridColumn_001(LenderCommon2_1.PaymentToLender_ColumnConfiguration(), State.TotalSum)))));
};
exports.PaymentToLender_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('paymentsToLender');
exports.default = PaymentToLender;
//# sourceMappingURL=PaymentToLender.js.map