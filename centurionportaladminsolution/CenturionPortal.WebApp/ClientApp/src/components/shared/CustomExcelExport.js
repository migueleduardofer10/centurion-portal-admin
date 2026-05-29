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
var kendo_react_excel_export_1 = require("@progress/kendo-react-excel-export");
var CustomExcelExport = /** @class */ (function (_super) {
    __extends(CustomExcelExport, _super);
    function CustomExcelExport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomExcelExport.prototype.componentDidUpdate = function () {
        if (this.props.exportExcel) {
            this.props.enableExportExcel(false);
            this._exporter.save();
        }
    };
    CustomExcelExport.prototype.render = function () {
        var _this = this;
        return (React.createElement(kendo_react_excel_export_1.ExcelExport, { ref: function (exporter) { return _this._exporter = exporter; }, data: this.props.data, fileName: this.props.fileName + ".xlsx" }, this.props.columns.map(function (column) { return (React.createElement(kendo_react_excel_export_1.ExcelExportColumn, { key: column.ColumnName, title: column.Title, field: column.HasCustomValue ? column.ColumnName + "_String" : column.ColumnName, width: Number(column.Width), headerCellOptions: { textAlign: 'center' }, cellOptions: { textAlign: column.Align, format: column.FormatExcel } })); })));
    };
    return CustomExcelExport;
}(React.PureComponent));
exports.default = CustomExcelExport;
//# sourceMappingURL=CustomExcelExport.js.map