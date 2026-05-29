"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_bootstrap_1 = require("react-bootstrap");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var ChartDonut_1 = require("../charts/ChartDonut");
var ChartMapUSA_1 = require("../charts/ChartMapUSA");
var CardLoading_1 = require("../../shared/CardLoading");
var Functions_1 = require("../../../utilities/Functions");
var LenDasLoanStatesStore = require("../../../store/stores/lenders/dashboard/LenDasLoanStatesStore");
var LoanStates = /** @class */ (function (_super) {
    __extends(LoanStates, _super);
    function LoanStates() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { sort: [] };
        _this.sortChange = function (event) {
            _this.setState({ sort: event.sort });
        };
        _this.selectAllStates = function (event) {
            event.preventDefault();
            _this.props.selectAllStates();
        };
        _this.deselectAllStates = function (event) {
            event.preventDefault();
            _this.props.deselectAllStates();
        };
        _this.refreshLoanStates = function (event) {
            event.preventDefault();
            _this.props.fetchLoanStates();
        };
        _this.expandStates = function (event) {
            event.preventDefault();
            _this.props.changeCollapse(false);
        };
        _this.collapseStates = function (event) {
            event.preventDefault();
            _this.props.changeCollapse(true);
        };
        _this.fullScreenStates = function (event) {
            event.preventDefault();
            _this.props.changeFullScreen(true);
        };
        _this.normalStates = function (event) {
            event.preventDefault();
            _this.props.changeFullScreen(false);
        };
        return _this;
    }
    LoanStates.prototype.render = function () {
        return (React.createElement("div", { className: "card card-dashboard card-states" + (this.props.fullScreen ? " card-full-screen" : "") },
            React.createElement("div", { className: "card-header" },
                React.createElement("h4", { className: "card-title m-0" },
                    "Loan Report by ",
                    React.createElement("span", { className: "text-bold" }, "State")),
                this.renderOptions()),
            React.createElement("div", { className: "card-body" + (this.props.collapse ? " d-none" : "") },
                this.props.loading ? React.createElement(CardLoading_1.default, null) : "",
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement(ChartMapUSA_1.default, { loading: this.props.loading, update: this.props.update, action: this.props.action, loansByState: this.props.loanStates, onUpdate: this.props.updateLoansByState, onClick: this.props.refreshLoanState })),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("h5", { className: "text-bold text-center" }, "Percentage of Total"),
                        React.createElement("hr", { className: "separator" }),
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-4" },
                                React.createElement("p", { className: "text-bold text-center m-0 block" }, "Total Loans"),
                                React.createElement("hr", { className: "separator" }),
                                React.createElement(ChartDonut_1.default, { displaySelected: "Count", loading: this.props.loading, refresh: this.props.refresh, onRefresh: this.props.refreshedLoanState, selectedValue: this.props.selectedLoanData.length > 0 ? this.props.selectedLoan : 0, noSelectedValue: this.props.selectedLoanData.length > 0 ? (this.props.totalLoans - this.props.selectedLoan) : 100 })),
                            React.createElement("div", { className: "col-md-4" },
                                React.createElement("p", { className: "text-bold text-center m-0 block" }, "UPB Loans"),
                                React.createElement("hr", { className: "separator" }),
                                React.createElement(ChartDonut_1.default, { displaySelected: "UPB", loading: this.props.loading, refresh: this.props.refresh, onRefresh: this.props.refreshedLoanState, selectedValue: this.props.selectedLoanData.length > 0 ? this.props.selectedUPB : 0, noSelectedValue: this.props.selectedLoanData.length > 0 ? (this.props.totalUPB - this.props.selectedUPB) : 100 })),
                            React.createElement("div", { className: "col-md-4" },
                                React.createElement("p", { className: "text-bold text-center m-0 block" }, "Total Delinquency"),
                                React.createElement("hr", { className: "separator" }),
                                React.createElement(ChartDonut_1.default, { displaySelected: "Total Del.", loading: this.props.loading, refresh: this.props.refresh, onRefresh: this.props.refreshedLoanState, selectedValue: this.props.selectedLoanData.length > 0 ? this.props.selectedLoanDelinquency : 0, noSelectedValue: this.props.selectedLoanData.length > 0 ? (this.props.totalLoansDelinquency - this.props.selectedLoanDelinquency) : 100 }))),
                        React.createElement("h5", { className: "text-bold text-center mt-2" }, "List of Selected States"),
                        this.renderGridDetail())))));
    };
    LoanStates.prototype.renderOptions = function () {
        return (React.createElement("ul", { className: "card-header-tabs border-light" },
            React.createElement("li", null,
                React.createElement("div", { className: "float-right" },
                    React.createElement(react_bootstrap_1.Dropdown, null,
                        React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdown-states", className: "btn btn-success" }, "Select / Deselect All"),
                        React.createElement(react_bootstrap_1.Dropdown.Menu, null,
                            React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.selectAllStates }, "Select All States"),
                            React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.deselectAllStates }, "Deselect All States"))))),
            React.createElement("li", { className: "card-actions" }, this.props.fullScreen ? (React.createElement("button", { type: "button", className: "btn btn-action btn-light", style: { marginTop: "6px" }, onClick: this.normalStates },
                React.createElement("i", { className: "fa fa-compress m-0" }))) : (React.createElement(react_bootstrap_1.Dropdown, null,
                React.createElement(react_bootstrap_1.Dropdown.Toggle, { id: "dropdown-states-options", className: "btn btn-action btn-light" },
                    React.createElement("i", { className: "fa fa-cog m-0" })),
                React.createElement(react_bootstrap_1.Dropdown.Menu, null,
                    this.props.collapse ? (React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.expandStates },
                        React.createElement("i", { className: "ti-angle-down mr-2" }),
                        " ",
                        React.createElement("span", null, "Expand"))) : (React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.collapseStates },
                        React.createElement("i", { className: "ti-angle-up mr-2" }),
                        " ",
                        React.createElement("span", null, "Collapse"))),
                    React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.refreshLoanStates },
                        React.createElement("i", { className: "icon-refresh mr-2" }),
                        " ",
                        React.createElement("span", null, "Refresh")),
                    React.createElement(react_bootstrap_1.Dropdown.Item, { className: "dropdown-item", href: "!#", onClick: this.fullScreenStates },
                        React.createElement("i", { className: "fa fa-expand mr-2" }),
                        " ",
                        React.createElement("span", null, "Fullscreen"))))))));
    };
    LoanStates.prototype.renderGridDetail = function () {
        var _this = this;
        return (React.createElement(kendo_react_grid_1.Grid, { data: this.props.selectedLoanData, sortable: {
                allowUnsort: true,
                mode: 'single'
            }, sort: this.state.sort, onSortChange: this.sortChange, resizable: true, className: "table-noscroll table-dashboard" },
            React.createElement(kendo_react_grid_1.GridColumn, { key: "stateName", field: "StateName", title: "State", width: "164px", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "font-weight-bold" },
                    "Count: ",
                    _this.props.selectedLoanData.length)); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "totalLoans", field: "TotalLoans", title: "#", format: "{0:n0}", width: "91px", className: "text-right", headerClassName: "text-right", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.decimalFormat(_this.props.selectedLoanData.length > 0 ? _this.props.selectedLoanData.map(function (x) { return x.TotalLoans; }).reduce(function (a, b) { return a + b; }) : 0))); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "upb", field: "UPB", title: "UPB", width: "141px", format: "{0:c}", className: "text-right", headerClassName: "text-right", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.currencyFormat(_this.props.selectedLoanData.length > 0 ? _this.props.selectedLoanData.map(function (x) { return x.UPB; }).reduce(function (a, b) { return a + b; }) : 0))); } }),
            React.createElement(kendo_react_grid_1.GridColumn, { key: "totalDelinquency", field: "TotalDelinquency", title: "# Delinquency", width: "91px", format: "{0:n0}", className: "text-right", headerClassName: "text-right", footerCell: function (props) { return (React.createElement("td", { colSpan: props.colSpan, style: props.style, className: "text-right font-weight-bold" }, Functions_1.Utils.decimalFormat(_this.props.selectedLoanData.length > 0 ? _this.props.selectedLoanData.map(function (x) { return x.TotalDelinquency; }).reduce(function (a, b) { return a + b; }) : 0))); } })));
    };
    return LoanStates;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.lenDasLoanStates; }, LenDasLoanStatesStore.actions)(LoanStates);
//# sourceMappingURL=LenDasLoanStates.js.map