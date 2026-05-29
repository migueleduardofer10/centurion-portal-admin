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
var kendo_react_popup_1 = require("@progress/kendo-react-popup");
var kendo_react_layout_1 = require("@progress/kendo-react-layout");
var CustomContextMenu = /** @class */ (function (_super) {
    __extends(CustomContextMenu, _super);
    function CustomContextMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPopupOpen = function () {
            _this.menuWrapperRef.querySelector('[tabindex]').focus();
        };
        _this.onFocusHandler = function () {
            clearTimeout(_this.blurTimeoutRef);
            _this.blurTimeoutRef = undefined;
        };
        _this.onBlurTimeout = function () {
            _this.props.onClose();
            _this.blurTimeoutRef = undefined;
        };
        _this.onBlurHandler = function (event) {
            clearTimeout(_this.blurTimeoutRef);
            _this.blurTimeoutRef = setTimeout(_this.onBlurTimeout);
        };
        return _this;
    }
    CustomContextMenu.prototype.render = function () {
        var _this = this;
        return (React.createElement(kendo_react_popup_1.Popup, { offset: this.props.offset, show: this.props.isOpen, open: this.onPopupOpen, popupClass: 'popup-content' },
            React.createElement("div", { onFocus: this.onFocusHandler, onBlur: this.onBlurHandler, tabIndex: -1, ref: function (el) { return (_this.menuWrapperRef = el); } },
                React.createElement(kendo_react_layout_1.Menu, { vertical: true, style: { display: 'inline-block' }, onSelect: function (event) { return _this.props.onSelect(event); } }, this.props.options.map(function (option, index) { return React.createElement(kendo_react_layout_1.MenuItem, { key: index, text: option }); })))));
    };
    return CustomContextMenu;
}(React.PureComponent));
exports.default = CustomContextMenu;
//# sourceMappingURL=CustomContextMenu.js.map