"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version_Url = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var Action_1 = require("./Action");
var kendo_react_grid_1 = require("@progress/kendo-react-grid");
var UserSetting_1 = require("../users/UserSetting");
var IDataType;
(function (IDataType) {
    IDataType[IDataType["Group"] = 0] = "Group";
    IDataType[IDataType["Detail"] = 1] = "Detail";
})(IDataType || (IDataType = {}));
var Version = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = React.useState([]), Data_Value = _a[0], Data_SetValue = _a[1];
    React.useEffect(function () {
        dispatch(Action_1.AppVersion_Action_Load(function (rows) {
            var data = [];
            rows.forEach(function (obj) {
                data.push({ C1: obj.Group, Type: IDataType.Group });
                obj.Details.forEach(function (detail) {
                    data.push({ C1: detail.Title, C2: detail.Description, Type: IDataType.Detail });
                });
            });
            Data_SetValue(data);
        }));
    }, []);
    return (React.createElement(UserSetting_1.UserSetting_Card, { title: 'Version', cardBodyClassName: 'd-flex flex-column align-items-center p-1' },
        React.createElement("img", { src: "/images/logo-redplus.png", className: 'mb-2', alt: "logo", style: { width: '100px', height: '100px' } }),
        React.createElement(kendo_react_grid_1.Grid, { data: Data_Value, scrollable: 'none', sortable: false, pageable: false },
            CreateColumn('150', 'C1'),
            CreateColumn('150', 'C2'))));
};
var CreateColumn = function (width, field) {
    var HeaderCell = function () { return (React.createElement("span", { style: { height: '0', width: '0', display: 'none', margin: '0', padding: '0' } })); };
    return (React.createElement(kendo_react_grid_1.GridColumn, { key: field, width: width + 'px', headerClassName: 'text-center', field: field, headerCell: HeaderCell, cell: CellStyle }));
};
var CellStyle = function (props) {
    var backgrounColorDark = '#3A4B54';
    var colorWhite = 'white';
    var style = undefined;
    var colSpan = undefined;
    var obj = props.dataItem;
    var value = props.dataItem[props.field];
    switch (obj.Type) {
        case IDataType.Group:
            switch (props.columnIndex) {
                case 0:
                    colSpan = 2;
                    style = {
                        backgroundColor: backgrounColorDark, color: colorWhite, textAlign: 'center'
                    };
                    value = obj.C1;
                    break;
                default:
                    style = { display: 'none' };
                    break;
            }
            break;
        case IDataType.Detail:
            switch (props.columnIndex) {
                case 0:
                    style = {
                        textAlign: 'left'
                    };
                    value = obj.C1;
                    break;
                case 1:
                    style = {
                        textAlign: 'right'
                    };
                    value = obj.C2;
                    break;
            }
            break;
    }
    return (React.createElement("td", { colSpan: colSpan, style: style }, value));
};
exports.default = Version;
exports.Version_Url = '/Version';
//# sourceMappingURL=Index.js.map