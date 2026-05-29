"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanStatusBreakdown_Url = void 0;
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var React = require("react");
var react_redux_1 = require("react-redux");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var Functions_1 = require("../../utilities/Functions");
var UserSetting_1 = require("../users/UserSetting");
var LoanStatusBreakdownAction_1 = require("./LoanStatusBreakdownAction");
var LoanStatusBreakdown = function () {
    var Dispatch = react_redux_1.useDispatch();
    React.useEffect(function () {
        Dispatch(LoanStatusBreakdownAction_1.LoanStatusBreakdown_Action_Load(function (ArrSummPort, ArrSumary, ArrOtherStatistics1, ArrOtherStatistics2, UserInfo) {
            Rows1_SetValue(ArrSummPort);
            Rows2_SetValue(ArrSumary);
            Rows3_SetValue(ArrOtherStatistics1);
            Rows4_SetValue(ArrOtherStatistics2);
            UserInfo_SetValue(UserInfo);
        }));
    }, []);
    var _a = React.useState([]), Rows1_Value = _a[0], Rows1_SetValue = _a[1];
    var _b = React.useState([]), Rows2_Value = _b[0], Rows2_SetValue = _b[1];
    var _c = React.useState([]), Rows3_Value = _c[0], Rows3_SetValue = _c[1];
    var _d = React.useState([]), Rows4_Value = _d[0], Rows4_SetValue = _d[1];
    var _e = React.useState(''), UserInfo_Value = _e[0], UserInfo_SetValue = _e[1];
    var HeaderCell = function () { return (React.createElement("span", { style: { height: '0', width: '0', display: 'none', margin: '0', padding: '0' } })); };
    var CreateColumn = function (width, title, field, key, headerCell) {
        if (headerCell === void 0) { headerCell = undefined; }
        var sumField = '';
        var sumValue = 0;
        switch (field) {
            case 'TotalLoans':
            case 'OriginalBalance':
            case 'PrincipalBalance':
                sumField = field;
                break;
        }
        if (sumField != '') {
            Rows1_Value.forEach(function (x) { return sumValue += x[sumField]; });
        }
        return (React.createElement(kendo_react_grid_1.GridColumn, { key: 'reportLoanStatusBreakdownColumnId' + key, title: '', width: width + 'px', className: title === '' ? 'text-left' : 'text-right', field: field, headerCell: headerCell, footerCell: sumField != ''
                ?
                    function (sender) {
                        return (React.createElement("td", { style: sender.style, colSpan: sender.colSpan, className: "text-right font-weight-bold" }, Functions_1.Utils.currencyFormat(sumValue) //Rows_Value.reduce((a, b) => (a[sumField] + b[sumField])))
                        ));
                    }
                :
                    undefined }));
    };
    return (React.createElement(UserSetting_1.UserSetting_Card, { title: 'Loan Status Breakdown', cardBodyClassName: 'p-1 d-flex justify-content-center flex-column align-items-center' },
        React.createElement("h4", { className: 'p-2' },
            "Loan Status Breackdown for: ",
            UserInfo_Value),
        React.createElement(kendo_react_grid_1.Grid, { sortable: true, pageable: false, data: Rows1_Value, scrollable: 'none' },
            React.createElement(kendo_react_grid_1.GridColumn, { title: 'Loan Status Breakdown', key: 'c1', headerClassName: 'text-left' },
                CreateColumn('150', '', 'Status', 'c2'),
                CreateColumn('150', 'Number of Loans', 'TotalLoans', 'c3'),
                CreateColumn('150', 'Original Loan Balance', 'OriginalBalance', 'c4'),
                CreateColumn('150', 'Current Loan Balance', 'PrincipalBalance', 'c5'))),
        React.createElement(kendo_react_grid_1.Grid, { sortable: true, pageable: false, data: Rows2_Value, scrollable: 'none' },
            React.createElement(kendo_react_grid_1.GridColumn, { title: 'Other Portfolio Statistics', key: 'g2', headerClassName: 'text-left' },
                CreateColumn('300', '', 'Title', 'c6', HeaderCell),
                CreateColumn('300', ' ', 'Value', 'c7', HeaderCell))),
        React.createElement(kendo_react_grid_1.Grid, { sortable: true, pageable: false, data: Rows3_Value, scrollable: 'none' },
            CreateColumn('300', '', 'Title', 'c6', HeaderCell),
            CreateColumn('300', ' ', 'Value', 'c7', HeaderCell)),
        React.createElement(kendo_react_grid_1.Grid, { sortable: true, pageable: false, data: Rows4_Value, scrollable: 'none' },
            CreateColumn('300', '', 'Title', 'c8', HeaderCell),
            CreateColumn('300', ' ', 'Value', 'c9', HeaderCell))));
};
exports.LoanStatusBreakdown_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('ReportLoanStatusBreakdown');
exports.default = LoanStatusBreakdown;
//# sourceMappingURL=LoanStatusBreakdown.js.map