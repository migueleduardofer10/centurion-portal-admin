import * as React from 'react'
import { Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2'
import { UserSetting_Card, UserSetting_FormControl_FxButton, UserSetting_FormControl_FxCheck, UserSetting_Tab } from './UserSetting'







const UserSetting_LirsOption = () => {
    return (
        <UserSetting_Tab TabUrl={UserSetting_LirsOption_Url}>

            <div  >

                <UserSetting_Card title='Filters' className='mr-2 d-inline-flex mb-2 ' width='20rem' >
                    <UserSetting_FormControl_FxCheck label='Disable captcha login' value={true} id='chkDisableCaptcha' onChange={event => { }} />

                </UserSetting_Card>

                <UserSetting_Card title='Invoice Payments' className='mr-2 d-inline-flex mb-2' width='23rem' >
                    <UserSetting_FormControl_FxCheck label='Block payments by V-Check' value={true} id='chk1' onChange={event => { }} />
                    <UserSetting_FormControl_FxCheck label='Block payments by Credit Card' value={true} id='chk2' onChange={event => { }} />
                    <UserSetting_FormControl_FxCheck label='Block payments by PayPal' value={true} id='chk3' onChange={event => { }} />

                </UserSetting_Card>
            </div>

            <UserSetting_FormControl_FxButton title='Save' onClick={event => { }} />

        </UserSetting_Tab>
    )
}



export const UserSetting_LirsOption_Url = Utilities_Url_CreateUniquePath('LirsOptions')//  '/UserSetting_LirsOption'

export default UserSetting_LirsOption