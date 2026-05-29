import { Action } from "redux";
import { AppThunkAction } from "../..";
import { IComboBoxDataSource } from "../../../components/shared/customIEntities/IComboBoxDataSource";
import { IELSUser } from "../../../components/shared/dataBaseIEntities/IELSUser";
import { IELSServiceMap } from "../../../components/shared/dataBaseIEntities/IELSServiceMap";
import { Auth, GlobalAnimation_Loaded, GlobalAnimation_Loading, Notify, Utils } from "../../../utilities/Functions";
import { BackEndResult3, BackEndResult4, Utilities_Convert_NullToString, Utilities_Convert_StringToStringDateTimeFormat, Utilities_DefaultOneSpace, Utilities_DefaultCero } from "../../commons/LenderCommon2";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Type = 'UserSetting_Action/'
const Title = 'User Setting'





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UserSetting_Type_SetObjELSUser = Type + 'SetObjElsUser'
export interface UserSetting_Interface_SetObjELSUser
    extends Action<typeof UserSetting_Type_SetObjELSUser> {
    ObjELSUser: IELSUser
}
export const UserSetting_Action_SetObjELSUser =
    (objELSUser: IELSUser):
        UserSetting_Interface_SetObjELSUser => ({
            type: UserSetting_Type_SetObjELSUser,
            ObjELSUser: objELSUser
        })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UserSetting_Type_SetEmail = Type + 'SetEmail'
export interface UserSetting_Interface_SetEmail
    extends Action<typeof UserSetting_Type_SetEmail> {
    Email: string
}
export const UserSetting_Action_SetEmail =
    (email: string):
        UserSetting_Interface_SetEmail => ({
            type: UserSetting_Type_SetEmail,
            Email: email
        })


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UserSetting_Type_SetComboQuestions = Type + 'SetComboQuestions'
export interface UserSetting_Interface_SetComboQuestions
    extends Action<typeof UserSetting_Type_SetComboQuestions> {
    Combo1: IComboBoxDataSource[],
    Combo2: IComboBoxDataSource[],
    Combo3: IComboBoxDataSource[]
}
export const UserSetting_Action_SetComboQuestions =
    (combo1: IComboBoxDataSource[], combo2: IComboBoxDataSource[], combo3: IComboBoxDataSource[]):
        UserSetting_Interface_SetComboQuestions => ({
            type: UserSetting_Type_SetComboQuestions,
            Combo1: combo1,
            Combo2: combo2,
            Combo3: combo3
        })
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UserSetting_Action_FindELSUser =
    (afterActions?: (obj: IELSUser) => void):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())


            fetch(`api/ELSUser/getByUid/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: BackEndResult3<IELSUser>) => {



                    let combo1: IComboBoxDataSource[] = [
                        { Key: '0', Value: ' - Select One -' },
                        { Key: '1', Value: 'What is the first name of your favorite aunt?' },
                        { Key: '2', Value: 'What is the first name of your favorite uncle?' },
                        { Key: '3', Value: `What is your oldest child's nickname?` },
                        { Key: '4', Value: `What is your youngest child's nickname?` },
                        { Key: '5', Value: 'Where did you meet your spouse?' },
                        { Key: '6', Value: 'Where did you spend your honeymoon?' },
                        { Key: '-1', Value: ' - Type your own Question -' }
                    ]
                    let combo2: IComboBoxDataSource[] = [
                        { Key: '0', Value: ' - Select One -' },
                        { Key: '1', Value: 'What is the name of your favorite book?' },
                        { Key: '2', Value: 'What is your favorite sports team?' },
                        { Key: '3', Value: 'What was the make of your first car?' },
                        { Key: '4', Value: `What was your first pet's name?` },
                        { Key: '5', Value: 'Who is your favorite author?' },
                        { Key: '6', Value: 'Who is your favorite movie character?' },
                        { Key: '7', Value: 'Who is your favorite musician?' },
                        { Key: '-1', Value: ' - Type your own Question -' }
                    ]
                    let combo3: IComboBoxDataSource[] = [
                        { Key: '0', Value: ' - Select One -' },
                        { Key: '1', Value: 'What is your favorite movie?' },
                        { Key: '2', Value: `What is your oldest cousin's name?` },
                        { Key: '3', Value: 'What town was your father born in?' },
                        { Key: '4', Value: 'What town was your mother born in?' },
                        { Key: '5', Value: 'What was your favorite food as a child?' },
                        { Key: '6', Value: 'Where did you spend your childhood summers?' },
                        { Key: '-1', Value: ' - Type your own Question -' }
                    ]
                    dispatch(UserSetting_Action_SetComboQuestions(combo1, combo2, combo3))

                    let objIELUser = data.ObjOptional

                    objIELUser = {
                        ...objIELUser,
                        Question1: Utilities_Convert_NullToString(objIELUser.Question1!, '0'),
                        Question1String: Utilities_Convert_NullToString(objIELUser.Question1String!),
                        Answer1: Utilities_Convert_NullToString(objIELUser.Answer1!),

                        Question2: Utilities_Convert_NullToString(objIELUser.Question2!, '0'),
                        Question2String: Utilities_Convert_NullToString(objIELUser.Question2String!),
                        Answer2: Utilities_Convert_NullToString(objIELUser.Answer2!),

                        Question3: Utilities_Convert_NullToString(objIELUser.Question3!, '0'),
                        Question3String: Utilities_Convert_NullToString(objIELUser.Question3String!),
                        Answer3: Utilities_Convert_NullToString(objIELUser.Answer3!),

                        LastLogin: Utilities_Convert_StringToStringDateTimeFormat(objIELUser.LastLogin),
                        LastLogout: Utilities_Convert_StringToStringDateTimeFormat(objIELUser.LastLogout)
                    }

                    dispatch(UserSetting_Action_SetObjELSUser(objIELUser))

                    if (afterActions) {
                        afterActions(objIELUser)
                    }


                    dispatch(GlobalAnimation_Loaded())
                })
                .catch(error => {
                    Utils.validateData(dispatch, error, Title)
                })



        }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UserSetting_Action_Save_Tab_General =
    (newEmail: string, afterActions?: (email: string) => void):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())


            dispatch(UserSetting_Action_SetObjELSUser({}))


            fetch(`api/ELSUser/updateEmail/${newEmail}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: any) => {

                    dispatch(UserSetting_Action_SetEmail(newEmail))

                    if (afterActions) {
                        afterActions(newEmail)
                    }



                    dispatch(GlobalAnimation_Loaded())

                    Notify.success("Email Updated", Title);
                })
                .catch(error => {
                    Utils.validateData(dispatch, error, Title)
                })



        }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UserSetting_Action_Tab_PersonalInformation_GetCurrentPhoto = (
    width:number,height:number,
afterAction:(image:any)=>void
): AppThunkAction<Action> => (dispatch) => {

    dispatch(GlobalAnimation_Loading())




    fetch(`api/ELSUser/personalInformation_CurrentPhoto/${width}/${height}`,
        {
            method: 'GET',
            headers: {
                //'Accept': 'application/json',
                //'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }

        }).then(res => res.blob())
        .then((data: Blob) => {
            
            
            let image =URL.createObjectURL(data)

            afterAction(image) 
        })
        .catch(error => {

            Utils.validateData(dispatch, error, Title)
        })



}


export const UserSetting_Action_Save_Tab_PersonalInformation =
    (
        objIELSUser: IELSUser,
        firstName: string, lastName: string,
        address1: string, address2: string,
        title: string, ext: string,
        homePhone: string, mobilePhone: string,
        email: string,
        afterActions: (obj: IELSUser) => void
    ):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())

             
            let url = `api/ELSUser/updatePersonalInformation/${Utilities_DefaultOneSpace(firstName)}/${Utilities_DefaultOneSpace(lastName)}/${Utilities_DefaultOneSpace(address1)}/${Utilities_DefaultOneSpace(address2)}/${Utilities_DefaultOneSpace(title)}/${Utilities_DefaultOneSpace(ext)}/${Utilities_DefaultOneSpace(homePhone)}/${Utilities_DefaultOneSpace(mobilePhone)}/${Utilities_DefaultOneSpace(email)}`
            console.log('url',url)
            fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }).then(res => res.json())
                .then((data: any) => {

                    let obj: IELSUser = {
                        ...objIELSUser, FirstName: firstName,
                        LastName: lastName, Address1: address1, Address2: address2,
                        Title: title, Ext: ext, HomePhone: homePhone, MobilePhone: mobilePhone,
                        Email: email
                    }


                    dispatch(UserSetting_Action_SetObjELSUser(obj))

                    afterActions(obj)

                    dispatch(GlobalAnimation_Loaded())

                    Notify.success("Personal Information Updated", Title);
                })
                .catch(error => {

                    Utils.validateData(dispatch, error, Title)
                })



        }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UserSetting_Action_Save_Tab_RecoverySetting =
    (
        objIELSUser: IELSUser,
        email: string,
        question1: string, question1String: string, answer1: string,
        question2: string, question2String: string, answer2: string,
        question3: string, question3String: string, answer3: string
    ):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())



            fetch(`api/ELSUser/updateRecoverySetting/` +
                `${email}/` +
                `${Utilities_DefaultCero(question1)}/${Utilities_DefaultOneSpace(question1String)}/${Utilities_DefaultOneSpace(answer1)}/` +
                `${Utilities_DefaultCero(question2)}/${Utilities_DefaultOneSpace(question2String)}/${Utilities_DefaultOneSpace(answer2)}/` +
                `${Utilities_DefaultCero(question3)}/${Utilities_DefaultOneSpace(question3String)}/${Utilities_DefaultOneSpace(answer3)}/`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }).then(res => res.json())
                .then((data: any) => {

                    let newObj: IELSUser = {
                        ...objIELSUser, Email: email,
                        Question1: question1,
                        Question1String: question1String,
                        Answer1: answer1,
                        Question2: question2,
                        Question2String: question2String,
                        Answer2: answer2,
                        Question3: question3,
                        Question3String: question3String,
                        Answer3: answer3
                    }


                    dispatch(UserSetting_Action_SetObjELSUser(newObj))



                    dispatch(GlobalAnimation_Loaded())

                    Notify.success("Recovery Settings Updated", Title);


                })
                .catch(error => {

                    Utils.validateData(dispatch, error, Title)
                })



        }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UserSetting_Action_Save_Tab_ChangePassword =
    (

        currentPassword: string, newPassword: string, confirmPassword: string,
        afterActions: () => void
    ):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())



            fetch(`api/ELSUser/updatePassword/${currentPassword}/${newPassword}/${confirmPassword}/`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }).then(res => res.json())
                .then((data: BackEndResult4) => {

                    dispatch(GlobalAnimation_Loaded())

                    if (data.IsSuccess) {

                        afterActions()

                        Notify.success("Password is Updated", Title);

                    }
                    else {
                        Notify.error(data.Message, Title);
                    }
                })
                .catch(error => {
                    Utils.validateData(dispatch, error, Title)
                })



        }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UserSetting_Action_Tab_Account =
    (
        afterActions: (data: IComboBoxDataSource[]) => void
    ):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())



            fetch(`api/ELSUser/getAccount_AccountFullName/`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Auth.getJWT()}`
                    }
                }).then(res => res.json())
                .then((data: BackEndResult3<IELSServiceMap[]>) => {

                    dispatch(GlobalAnimation_Loaded())

                    afterActions(data.ObjOptional.map(x => ({ Key: x.Account, Value: x.Account + ' - ' + x.FullName } as IComboBoxDataSource)))

                    dispatch(GlobalAnimation_Loaded());
                })
                .catch(error => {
                    Utils.validateData(dispatch, error, Title)
                })



        }
