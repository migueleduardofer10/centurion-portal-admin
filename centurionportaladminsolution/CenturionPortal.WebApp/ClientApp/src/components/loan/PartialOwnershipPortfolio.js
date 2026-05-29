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
exports.PartialOwnershipPortfolio_Url = void 0;
var kendo_react_charts_1 = require("@progress/kendo-react-charts");
var kendo_react_dialogs_1 = require("@progress/kendo-react-dialogs");
var kendo_react_excel_export_1 = require("@progress/kendo-react-excel-export");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var kendo_react_layout_1 = require("@progress/kendo-react-layout");
var React = require("react");
var react_1 = require("react");
var react_loading_1 = require("react-loading");
var react_redux_1 = require("react-redux");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var Functions_1 = require("../../utilities/Functions");
var UtilComponent_1 = require("../shared/UtilComponent");
var UserSetting_1 = require("../users/UserSetting");
var PartialOwnershipPortfolioAction_1 = require("./PartialOwnershipPortfolioAction");
var PartialOwnershipPortfolioStore_1 = require("./PartialOwnershipPortfolioStore");
//******************************************************************************************************************************************************************************************************************************************
var GridDetail_BuiltColumn_Generic = function (title, dataSource, fourGroups, width) {
    var HeaderCell = function () { return (React.createElement("span", { style: { height: '0', width: '0', display: 'none', margin: '0', padding: '0' } })); };
    var ColumnType1 = function (number) { return (React.createElement(kendo_react_grid_1.GridColumn, { headerCell: HeaderCell, field: 'Group' + number + '_Label', width: '100px' })); };
    var ColumnType2 = function (number) { return (React.createElement(kendo_react_grid_1.GridColumn, { headerCell: HeaderCell, field: 'Group' + number + '_Value', width: '100px', className: 'text-right font-weight-bold' })); };
    return (React.createElement(kendo_react_layout_1.PanelBarItem, { title: title },
        React.createElement(kendo_react_grid_1.Grid, { data: dataSource, style: { width: width } },
            ColumnType1(1),
            ColumnType2(1),
            ColumnType1(2),
            ColumnType2(2),
            ColumnType1(3),
            ColumnType2(3),
            fourGroups && ColumnType1(4),
            fourGroups && ColumnType2(4))));
};
var GridDetail_BuiltColumn_SecondaryInformation = function (groupTitle, groupNumber, agregate_sum) {
    return (React.createElement(kendo_react_grid_1.GridColumn, { title: groupTitle }, LenderCommon2_1.VCW_VendorPortfolioSecondary_ColumnConfiguration().filter(function (c) { return c.MultiColumnHeader1_Index === groupNumber; }).map(function (c) {
        return React.createElement(kendo_react_grid_1.GridColumn, { width: '100px', title: c.Title, key: c.ColumnName, field: c.ColumnName, className: c.IsNumber ? 'text-right font-weight-bold' : '', format: c.GridColumnFormat, footerCell: function (sender) { return (React.createElement("td", { style: sender.style, colSpan: sender.colSpan, className: "text-right font-weight-bold" }, c.IsAgregateSum ? Functions_1.Utils.currencyFormat(agregate_sum[sender === null || sender === void 0 ? void 0 : sender.field]) : '')); } });
    })));
};
//******************************************************************************************************************************************************************************************************************************************
var GridDetail = function (props) {
    var LoanUid = props.dataItem.LoanUid;
    var Key = "x" + LoanUid + "x";
    var State = react_redux_1.useSelector(PartialOwnershipPortfolioStore_1.PartialOwnershipPortfolio_StateObject);
    var Dispatch = react_redux_1.useDispatch();
    var _a = React.useState([]), Report1_Value = _a[0], Report1_SetValue = _a[1];
    var _b = React.useState({}), Report1_Agregate_Sum_Value = _b[0], Report1_Agregate_Sum_SetValue = _b[1];
    var _c = React.useState([]), Report2_Value = _c[0], Report2_SetValue = _c[1];
    var _d = React.useState([]), Report3_Value = _d[0], Report3_SetValue = _d[1];
    var _e = React.useState([]), Report4_Value = _e[0], Report4_SetValue = _e[1];
    var _f = React.useState(true), Loading_Value = _f[0], Loading_SetValue = _f[1];
    React.useEffect(function () {
        var cache = State.GridDetailDictionary[Key];
        if (cache) {
            Report1_Agregate_Sum_SetValue(cache.Report1_Agregate_Sum_Value);
            Report1_SetValue(cache.Report1_Value);
            Report2_SetValue(cache.Report2_Value);
            Report3_SetValue(cache.Report3_Value);
            Report4_SetValue(cache.Report4_Value);
            Loading_SetValue(false);
        }
        else {
            Dispatch(PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Action_Details(LoanUid, function (report1_agregate_sum, report1, report2, report3, report4) {
                Report1_Agregate_Sum_SetValue(report1_agregate_sum);
                Report1_SetValue(report1);
                Report2_SetValue(report2);
                Report3_SetValue(report3);
                Report4_SetValue(report4);
                State.GridDetailDictionary[Key] = {
                    Report1_Agregate_Sum_Value: report1_agregate_sum, Report1_Value: report1, Report2_Value: report2, Report3_Value: report3, Report4_Value: report4, Graph_Value: []
                };
                Dispatch(PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Action_SetDetailDictionary(State.GridDetailDictionary));
                Loading_SetValue(false);
            }));
        }
    }, []);
    return (React.createElement("section", null, Loading_Value ?
        React.createElement("div", { className: 'd-inline-flex align-items-center' },
            React.createElement(react_loading_1.default, { type: 'bars', color: '#CC3717', height: '70%', width: '100px', className: 'mr-2' }),
            React.createElement("h6", { style: { color: '#CC3717' } }, "Loading Sub Report"))
        :
            React.createElement(kendo_react_layout_1.PanelBar, { style: { width: '100%' } },
                React.createElement(kendo_react_layout_1.PanelBarItem, { title: 'Secondary Information' },
                    React.createElement(kendo_react_grid_1.Grid, { data: Report1_Value, style: { width: '1150px' } },
                        GridDetail_BuiltColumn_SecondaryInformation('Primary', 1, Report1_Agregate_Sum_Value),
                        GridDetail_BuiltColumn_SecondaryInformation('Secondary', 2, Report1_Agregate_Sum_Value))),
                GridDetail_BuiltColumn_Generic('Original Loan Amount', Report2_Value, false, '650px'),
                GridDetail_BuiltColumn_Generic('Date Information', Report3_Value, false, '650px'),
                GridDetail_BuiltColumn_Generic('Borrower Information', Report4_Value, true, '850px'))));
};
var PartialOwnershipPortfolio = function (props) {
    var State = react_redux_1.useSelector(PartialOwnershipPortfolioStore_1.PartialOwnershipPortfolio_StateObject);
    var Dispatch = react_redux_1.useDispatch();
    React.useEffect(function () {
        Dispatch(PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Action_FillCombos());
        return function () {
        };
    }, []);
    var Refresh = function (gridState) {
        ClearGrid();
        Dispatch(PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Action_Search(State_Value, Number(Status_Value), Number(Balance_Value), gridState, undefined));
    };
    var ClearGrid = function () {
        Dispatch(PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Action_SetRows([], {}, PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue, 0, {}));
    };
    var RenderGrid_Event_PageChange = function (event) {
        Refresh(__assign(__assign({}, State.GridState), { skip: event.page.skip, take: event.page.take }));
    };
    var RenderGrid_Event_Sort = function (event) {
        Refresh(__assign(__assign({}, State.GridState), { sort: event.sort }));
    };
    var RenderGrid_Event_DataStateChange = function (event) {
        Refresh(event.dataState);
    };
    var CreateSubColumns = function (groupNumber) {
        return State.Columns.filter(function (column) { return column.MultiColumnHeader1_Index === groupNumber; }).map(function (column) { return (React.createElement(kendo_react_grid_1.GridColumn, { title: column.Title, key: column.ColumnName, field: column.ColumnName, filter: column.GridColumnFilter, width: '150px', format: column.GridColumnFormat, className: column.IsNumber ? 'text-right' : '', columnMenu: function (props) {
                return React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
            }, footerCell: function (sender) { return (React.createElement("td", { style: sender.style, colSpan: sender.colSpan, className: "text-right font-weight-bold" }, column.IsAgregateSum ? Functions_1.Utils.currencyFormat(State.TotalSum[sender === null || sender === void 0 ? void 0 : sender.field]) : '')); } })); });
    };
    var LabelWidth = '6em';
    var ControlWidth = '15em';
    var ClassName = 'mr-1 d-inline-flex';
    var _a = React.useState('0'), Balance_Value = _a[0], Balance_SetValue = _a[1];
    var _b = React.useState('0'), State_Value = _b[0], State_SetValue = _b[1];
    var _c = React.useState('-2'), Status_Value = _c[0], Status_SetValue = _c[1];
    var _d = React.useState(), updateState = _d[1];
    var forceUpdate = React.useCallback(function () { return updateState({}); }, []);
    var Grid_onExpandChange = function (event) {
        event.dataItem.expanded = !event.dataItem.expanded;
        forceUpdate();
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
    var Excel_ExportThisPage = function () {
        if (CanExport()) {
            Dispatch(PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Action_ExportThisPage(ObjExcelExport, State.Rows));
        }
    };
    var Excel_ExportAllPages = function () {
        if (CanExport()) {
            Dispatch(PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Action_Search(State_Value, Number(Status_Value), Number(Balance_Value), State.GridState, ObjExcelExport));
        }
    };
    var ObjExcelExport = react_1.useRef(null);
    var ObjGrid = react_1.useRef(null);
    return (React.createElement(UserSetting_1.UserSetting_Card, { title: 'Partial Ownership Portfolio', cardBodyClassName: 'p-1' },
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Filters', cardBodyClassName: 'align-items-center' },
            React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { label: 'Balance', value: Balance_Value, labelWidth: LabelWidth, textWidth: ControlWidth, dataSource: State.ArrBalance, onChange: function (event) {
                    Balance_SetValue(event.target.value);
                    ClearGrid();
                }, className: ClassName }),
            React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { label: 'Status', value: Status_Value, labelWidth: LabelWidth, textWidth: ControlWidth, dataSource: State.ArrStatus, onChange: function (event) {
                    Status_SetValue(event.target.value);
                    ClearGrid();
                }, className: ClassName }),
            React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { label: 'State', value: State_Value, labelWidth: LabelWidth, textWidth: ControlWidth, dataSource: State.ArrState, onChange: function (event) {
                    State_SetValue(event.target.value);
                    ClearGrid();
                }, className: ClassName }),
            React.createElement("div", { className: ClassName },
                React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { title: 'Search', className: ClassName, onClick: function (event) {
                        ClearGrid();
                        Refresh(PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue);
                    } }),
                React.createElement(UtilComponent_1.ExcelexExport_Button_001, { className: ClassName, exportAllPages: Excel_ExportAllPages, exportThisPage: Excel_ExportThisPage }))),
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Results', cardBodyClassName: 'p-0 m-0  ', className: 'mt-1' },
            React.createElement(kendo_react_excel_export_1.ExcelExport, { fileName: 'Partial Ownership Portfolio', ref: ObjExcelExport },
                React.createElement(kendo_react_grid_1.Grid, __assign({ ref: ObjGrid, sortable: true, pageable: true, data: State.Rows, total: State.TotalRows }, State.GridState, { onSortChange: RenderGrid_Event_Sort, onPageChange: RenderGrid_Event_PageChange, onDataStateChange: RenderGrid_Event_DataStateChange, expandField: "expanded", onExpandChange: function (event) { return Grid_onExpandChange(event); }, detail: GridDetail }),
                    React.createElement(kendo_react_grid_1.GridColumn, { key: 'graph' },
                        React.createElement(kendo_react_grid_1.GridColumn, { width: '40px', cell: GridColumn_ButtonCell })),
                    React.createElement(kendo_react_grid_1.GridColumn, { title: 'Loan Information', key: 'loan_information' }, CreateSubColumns(1)),
                    React.createElement(kendo_react_grid_1.GridColumn, { title: 'Primary Investor', key: 'primary_investor' }, CreateSubColumns(2)),
                    React.createElement(kendo_react_grid_1.GridColumn, { title: 'Secondary Investor', key: 'secondary_investor' }, CreateSubColumns(3)))))));
};
//******************************************************************************************************************************************************************************************************************************************
var GridColumn_ButtonCell = function (props) {
    var _a = react_1.useState(false), Modal_Visible = _a[0], Modal_SetVisible = _a[1];
    var _b = react_1.useState(true), Loading_Visible = _b[0], Loading_SetVisible = _b[1];
    var _c = react_1.useState([]), areaData_Value = _c[0], areaData_SetValue = _c[1];
    var _d = react_1.useState([]), categories_Value = _d[0], categories_SetValue = _d[1];
    var LoanUid = props.dataItem['LoanUid'];
    var Key = "g" + LoanUid + "g";
    var Dispatch = react_redux_1.useDispatch();
    var State = react_redux_1.useSelector(PartialOwnershipPortfolioStore_1.PartialOwnershipPortfolio_StateObject);
    var BuiltGraph = function (arr) {
        var balanceFull = arr.map(function (x) { return x.BalanceFull; });
        var partialBalance = arr.map(function (x) { return x.PartialBalance; });
        var areaData = [
            { name: 'Full', data: balanceFull, color: '#e5cc7f', },
            { name: 'Partial', data: partialBalance, color: '#CC99B2', }
        ];
        var categories = arr.map(function (x) { return LenderCommon2_1.Utilities_Convert_StringToStringDateFormat(x.DateDue); });
        areaData_SetValue(areaData);
        categories_SetValue(categories);
        Loading_SetVisible(false);
    };
    var ButtonClick = function () {
        Modal_SetVisible(true);
        var cache = State.GridDetailDictionary[Key];
        if (cache) {
            BuiltGraph(cache.Graph_Value);
        }
        else {
            Loading_SetVisible(true);
            Dispatch(PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Action_Graph(LoanUid, function (arr) {
                BuiltGraph(arr);
                State.GridDetailDictionary[Key] = { Graph_Value: arr, Report1_Agregate_Sum_Value: {}, Report1_Value: [], Report2_Value: [], Report3_Value: [], Report4_Value: [] };
                Dispatch(PartialOwnershipPortfolioAction_1.PartialOwnershipPortfolio_Action_SetDetailDictionary(State.GridDetailDictionary));
            }));
        }
    };
    return (React.createElement("td", null,
        React.createElement("button", { onClick: function () { return ButtonClick(); }, className: 'btn btn-primary p-1 m-0' },
            React.createElement("i", { className: "fa fa-bar-chart", "aria-hidden": "true" })),
        Modal_Visible &&
            (React.createElement(kendo_react_dialogs_1.Dialog, { onClose: function () { Modal_SetVisible(false); }, title: 'Loan Account: ' + props.dataItem['Account'] },
                React.createElement("div", { style: { width: '70vw', height: '70vh' }, className: 'd-flex align-items-center justify-content-center flex-row' }, Loading_Visible
                    ?
                        (React.createElement("div", null,
                            React.createElement(react_loading_1.default, { type: "spinningBubbles", color: '#CC3717', height: '100px', width: '100px', className: 'mr2' }),
                            React.createElement("br", null),
                            React.createElement("h6", { style: { color: '#CC3717' } }, "Loading Graph")))
                    :
                        (React.createElement(kendo_react_charts_1.Chart, { style: { height: '100%', width: '100%', background: '#ffffff' } },
                            React.createElement(kendo_react_charts_1.ChartTitle, { text: "Entire Note vs Partial Price" }),
                            React.createElement(kendo_react_charts_1.ChartLegend, { position: "bottom", orientation: "horizontal" }),
                            React.createElement(kendo_react_charts_1.ChartTooltip, { shared: true }),
                            React.createElement(kendo_react_charts_1.ChartValueAxis, null,
                                React.createElement(kendo_react_charts_1.ChartValueAxisItem, { title: { text: 'Loan Amount' } })),
                            React.createElement(kendo_react_charts_1.ChartCategoryAxis, null,
                                React.createElement(kendo_react_charts_1.ChartCategoryAxisItem, { name: 'Loan Amount', categories: categories_Value, labels: { rotation: -45, font: '9px helvetica' } })),
                            React.createElement(kendo_react_charts_1.ChartSeries, null, areaData_Value.map(function (item, idx) { return (React.createElement(kendo_react_charts_1.ChartSeriesItem, { key: idx, type: "area", tooltip: { visible: true }, data: item.data, name: item.name, color: item.color })); })))))))));
};
exports.PartialOwnershipPortfolio_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath("PartialOwnershipPortfolio");
exports.default = PartialOwnershipPortfolio;
//# sourceMappingURL=PartialOwnershipPortfolio.js.map