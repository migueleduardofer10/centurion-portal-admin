import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSetting_Action_FindELSUser, UserSetting_Action_Save_Tab_General } from '../../store/actions/users/UserSettingAction'
import { Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2'
import { UserSetting_StateObject } from '../../store/stores/users/UserSettingStore'
import { UserSetting_FormControl_FxButton, UserSetting_FormControl_FxLabel, UserSetting_FormControl_Text_FxEmail, UserSetting_Tab } from './UserSetting'



const UserSetting_General = () => {

    const state = useSelector(UserSetting_StateObject)
    const dispatch = useDispatch()
  

    React.useEffect( () => {
        
        dispatch(UserSetting_Action_FindELSUser(
           (objIELSUser) => {

                TbEmail_SetValue(objIELSUser?.Email!)
        }))
         
        BnSave_SetDisabled(true)

    }, [])

    


    const [BnSave_Disabled, BnSave_SetDisabled] = React.useState<boolean>(true)
    const [TbEmail_Value, TbEmail_SetValue] = React.useState<string>('')
    const TbEmail = React.useRef<HTMLInputElement>(null)
    let labelWidth = '5em'
    let textWidth = '18em'

    return (
        <UserSetting_Tab TabUrl={UserSetting_General_Url}>
           
            <UserSetting_FormControl_FxLabel label='Type' value={state.ObjELSUser?.UserType_ToSring!} labelWidth={labelWidth} textWidth={textWidth}/>

            <UserSetting_FormControl_FxLabel label='Login' value={ state.ObjELSUser?.Username!} labelWidth={labelWidth} textWidth={textWidth}/>

            <UserSetting_FormControl_FxLabel label='Name' value={ state.ObjELSUser?.FullName!} labelWidth={labelWidth} textWidth={textWidth}/>

            <UserSetting_FormControl_Text_FxEmail
                label='Email' value={TbEmail_Value} labelWidth={labelWidth} textWidth={textWidth}
                maxLength={50} onChange={event => {
                
                if (event.currentTarget.value.trim() != '' &&
                    event.currentTarget.checkValidity() &&
                    event.currentTarget.value.toUpperCase() != state.ObjELSUser?.Email!.toUpperCase()) {
                    BnSave_SetDisabled(false)
                }
                else {
                    BnSave_SetDisabled(true)
                }

                TbEmail_SetValue(event.currentTarget.value)
            }}/>

            <UserSetting_FormControl_FxButton disabled={BnSave_Disabled} title='Save' onClick={event => {


                dispatch(UserSetting_Action_Save_Tab_General( TbEmail_Value, (email) => {
                    TbEmail_SetValue(email)
                }))

            }
            }/>

           

        </UserSetting_Tab>
    )
}



export let UserSetting_General_Url = Utilities_Url_CreateUniquePath( `UserSetting_General`)

export default UserSetting_General