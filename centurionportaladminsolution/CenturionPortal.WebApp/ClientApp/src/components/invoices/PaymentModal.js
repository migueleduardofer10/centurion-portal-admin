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
var reactstrap_1 = require("reactstrap");
var CustomInputMask_1 = require("../shared/CustomInputMask");
var Functions_1 = require("../../utilities/Functions");
var Enums = require("../../utilities/Enums");
var PaymentModal = /** @class */ (function (_super) {
    __extends(PaymentModal, _super);
    function PaymentModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tmpCCNumber: 'xxxx-xxxx-xxxx-xxxx',
            maskCCNumber: '9999-9999-9999-9999',
            placeholderCCNumber: '____-____-____-____',
            isInfoModalOpen: false,
            isTermsModalOpen: false
        };
        _this.toggleInfoModal = function () {
            _this.props.toggle();
            _this.setState({ isInfoModalOpen: !_this.state.isInfoModalOpen });
        };
        _this.toggleTermsModal = function (event) {
            event.preventDefault();
            _this.setState({ isTermsModalOpen: !_this.state.isTermsModalOpen });
        };
        _this.changeModel = function (event) {
            var name = event.target.name;
            var value = name === 'AcceptTerms' ? event.target.checked : event.target.value;
            if (name !== 'AcceptTerms')
                event.preventDefault();
            if (_this.props.payBy == Enums.PaymentTypeEnum.VCHECK)
                _this.changeVCheckModel(name, value);
            else if (_this.props.payBy == Enums.PaymentTypeEnum.PAYPAL)
                _this.props.change(name, value);
            else if (_this.props.payBy == Enums.PaymentTypeEnum.CREDIT_CARD)
                _this.changeCreditCardModel(name, value);
        };
        _this.changeVCheckModel = function (name, value) {
            var props = ['RoutingNumber', 'RoutingConfirm', 'AccountNumber', 'AccountConfirm', 'CheckNumber'];
            if (name === 'AcceptTerms')
                _this.props.change(name, value);
            else if (props.indexOf(name) >= 0)
                _this.props.change(name, Functions_1.Utils.validateNumber(value));
        };
        _this.changeCreditCardModel = function (name, value) {
            if (name === 'Type') {
                value = Number(value);
                if (value === Enums.TypeCreditCardEnum.VISA || value === Enums.TypeCreditCardEnum.MASTER)
                    _this.setState({ tmpCCNumber: 'xxxx-xxxx-xxxx-xxxx', maskCCNumber: '9999-9999-9999-9999', placeholderCCNumber: '____-____-____-____' });
                else if (value === Enums.TypeCreditCardEnum.AMERICAN_EXPRESS)
                    _this.setState({ tmpCCNumber: 'xxxx-xxxxxx-xxxxx', maskCCNumber: '9999-999999-99999', placeholderCCNumber: '____-______-_____' });
            }
            if (name === 'Expiration_String') {
                var ccExpiration = value.replace(/_/g, ' ').split('/');
                var ccExpirationMonth = ccExpiration.length >= 1 ? Number(ccExpiration[0].trim()) : 0;
                var ccExpirationYear = ccExpiration.length === 2 ? Number(ccExpiration[1].trim()) : 0;
                if (isNaN(ccExpirationMonth))
                    ccExpirationMonth = 0;
                if (isNaN(ccExpirationYear))
                    ccExpirationYear = 0;
                _this.props.change('ExpirationMonth', ccExpirationMonth);
                _this.props.change('ExpirationYear', ccExpirationYear);
            }
            if (name === 'Type')
                value = Number(value);
            else if (name === 'Number')
                value = value.replace(/_/g, ' ').trim();
            _this.props.change(name, value);
        };
        return _this;
    }
    PaymentModal.prototype.componentDidUpdate = function () {
        this.setState({ isInfoModalOpen: this.props.open });
    };
    PaymentModal.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("button", { type: "button", className: "btn btn-primary", onClick: function () { return _this.props.fetch(); } },
                React.createElement("span", { className: "d-none d-md-inline" }, this.renderLabelButton())),
            React.createElement(reactstrap_1.Modal, { isOpen: this.state.isInfoModalOpen, toggle: this.toggleInfoModal, style: { fontSize: "0.8rem" }, size: "lg", backdrop: "static" },
                React.createElement(reactstrap_1.ModalHeader, { className: "p-2 pl-3 pr-3", toggle: this.toggleInfoModal }, this.renderLabelButton()),
                React.createElement(reactstrap_1.ModalBody, null,
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-md-6" }, this.renderPaymentInfo()),
                        React.createElement("div", { className: "col-md-6" }, this.renderPaymentForm())),
                    React.createElement("div", { className: "row justify-content-md-center" }, this.renderPaymentTerms())),
                React.createElement(reactstrap_1.ModalFooter, { className: "p-1 pl-2 pr-2" },
                    React.createElement("button", { type: "button", className: "btn btn-info", onClick: this.toggleInfoModal },
                        React.createElement("i", { className: "fa fa-undo mr-1" }),
                        " Cancel"),
                    React.createElement("button", { type: "button", className: "btn btn-primary", onClick: function () { return _this.props.apply(); } },
                        React.createElement("i", { className: "fa fa-money mr-1" }),
                        " ",
                        this.renderLabelButton())))));
    };
    PaymentModal.prototype.renderLabelButton = function () {
        if (this.props.payBy == Enums.PaymentTypeEnum.VCHECK)
            return "Pay By V-Check";
        else if (this.props.payBy == Enums.PaymentTypeEnum.PAYPAL)
            return "Pay By PayPal";
        else if (this.props.payBy == Enums.PaymentTypeEnum.CREDIT_CARD)
            return "Pay By Credit Card";
    };
    PaymentModal.prototype.renderPaymentInfo = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-12" },
                    React.createElement("strong", null, "Payment Detail"))),
            React.createElement("hr", { className: "clearfix mt-1 mb-2" }),
            React.createElement("div", { className: "well" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-9 col-8" },
                        "Invoice #: ",
                        this.props.model.InvoiceNumber),
                    React.createElement("div", { className: "col-md-3 col-4 text-right" }, Functions_1.Utils.currencyFormat(this.props.model.Amount))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-9 col-8" }, "Late Charges:"),
                    React.createElement("div", { className: "col-md-3 col-4 text-right" }, Functions_1.Utils.currencyFormat(this.props.model.AddlCharges))),
                this.props.model.FCIServiceFee > 0 ? (React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-9 col-8" }, "Fee (3%)"),
                    React.createElement("div", { className: "col-md-3 col-4 text-right" }, Functions_1.Utils.currencyFormat(this.props.model.ServiceFee)))) : "",
                React.createElement("hr", { className: "clearfix mt-1 mb-2" }),
                React.createElement("div", { className: "row justify-content-end" },
                    React.createElement("div", { className: "col-md-7" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-6" },
                                React.createElement("strong", null, "Total Amount")),
                            React.createElement("div", { className: "col-md-6 text-right" },
                                React.createElement("strong", null, Functions_1.Utils.currencyFormat(this.props.model.Amount + this.props.model.AddlCharges + this.props.model.ServiceFee))))))),
            React.createElement("div", null,
                React.createElement("div", null,
                    React.createElement("input", { type: "hidden", name: "Uid", value: this.props.model.Uid, onChange: function (event) { return _this.changeModel(event); } })),
                this.props.payBy == Enums.PaymentTypeEnum.PAYPAL ? "" : (React.createElement("div", { className: "form-group mb-4" },
                    React.createElement("label", { htmlFor: "Notes", className: "form-label-sm" }, "Payment Notes"),
                    React.createElement("textarea", { className: "form-control form-control-sm", id: "Notes", name: "Notes", value: this.props.model.Notes, onChange: function (event) { return _this.changeModel(event); } }))),
                this.props.payBy != Enums.PaymentTypeEnum.VCHECK ? "" : (React.createElement("div", { className: "form-group mb-4" },
                    React.createElement("p", { className: "text-justify", style: { fontSize: "inherit" } }, "Payments may not show up in your account until the next business day, but will be applied and credited back to the day received based on Pacific Standard Time."))))));
    };
    PaymentModal.prototype.renderPaymentForm = function () {
        if (this.props.payBy == Enums.PaymentTypeEnum.VCHECK)
            return this.renderVCheckForm();
        else if (this.props.payBy == Enums.PaymentTypeEnum.PAYPAL)
            return this.renderPayPalForm();
        else if (this.props.payBy == Enums.PaymentTypeEnum.CREDIT_CARD)
            return this.renderCreditCardForm();
    };
    PaymentModal.prototype.renderVCheckForm = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-12" },
                    React.createElement("strong", null, "Bank Account & Contact Information"))),
            React.createElement("hr", { className: "clearfix mt-1 mb-2" }),
            React.createElement("div", { className: "well" },
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "PayerName", className: "col-md-6 form-label-sm px-3 py-2" }, "Account Holder"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "PayerName", name: "PayerName", value: this.props.model.PayerName, onChange: function (event) { return _this.changeModel(event); } }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "RoutingNumber", className: "col-md-6 form-label-sm px-3 py-2" }, "Routing Number (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "RoutingNumber", name: "RoutingNumber", maxLength: 9, value: this.props.model.RoutingNumber, onChange: function (event) { return _this.changeModel(event); }, required: true }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "RoutingConfirm", className: "col-md-6 form-label-sm px-3 py-2" }, "Confirm Routing Number (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "RoutingConfirm", name: "RoutingConfirm", maxLength: 9, value: this.props.model.RoutingConfirm, onChange: function (event) { return _this.changeModel(event); }, required: true }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "AccountNumber", className: "col-md-6 form-label-sm px-3 py-2" }, "Account Number (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "AccountNumber", name: "AccountNumber", maxLength: 17, value: this.props.model.AccountNumber, onChange: function (event) { return _this.changeModel(event); }, required: true }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "AccountConfirm", className: "col-md-6 form-label-sm px-3 py-2" }, "Confirm Account Number (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "AccountConfirm", name: "AccountConfirm", maxLength: 17, value: this.props.model.AccountConfirm, onChange: function (event) { return _this.changeModel(event); }, required: true }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "CheckNumber", className: "col-md-6 form-label-sm px-3 py-2" }, "Check Number (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "CheckNumber", name: "CheckNumber", value: this.props.model.CheckNumber, onChange: function (event) { return _this.changeModel(event); }, required: true }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "PayerAddress", className: "col-md-6 form-label-sm px-3 py-2" }, "Payer Address (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "PayerAddress", name: "PayerAddress", value: this.props.model.PayerAddress, onChange: function (event) { return _this.changeModel(event); }, required: true }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "PayerCity", className: "col-md-6 form-label-sm px-3 py-2" }, "Payer City (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "PayerCity", name: "PayerCity", value: this.props.model.PayerCity, onChange: function (event) { return _this.changeModel(event); }, required: true }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "PayerState", className: "col-md-6 form-label-sm px-3 py-2" }, "Payer State (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("select", { className: "form-control form-control-sm", id: "PayerState", name: "PayerState", value: this.props.model.PayerState, onChange: function (event) { return _this.changeModel(event); } },
                            React.createElement("option", { value: "" }, "- Select State -"),
                            this.props.states ? this.props.states.map(function (state) { return React.createElement("option", { key: state.Abbreviation, value: state.Abbreviation }, state.Name); }) : ""))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "PayerZip", className: "col-md-6 form-label-sm px-3 py-2" }, "Payer Zip (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "PayerZip", name: "PayerZip", value: this.props.model.PayerZip, onChange: function (event) { return _this.changeModel(event); }, required: true }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "Phone", className: "col-md-6 form-label-sm px-3 py-2" }, "Payer Phone (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "Phone", name: "Phone", value: this.props.model.Phone, onChange: function (event) { return _this.changeModel(event); }, required: true }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "Email", className: "col-md-6 form-label-sm px-3 py-2" }, "Payer Email (*)"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "Email", name: "Email", value: this.props.model.Email, onChange: function (event) { return _this.changeModel(event); }, required: true }))))));
    };
    PaymentModal.prototype.renderPayPalForm = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-12" },
                    React.createElement("strong", null, "Pay Pal Information"))),
            React.createElement("hr", { className: "clearfix mt-1 mb-2" }),
            React.createElement("div", { className: "well" },
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "Email", className: "col-md-4 form-label-sm px-3 py-2" }, "Email"),
                    React.createElement("div", { className: "col-md-8" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "Email", name: "Email", value: this.props.model.Email, onChange: function (event) { return _this.changeModel(event); } }))),
                this.props.payBy != Enums.PaymentTypeEnum.PAYPAL ? "" : (React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "Notes", className: "col-md-4 form-label-sm px-3 py-2" }, "Payment Notes"),
                    React.createElement("div", { className: "col-md-8" },
                        React.createElement("textarea", { className: "form-control form-control-sm", id: "Notes", name: "Notes", value: this.props.model.Notes, onChange: function (event) { return _this.changeModel(event); } })))))));
    };
    PaymentModal.prototype.renderCreditCardForm = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-12" },
                    React.createElement("strong", null, "Credit Card Information"))),
            React.createElement("hr", { className: "clearfix mt-1 mb-2" }),
            React.createElement("div", { className: "well" },
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "Type", className: "col-md-6 form-label-sm px-3 py-2" }, "Credit Card Type"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("select", { className: "form-control form-control-sm", id: "Type", name: "Type", value: this.props.model.Type, onChange: function (event) { return _this.changeModel(event); } },
                            React.createElement("option", { value: "-1" }, "- Select Credit Card Type -"),
                            Enums.EnumToArray(Enums.TypeCreditCardEnum).map(function (item) { return React.createElement("option", { key: item.value, value: item.value }, item.label); })))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "Number", className: "col-md-6 form-label-sm px-3 py-2" }, "Credit Card Number"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement(CustomInputMask_1.default, { className: "form-control form-control-sm", id: "Number", name: "Number", mask: this.state.maskCCNumber, placeholder: this.state.placeholderCCNumber, value: this.props.model.Number, onChange: function (event) { return _this.changeModel(event); } }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("div", { className: "col-md-12 text-center mb-2", style: { fontStyle: 'oblique' } },
                        "* Complete all digits of your credit card (",
                        React.createElement("span", null, this.state.tmpCCNumber),
                        ")")),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "Expiration_String", className: "col-md-6 form-label-sm px-3 py-2" }, "Credit Card Expiration"),
                    React.createElement("div", { className: "col-md-4" },
                        React.createElement(CustomInputMask_1.default, { className: "form-control form-control-sm", id: "Expiration_String", name: "Expiration_String", mask: "99/9999", placeholder: "MM/YYYY", value: this.props.model.Expiration_String, onChange: function (event) { return _this.changeModel(event); } }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "Cvv", className: "col-md-6 form-label-sm pl-3 pr-0 py-2" },
                        "Credit Card ID Number (CVV)",
                        React.createElement("span", { id: "CCVExample", className: "fa fa-question-circle text-info text-bold ml-1 m-0", style: { fontSize: "0.95rem" } })),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "Cvv", name: "Cvv", maxLength: 4, value: this.props.model.Cvv, onChange: function (event) { return _this.changeModel(event); } })),
                    React.createElement(reactstrap_1.UncontrolledPopover, { trigger: "legacy", placement: "bottom", target: "CCVExample", className: "popover-modal" },
                        React.createElement(reactstrap_1.PopoverBody, null,
                            React.createElement("img", { src: "/images/cvv_credit_card.gif", alt: "Example CVV" })))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "OnName", className: "col-md-6 form-label-sm px-3 py-2" }, "Name on Credit Card"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "OnName", name: "OnName", value: this.props.model.OnName, onChange: function (event) { return _this.changeModel(event); } }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "LastName", className: "col-md-6 form-label-sm px-3 py-2" }, "Last Name"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "LastName", name: "LastName", value: this.props.model.LastName, onChange: function (event) { return _this.changeModel(event); } }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "BillingAddress", className: "col-md-6 form-label-sm px-3 py-2" }, "Billing Address"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "BillingAddress", name: "BillingAddress", value: this.props.model.BillingAddress, onChange: function (event) { return _this.changeModel(event); } }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "City", className: "col-md-6 form-label-sm px-3 py-2" }, "City"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "City", name: "City", value: this.props.model.City, onChange: function (event) { return _this.changeModel(event); } }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "State", className: "col-md-6 form-label-sm px-3 py-2" }, "State"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("select", { className: "form-control form-control-sm", id: "State", name: "State", value: this.props.model.State, onChange: function (event) { return _this.changeModel(event); } },
                            React.createElement("option", { value: "" }, "- Select State -"),
                            this.props.states ? this.props.states.map(function (state) { return React.createElement("option", { key: state.Abbreviation, value: state.Abbreviation }, state.Name); }) : ""))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "Zip", className: "col-md-6 form-label-sm px-3 py-2" }, "Zip Code"),
                    React.createElement("div", { className: "col-md-3" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "Zip", name: "Zip", value: this.props.model.Zip, onChange: function (event) { return _this.changeModel(event); } }))),
                React.createElement("div", { className: "form-group row mb-0" },
                    React.createElement("label", { htmlFor: "Email", className: "col-md-6 form-label-sm px-3 py-2" }, "Email"),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("input", { type: "text", className: "form-control form-control-sm", id: "Email", name: "Email", value: this.props.model.Email, onChange: function (event) { return _this.changeModel(event); } }))))));
    };
    PaymentModal.prototype.renderPaymentTerms = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "form-group m-0" },
                React.createElement("div", { className: "form-check m-0" },
                    React.createElement("input", { className: "form-check-input", type: "checkbox", id: "AcceptTerms", name: "AcceptTerms", checked: this.props.model.AcceptTerms, onChange: function (event) { return _this.changeModel(event); } }),
                    React.createElement("label", { className: "form-check-label text-justify ml-4 my-0", htmlFor: "AcceptTerms" },
                        "By checking this box, you are indicating that you have read and agree to the ",
                        React.createElement("a", { href: "#", className: "link-blue", onClick: this.toggleTermsModal }, "Terms and Conditions"),
                        "."))),
            React.createElement(reactstrap_1.Modal, { isOpen: this.state.isTermsModalOpen, toggle: this.toggleTermsModal, centered: true, style: { fontSize: "0.8rem" }, backdrop: "static" },
                React.createElement(reactstrap_1.ModalHeader, { className: "p-2 pl-3 pr-3", toggle: this.toggleTermsModal }, "Payment Terms"),
                React.createElement(reactstrap_1.ModalBody, null,
                    React.createElement("div", { className: "alert alert-info text-justify p-2 m-0", dangerouslySetInnerHTML: { __html: this.props.terms } })),
                React.createElement(reactstrap_1.ModalFooter, { className: "p-1 pl-2 pr-2" },
                    React.createElement("button", { type: "button", className: "btn btn-info", onClick: this.toggleTermsModal },
                        React.createElement("i", { className: "fa fa-undo mr-1" }),
                        "Close")))));
    };
    return PaymentModal;
}(React.PureComponent));
exports.default = PaymentModal;
//# sourceMappingURL=PaymentModal.js.map