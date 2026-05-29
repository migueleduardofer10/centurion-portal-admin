"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetting_Action_Tab_Account = exports.UserSetting_Action_Save_Tab_ChangePassword = exports.UserSetting_Action_Save_Tab_RecoverySetting = exports.UserSetting_Action_Save_Tab_PersonalInformation = exports.UserSetting_Action_Tab_PersonalInformation_GetCurrentPhoto = exports.UserSetting_Action_Save_Tab_General = exports.UserSetting_Action_FindELSUser = exports.UserSetting_Action_SetComboQuestions = exports.UserSetting_Type_SetComboQuestions = exports.UserSetting_Action_SetEmail = exports.UserSetting_Type_SetEmail = exports.UserSetting_Action_SetObjELSUser = exports.UserSetting_Type_SetObjELSUser = void 0;
var Functions_1 = require("../../../utilities/Functions");
var LenderCommon2_1 = require("../../commons/LenderCommon2");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Type = 'UserSetting_Action/';
var Title = 'User Setting';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UserSetting_Type_SetObjELSUser = Type + 'SetObjElsUser';
exports.UserSetting_Action_SetObjELSUser = function (objELSUser) { return ({
    type: exports.UserSetting_Type_SetObjELSUser,
    ObjELSUser: objELSUser
}); };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UserSetting_Type_SetEmail = Type + 'SetEmail';
exports.UserSetting_Action_SetEmail = function (email) { return ({
    type: exports.UserSetting_Type_SetEmail,
    Email: email
}); };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UserSetting_Type_SetComboQuestions = Type + 'SetComboQuestions';
exports.UserSetting_Action_SetComboQuestions = function (combo1, combo2, combo3) { return ({
    type: exports.UserSetting_Type_SetComboQuestions,
    Combo1: combo1,
    Combo2: combo2,
    Combo3: combo3
}); };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UserSetting_Action_FindELSUser = function (afterActions) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch("api/ELSUser/getByUid/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        var combo1 = [
            { Key: '0', Value: ' - Select One -' },
            { Key: '1', Value: 'What is the first name of your favorite aunt?' },
            { Key: '2', Value: 'What is the first name of your favorite uncle?' },
            { Key: '3', Value: "What is your oldest child's nickname?" },
            { Key: '4', Value: "What is your youngest child's nickname?" },
            { Key: '5', Value: 'Where did you meet your spouse?' },
            { Key: '6', Value: 'Where did you spend your honeymoon?' },
            { Key: '-1', Value: ' - Type your own Question -' }
        ];
        var combo2 = [
            { Key: '0', Value: ' - Select One -' },
            { Key: '1', Value: 'What is the name of your favorite book?' },
            { Key: '2', Value: 'What is your favorite sports team?' },
            { Key: '3', Value: 'What was the make of your first car?' },
            { Key: '4', Value: "What was your first pet's name?" },
            { Key: '5', Value: 'Who is your favorite author?' },
            { Key: '6', Value: 'Who is your favorite movie character?' },
            { Key: '7', Value: 'Who is your favorite musician?' },
            { Key: '-1', Value: ' - Type your own Question -' }
        ];
        var combo3 = [
            { Key: '0', Value: ' - Select One -' },
            { Key: '1', Value: 'What is your favorite movie?' },
            { Key: '2', Value: "What is your oldest cousin's name?" },
            { Key: '3', Value: 'What town was your father born in?' },
            { Key: '4', Value: 'What town was your mother born in?' },
            { Key: '5', Value: 'What was your favorite food as a child?' },
            { Key: '6', Value: 'Where did you spend your childhood summers?' },
            { Key: '-1', Value: ' - Type your own Question -' }
        ];
        dispatch(exports.UserSetting_Action_SetComboQuestions(combo1, combo2, combo3));
        var objIELUser = data.ObjOptional;
        objIELUser = __assign(__assign({}, objIELUser), { Question1: LenderCommon2_1.Utilities_Convert_NullToString(objIELUser.Question1, '0'), Question1String: LenderCommon2_1.Utilities_Convert_NullToString(objIELUser.Question1String), Answer1: LenderCommon2_1.Utilities_Convert_NullToString(objIELUser.Answer1), Question2: LenderCommon2_1.Utilities_Convert_NullToString(objIELUser.Question2, '0'), Question2String: LenderCommon2_1.Utilities_Convert_NullToString(objIELUser.Question2String), Answer2: LenderCommon2_1.Utilities_Convert_NullToString(objIELUser.Answer2), Question3: LenderCommon2_1.Utilities_Convert_NullToString(objIELUser.Question3, '0'), Question3String: LenderCommon2_1.Utilities_Convert_NullToString(objIELUser.Question3String), Answer3: LenderCommon2_1.Utilities_Convert_NullToString(objIELUser.Answer3), LastLogin: LenderCommon2_1.Utilities_Convert_StringToStringDateTimeFormat(objIELUser.LastLogin), LastLogout: LenderCommon2_1.Utilities_Convert_StringToStringDateTimeFormat(objIELUser.LastLogout) });
        dispatch(exports.UserSetting_Action_SetObjELSUser(objIELUser));
        if (afterActions) {
            afterActions(objIELUser);
        }
        dispatch(Functions_1.GlobalAnimation_Loaded());
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UserSetting_Action_Save_Tab_General = function (newEmail, afterActions) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    dispatch(exports.UserSetting_Action_SetObjELSUser({}));
    fetch("api/ELSUser/updateEmail/" + newEmail, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        dispatch(exports.UserSetting_Action_SetEmail(newEmail));
        if (afterActions) {
            afterActions(newEmail);
        }
        dispatch(Functions_1.GlobalAnimation_Loaded());
        Functions_1.Notify.success("Email Updated", Title);
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UserSetting_Action_Tab_PersonalInformation_GetCurrentPhoto = function (width, height, afterAction) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch("api/ELSUser/personalInformation_CurrentPhoto/" + width + "/" + height, {
        method: 'GET',
        headers: {
            //'Accept': 'application/json',
            //'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.blob(); })
        .then(function (data) {
        var image = URL.createObjectURL(data);
        afterAction(image);
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
exports.UserSetting_Action_Save_Tab_PersonalInformation = function (objIELSUser, firstName, lastName, address1, address2, title, ext, homePhone, mobilePhone, email, afterActions) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    var url = "api/ELSUser/updatePersonalInformation/" + LenderCommon2_1.Utilities_DefaultOneSpace(firstName) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(lastName) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(address1) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(address2) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(title) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(ext) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(homePhone) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(mobilePhone) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(email);
    console.log('url', url);
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        var obj = __assign(__assign({}, objIELSUser), { FirstName: firstName, LastName: lastName, Address1: address1, Address2: address2, Title: title, Ext: ext, HomePhone: homePhone, MobilePhone: mobilePhone, Email: email });
        dispatch(exports.UserSetting_Action_SetObjELSUser(obj));
        afterActions(obj);
        dispatch(Functions_1.GlobalAnimation_Loaded());
        Functions_1.Notify.success("Personal Information Updated", Title);
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UserSetting_Action_Save_Tab_RecoverySetting = function (objIELSUser, email, question1, question1String, answer1, question2, question2String, answer2, question3, question3String, answer3) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch("api/ELSUser/updateRecoverySetting/" +
        (email + "/") +
        (LenderCommon2_1.Utilities_DefaultCero(question1) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(question1String) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(answer1) + "/") +
        (LenderCommon2_1.Utilities_DefaultCero(question2) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(question2String) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(answer2) + "/") +
        (LenderCommon2_1.Utilities_DefaultCero(question3) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(question3String) + "/" + LenderCommon2_1.Utilities_DefaultOneSpace(answer3) + "/"), {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        var newObj = __assign(__assign({}, objIELSUser), { Email: email, Question1: question1, Question1String: question1String, Answer1: answer1, Question2: question2, Question2String: question2String, Answer2: answer2, Question3: question3, Question3String: question3String, Answer3: answer3 });
        dispatch(exports.UserSetting_Action_SetObjELSUser(newObj));
        dispatch(Functions_1.GlobalAnimation_Loaded());
        Functions_1.Notify.success("Recovery Settings Updated", Title);
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UserSetting_Action_Save_Tab_ChangePassword = function (currentPassword, newPassword, confirmPassword, afterActions) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch("api/ELSUser/updatePassword/" + currentPassword + "/" + newPassword + "/" + confirmPassword + "/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        dispatch(Functions_1.GlobalAnimation_Loaded());
        if (data.IsSuccess) {
            afterActions();
            Functions_1.Notify.success("Password is Updated", Title);
        }
        else {
            Functions_1.Notify.error(data.Message, Title);
        }
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UserSetting_Action_Tab_Account = function (afterActions) { return function (dispatch) {
    dispatch(Functions_1.GlobalAnimation_Loading());
    fetch("api/ELSUser/getAccount_AccountFullName/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + Functions_1.Auth.getJWT()
        }
    }).then(function (res) { return res.json(); })
        .then(function (data) {
        dispatch(Functions_1.GlobalAnimation_Loaded());
        afterActions(data.ObjOptional.map(function (x) { return ({ Key: x.Account, Value: x.Account + ' - ' + x.FullName }); }));
        dispatch(Functions_1.GlobalAnimation_Loaded());
    })
        .catch(function (error) {
        Functions_1.Utils.validateData(dispatch, error, Title);
    });
}; };
//# sourceMappingURL=UserSettingAction.js.map