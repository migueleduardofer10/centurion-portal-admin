import * as React from 'react'
import { Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2'
import { UserSetting_Card, UserSetting_FormControl_FxButton, UserSetting_FormControl_FxCheck, UserSetting_Tab } from './UserSetting'

const Simple_Input = (value: string) => (



    <input type='text' style={{ width: '3em' }}
        className='from-control custom-control d-inline-block ml-2' />
)
const Simple_P = (value: string) => (
    <p className='d-inline-block ml-2'>{value}</p>
)

const SpecialCard = (title: string, chkId: string) => {



    return (
        <UserSetting_Card title={title} className='d-inline-flex mr-2 mb-2' >

            <UserSetting_Card title='Password Option' className='d-inline-flex ml-2 mb-2' >

                <div className='mb-2'>

                    <UserSetting_FormControl_FxCheck label='Expiration After' value={false} className='d-inline-block' id={'chk0' + chkId} onChange={event => { }}/>
                    {Simple_Input('90')}

                    <select className='custom-select  d-inline-block ml-2'
                        style={{ width: '7em' }}>
                        <option value='Days' key='1'>Day(s)</option>
                        <option value='Week' key='2'>Week(s)</option>
                        <option value='Month' key='3'>Month(s)</option>
                    </select>
                </div>



                <div>
                    <UserSetting_FormControl_FxCheck label='User cannot use their previous' value={false} className='d-inline-block' id={'chk1' + chkId} onChange={event => { }}/>

                    {Simple_Input('90')}

                    {Simple_P('Password')}
                </div>


            </UserSetting_Card>

            <UserSetting_Card title='Lock out Option' className='d-inline-flex ml-2 mb-2' >

                <UserSetting_FormControl_FxCheck label='Expiration After' value={false} className='d-inline-block' id={'chk2' + chkId} onChange={event => { }}/>
                {Simple_Input('3')}
                {Simple_P('unsuccessful attempts for')}
                {Simple_Input('15')}
                {Simple_P('minutes')}


            </UserSetting_Card>


            <UserSetting_Card title='Password Complexity' className='d-inline-flex ml-2' >
                <div>
                    <UserSetting_FormControl_FxCheck label='Password Length' value={false} className= 'd-inline-block' id={'chk3' + chkId} onChange={event => { }}/>

                    {Simple_Input('11')}

                    {Simple_P('To')}

                    {Simple_Input('32')}
                </div>
                <UserSetting_FormControl_FxCheck label='Minimun one lower case and one upper case' value={true} className='mr-2' id={'chk4' + chkId} onChange={event => { }} />
                <UserSetting_FormControl_FxCheck label='Minimun one digit' value={true} className='mr-2' id={'chk5' + chkId} onChange={event => { }}/>
                <UserSetting_FormControl_FxCheck label='Minimun one special character' value={true} className= 'mr-2' id={ 'chk6' + chkId} onChange={event => { }}/>
            </UserSetting_Card>


        </UserSetting_Card>
    )
}





const UserSetting_PasswordDefault = () => {
    return (
        <UserSetting_Tab TabUrl={UserSetting_PasswordDefault_Url}>

            <div>
                {SpecialCard('Lirs Admin', 'chkLirsAdmin')}

                {SpecialCard('User Admin', 'chkUserAdmin')}

                {SpecialCard('Broker Admin', 'chkBrokerAdmin')}

                {SpecialCard('Lender Admin', 'chkLenderAdmin')}

                {SpecialCard('Borrower Admin', 'chkBorrowerAdmin')}

            </div>
            <UserSetting_FormControl_FxButton title='Save' onClick={event => {
            }} />
            
        </UserSetting_Tab>
    )
}
/*

  


 * 
 * */


export const UserSetting_PasswordDefault_Url = Utilities_Url_CreateUniquePath('UserSetting_PasswordDefault')//  '/UserSetting_PasswordDefault'

export default UserSetting_PasswordDefault