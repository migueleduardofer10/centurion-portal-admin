"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetting_PasswordDefault_Url = void 0;
var React = require("react");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var UserSetting_1 = require("./UserSetting");
var Simple_Input = function (value) { return (React.createElement("input", { type: 'text', style: { width: '3em' }, className: 'from-control custom-control d-inline-block ml-2' })); };
var Simple_P = function (value) { return (React.createElement("p", { className: 'd-inline-block ml-2' }, value)); };
var SpecialCard = function (title, chkId) {
    return (React.createElement(UserSetting_1.UserSetting_Card, { title: title, className: 'd-inline-flex mr-2 mb-2' },
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Password Option', className: 'd-inline-flex ml-2 mb-2' },
            React.createElement("div", { className: 'mb-2' },
                React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Expiration After', value: false, className: 'd-inline-block', id: 'chk0' + chkId, onChange: function (event) { } }),
                Simple_Input('90'),
                React.createElement("select", { className: 'custom-select  d-inline-block ml-2', style: { width: '7em' } },
                    React.createElement("option", { value: 'Days', key: '1' }, "Day(s)"),
                    React.createElement("option", { value: 'Week', key: '2' }, "Week(s)"),
                    React.createElement("option", { value: 'Month', key: '3' }, "Month(s)"))),
            React.createElement("div", null,
                React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'User cannot use their previous', value: false, className: 'd-inline-block', id: 'chk1' + chkId, onChange: function (event) { } }),
                Simple_Input('90'),
                Simple_P('Password'))),
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Lock out Option', className: 'd-inline-flex ml-2 mb-2' },
            React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Expiration After', value: false, className: 'd-inline-block', id: 'chk2' + chkId, onChange: function (event) { } }),
            Simple_Input('3'),
            Simple_P('unsuccessful attempts for'),
            Simple_Input('15'),
            Simple_P('minutes')),
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Password Complexity', className: 'd-inline-flex ml-2' },
            React.createElement("div", null,
                React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Password Length', value: false, className: 'd-inline-block', id: 'chk3' + chkId, onChange: function (event) { } }),
                Simple_Input('11'),
                Simple_P('To'),
                Simple_Input('32')),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Minimun one lower case and one upper case', value: true, className: 'mr-2', id: 'chk4' + chkId, onChange: function (event) { } }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Minimun one digit', value: true, className: 'mr-2', id: 'chk5' + chkId, onChange: function (event) { } }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Minimun one special character', value: true, className: 'mr-2', id: 'chk6' + chkId, onChange: function (event) { } }))));
};
var UserSetting_PasswordDefault = function () {
    return (React.createElement(UserSetting_1.UserSetting_Tab, { TabUrl: exports.UserSetting_PasswordDefault_Url },
        React.createElement("div", null,
            SpecialCard('Lirs Admin', 'chkLirsAdmin'),
            SpecialCard('User Admin', 'chkUserAdmin'),
            SpecialCard('Broker Admin', 'chkBrokerAdmin'),
            SpecialCard('Lender Admin', 'chkLenderAdmin'),
            SpecialCard('Borrower Admin', 'chkBorrowerAdmin')),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { title: 'Save', onClick: function (event) {
            } })));
};
/*

  


 *
 * */
exports.UserSetting_PasswordDefault_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('UserSetting_PasswordDefault'); //  '/UserSetting_PasswordDefault'
exports.default = UserSetting_PasswordDefault;
//# sourceMappingURL=UserSetting_PasswordDefault.js.map