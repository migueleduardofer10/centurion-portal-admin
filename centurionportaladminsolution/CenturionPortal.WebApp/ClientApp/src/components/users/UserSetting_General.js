"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetting_General_Url = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var UserSettingAction_1 = require("../../store/actions/users/UserSettingAction");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var UserSettingStore_1 = require("../../store/stores/users/UserSettingStore");
var UserSetting_1 = require("./UserSetting");
var UserSetting_General = function () {
    var _a, _b, _c;
    var state = react_redux_1.useSelector(UserSettingStore_1.UserSetting_StateObject);
    var dispatch = react_redux_1.useDispatch();
    React.useEffect(function () {
        dispatch(UserSettingAction_1.UserSetting_Action_FindELSUser(function (objIELSUser) {
            TbEmail_SetValue(objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Email);
        }));
        BnSave_SetDisabled(true);
    }, []);
    var _d = React.useState(true), BnSave_Disabled = _d[0], BnSave_SetDisabled = _d[1];
    var _e = React.useState(''), TbEmail_Value = _e[0], TbEmail_SetValue = _e[1];
    var TbEmail = React.useRef(null);
    var labelWidth = '5em';
    var textWidth = '18em';
    return (React.createElement(UserSetting_1.UserSetting_Tab, { TabUrl: exports.UserSetting_General_Url },
        React.createElement(UserSetting_1.UserSetting_FormControl_FxLabel, { label: 'Type', value: (_a = state.ObjELSUser) === null || _a === void 0 ? void 0 : _a.UserType_ToSring, labelWidth: labelWidth, textWidth: textWidth }),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxLabel, { label: 'Login', value: (_b = state.ObjELSUser) === null || _b === void 0 ? void 0 : _b.Username, labelWidth: labelWidth, textWidth: textWidth }),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxLabel, { label: 'Name', value: (_c = state.ObjELSUser) === null || _c === void 0 ? void 0 : _c.FullName, labelWidth: labelWidth, textWidth: textWidth }),
        React.createElement(UserSetting_1.UserSetting_FormControl_Text_FxEmail, { label: 'Email', value: TbEmail_Value, labelWidth: labelWidth, textWidth: textWidth, maxLength: 50, onChange: function (event) {
                var _a;
                if (event.currentTarget.value.trim() != '' &&
                    event.currentTarget.checkValidity() &&
                    event.currentTarget.value.toUpperCase() != ((_a = state.ObjELSUser) === null || _a === void 0 ? void 0 : _a.Email.toUpperCase())) {
                    BnSave_SetDisabled(false);
                }
                else {
                    BnSave_SetDisabled(true);
                }
                TbEmail_SetValue(event.currentTarget.value);
            } }),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { disabled: BnSave_Disabled, title: 'Save', onClick: function (event) {
                dispatch(UserSettingAction_1.UserSetting_Action_Save_Tab_General(TbEmail_Value, function (email) {
                    TbEmail_SetValue(email);
                }));
            } })));
};
exports.UserSetting_General_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath("UserSetting_General");
exports.default = UserSetting_General;
//# sourceMappingURL=UserSetting_General.js.map