import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSetting_Action_Save_Tab_ChangePassword } from '../../store/actions/users/UserSettingAction'
import { Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2'
import { UserSetting_StateObject } from '../../store/stores/users/UserSettingStore'
import { Utils } from '../../utilities/Functions'
import { UserSetting_FormControl_FxButton, UserSetting_FormControl_FxText, UserSetting_Tab } from './UserSetting'


const UserSetting_ChangePassword = () => {


    const State = useSelector(UserSetting_StateObject)
    const Dispatch = useDispatch()

   
    const [CurrentPassword_Value, CurrentPassword_SetValue] = React.useState<string>('')
    const [NewPassword_Value, NewPassword_SetValue] = React.useState('')
    const [ConfirmPassword_Value, ConfirmPassword_SetValue] = React.useState('')


    const CurrentPassword = React.useRef < HTMLInputElement>(null)
    const NewPassword = React.useRef<HTMLInputElement>(null)
    const ConfirmPassword = React.useRef<HTMLInputElement>(null)

    const [BnSave_Disabled, BnSave_SetDisabled] = React.useState(true)
     
    React.useEffect(() => {

       

        if (CurrentPassword_Value.trim() === '' &&
            NewPassword_Value.trim() === '' &&
            ConfirmPassword_Value.trim() === '') {
            BnSave_SetDisabled(true)
        }
        else {
            BnSave_SetDisabled(false)
        }
       

    }, [CurrentPassword_Value, NewPassword_Value, ConfirmPassword_Value])

     

    const lw = '8em'
    const tw = '18em'

     

    return (
        <UserSetting_Tab TabUrl={UserSetting_ChangePassword_Url}>
           
            <p className='p-2'  >Your password must be at least 11 to 32 characters without containing common phrases. It needs to contain minimun one digit (0 - 9), one uppercase character (A - Z), one lowercase character (a - z) , one Non-alphanumeric (For example: ., $, #, or %).</p>


            <UserSetting_FormControl_FxText isPassword={true} label='Current Password' value={CurrentPassword_Value} labelWidth={lw}
                textWidth={tw} maxLength={16} onChange={event => {

                    CurrentPassword_SetValue(event.currentTarget.value)
                }}  />


            <UserSetting_FormControl_FxText isPassword={true} label='New Password' value={NewPassword_Value} labelWidth={lw} textWidth={tw} maxLength={16}
                onChange={ event => {
                NewPassword_SetValue(event.currentTarget.value)                
            }}  />


            <UserSetting_FormControl_FxText isPassword={true} label='Confirm Password' value={ConfirmPassword_Value} labelWidth={lw} textWidth={tw} maxLength={16}
                onChange={  event => {
                ConfirmPassword_SetValue(event.currentTarget.value)                
            }}  />

            <UserSetting_FormControl_FxButton title='Save' disabled={BnSave_Disabled} onClick={event => {
                console.log('evento click')
                var error = ''
                if (CurrentPassword_Value === '') error += "Current password is incomplete. "
                if (NewPassword_Value === '') error += "New password is incomplete. "
                if (ConfirmPassword_Value === '') error += "Confirm password is incomplete. "
                if (NewPassword_Value != '' && ConfirmPassword_Value != '' && NewPassword_Value != ConfirmPassword_Value) error += 'The new password and the Confirm password are diferent. '

                console.log('error',error)

                if (error != '') {
                    Utils.validateData(Dispatch, error, error)
                }
                else {
                    Dispatch(UserSetting_Action_Save_Tab_ChangePassword(
                        
                        CurrentPassword_Value,
                        NewPassword_Value,
                        ConfirmPassword_Value, () => {
                            CurrentPassword_SetValue('')
                            NewPassword_SetValue('')
                            ConfirmPassword_SetValue('')
                            BnSave_SetDisabled(true)
                        }
                    ))
                }

            }}/>

        </UserSetting_Tab>
    )
}

export const UserSetting_ChangePassword_Url = Utilities_Url_CreateUniquePath( 'UserSetting_ChangePassword')//`/UserSetting_ChangePassword`

export default UserSetting_ChangePassword