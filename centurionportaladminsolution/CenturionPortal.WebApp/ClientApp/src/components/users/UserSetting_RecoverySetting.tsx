import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSetting_Action_FindELSUser, UserSetting_Action_Save_Tab_RecoverySetting } from '../../store/actions/users/UserSettingAction'
import { Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2'
import { UserSetting_StateObject } from '../../store/stores/users/UserSettingStore'
import { Utils } from '../../utilities/Functions'
import {
    UserSetting_Card, UserSetting_FormComtrol_FxComboBox, UserSetting_FormControl_FxButton,
    UserSetting_FormControl_FxText, UserSetting_Tab, UserSetting_FormControl_Text_FxEmail
} from './UserSetting'

const UserSetting_RecoverySetting = () => {

    const State = useSelector(UserSetting_StateObject)
    const Dispatch = useDispatch()



    const [Email_Value, Email_SetValue] = React.useState('')


    const [Combo1_Value, Combo1_SetValue] = React.useState('0')
    const [Combo2_Value, Combo2_SetValue] = React.useState('0')
    const [Combo3_Value, Combo3_SetValue] = React.useState('0')

    const [ExtraQuestion1_Value, ExtraQuestion1_SetValue] = React.useState('')
    const [ExtraQuestion1_Hidden, ExtraQuestion1_SetHidden] = React.useState(false)
    const [Answer1_Value, Answer1_SetValue] = React.useState('')

    const [ExtraQuestion2_Value, ExtraQuestion2_SetValue] = React.useState('')
    const [ExtraQuestion2_Hidden, ExtraQuestion2_SetHidden] = React.useState(false)
    const [Answer2_Value, Answer2_SetValue] = React.useState('')

    const [ExtraQuestion3_Value, ExtraQuestion3_SetValue] = React.useState('')
    const [ExtraQuestion3_Hidden, ExtraQuestion3_SetHidden] = React.useState(false)
    const [Answer3_Value, Answer3_SetValue] = React.useState('')


    const [BnSave_Enabled, BnSave_SetEnabled] = React.useState(true)

    const TbEmail = React.useRef<HTMLInputElement>(null)

    const [FirstTime, FirstTime_Set] = React.useState(true)

    React.useEffect(() => {

        BnSave_SetEnabled(false)

        ExtraQuestion1_SetHidden(true)
        ExtraQuestion2_SetHidden(true)
        ExtraQuestion3_SetHidden(true)

        if (FirstTime === true) {
            Dispatch(UserSetting_Action_FindELSUser(
                (objIELSUser) => {

                    FirstTime_Set(false)

                    Email_SetValue(objIELSUser?.Email!)

                    Combo1_SetValue(objIELSUser?.Question1!)
                    if (objIELSUser?.Question1! === '-1') {
                        ExtraQuestion1_SetHidden(false)
                        ExtraQuestion1_SetValue(objIELSUser.Question1String!)
                    }
                    Answer1_SetValue(objIELSUser?.Answer1!)


                    Combo2_SetValue(objIELSUser?.Question2!)
                    if (objIELSUser?.Question2! === '-1') {
                        ExtraQuestion2_SetHidden(false)
                        ExtraQuestion2_SetValue(objIELSUser.Question2String!)
                    }
                    Answer2_SetValue(objIELSUser?.Answer2!)


                    Combo3_SetValue(objIELSUser?.Question3!)
                    if (objIELSUser?.Question3! === '-1') {
                        ExtraQuestion3_SetHidden(false)
                        ExtraQuestion3_SetValue(objIELSUser.Question3String!)
                    }
                    Answer3_SetValue(objIELSUser?.Answer3!)


                }))
        }

        if (
            Email_Value != State.ObjELSUser.Email! ||
            Combo1_Value != State.ObjELSUser.Question1! || ExtraQuestion1_Value != State.ObjELSUser.Question1String! || Answer1_Value.trim() != State.ObjELSUser.Answer1! ||
            Combo2_Value != State.ObjELSUser.Question2! || ExtraQuestion2_Value != State.ObjELSUser.Question2String! || Answer2_Value.trim() != State.ObjELSUser.Answer2! ||
            Combo3_Value != State.ObjELSUser.Question3! || ExtraQuestion3_Value != State.ObjELSUser.Question3String! || Answer3_Value.trim() != State.ObjELSUser.Answer3!
        ) {
            BnSave_SetEnabled(false)
        }
        else {
            BnSave_SetEnabled(true)
        }

    }, [
        Email_Value,
        Combo1_Value, ExtraQuestion1_Value, Answer1_Value,
        Combo2_Value, ExtraQuestion2_Value, Answer2_Value,
        Combo3_Value, ExtraQuestion3_Value, Answer3_Value
    ])




    const lw = '12em'
    const tw = '20em'

    return (
        <UserSetting_Tab TabUrl={UserSetting_RecoverySetting_Url}>

            <UserSetting_Card title='Password Questions' className='mb-2'>

                

                <   UserSetting_FormControl_Text_FxEmail label='Email Address' value={Email_Value} labelWidth={lw}
                    textWidth={tw} maxLength={100}
                    onChange={event => Email_SetValue(event.currentTarget.value)} ref={TbEmail}/>


                <UserSetting_FormComtrol_FxComboBox
                    label='Secret Question 1' value={Combo1_Value} labelWidth={lw} textWidth={tw}
                    dataSource={State.ComboBox_Question1}
                    onChange={
                        event => {

                            ExtraQuestion1_SetHidden(true)
                            ExtraQuestion1_SetValue('')
                            Answer1_SetValue('')

                            Combo1_SetValue(event.target.value)


                            if (event.target.value === '-1') {
                                ExtraQuestion1_SetHidden(false)
                            }
                        }
                }/>
                <UserSetting_FormControl_FxText label={'Expecify Your Question'} value={ExtraQuestion1_Value}
                    labelWidth={lw} textWidth={tw} maxLength={100} onChange={event => ExtraQuestion1_SetValue(event.currentTarget.value)}
                    hidden={ExtraQuestion1_Hidden} />
                <UserSetting_FormControl_FxText label={'Your Answer'} value={Answer1_Value} labelWidth={lw} textWidth={tw} maxLength={100}
                    onChange={event => Answer1_SetValue(event.currentTarget.value)} />



                <UserSetting_FormComtrol_FxComboBox
                    label='Secret Question 2' value={Combo2_Value} labelWidth={lw} textWidth={tw}
                    dataSource={State.ComboBox_Question2}
                    onChange={ event => {

                        ExtraQuestion2_SetHidden(true)
                        ExtraQuestion2_SetValue('')
                        Answer2_SetValue('')

                        Combo2_SetValue(event.target.value)

                        if (event.target.value === '-1') {
                            ExtraQuestion2_SetHidden(false)
                        }
                    }
                }/>
                <UserSetting_FormControl_FxText label={'Expecify Your Question'} value={ExtraQuestion2_Value} labelWidth={lw} textWidth={tw} maxLength={100} onChange={
                    event => ExtraQuestion2_SetValue(event.currentTarget.value)} hidden={ExtraQuestion2_Hidden} />
                <UserSetting_FormControl_FxText label={'Your Answer'} value={Answer2_Value} labelWidth={lw} textWidth={tw} maxLength={100} onChange={
                    event => Answer2_SetValue(event.currentTarget.value)} />



                <UserSetting_FormComtrol_FxComboBox label='Secret Question 3' value={Combo3_Value} labelWidth={lw} textWidth={tw}

                    dataSource={State.ComboBox_Question3}
                    onChange={
                        event => {

                            ExtraQuestion3_SetHidden(true)
                            ExtraQuestion3_SetValue('')
                            Answer3_SetValue('')

                            Combo3_SetValue(event.target.value)

                            if (event.target.value === '-1') {
                                ExtraQuestion3_SetHidden(false)
                            }
                        }} />

                <UserSetting_FormControl_FxText label={'Expecify Your Question'} value={ExtraQuestion3_Value} labelWidth={lw} textWidth={tw} maxLength={100} onChange={
                    event => ExtraQuestion3_SetValue(event.currentTarget.value)} hidden={ExtraQuestion3_Hidden} />
                <UserSetting_FormControl_FxText label={'Your Answer'} value={Answer3_Value} labelWidth={lw} textWidth={tw} maxLength={100} onChange={
                    event => Answer3_SetValue(event.currentTarget.value)} />


            </UserSetting_Card>

            <UserSetting_FormControl_FxButton disabled={BnSave_Enabled} title='Save' onClick={event => {
                let error = ''

                if (TbEmail.current?.value === '' || TbEmail.current?.checkValidity() === false) {
                    error = 'Email field incorrect. '
                }

                if (ExtraQuestion1_Hidden === false && ExtraQuestion1_Value === '') {
                    error += 'Extra Question 1 is incomplete. '
                }
                if (Combo1_Value != '0' && Answer1_Value === '') {
                    error += 'Answer 1 is incomplete. '
                }

                if (ExtraQuestion2_Hidden === false && ExtraQuestion2_Value === '') {
                    error += 'Extra Question 2 is incomplete. '
                }
                if (Combo2_Value != '0' && Answer2_Value === '') {
                    error += 'Answer 2 is incomplete. '
                }

                if (ExtraQuestion3_Hidden === false && ExtraQuestion3_Value === '') {
                    error += 'Extra Question 3 is incomplete. '
                }
                if (Combo3_Value != '0' && Answer3_Value === '') {
                    error += 'Answer 3 is incomplete. '
                }

                if (error != '') {
                    Utils.validateData(Dispatch, error, error)
                }
                else {

                    Dispatch(UserSetting_Action_Save_Tab_RecoverySetting(
                        State.ObjELSUser,
                        Email_Value,
                        Combo1_Value, ExtraQuestion1_Value, Answer1_Value,
                        Combo2_Value, ExtraQuestion2_Value, Answer2_Value,
                        Combo3_Value, ExtraQuestion3_Value, Answer3_Value
                    ))
                }
            }} />





        </UserSetting_Tab>
    )
}



export const UserSetting_RecoverySetting_Url = Utilities_Url_CreateUniquePath('RecoverySetting')//   '/UserSetting_RecoverySetting'

export default UserSetting_RecoverySetting