import * as React from 'react'
import { UserSetting_Tab } from './UserSetting'

const UserSetting_VerifyLoan = () => {
    return (
        <UserSetting_Tab TabUrl={UserSetting_VerifyLoan_Url}>
            Verify Loan, body
        </UserSetting_Tab>
    )
}



export const UserSetting_VerifyLoan_Url =  '/UserSetting_VerifyLoan'

export default UserSetting_VerifyLoan