"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetting_PersonalInformation_Url = void 0;
var kendo_react_upload_1 = require("@progress/kendo-react-upload");
var React = require("react");
var react_redux_1 = require("react-redux");
var UserSettingAction_1 = require("../../store/actions/users/UserSettingAction");
var LenderCommon2_1 = require("../../store/commons/LenderCommon2");
var UserSettingStore_1 = require("../../store/stores/users/UserSettingStore");
var Functions_1 = require("../../utilities/Functions");
var UserSetting_1 = require("./UserSetting");
var UserSetting_PersonalInformation = function () {
    var _a, _b, _c, _d;
    var State = react_redux_1.useSelector(UserSettingStore_1.UserSetting_StateObject);
    var Dispatch = react_redux_1.useDispatch();
    var Title = 'User Setting';
    var _e = React.useState(''), FirstName_Value = _e[0], FirstName_SetValue = _e[1];
    var _f = React.useState(''), LastName_Value = _f[0], LastName_SetValue = _f[1];
    var _g = React.useState(''), Address1_Value = _g[0], Address1_SetValue = _g[1];
    var _h = React.useState(''), Address2_Value = _h[0], Address2_SetValue = _h[1];
    var _j = React.useState(''), Title_Value = _j[0], Title_SetValue = _j[1];
    var _k = React.useState(''), Ext_Value = _k[0], Ext_SetValue = _k[1];
    var _l = React.useState(''), HomePhone_Value = _l[0], HomePhone_SetValue = _l[1];
    var _m = React.useState(''), MobilePhone_Value = _m[0], MobilePhone_SetValue = _m[1];
    var _o = React.useState(''), Email_Value = _o[0], Email_SetValue = _o[1];
    var _p = React.useState(true), FirstTime = _p[0], FirstTime_Set = _p[1];
    var labelWidth = '7em';
    var textWidth1 = '12em';
    var textWidth2 = '18em';
    var TbEmail = React.useRef(null);
    var _q = React.useState(true), BnSave_Disabled = _q[0], BnSave_SetDisabled = _q[1];
    var _r = React.useState(''), PhotoNew_Value = _r[0], PhotoNew_SetValue = _r[1];
    var _s = React.useState(''), PhotoActually_Value = _s[0], PhotoActually_SetValue = _s[1];
    var SetInitialValues = function (obj) {
        FirstName_SetValue(obj.FirstName);
        LastName_SetValue(obj.LastName);
        Address1_SetValue(obj.Address1);
        Address2_SetValue(obj.Address2);
        Title_SetValue(obj.Title);
        Ext_SetValue(obj.Ext);
        HomePhone_SetValue(obj.HomePhone);
        MobilePhone_SetValue(obj.MobilePhone);
        Email_SetValue(obj.Email);
    };
    React.useEffect(function () {
        BnSave_SetDisabled(false);
        if (FirstTime === true) {
            Dispatch(UserSettingAction_1.UserSetting_Action_FindELSUser(function (obj) {
                FirstTime_Set(false);
                SetInitialValues(obj);
            }));
            Dispatch(UserSettingAction_1.UserSetting_Action_Tab_PersonalInformation_GetCurrentPhoto(200, 200, function (image) {
                PhotoActually_SetValue(image);
            }));
        }
        var obj = State.ObjELSUser;
        if (obj.FirstName != FirstName_Value || obj.LastName != LastName_Value ||
            obj.Address1 != Address1_Value || obj.Address2 != Address2_Value ||
            obj.Title != Title_Value ||
            obj.Ext != Ext_Value ||
            obj.HomePhone != HomePhone_Value || obj.MobilePhone != MobilePhone_Value ||
            obj.Email != Email_Value ||
            PhotoNew_Value != '') {
            BnSave_SetDisabled(false);
        }
        else {
            BnSave_SetDisabled(true);
        }
    }, [FirstName_Value, LastName_Value, Address1_Value, Address2_Value,
        Title_Value, Ext_Value, HomePhone_Value, MobilePhone_Value, Email_Value, PhotoNew_Value]);
    var _t = React.useState(''), Upload_Status = _t[0], Upload_SetStatus = _t[1];
    var ObjUpload = React.useRef(null);
    return (React.createElement(UserSetting_1.UserSetting_Tab, { TabUrl: exports.UserSetting_PersonalInformation_Url },
        React.createElement("div", null,
            React.createElement(UserSetting_1.UserSetting_Card, { title: 'Photo', width: '300px', className: 'mb-2 mr-2  d-inline-flex ', cardBodyClassName: 'p-1 d-flex flex-column align-items-center' },
                React.createElement("img", { width: '200', height: '200', src: PhotoNew_Value === '' ? PhotoActually_Value : PhotoNew_Value, className: 'm-1 img-thumbnail' }),
                React.createElement(kendo_react_upload_1.Upload, { ref: ObjUpload, className: ' w-100', batch: false, multiple: false, defaultFiles: [], withCredentials: false, showActionButtons: true, restrictions: { allowedExtensions: ['.jpg', '.png'], maxFileSize: 1000000 }, saveUrl: "api/ELSUser/updatePersonalInformation_NewPhoto_Add", removeUrl: "api/ELSUser/updatePersonalInformation_NewPhoto_Remove", saveHeaders: { Authorization: "Bearer " + Functions_1.Auth.getJWT() }, removeHeaders: { Authorization: "Bearer " + Functions_1.Auth.getJWT() }, onAdd: function (event) {
                        event.affectedFiles
                            .filter(function (file) { return !file.validationErrors; })
                            .forEach(function (file) {
                            var reader = new FileReader();
                            reader.onloadend = function (reader_event) {
                                var _a;
                                PhotoNew_SetValue((_a = reader_event.target) === null || _a === void 0 ? void 0 : _a.result);
                            };
                            reader.readAsDataURL(file.getRawFile());
                        });
                    }, onRemove: function (event) {
                        PhotoNew_SetValue('');
                    }, onStatusChange: function (event) {
                        switch (event.affectedFiles[0].status) {
                            case kendo_react_upload_1.UploadFileStatus.Uploading:
                                Upload_SetStatus('Uploading');
                                break;
                            //case UploadFileStatus.Removing:
                            //    Upload_SetStatus('Removing')
                            //    break;
                            //case UploadFileStatus.Selected:
                            //    Upload_SetStatus('Selected');
                            //    break
                            default:
                                Upload_SetStatus('');
                                break;
                        }
                        //console.log('statuss', 'x' + Upload_Status + ' ' + event.affectedFiles[0].status)
                    } })),
            React.createElement(UserSetting_1.UserSetting_Card, { title: 'Personal Information', className: 'mb-2 mr-2 d-inline-flex', cardBodyClassName: 'p-1' },
                React.createElement("div", { className: 'd-inline-block ' },
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxLabel, { label: 'User Name', value: (_a = State.ObjELSUser) === null || _a === void 0 ? void 0 : _a.Username, labelWidth: labelWidth, textWidth: textWidth1 }),
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'First Name', value: FirstName_Value, labelWidth: labelWidth, textWidth: textWidth1, maxLength: 30, onChange: function (event) { return FirstName_SetValue(event.currentTarget.value); } }),
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Last Name', value: LastName_Value, labelWidth: labelWidth, textWidth: textWidth1, maxLength: 60, onChange: function (event) { return LastName_SetValue(event.currentTarget.value); } }),
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Address 1', value: Address1_Value, labelWidth: labelWidth, textWidth: textWidth2, maxLength: 50, onChange: function (event) { return Address1_SetValue(event.currentTarget.value); } }),
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Address 2', value: Address2_Value, labelWidth: labelWidth, textWidth: textWidth2, maxLength: 50, onChange: function (event) { return Address2_SetValue(event.currentTarget.value); } })),
                React.createElement("div", { className: 'd-inline-block' },
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Title', value: Title_Value, labelWidth: labelWidth, textWidth: textWidth1, maxLength: 40, onChange: function (event) { return Title_SetValue(event.currentTarget.value); } }),
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Ext', value: Ext_Value, labelWidth: labelWidth, textWidth: textWidth1, maxLength: 5, onChange: function (event) { return Ext_SetValue(event.currentTarget.value); } }))),
            React.createElement(UserSetting_1.UserSetting_Card, { title: 'Contact Information', className: 'mb-2 mr-2 d-inline-flex', cardBodyClassName: 'p-1' },
                React.createElement("div", { className: 'd-inline-block ' },
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Home Phone', value: HomePhone_Value, labelWidth: labelWidth, textWidth: textWidth1, maxLength: 30, onChange: function (event) { return HomePhone_SetValue(event.currentTarget.value); } }),
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Mobile Phone', value: MobilePhone_Value, labelWidth: labelWidth, textWidth: textWidth1, maxLength: 30, onChange: function (event) { return MobilePhone_SetValue(event.currentTarget.value); } }),
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxText, { label: 'Email', value: Email_Value, labelWidth: labelWidth, textWidth: textWidth2, maxLength: 100, onChange: function (event) { return Email_SetValue(event.currentTarget.value); } })),
                React.createElement("div", { className: 'd-inline-block  ' },
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxLabel, { label: 'Last login', value: (_b = State.ObjELSUser) === null || _b === void 0 ? void 0 : _b.LastLogin, labelWidth: labelWidth, textWidth: textWidth1 }),
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxLabel, { label: 'Last logout', value: (_c = State.ObjELSUser) === null || _c === void 0 ? void 0 : _c.LastLogout, labelWidth: labelWidth, textWidth: textWidth1 }),
                    React.createElement(UserSetting_1.UserSetting_FormControl_FxLabel, { label: 'Last login IP', value: (_d = State.ObjELSUser) === null || _d === void 0 ? void 0 : _d.LoggedIP, labelWidth: labelWidth, textWidth: textWidth1 })))),
        React.createElement(UserSetting_1.UserSetting_FormControl_FxButton, { title: 'Save', disabled: BnSave_Disabled, onClick: function (event) {
                var _a, _b;
                if (Upload_Status != '') {
                    Functions_1.Utils.validateData(Dispatch, 'The user photo is ' + Upload_Status, Title);
                }
                else if (((_a = TbEmail.current) === null || _a === void 0 ? void 0 : _a.value) != "" && ((_b = TbEmail.current) === null || _b === void 0 ? void 0 : _b.checkValidity()) === false) {
                    Functions_1.Utils.validateData(Dispatch, 'Email field incorrect', Title);
                }
                else {
                    Dispatch(UserSettingAction_1.UserSetting_Action_Save_Tab_PersonalInformation(State.ObjELSUser, FirstName_Value, LastName_Value, Address1_Value, Address2_Value, Title_Value, Ext_Value, HomePhone_Value, MobilePhone_Value, Email_Value, function (obj) {
                        var _a;
                        SetInitialValues(obj);
                        BnSave_SetDisabled(true);
                        PhotoActually_SetValue(PhotoNew_Value);
                        PhotoNew_SetValue('');
                        (_a = ObjUpload.current) === null || _a === void 0 ? void 0 : _a.onClear();
                    }));
                }
            } })));
};
exports.UserSetting_PersonalInformation_Url = LenderCommon2_1.Utilities_Url_CreateUniquePath('UserSetting_PersonalInformation'); // '/UserSetting_PersonalInformation'
exports.default = UserSetting_PersonalInformation;
//# sourceMappingURL=UserSetting_PersonalInformation.js.map