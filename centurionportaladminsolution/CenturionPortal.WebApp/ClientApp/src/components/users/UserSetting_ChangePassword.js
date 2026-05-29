"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetting_ChangePassword_Url = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var UserSettingAction_1 = require("../../store/actions/users/UserSettingAction");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var UserSettingStore_1 = require("../../store/stores/users/UserSettingStore");
var Functions_1 = require("../../utilities/Functions");
var UserSetting_1 = require("./UserSetting");
var UserSetting_ChangePassword = function () {
    var State = react_redux_1.useSelector(UserSettingStore_1.UserSetting_StateObject);
    var Dispatch = react_redux_1.useDispatch();
    var _a = React.useState(''), CurrentPassword_Value = _a[0], CurrentPassword_SetValue = _a[1];
    var _b = React.useState(''), NewPassword_Value = _b[0], NewPassword_SetValue = _b[1];
    var _c = React.useState(''), ConfirmPassword_Value = _c[0], ConfirmPassword_SetValue = _c[1];
    var CurrentPassword = React.useRef(null);
    var NewPassword = React.useRef(null);
    var ConfirmPassword = React.useRef(null);
    var _d = React.useState(true), BnSave_Disabled = _d[0], BnSave_SetDisabled = _d[1];
    React.useEffect(function () {
        if (CurrentPassword_Value.trim() === '' &&
            NewPassword_Value.trim() === '' &&
            ConfirmPassword_Value.trim() === '') {
            BnSave_SetDisabled(true);
        }
        else {
            BnSave_SetDisabled(false);
        }
    }, [CurrentPassword_Value, NewPassword_Value, ConfirmPassword_Value]);
    var lw = '8em';
    var tw = '18em';
    return (React.createElement(UserSetting_1.UserSetting_Tab, { TabUrl: exports.UserSetting_ChangePassword_Url },
        React.createElement("p", { className: 'p-2' }, "Your password must be at least 11 to 32 characters without containing common phrases. It needs to contain minimun one digit (0 - 9), one uppercase character (A - Z), one lowercase character (a - z) , one Non-alphanumeric (For example: ., $, #, or %)."),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { isPassword: true, label: 'Current Password', value: CurrentPassword_Value, labelWidth: lw, textWidth: tw, maxLength: 16, onChange: function (event) {
                CurrentPassword_SetValue(event.currentTarget.value);
            } }),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { isPassword: true, label: 'New Password', value: NewPassword_Value, labelWidth: lw, textWidth: tw, maxLength: 16, onChange: function (event) {
                NewPassword_SetValue(event.currentTarget.value);
            } }),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { isPassword: true, label: 'Confirm Password', value: ConfirmPassword_Value, labelWidth: lw, textWidth: tw, maxLength: 16, onChange: function (event) {
                ConfirmPassword_SetValue(event.currentTarget.value);
            } }),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { title: 'Save', disabled: BnSave_Disabled, onClick: function (event) {
                console.log('evento click');
                var error = '';
                if (CurrentPassword_Value === '')
                    error += "Current password is incomplete. ";
                if (NewPassword_Value === '')
                    error += "New password is incomplete. ";
                if (ConfirmPassword_Value === '')
                    error += "Confirm password is incomplete. ";
                if (NewPassword_Value != '' && ConfirmPassword_Value != '' && NewPassword_Value != ConfirmPassword_Value)
                    error += 'The new password and the Confirm password are diferent. ';
                console.log('error', error);
                if (error != '') {
                    Functions_1.Utils.validateData(Dispatch, error, error);
                }
                else {
                    Dispatch(UserSettingAction_1.UserSetting_Action_Save_Tab_ChangePassword(CurrentPassword_Value, NewPassword_Value, ConfirmPassword_Value, function () {
                        CurrentPassword_SetValue('');
                        NewPassword_SetValue('');
                        ConfirmPassword_SetValue('');
                        BnSave_SetDisabled(true);
                    }));
                }
            } })));
};
exports.UserSetting_ChangePassword_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('UserSetting_ChangePassword'); //`/UserSetting_ChangePassword`
exports.default = UserSetting_ChangePassword;
//# sourceMappingURL=UserSetting_ChangePassword.js.map