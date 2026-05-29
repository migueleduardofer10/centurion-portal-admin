"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetting_RecoverySetting_Url = void 0;
var React = require("react");
var react_redux_1 = require("react-redux");
var UserSettingAction_1 = require("../../store/actions/users/UserSettingAction");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var UserSettingStore_1 = require("../../store/stores/users/UserSettingStore");
var Functions_1 = require("../../utilities/Functions");
var UserSetting_1 = require("./UserSetting");
var UserSetting_RecoverySetting = function () {
    var State = react_redux_1.useSelector(UserSettingStore_1.UserSetting_StateObject);
    var Dispatch = react_redux_1.useDispatch();
    var _a = React.useState(''), Email_Value = _a[0], Email_SetValue = _a[1];
    var _b = React.useState('0'), Combo1_Value = _b[0], Combo1_SetValue = _b[1];
    var _c = React.useState('0'), Combo2_Value = _c[0], Combo2_SetValue = _c[1];
    var _d = React.useState('0'), Combo3_Value = _d[0], Combo3_SetValue = _d[1];
    var _e = React.useState(''), ExtraQuestion1_Value = _e[0], ExtraQuestion1_SetValue = _e[1];
    var _f = React.useState(false), ExtraQuestion1_Hidden = _f[0], ExtraQuestion1_SetHidden = _f[1];
    var _g = React.useState(''), Answer1_Value = _g[0], Answer1_SetValue = _g[1];
    var _h = React.useState(''), ExtraQuestion2_Value = _h[0], ExtraQuestion2_SetValue = _h[1];
    var _j = React.useState(false), ExtraQuestion2_Hidden = _j[0], ExtraQuestion2_SetHidden = _j[1];
    var _k = React.useState(''), Answer2_Value = _k[0], Answer2_SetValue = _k[1];
    var _l = React.useState(''), ExtraQuestion3_Value = _l[0], ExtraQuestion3_SetValue = _l[1];
    var _m = React.useState(false), ExtraQuestion3_Hidden = _m[0], ExtraQuestion3_SetHidden = _m[1];
    var _o = React.useState(''), Answer3_Value = _o[0], Answer3_SetValue = _o[1];
    var _p = React.useState(true), BnSave_Enabled = _p[0], BnSave_SetEnabled = _p[1];
    var TbEmail = React.useRef(null);
    var _q = React.useState(true), FirstTime = _q[0], FirstTime_Set = _q[1];
    React.useEffect(function () {
        BnSave_SetEnabled(false);
        ExtraQuestion1_SetHidden(true);
        ExtraQuestion2_SetHidden(true);
        ExtraQuestion3_SetHidden(true);
        if (FirstTime === true) {
            Dispatch(UserSettingAction_1.UserSetting_Action_FindELSUser(function (objIELSUser) {
                FirstTime_Set(false);
                Email_SetValue(objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Email);
                Combo1_SetValue(objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Question1);
                if ((objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Question1) === '-1') {
                    ExtraQuestion1_SetHidden(false);
                    ExtraQuestion1_SetValue(objIELSUser.Question1String);
                }
                Answer1_SetValue(objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Answer1);
                Combo2_SetValue(objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Question2);
                if ((objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Question2) === '-1') {
                    ExtraQuestion2_SetHidden(false);
                    ExtraQuestion2_SetValue(objIELSUser.Question2String);
                }
                Answer2_SetValue(objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Answer2);
                Combo3_SetValue(objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Question3);
                if ((objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Question3) === '-1') {
                    ExtraQuestion3_SetHidden(false);
                    ExtraQuestion3_SetValue(objIELSUser.Question3String);
                }
                Answer3_SetValue(objIELSUser === null || objIELSUser === void 0 ? void 0 : objIELSUser.Answer3);
            }));
        }
        if (Email_Value != State.ObjELSUser.Email ||
            Combo1_Value != State.ObjELSUser.Question1 || ExtraQuestion1_Value != State.ObjELSUser.Question1String || Answer1_Value.trim() != State.ObjELSUser.Answer1 ||
            Combo2_Value != State.ObjELSUser.Question2 || ExtraQuestion2_Value != State.ObjELSUser.Question2String || Answer2_Value.trim() != State.ObjELSUser.Answer2 ||
            Combo3_Value != State.ObjELSUser.Question3 || ExtraQuestion3_Value != State.ObjELSUser.Question3String || Answer3_Value.trim() != State.ObjELSUser.Answer3) {
            BnSave_SetEnabled(false);
        }
        else {
            BnSave_SetEnabled(true);
        }
    }, [
        Email_Value,
        Combo1_Value, ExtraQuestion1_Value, Answer1_Value,
        Combo2_Value, ExtraQuestion2_Value, Answer2_Value,
        Combo3_Value, ExtraQuestion3_Value, Answer3_Value
    ]);
    var lw = '12em';
    var tw = '20em';
    return (React.createElement(UserSetting_1.UserSetting_Tab, { TabUrl: exports.UserSetting_RecoverySetting_Url },
        React.createElement(UserSetting_1.UserSetting_Card, { title: 'Password Questions', className: 'mb-2' },
            React.createElement(UserSetting_1.UserSetting_FormControl_Text_FxEmail, { label: 'Email Address', value: Email_Value, labelWidth: lw, textWidth: tw, maxLength: 100, onChange: function (event) { return Email_SetValue(event.currentTarget.value); }, ref: TbEmail }),
            React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { label: 'Secret Question 1', value: Combo1_Value, labelWidth: lw, textWidth: tw, dataSource: State.ComboBox_Question1, onChange: function (event) {
                    ExtraQuestion1_SetHidden(true);
                    ExtraQuestion1_SetValue('');
                    Answer1_SetValue('');
                    Combo1_SetValue(event.target.value);
                    if (event.target.value === '-1') {
                        ExtraQuestion1_SetHidden(false);
                    }
                } }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Expecify Your Question', value: ExtraQuestion1_Value, labelWidth: lw, textWidth: tw, maxLength: 100, onChange: function (event) { return ExtraQuestion1_SetValue(event.currentTarget.value); }, hidden: ExtraQuestion1_Hidden }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Your Answer', value: Answer1_Value, labelWidth: lw, textWidth: tw, maxLength: 100, onChange: function (event) { return Answer1_SetValue(event.currentTarget.value); } }),
            React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { label: 'Secret Question 2', value: Combo2_Value, labelWidth: lw, textWidth: tw, dataSource: State.ComboBox_Question2, onChange: function (event) {
                    ExtraQuestion2_SetHidden(true);
                    ExtraQuestion2_SetValue('');
                    Answer2_SetValue('');
                    Combo2_SetValue(event.target.value);
                    if (event.target.value === '-1') {
                        ExtraQuestion2_SetHidden(false);
                    }
                } }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Expecify Your Question', value: ExtraQuestion2_Value, labelWidth: lw, textWidth: tw, maxLength: 100, onChange: function (event) { return ExtraQuestion2_SetValue(event.currentTarget.value); }, hidden: ExtraQuestion2_Hidden }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Your Answer', value: Answer2_Value, labelWidth: lw, textWidth: tw, maxLength: 100, onChange: function (event) { return Answer2_SetValue(event.currentTarget.value); } }),
            React.createElement(UserSetting_1.UserSetting_FormComtrol_FxComboBox, { label: 'Secret Question 3', value: Combo3_Value, labelWidth: lw, textWidth: tw, dataSource: State.ComboBox_Question3, onChange: function (event) {
                    ExtraQuestion3_SetHidden(true);
                    ExtraQuestion3_SetValue('');
                    Answer3_SetValue('');
                    Combo3_SetValue(event.target.value);
                    if (event.target.value === '-1') {
                        ExtraQuestion3_SetHidden(false);
                    }
                } }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Expecify Your Question', value: ExtraQuestion3_Value, labelWidth: lw, textWidth: tw, maxLength: 100, onChange: function (event) { return ExtraQuestion3_SetValue(event.currentTarget.value); }, hidden: ExtraQuestion3_Hidden }),
            React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Your Answer', value: Answer3_Value, labelWidth: lw, textWidth: tw, maxLength: 100, onChange: function (event) { return Answer3_SetValue(event.currentTarget.value); } })),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { disabled: BnSave_Enabled, title: 'Save', onClick: function (event) {
                var _a, _b;
                var error = '';
                if (((_a = TbEmail.current) === null || _a === void 0 ? void 0 : _a.value) === '' || ((_b = TbEmail.current) === null || _b === void 0 ? void 0 : _b.checkValidity()) === false) {
                    error = 'Email field incorrect. ';
                }
                if (ExtraQuestion1_Hidden === false && ExtraQuestion1_Value === '') {
                    error += 'Extra Question 1 is incomplete. ';
                }
                if (Combo1_Value != '0' && Answer1_Value === '') {
                    error += 'Answer 1 is incomplete. ';
                }
                if (ExtraQuestion2_Hidden === false && ExtraQuestion2_Value === '') {
                    error += 'Extra Question 2 is incomplete. ';
                }
                if (Combo2_Value != '0' && Answer2_Value === '') {
                    error += 'Answer 2 is incomplete. ';
                }
                if (ExtraQuestion3_Hidden === false && ExtraQuestion3_Value === '') {
                    error += 'Extra Question 3 is incomplete. ';
                }
                if (Combo3_Value != '0' && Answer3_Value === '') {
                    error += 'Answer 3 is incomplete. ';
                }
                if (error != '') {
                    Functions_1.Utils.validateData(Dispatch, error, error);
                }
                else {
                    Dispatch(UserSettingAction_1.UserSetting_Action_Save_Tab_RecoverySetting(State.ObjELSUser, Email_Value, Combo1_Value, ExtraQuestion1_Value, Answer1_Value, Combo2_Value, ExtraQuestion2_Value, Answer2_Value, Combo3_Value, ExtraQuestion3_Value, Answer3_Value));
                }
            } })));
};
exports.UserSetting_RecoverySetting_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('RecoverySetting'); //   '/UserSetting_RecoverySetting'
exports.default = UserSetting_RecoverySetting;
//# sourceMappingURL=UserSetting_RecoverySetting.js.map