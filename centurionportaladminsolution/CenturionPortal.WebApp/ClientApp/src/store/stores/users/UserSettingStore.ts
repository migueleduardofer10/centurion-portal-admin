import { ApplicationState } from "../..";
import { IComboBoxDataSource } from "../../../components/shared/customIEntities/IComboBoxDataSource";
import { IELSUser } from "../../../components/shared/dataBaseIEntities/IELSUser";
import { UserSetting_Interface_SetComboQuestions, UserSetting_Interface_SetEmail, UserSetting_Interface_SetObjELSUser, UserSetting_Type_SetComboQuestions, UserSetting_Type_SetEmail, UserSetting_Type_SetObjELSUser } from "../../actions/users/UserSettingAction";

export interface UserSetting_StateDefinition {
    ObjELSUser: IELSUser,


    ComboBox_Question1: IComboBoxDataSource[],
    ComboBox_Question2: IComboBoxDataSource[],
    ComboBox_Question3: IComboBoxDataSource[],

}


export const UserSetting_Reducer = (
    state: UserSetting_StateDefinition = {
        ObjELSUser: {},
        ComboBox_Question1: [],
        ComboBox_Question2: [],
        ComboBox_Question3: []
    },
    action: UserSetting_Interface_SetObjELSUser | UserSetting_Interface_SetEmail | UserSetting_Interface_SetComboQuestions
): UserSetting_StateDefinition => {


    switch (action.type) {

        case UserSetting_Type_SetObjELSUser:
            {
                let x = action as UserSetting_Interface_SetObjELSUser
                return { ...state, ObjELSUser: x.ObjELSUser }
            }
        case UserSetting_Type_SetEmail:
            {
                let x = action as UserSetting_Interface_SetEmail
                return {
                    ...state, ObjELSUser: { ...state.ObjELSUser, Email: x.Email } as IELSUser
                }
            }
        case UserSetting_Type_SetComboQuestions:
            {
                let x = action as UserSetting_Interface_SetComboQuestions
                return {
                    ...state,
                    ComboBox_Question1: x.Combo1, ComboBox_Question2: x.Combo2, ComboBox_Question3: x.Combo3
                }
            }

        default: return state
    }


}



export const UserSetting_StateObject = (state: ApplicationState): UserSetting_StateDefinition => state.userSetting


export default UserSetting_Reducer
