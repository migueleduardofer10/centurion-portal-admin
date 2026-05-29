import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSetting_Action_Tab_Account } from '../../store/actions/users/UserSettingAction'
import { Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2'
import { UserSetting_StateObject } from '../../store/stores/users/UserSettingStore'
import { IComboBoxDataSource } from '../shared/customIEntities/IComboBoxDataSource'
import { UserSetting_Tab } from './UserSetting'



const UserSetting_Account = () => {

    const state = useSelector(UserSetting_StateObject)
    const dispatch = useDispatch()


    React.useEffect(() => {

        dispatch(UserSetting_Action_Tab_Account(
            (data) => {
               
                List_SetData(data)
            }))
         
    }, [])


    const [List_Data, List_SetData] = React.useState<IComboBoxDataSource[]>([])



    return (
        <UserSetting_Tab TabUrl={UserSetting_Account_Url} >
             
            <ul className="from-control w-100 p-2 list-unstyled">
                {List_Data.map(x =>
                    <li value={x.Key} key={x.Value}>     <i className="mdi mdi-menu-right "></i>  {x.Value}</li>
                )}
            </ul>
             
        </UserSetting_Tab>
    )
}



export let UserSetting_Account_Url = Utilities_Url_CreateUniquePath(`UserSetting_Account`)

export default UserSetting_Account