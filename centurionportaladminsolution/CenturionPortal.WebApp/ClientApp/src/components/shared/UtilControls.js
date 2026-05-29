"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilControl_Button = exports.UtilControl_ComboBox = exports.UtilControl_Email = exports.UtilControl_Text = exports.UtilControl_Label = exports.UtilControl_Check = exports.UtilControl_Card = void 0;
var React = require("react");
exports.UtilControl_Card = function (props) {
    var style = props.width ?
        {
            "border": "1px solid #eeeeee",
            "width": props.width
        }
        :
            {
                "border": "1px solid #eeeeee"
            };
    return (React.createElement("div", { className: "card p-0  m-0 " + (props.className ? props.className : ''), style: style },
        React.createElement("div", { className: "card-header" }, props.title),
        React.createElement("div", { className: 'card-body ' + (props.cardBodyClassName ? props.cardBodyClassName : '') }, props.children)));
};
exports.UtilControl_Check = function (props) {
    return (React.createElement("div", { className: props.className },
        React.createElement("i", { className: "mdi mdi-menu-right d-inline-block mr-2" }),
        React.createElement("div", { className: 'custom-control custom-checkbox d-inline-block' },
            React.createElement("input", { type: "checkbox", ref: props.ref, className: "custom-control-input d-inline-block ", 
                //  defaultChecked={props.value}
                checked: props.value, id: props.id, onChange: function (event) { props.onChange(event); } }),
            React.createElement("label", { className: "custom-control-label", htmlFor: props.id }, props.label))));
};
exports.UtilControl_Label = function (props) {
    var labelStyle = { 'width': props.labelWidth };
    var textStyle = { 'width': props.textWidth };
    return (React.createElement("div", { className: "form-row p-1   " },
        React.createElement("i", { className: "mdi mdi-menu-right d-inline-block mr-1 " }),
        React.createElement("small", { className: 'd-inline-block mr-2', style: labelStyle }, props.label + ' :'),
        React.createElement("p", { className: "from-control d-inline-block   ", style: textStyle }, props.value)));
};
exports.UtilControl_Text = function (props) {
    var labelStyle = { 'width': props.labelWidth };
    var textStyle = { 'width': props.textWidth };
    return (React.createElement("div", { className: 'form-row p-1 ' + (props.className ? props.className : ''), hidden: props.hidden },
        React.createElement("div", { className: "  d-inline-block", style: labelStyle },
            React.createElement("i", { className: "mdi mdi-menu-right" }),
            "  ",
            React.createElement("small", null, props.label + ' :')),
        React.createElement("div", { className: "  d-inline-block", style: textStyle },
            React.createElement("input", { type: props.isPassword ? 'password' : 'text', className: "from-control w-100", value: props.value, onChange: props.onChange, maxLength: props.maxLength }))));
};
exports.UtilControl_Email = React.forwardRef(function (props, ref) {
    var labelStyle = { 'width': props.labelWidth };
    var textStyle = { 'width': props.textWidth };
    return (React.createElement("div", { className: "form-row p-1" },
        React.createElement("div", { className: "  d-inline-block", style: labelStyle },
            React.createElement("i", { className: "mdi mdi-menu-right" }),
            "  ",
            React.createElement("small", null, props.label + ' :')),
        React.createElement("div", { className: "  d-inline-block", style: textStyle },
            React.createElement("input", { type: "email", className: "from-control w-100", value: props.value, onChange: props.onChange, maxLength: props.maxLength, ref: ref }))));
});
exports.UtilControl_ComboBox = React.forwardRef(function (props, ref) {
    var labelStyle = { 'width': props.labelWidth ? props.labelWidth : '100px' };
    var textStyle = { 'width': props.textWidth ? props.textWidth : '300px' };
    return (React.createElement("div", { className: 'form-row p-1 ' + (props.className ? props.className : '') },
        React.createElement("div", { className: "  d-inline-block", style: labelStyle },
            React.createElement("i", { className: "mdi mdi-menu-right" }),
            "  ",
            React.createElement("small", null, props.label + ' :')),
        React.createElement("div", { className: "  d-inline-block", style: textStyle },
            React.createElement("select", { ref: ref, className: "from-control w-100", disabled: props.disabled, value: props.value, onChange: props.onChange }, props.dataSource.map(function (obj) { return (React.createElement("option", { value: obj.Key, key: obj.Key }, obj.Value)); })))));
});
exports.UtilControl_Button = function (props) {
    return (React.createElement("button", { className: 'btn btn-primary p-2 ' + props.className, hidden: props.hidden, disabled: props.disabled, onClick: function (event) { return props.onClick(event); } }, props.title));
};
//# sourceMappingURL=UtilControls.js.map