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
var Functions_1 = require("../../utilities/Functions");
var CustomColumns = /** @class */ (function (_super) {
    __extends(CustomColumns, _super);
    function CustomColumns() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            activeColumn: '',
            dropdownColumns: false
        };
        _this.toggleColumns = function () {
            _this.setState({ dropdownColumns: !_this.state.dropdownColumns });
        };
        _this.setActiveColumn = function (activeColumn) {
            _this.setState({ activeColumn: activeColumn });
        };
        _this.checkColumn = function (event, nameColumn) {
            var checked = event.target.checked;
            var stateColumns = _this.props.columns;
            var columns = stateColumns.map(function (column) {
                if (column.ColumnName === nameColumn)
                    column.Checked = checked;
                return column;
            }).sort(Functions_1.Utils.compareColumn);
            _this.props.changed(columns);
        };
        _this.toggleAllColumns = function (checked) {
            var stateColumns = _this.props.columns;
            var columns = stateColumns.map(function (column) {
                column.Checked = checked;
                return column;
            }).sort(Functions_1.Utils.compareColumn);
            _this.props.changed(columns);
        };
        _this.moveColumn = function (move) {
            var activeColumn = _this.state.activeColumn;
            var stateColumns = _this.props.columns;
            if (activeColumn === '' || (move !== 1 && move !== -1))
                return;
            var oldPosition = stateColumns.filter(function (column) { return column.ColumnName === activeColumn; })[0].Position;
            var newPosition = oldPosition + move;
            if (newPosition < 1 || newPosition > stateColumns.length)
                return;
            var otherColumn = stateColumns.filter(function (column) { return column.Position === newPosition; })[0].ColumnName;
            var columns = stateColumns.map(function (column) {
                if (column.ColumnName === activeColumn)
                    column.Position = newPosition;
                if (column.ColumnName === otherColumn)
                    column.Position = oldPosition;
                return column;
            }).sort(Functions_1.Utils.compareColumn);
            _this.props.changed(columns);
        };
        _this.revertColumns = function () {
            _this.toggleColumns();
            _this.props.changed(JSON.parse(JSON.stringify(_this.props.realColumns)));
        };
        _this.applyChangeColumns = function () {
            _this.props.applyChanged();
        };
        return _this;
    }
    CustomColumns.prototype.componentDidUpdate = function () {
        if (this.state.activeColumn == '')
            this.setState({ activeColumn: Functions_1.Utils.getActiveColumn(this.props.columns) });
    };
    CustomColumns.prototype.render = function () {
        var _this = this;
        return (React.createElement(reactstrap_1.Dropdown, { isOpen: this.state.dropdownColumns, toggle: this.toggleColumns },
            React.createElement(reactstrap_1.DropdownToggle, { caret: true, className: "btn btn-primary waves-effect waves-dark" },
                React.createElement("i", { className: "fa fa-columns" }),
                React.createElement("span", { className: "d-none d-md-inline" }, " Colums")),
            React.createElement(reactstrap_1.DropdownMenu, null,
                React.createElement("div", { className: "mega-dropdown-menu row" },
                    React.createElement("div", { className: "col-md-7" },
                        React.createElement("ul", { className: "list-group" }, this.props.columns.map(function (column) { return (React.createElement("li", { key: column.ColumnName, className: "list-group-item" + (_this.state.activeColumn === column.ColumnName ? " active" : ""), onClick: function () { return _this.setActiveColumn(column.ColumnName); } },
                            React.createElement("div", { className: "form-check m-0" },
                                React.createElement("input", { className: "form-check-input", type: "checkbox", checked: column.Checked, onChange: function (event) { return _this.checkColumn(event, column.ColumnName); } }),
                                React.createElement("label", { className: "form-check-label" }, column.Title)))); }))),
                    React.createElement("div", { className: "col-md-5 mt-2" },
                        React.createElement("div", { className: "row" },
                            React.createElement("div", { className: "col-md-12" },
                                React.createElement("button", { type: "button", className: "btn btn-light btn-block", onClick: this.applyChangeColumns },
                                    React.createElement("i", { className: "ti ti-save" }),
                                    " Apply")),
                            React.createElement("div", { className: "col-md-12" },
                                React.createElement("button", { type: "button", className: "btn btn-secondary btn-block mt-1", onClick: this.revertColumns },
                                    React.createElement("i", { className: "fa fa-undo" }),
                                    " Cancel")),
                            React.createElement("div", { className: "col-md-6" },
                                React.createElement("button", { type: "button", className: "btn btn-info btn-block mt-1", onClick: function () { return _this.moveColumn(-1); } },
                                    React.createElement("i", { className: "fa fa-arrow-up m-0" }))),
                            React.createElement("div", { className: "col-md-6" },
                                React.createElement("button", { type: "button", className: "btn btn-info btn-block mt-1", onClick: function () { return _this.moveColumn(1); } },
                                    React.createElement("i", { className: "fa fa-arrow-down m-0" }))),
                            React.createElement("div", { className: "col-md-12" },
                                React.createElement("button", { type: "button", className: "btn btn-secondary btn-block mt-1", onClick: function () { return _this.toggleAllColumns(true); } },
                                    React.createElement("i", { className: "ti ti-check-box" }),
                                    " Check All")),
                            React.createElement("div", { className: "col-md-12" },
                                React.createElement("button", { type: "button", className: "btn btn-secondary btn-block mt-1", onClick: function () { return _this.toggleAllColumns(false); } },
                                    React.createElement("i", { className: "ti ti-control-stop" }),
                                    " Uncheck All"))))))));
    };
    return CustomColumns;
}(React.PureComponent));
exports.default = CustomColumns;
//# sourceMappingURL=CustomColumns.js.map