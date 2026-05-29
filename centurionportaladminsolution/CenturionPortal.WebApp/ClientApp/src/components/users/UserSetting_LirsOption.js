"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetting_LirsOption_Url = void 0;
var React = require("react");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var UserSetting_1 = require("./UserSetting");
var UserSetting_LirsOption = function () {
    return (React.createElement(UserSetting_1.UserSetting_Tab, { TabUrl: exports.UserSetting_LirsOption_Url },
        React.createElement("div", null,
            React.createElement(UserSetting_1.UserSetting_Card, { title: 'Filters', className: 'mr-2 d-inline-flex mb-2 ', width: '20rem' },
                React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Disable captcha login', value: true, id: 'chkDisableCaptcha', onChange: function (event) { } })),
            React.createElement(UserSetting_1.UserSetting_Card, { title: 'Invoice Payments', className: 'mr-2 d-inline-flex mb-2', width: '23rem' },
                React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Block payments by V-Check', value: true, id: 'chk1', onChange: function (event) { } }),
                React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Block payments by Credit Card', value: true, id: 'chk2', onChange: function (event) { } }),
                React.createElement(UserSetting_1.UserSetting_FormControl_FxCheck, { label: 'Block payments by PayPal', value: true, id: 'chk3', onChange: function (event) { } }))),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { title: 'Save', onClick: function (event) { } })));
};
exports.UserSetting_LirsOption_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('LirsOptions'); //  '/UserSetting_LirsOption'
exports.default = UserSetting_LirsOption;
//# sourceMappingURL=UserSetting_LirsOption.js.map