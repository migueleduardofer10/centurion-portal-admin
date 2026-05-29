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
var PaymentModal_1 = require("./PaymentModal");
var TabsInvoices_1 = require("./TabsInvoices");
var BreadCrumb_1 = require("../shared/BreadCrumb");
var CustomGrid_1 = require("../shared/CustomGrid");
var CustomExcelExport_1 = require("../shared/CustomExcelExport");
var Enums_1 = require("../../utilities/Enums");
var AppCommon = require("../../store/commons/AppCommon");
var PendingInvoicesStore = require("../../store/stores/invoices/PendingInvoicesStore");
var PendingInvoices = /** @class */ (function (_super) {
    __extends(PendingInvoices, _super);
    function PendingInvoices() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectOption = function (option) {
            switch (option) {
                case "Export Details":
                    _this.props.fetchDetailsByInvoice();
                    break;
                default:
            }
        };
        return _this;
    }
    PendingInvoices.prototype.componentDidMount = function () {
        this.props.fetchInvoices(this.props.gridProps, true, false);
    };
    PendingInvoices.prototype.componentDidUpdate = function () {
        if (this.props.appliedPayment === true)
            this.props.fetchInvoices(this.props.gridProps, false, true);
    };
    PendingInvoices.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadCrumb_1.default, { title: "Invoices" }),
            React.createElement("div", { className: "card-group" },
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-header p-0" },
                        React.createElement(TabsInvoices_1.default, { option: 1 })),
                    React.createElement("div", { className: "card-body" },
                        React.createElement("ul", { className: "list-inline ml-2 mb-2" },
                            React.createElement("li", { className: "list-inline-item ml-0 mr-3" },
                                React.createElement("select", { className: "form-control form-control-sm", value: this.props.lenderUid, onChange: function (event) { return _this.props.fetchInvoices(_this.props.gridProps, false, true, event.target.value, _this.props.onlyPositive); } },
                                    React.createElement("option", { value: "all" }, "-All Lenders-"),
                                    this.props.lenders.map(function (lender, index) {
                                        return React.createElement("option", { key: index, value: lender.ParentUid }, lender.Account + ": " + lender.FullName);
                                    }))),
                            React.createElement("li", { className: "list-inline-item ml-0 mr-3" },
                                React.createElement("div", { className: "form-check" },
                                    React.createElement("input", { type: "checkbox", id: "checkboxOnlyPositive", className: "form-check-input", checked: this.props.onlyPositive, onChange: function (event) { return _this.props.fetchInvoices(_this.props.gridProps, false, true, _this.props.lenderUid, event.target.checked); } }),
                                    React.createElement("label", { className: "form-check-label ml-3", htmlFor: "checkboxOnlyPositive" }, "Only Positive"))),
                            React.createElement("li", { className: "list-inline-item ml-0" },
                                React.createElement(PaymentModal_1.default, { states: this.props.states, model: this.props.vCheckModel, terms: this.props.paymentTerms, open: this.props.openVCheck, payBy: Enums_1.PaymentTypeEnum.VCHECK, fetch: this.props.fetchVCheckModel, toggle: this.props.toggleVCheckModal, change: this.props.changeVCheckModel, apply: this.props.applyPaymentByVCheck })),
                            React.createElement("li", { className: "list-inline-item ml-0" },
                                React.createElement(PaymentModal_1.default, { model: this.props.payPalModel, terms: this.props.paymentTerms, open: this.props.openPayPal, payBy: Enums_1.PaymentTypeEnum.PAYPAL, fetch: this.props.fetchPayPalModel, toggle: this.props.togglePayPalModal, change: this.props.changePayPalModel, apply: this.props.applyPaymentByPayPal })),
                            React.createElement("li", { className: "list-inline-item ml-0" },
                                React.createElement(PaymentModal_1.default, { states: this.props.states, model: this.props.creditCardModel, terms: this.props.paymentTerms, open: this.props.openCreditCard, payBy: Enums_1.PaymentTypeEnum.CREDIT_CARD, fetch: this.props.fetchCreditCardModel, toggle: this.props.toggleCreditCardModal, change: this.props.changeCreditCardModel, apply: this.props.applyPaymentByCreditCard }))),
                        React.createElement("span", { className: "grid-info" }, "* right click on Invoice and select an option."),
                        React.createElement(CustomExcelExport_1.default, { fileName: "Invoice_Details", data: this.props.invoiceDetails, columns: this.props.columnsDetails, exportExcel: this.props.exportExcelDetails, enableExportExcel: this.props.enableExportExcelDetails }),
                        React.createElement(CustomGrid_1.default, { data: this.props.invoices, dataAll: this.props.invoicesAll, columns: this.props.columns, realColumns: this.props.realColumns, dataState: this.props.gridProps, fileName: "Pending_Invoices", exportExcel: this.props.exportExcel, currentPage: this.props.currentPage, withDetails: true, withContextMenu: true, menuOptions: ["Export Details"], forceUpdate: this.props.forceUpdate, selectedRow: AppCommon.SelectRowTypeEnum.MULTIPLE, fetchData: this.props.fetchInvoices, fetchDataAll: this.props.fetchInvoicesAll, fetchDataDetails: this.props.fetchInvoiceDetails, disableForceUpdate: this.props.disableForceUpdate, enableExportExcel: this.props.enableExportExcel, changedColumns: this.props.changedColumns, applyChangedColumns: this.props.applyChangedColumns, updateData: this.props.updateInvoices, selectItem: this.props.selectInvoice, selectOption: this.selectOption }))))));
    };
    return PendingInvoices;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.pendingInvoices; }, PendingInvoicesStore.actions)(PendingInvoices);
//# sourceMappingURL=PendingInvoices.js.map