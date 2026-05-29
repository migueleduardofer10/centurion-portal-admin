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
var React = require("react");
var reactstrap_1 = require("reactstrap");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var Enums = require("../../store/commons/AppCommon");
var CustomContextMenu_1 = require("./CustomContextMenu");
var CustomExcelExport_1 = require("./CustomExcelExport");
var CustomColumns_1 = require("./CustomColumns");
var CustomGrid = /** @class */ (function (_super) {
    __extends(CustomGrid, _super);
    function CustomGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            offset: undefined,
            openPopUp: false,
            dropdownExcel: false
        };
        _this.fetchData = function (event) {
            _this.props.fetchData(event.data, false, false);
        };
        _this.getData = function () {
            var itemsChecked = _this.props.columns.filter(function (column) { return column.Checked; }).length;
            return itemsChecked > 0 ? _this.props.data : [];
        };
        _this.getDetail = function () {
            return _this.props.withDetails ? CustomGridDetails : undefined;
        };
        _this.columnMenuFilter = function (props, enumFilter) {
            return enumFilter ?
                React.createElement(kendo_react_grid_1.GridColumnMenuCheckboxFilter, __assign({}, props, { expanded: true, data: enumFilter })) :
                React.createElement(kendo_react_grid_1.GridColumnMenuFilter, __assign({}, props, { expanded: true }));
        };
        _this.headerSelectionChange = function (event) {
            if (_this.props.selectedRow !== Enums.SelectRowTypeEnum.MULTIPLE)
                return;
            var checked = event.syntheticEvent.target.checked;
            var data = _this.props.data.map(function (item) {
                item.Selected = checked;
                return item;
            });
            if (_this.props.updateData)
                _this.props.updateData(data);
        };
        _this.rowClick = function (event) {
            var data = _this.props.data.map(function (item) {
                if (item.Uid === event.dataItem.Uid) {
                    item.Selected = !event.dataItem.Selected;
                }
                else if (_this.props.selectedRow !== Enums.SelectRowTypeEnum.MULTIPLE) {
                    item.Selected = false;
                }
                return item;
            });
            if (_this.props.updateData)
                _this.props.updateData(data);
        };
        _this.expandChange = function (event) {
            if (!_this.props.fetchDataDetails)
                return;
            event.dataItem.Expanded = !event.dataItem.Expanded;
            if (event.dataItem.Details == null || event.dataItem.Details.Length == 0)
                _this.props.fetchDataDetails(event.dataItem, _this.props.data);
            _this.forceUpdate();
        };
        _this.toggleExcel = function () {
            _this.setState({ dropdownExcel: !_this.state.dropdownExcel });
        };
        _this.exportExcel = function (event, currentPage) {
            event.preventDefault();
            if (currentPage || _this.props.dataState.total <= _this.props.dataState.take)
                _this.props.enableExportExcel(true);
            else
                _this.props.fetchDataAll();
        };
        _this.rowRender = function (trElement, dataItem) {
            var trProps = _this.props.withContextMenu ? __assign(__assign({}, trElement.props), { onContextMenu: function (event) {
                    event.preventDefault();
                    _this.contextMenuOpen(event, dataItem.dataItem);
                } }) : trElement.props;
            return React.cloneElement(trElement, __assign({}, trProps), trElement.props.children);
        };
        _this.contextMenuOpen = function (event, dataItem) {
            if (_this.props.selectItem)
                _this.props.selectItem(dataItem.Uid);
            _this.setState({ offset: { left: event.clientX, top: event.clientY } });
            _this.setState({ openPopUp: true });
        };
        _this.selectOption = function (event) {
            _this.props.selectOption(event.item.text);
            _this.closePopUp();
        };
        _this.closePopUp = function () {
            _this.setState({ openPopUp: false });
        };
        return _this;
    }
    CustomGrid.prototype.componentDidUpdate = function () {
        if (this.props.forceUpdate && this.props.disableForceUpdate) {
            this.props.disableForceUpdate();
            this.forceUpdate();
        }
    };
    CustomGrid.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            !this.props.withContextMenu ? "" :
                React.createElement(CustomContextMenu_1.default, { offset: this.state.offset, isOpen: this.state.openPopUp, options: this.props.menuOptions, onClose: this.closePopUp, onSelect: this.selectOption }),
            React.createElement(CustomExcelExport_1.default, { data: this.props.currentPage ? this.props.data : this.props.dataAll, columns: this.props.columns, exportExcel: this.props.exportExcel, fileName: this.props.fileName + ".xlsx", enableExportExcel: this.props.enableExportExcel }),
            React.createElement(kendo_react_grid_1.Grid, __assign({}, this.props.dataState, { resizable: true, data: this.getData(), detail: this.getDetail(), expandField: "Expanded", selectedField: "Selected", pageable: { buttonCount: 4, pageSizes: true }, sortable: { allowUnsort: true, mode: 'single' }, onHeaderSelectionChange: this.headerSelectionChange, onDataStateChange: this.fetchData, onExpandChange: this.expandChange, onRowClick: this.rowClick, rowRender: this.rowRender }),
                React.createElement(kendo_react_grid_1.GridToolbar, null,
                    React.createElement("ul", { className: "list-inline mb-0" },
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement("button", { type: "button", className: "btn btn-primary", onClick: function () { return _this.props.fetchData(_this.props.dataState, true, true); } },
                                React.createElement("i", { className: "ti ti-reload" }),
                                React.createElement("span", { className: "d-none d-md-inline" }, " Refresh"))),
                        React.createElement("li", { className: "list-inline-item ml-0" },
                            React.createElement(reactstrap_1.Dropdown, { isOpen: this.state.dropdownExcel, toggle: this.toggleExcel },
                                React.createElement(reactstrap_1.DropdownToggle, { caret: true, className: "btn btn-primary" },
                                    React.createElement("i", { className: "ti ti-file" }),
                                    React.createElement("span", { className: "d-none d-md-inline" }, " Export")),
                                React.createElement(reactstrap_1.DropdownMenu, null,
                                    React.createElement(reactstrap_1.DropdownItem, { onClick: function (event) { return _this.exportExcel(event, true); } },
                                        React.createElement("i", { className: "ti ti-layout-width-full mr-2" }),
                                        " This page"),
                                    React.createElement(reactstrap_1.DropdownItem, { onClick: function (event) { return _this.exportExcel(event, false); } },
                                        React.createElement("i", { className: "ti ti-layers-alt mr-2" }),
                                        " All pages")))),
                        React.createElement("li", { className: "list-inline-item dropdown mega-dropdown customize-column ml-0" },
                            React.createElement(CustomColumns_1.default, { columns: this.props.columns, realColumns: this.props.realColumns, changed: this.props.changedColumns, applyChanged: this.props.applyChangedColumns })))),
                this.props.selectedRow !== Enums.SelectRowTypeEnum.MULTIPLE ? "" : (React.createElement(kendo_react_grid_1.GridColumn, { field: "Selected", width: "50px", className: "text-center", headerSelectionValue: this.props.data.length > 0 &&
                        this.props.data.filter(function (dataItem) { return dataItem.Selected === true; }).length === this.props.data.length, cell: function (props) { return (React.createElement("td", { colSpan: 1, className: "text-center" },
                        React.createElement("input", { type: "checkbox", className: "k-checkbox", defaultChecked: props.dataItem.Selected }))); } })),
                this.props.columns.filter(function (column) { return column.Checked; }).map(function (column) { return (React.createElement(kendo_react_grid_1.GridColumn, { title: column.Title, key: column.ColumnName, field: column.HasCustomValue ? column.ColumnName + "_String" : column.ColumnName, className: column.ClassName, width: column.Width + "px", format: column.Format, filter: column.Filter, columnMenu: function (props) { return _this.columnMenuFilter(props, column.Enum); } })); }))));
    };
    return CustomGrid;
}(React.PureComponent));
var CustomGridDetails = /** @class */ (function (_super) {
    __extends(CustomGridDetails, _super);
    function CustomGridDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomGridDetails.prototype.render = function () {
        return (React.createElement(kendo_react_grid_1.Grid, { data: this.props.dataItem.Details },
            React.createElement(kendo_react_grid_1.GridNoRecords, null, this.props.dataItem.IsLoading ? (React.createElement("div", null,
                React.createElement("i", { className: "fa fa-spinner fa-spin fa-2x fa-fw text-muted" }),
                React.createElement("span", { className: "sr-only" }, "Loading..."))) : "No record details available"),
            this.props.dataItem.Columns ? this.props.dataItem.Columns.map(function (column) { return (React.createElement(kendo_react_grid_1.GridColumn, { title: column.Title, key: column.ColumnName, field: column.HasCustomValue ? column.ColumnName + "_String" : column.ColumnName, className: column.ClassName, width: column.Width + "px", format: column.Format })); }) : ""));
    };
    return CustomGridDetails;
}(kendo_react_grid_1.GridDetailRow));
exports.default = CustomGrid;
//# sourceMappingURL=CustomGrid.js.map