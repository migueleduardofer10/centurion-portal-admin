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
var BreadCrumb_1 = require("../shared/BreadCrumb");
var CustomGrid_1 = require("../shared/CustomGrid");
var ACHStatusReportStore = require("../../store/stores/reports/ACHStatusReportStore");
var Functions_1 = require("../../utilities/Functions");
var ACHStatusReport = /** @class */ (function (_super) {
    __extends(ACHStatusReport, _super);
    function ACHStatusReport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ACHStatusReport.prototype.componentDidMount = function () {
        this.props.fetchACHStatus(this.props.gridProps, true, false);
    };
    ACHStatusReport.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadCrumb_1.default, { title: "ACH Status Report" }),
            React.createElement("div", { className: "report" },
                React.createElement("div", { className: "report-header clearfix" },
                    React.createElement("h1", { className: "report-title" }, "ACH Status Report")),
                React.createElement("div", { className: "report-body" },
                    React.createElement(CustomGrid_1.default, { data: this.props.achstatus, dataAll: this.props.achstatusAll, columns: this.props.columns, realColumns: this.props.realColumns, dataState: this.props.gridProps, fileName: "Report_ACHStatus", exportExcel: this.props.exportExcel, currentPage: this.props.currentPage, fetchData: this.props.fetchACHStatus, fetchDataAll: this.props.fetchACHStatusAll, enableExportExcel: this.props.enableExportExcel, changedColumns: this.props.changedColumns, applyChangedColumns: this.props.applyChangedColumns })),
                React.createElement("div", { className: "report-footer" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-4" }, "Powered by Centurion"),
                        React.createElement("div", { className: "col-4 text-center" },
                            "Page ",
                            Functions_1.Utils.getCurrentPage(this.props.gridProps),
                            " of ",
                            Functions_1.Utils.getTotalPages(this.props.gridProps)),
                        React.createElement("div", { className: "col-4 text-right" }, Functions_1.Utils.getCurrentDate()))))));
    };
    return ACHStatusReport;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.achStatusReport; }, ACHStatusReportStore.actions)(ACHStatusReport);
//# sourceMappingURL=ACHStatusReport.js.map