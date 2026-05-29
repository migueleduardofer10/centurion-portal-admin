"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetting_FormControl_FxButton = exports.UserSetting_FormComtrol_FxComboBox = exports.UserSetting_FormControl_Text_FxEmail = exports.UserSetting_FormControl_Text_Password = exports.UserSetting_FormControl_Text22 = exports.UserSetting_FormControl_FxText = exports.UserSetting_FormControl_Text = exports.UserSetting_FormControl_FxLabel = exports.UserSetting_FormControl_FxCheck = exports.UserSetting_Card = exports.UserSetting_Tab = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var UserSetting_Account_1 = require("./UserSetting_Account");
var UserSetting_ChangePassword_1 = require("./UserSetting_ChangePassword");
var UserSetting_General_1 = require("./UserSetting_General");
var UserSetting_LirsOption_1 = require("./UserSetting_LirsOption");
var UserSetting_PasswordDefault_1 = require("./UserSetting_PasswordDefault");
var UserSetting_PersonalInformation_1 = require("./UserSetting_PersonalInformation");
var UserSetting_RecoverySetting_1 = require("./UserSetting_RecoverySetting");
var UserSetting = function (props) {
    //  const loanUid = props.match.params.loanUid
    var IsActive = function (tabUrl) {
        return 'nav-link ' + (props.TabUrl === tabUrl ? ' active' : '');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "card p-0  m-0 " },
            React.createElement("ul", { className: "nav nav-tabs mb-0" },
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { className: IsActive(UserSetting_General_1.UserSetting_General_Url), to: UserSetting_General_1.UserSetting_General_Url }, "General")),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { className: IsActive(UserSetting_LirsOption_1.UserSetting_LirsOption_Url), to: UserSetting_LirsOption_1.UserSetting_LirsOption_Url }, "Lirs Options")),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { className: IsActive(UserSetting_PersonalInformation_1.UserSetting_PersonalInformation_Url), to: UserSetting_PersonalInformation_1.UserSetting_PersonalInformation_Url }, "Personal Information")),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { className: IsActive(UserSetting_ChangePassword_1.UserSetting_ChangePassword_Url), to: UserSetting_ChangePassword_1.UserSetting_ChangePassword_Url }, "Change Password")),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { className: IsActive(UserSetting_RecoverySetting_1.UserSetting_RecoverySetting_Url), to: UserSetting_RecoverySetting_1.UserSetting_RecoverySetting_Url }, "Recovery Settings")),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { className: IsActive(UserSetting_PasswordDefault_1.UserSetting_PasswordDefault_Url), to: UserSetting_PasswordDefault_1.UserSetting_PasswordDefault_Url }, "Password Default")),
                React.createElement("li", null,
                    React.createElement(react_router_dom_1.Link, { className: IsActive(UserSetting_Account_1.UserSetting_Account_Url), to: UserSetting_Account_1.UserSetting_Account_Url }, "Account"))))));
};
exports.UserSetting_Tab = function (props) {
    return (React.createElement(React.Fragment, null,
        React.createElement("h5", { className: 'p-0 m-0 mb-2 ' }, "User Settings"),
        React.createElement("div", { className: "card-group" },
            React.createElement("div", { className: "card" },
                React.createElement(UserSetting, { TabUrl: props.TabUrl }),
                React.createElement("div", { className: "card-body p-2 m-0" }, props.children)))));
};
exports.UserSetting_Card = function (props) {
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
exports.UserSetting_FormControl_FxCheck = function (props) {
    return (React.createElement("div", { className: props.className },
        React.createElement("i", { className: "mdi mdi-menu-right d-inline-block mr-2" }),
        React.createElement("div", { className: 'custom-control custom-checkbox d-inline-block' },
            React.createElement("input", { type: "checkbox", ref: props.ref, className: "custom-control-input d-inline-block ", 
                //  defaultChecked={props.value}
                checked: props.value, id: props.id, onChange: function (event) { props.onChange(event); } }),
            React.createElement("label", { className: "custom-control-label", htmlFor: props.id }, props.label))));
};
//export const UserSetting_FormControl_Check = (label: string, value: boolean, className: string, id: string,
//    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void) => {
//    return (
//        <div className={className}>
//            <i className="mdi mdi-menu-right d-inline-block mr-2"></i>
//            <div className='custom-control custom-checkbox d-inline-block'   >
//                <input type="checkbox"
//                    className="custom-control-input d-inline-block "
//                    defaultChecked={value}
//                    id={id}
//                    onChange={(event) => { onChange(event) }}
//                />
//                <label className="custom-control-label" htmlFor={id} >{label}</label>
//            </div>
//        </div>
//    )
//}
exports.UserSetting_FormControl_FxLabel = function (props) {
    var labelStyle = { 'width': props.labelWidth };
    var textStyle = { 'width': props.textWidth };
    return (React.createElement("div", { className: "form-row p-1   " },
        React.createElement("i", { className: "mdi mdi-menu-right d-inline-block mr-1 " }),
        React.createElement("small", { className: 'd-inline-block mr-2', style: labelStyle }, props.label + ' :'),
        React.createElement("p", { className: "from-control d-inline-block   ", style: textStyle }, props.value)));
};
//export const UserSetting_FormControl_Label = (label: string, value: string,
//    labelWidth: string, textWidth: string) => {
//    const labelStyle = { 'width': labelWidth }
//    const textStyle = { 'width': textWidth }
//    return (
//        <div className="form-row p-1   ">
//            <i className="mdi mdi-menu-right d-inline-block mr-1 "></i>
//            <small className='d-inline-block mr-2' style={labelStyle} >{label + ' :'}</small>
//            <p className="from-control d-inline-block   " style={textStyle} >{value}</p>
//        </div>
//    )
//}
exports.UserSetting_FormControl_Text = function (label, value, labelWidth, textWidth) {
    var labelStyle = { 'width': labelWidth ? labelWidth : '100px' };
    var textStyle = { 'width': textWidth ? textWidth : '300px' };
    return (React.createElement("div", { className: "form-row p-1" },
        React.createElement("div", { className: "  d-inline-block", style: labelStyle },
            React.createElement("i", { className: "mdi mdi-menu-right" }),
            "  ",
            React.createElement("small", null, label)),
        React.createElement("div", { className: "  d-inline-block", style: textStyle },
            React.createElement("input", { type: "text", className: "from-control w-100", value: value }))));
};
exports.UserSetting_FormControl_FxText = function (props) {
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
exports.UserSetting_FormControl_Text22 = function (label, value, labelWidth, textWidth, maxLength, onChange, hidden, className) {
    var labelStyle = { 'width': labelWidth };
    var textStyle = { 'width': textWidth };
    return (React.createElement("div", { className: 'form-row p-1 ' + (className ? className : ''), hidden: hidden },
        React.createElement("div", { className: "  d-inline-block", style: labelStyle },
            React.createElement("i", { className: "mdi mdi-menu-right" }),
            "  ",
            React.createElement("small", null, label + ' :')),
        React.createElement("div", { className: "  d-inline-block", style: textStyle },
            React.createElement("input", { type: "text", className: "from-control w-100", value: value, onChange: onChange, maxLength: maxLength }))));
};
exports.UserSetting_FormControl_Text_Password = function (ref, label, value, labelWidth, textWidth, maxLength, onChange) {
    var labelStyle = { 'width': labelWidth };
    var textStyle = { 'width': textWidth };
    return (React.createElement("div", { className: "form-row p-1" },
        React.createElement("div", { className: "  d-inline-block", style: labelStyle },
            React.createElement("i", { className: "mdi mdi-menu-right" }),
            "  ",
            React.createElement("small", null, label + ' :')),
        React.createElement("div", { className: "  d-inline-block", style: textStyle },
            React.createElement("input", { type: "password", className: "from-control w-100", value: value, onChange: onChange, maxLength: maxLength, ref: ref }))));
};
//export const UserSetting_FormControl_Text_Email = (label: string, value: string,
//    labelWidth: string, textWidth: string, maxLength: number,
//    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
//    ref?: React.RefObject<HTMLInputElement>) => {
//    const labelStyle = { 'width': labelWidth }
//    const textStyle = { 'width': textWidth }
//    return (
//        <div className="form-row p-1">
//            <div className="  d-inline-block" style={labelStyle}  >
//                <i className="mdi mdi-menu-right"></i>  <small>{label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle}  >
//                <input type="email" className="from-control w-100"
//                    value={value}
//                    onChange={onChange}
//                    maxLength={maxLength} ref={ref}
//                />
//            </div>
//        </div>
//    )
//}
//export const UserSetting_FormControl_Text_FxEmail: React.FC<{
//    label: string, value: string,
//    labelWidth: string, textWidth: string, maxLength: number,
//    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
//}> = (props) => {
//    const labelStyle = { 'width': props.labelWidth }
//    const textStyle = { 'width': props.textWidth }
//    return (
//        <div className="form-row p-1">
//            <div className="  d-inline-block" style={labelStyle}  >
//                <i className="mdi mdi-menu-right"></i>  <small>{props.label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle}  >
//                <input type="email" className="from-control w-100"
//                    value={props.value}
//                    onChange={props.onChange}
//                    maxLength={props.maxLength} //ref={props.ref}
//                />
//            </div>
//        </div>
//    )
//}
//type Props = {
//    label: string, value: string,
//    labelWidth: string, textWidth: string, maxLength: number,
//    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
//}
exports.UserSetting_FormControl_Text_FxEmail = React.forwardRef(function (props, ref) {
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
//export const UserSetting_FormControl_Text_FxEmail2: React.FC<{
//    label: string, value: string,
//    labelWidth: string, textWidth: string, maxLength: number,
//    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
//}> = (props) => {
//    const labelStyle = { 'width': props.labelWidth }
//    const textStyle = { 'width': props.textWidth }
//    return (
//        <div className="form-row p-1">
//            <div className="  d-inline-block" style={labelStyle}  >
//                <i className="mdi mdi-menu-right"></i>  <small>{props.label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle}  >
//                <input type="email" className="from-control w-100"
//                    value={props.value}
//                    onChange={props.onChange}
//                    maxLength={props.maxLength} //ref={props.ref}
//                />
//            </div>
//        </div>
//    )
//}
//export const UserSetting_FormControl_Combo = (label: string, value: string,
//    labelWidth: string, textWidth: string) => {
//    const labelStyle = { 'width': labelWidth ? labelWidth : '100px' }
//    const textStyle = { 'width': textWidth ? textWidth : '300px' }
//    return (
//        <div className="form-row p-1">
//            <div className="  d-inline-block" style={labelStyle}  >
//                <i className="mdi mdi-menu-right"></i>  <small>{label}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle} >
//                <select className="from-control w-100">
//                    <option value='0' key='0'>one</option>
//                    <option value='1' key='1'>uno</option>
//                    <option value='2' key='2'>dos</option>
//                </select>
//            </div>
//        </div>
//    )
//}
exports.UserSetting_FormComtrol_FxComboBox = React.forwardRef(function (props, ref) {
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
//export const UserSetting_FormComtrol_FxComboBox: React.FC<{
//    className?: string,
//    labelWidth: string,
//    textWidth: string,
//    label: string,
//    disabled?: boolean,
//    value: string,
//    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void,
//    //  ref?: React.RefObject<HTMLSelectElement>,
//    dataSource: IComboBoxDataSource[]
//}> = (props) => {
//    const labelStyle = { 'width': props.labelWidth ? props.labelWidth : '100px' }
//    const textStyle = { 'width': props.textWidth ? props.textWidth : '300px' }
//    return (
//        <div className={'form-row p-1 ' + (props.className ? props.className : '')}  >
//            <div className="  d-inline-block" style={labelStyle}   >
//                <i className="mdi mdi-menu-right"></i>  <small>{props.label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle} >
//                <select
//                    className="from-control w-100"
//                    disabled={props.disabled}
//                    value={props.value}
//                    onChange={props.onChange}>
//                    {
//                        props.dataSource.map(obj => (<option value={obj.Key} key={obj.Key}>{obj.Value}</option>))
//                    }
//                </select>
//            </div>
//        </div>
//    )
//}
//export const UserSetting_FormControl_Combo22 = (label: string, value: string,
//    labelWidth: string, textWidth: string,
//    dataSource: IComboBoxDataSource[],
//    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
//    className?: string,
//    disabled: boolean = false,
//    ref?: React.RefObject<HTMLSelectElement>
//) => {
//    const labelStyle = { 'width': labelWidth ? labelWidth : '100px' }
//    const textStyle = { 'width': textWidth ? textWidth : '300px' }
//    return (
//        <div className={'form-row p-1 ' + (className ? className : '')}  >
//            <div className="  d-inline-block" style={labelStyle}   >
//                <i className="mdi mdi-menu-right"></i>  <small>{label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle} >
//                <select
//                    ref={ref}
//                    className="from-control w-100"
//                    disabled={disabled}
//                    value={value}
//                    onChange={onChange}>
//                    {
//                        dataSource.map(obj => (<option value={obj.Key} key={obj.Key}>{obj.Value}</option>))
//                    }
//                </select>
//            </div>
//        </div>
//    )
//}
//export const UserSetting_FormControl_Combo33 = (label: string, value: string,
//    labelWidth: string, textWidth: string,
//    dataSource: () => string,
//    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
//) => {
//    const labelStyle = { 'width': labelWidth ? labelWidth : '100px' }
//    const textStyle = { 'width': textWidth ? textWidth : '300px' }
//    return (
//        <div className="form-row p-1">
//            <div className="  d-inline-block" style={labelStyle}  >
//                <i className="mdi mdi-menu-right"></i>  <small>{label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle} >
//                <select className="from-control w-100"
//                    value={value}
//                    onChange={onChange}>
//                    {
//                        dataSource()
//                        // dataSource.map(obj => (<option value={obj.Key} key={obj.Key}>{obj.Value}</option>))
//                    }
//                </select>
//            </div>
//        </div>
//    )
//}
//export const UserSetting_FormControl_ButtonSave = () => (
//    < button className="btn btn-primary px-2      "  > Save</button>
//)
//export const UserSetting_FormControl_ButtonSave22 = (hidden: boolean,
//    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void) => {
//    let x =
//        React.createElement('button',
//            {
//                type: 'submit',
//                className: 'btn btn-primary px-2',
//                hidden: hidden,
//                onClick: onClick
//            }, 'Save')
//    return x
//}
exports.UserSetting_FormControl_FxButton = function (props) {
    return (React.createElement("button", { className: 'btn btn-primary p-2 ' + props.className, hidden: props.hidden, disabled: props.disabled, onClick: function (event) { return props.onClick(event); } }, props.title));
};
//export const UserSetting_FormControl_ButtonSave33 = (hidden: boolean, title: string, className: string,
//    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void) => {
//    let x =
//        React.createElement('button',
//            {
//                type: 'submit',
//                className: 'btn btn-primary p-2 ' + className,
//                hidden: hidden,
//                onClick: onClick
//            }, title)
//    return x
//}
exports.default = UserSetting;
//# sourceMappingURL=UserSetting.js.map