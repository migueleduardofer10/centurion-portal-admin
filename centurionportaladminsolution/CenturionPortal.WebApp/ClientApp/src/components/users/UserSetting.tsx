import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { IComboBoxDataSource } from '../shared/customIEntities/IComboBoxDataSource'
import { UserSetting_Account_Url } from './UserSetting_Account'
import { UserSetting_ChangePassword_Url } from './UserSetting_ChangePassword'
import { UserSetting_General_Url } from './UserSetting_General'
import { UserSetting_LirsOption_Url } from './UserSetting_LirsOption'
import { UserSetting_PasswordDefault_Url } from './UserSetting_PasswordDefault'
import { UserSetting_PersonalInformation_Url } from './UserSetting_PersonalInformation'
import { UserSetting_RecoverySetting_Url } from './UserSetting_RecoverySetting'
 


type PropsType = RouteComponentProps<{ loanUid: string }> & { TabUrl: string }

const UserSetting: React.FC<{ TabUrl: string }> = (props) => {


    //  const loanUid = props.match.params.loanUid




    const IsActive = (tabUrl: string) => {

        return 'nav-link ' + (props.TabUrl === tabUrl ? ' active' : '')
    }

    return (
        <React.Fragment>


            <div className={"card p-0  m-0 "}  >


                <ul className="nav nav-tabs mb-0">

                    <li  >
                        <Link className={IsActive(UserSetting_General_Url)} to={UserSetting_General_Url}>General</Link>
                    </li>
                    <li >
                        <Link className={IsActive(UserSetting_LirsOption_Url)} to={UserSetting_LirsOption_Url}>Lirs Options</Link>
                    </li>

                    <li >
                        <Link className={IsActive(UserSetting_PersonalInformation_Url)} to={UserSetting_PersonalInformation_Url}>Personal Information</Link>
                    </li>
                    <li >
                        <Link className={IsActive(UserSetting_ChangePassword_Url)} to={UserSetting_ChangePassword_Url}>Change Password</Link>
                    </li>
                    <li >
                        <Link className={IsActive(UserSetting_RecoverySetting_Url)} to={UserSetting_RecoverySetting_Url}>Recovery Settings</Link>
                    </li>
                    <li >
                        <Link className={IsActive(UserSetting_PasswordDefault_Url)} to={UserSetting_PasswordDefault_Url}>Password Default</Link>
                    </li>
                    <li >
                        <Link className={IsActive(UserSetting_Account_Url)} to={UserSetting_Account_Url}>Account</Link>
                    </li>
                </ul>



            </div>





        </React.Fragment>
    )
}




export const UserSetting_Tab: React.FC<{ TabUrl: string }> = (props) => {
    return (
        <React.Fragment>

            <h5 className='p-0 m-0 mb-2 '>User Settings</h5>

            <div className="card-group" >
                <div className="card">
                    <UserSetting TabUrl={props.TabUrl} />

                    <div className="card-body p-2 m-0">
                        {props.children}
                    </div>
                </div>
            </div>


        </React.Fragment>

    )
}

export const UserSetting_Card: React.FC<{
    title: string,
    className?: string, width?: string,
    cardBodyClassName?: string
}> = (props) => {

    let style = props.width ?
        {
            "border": "1px solid #eeeeee",
            "width": props.width

        }
        :
        {
            "border": "1px solid #eeeeee"

        }

    return (

        <div className={"card p-0  m-0 " + (props.className ? props.className : '')}
            style={style}>
            <div className="card-header" >
                {props.title}
            </div>
            <div className={'card-body ' + (props.cardBodyClassName ? props.cardBodyClassName : '')}>

                {props.children}

            </div>
        </div>

    )
}




export const UserSetting_FormControl_FxCheck: React.FC<{
    ref?: React.RefObject<HTMLInputElement>,
    label: string,
    value?: boolean,
    className?: string,
    id: string,

    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = (props) => {

    return (
        <div className={props.className}>
            <i className="mdi mdi-menu-right d-inline-block mr-2"></i>
            <div className='custom-control custom-checkbox d-inline-block'   >

                <input type="checkbox"
                    ref={props.ref}
                    className="custom-control-input d-inline-block "
                    //  defaultChecked={props.value}
                    checked={props.value}
                    id={props.id}
                    onChange={(event) => { props.onChange(event) }}
                />
                <label className="custom-control-label" htmlFor={props.id} >{props.label}</label>
            </div>
        </div>
    )
}


//export const UserSetting_FormControl_Check = (label: string, value: boolean, className: string, id: string,
//    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void) => {

//    return (
//        <div className={className}>
//            <i className="mdi mdi-menu-right d-inline-block mr-2"></i>
//            <div className='custom-control custom-checkbox d-inline-block'   >

//                <input type="checkbox"
//                    className="custom-control-input d-inline-block "
//                    defaultChecked={value}
//                    id={id}
//                    onChange={(event) => { onChange(event) }}
//                />
//                <label className="custom-control-label" htmlFor={id} >{label}</label>
//            </div>
//        </div>
//    )
//}

export const UserSetting_FormControl_FxLabel: React.FC<{
    label: string,
    value: string, labelWidth: string, textWidth: string
}> = (props) => {


    const labelStyle = { 'width': props.labelWidth }
    const textStyle = { 'width': props.textWidth }

    return (
        <div className="form-row p-1   ">

            <i className="mdi mdi-menu-right d-inline-block mr-1 "></i>
            <small className='d-inline-block mr-2' style={labelStyle} >{props.label + ' :'}</small>


            <p className="from-control d-inline-block   " style={textStyle} >{props.value}</p>

        </div>
    )

}
//export const UserSetting_FormControl_Label = (label: string, value: string,
//    labelWidth: string, textWidth: string) => {

//    const labelStyle = { 'width': labelWidth }
//    const textStyle = { 'width': textWidth }

//    return (
//        <div className="form-row p-1   ">

//            <i className="mdi mdi-menu-right d-inline-block mr-1 "></i>
//            <small className='d-inline-block mr-2' style={labelStyle} >{label + ' :'}</small>


//            <p className="from-control d-inline-block   " style={textStyle} >{value}</p>

//        </div>
//    )

//}

export const UserSetting_FormControl_Text = (label: string, value: string,
    labelWidth: string, textWidth: string) => {

    const labelStyle = { 'width': labelWidth ? labelWidth : '100px' }
    const textStyle = { 'width': textWidth ? textWidth : '300px' }

    return (
        <div className="form-row p-1">
            <div className="  d-inline-block" style={labelStyle}  >
                <i className="mdi mdi-menu-right"></i>  <small>{label}</small>
            </div>
            <div className="  d-inline-block" style={textStyle}  >
                <input type="text" className="from-control w-100"
                    value={value}
                />
            </div>
        </div>
    )
}



export const UserSetting_FormControl_FxText: React.FC<{
    label: string, value: string,
    labelWidth: string, textWidth: string, maxLength: number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    hidden?: boolean, className?: string,
    isPassword?: boolean | undefined
}> = (props) => {

    const labelStyle = { 'width': props.labelWidth }
    const textStyle = { 'width': props.textWidth }

    return (
        <div className={'form-row p-1 ' + (props.className ? props.className : '')} hidden={props.hidden} >
            <div className="  d-inline-block" style={labelStyle}  >
                <i className="mdi mdi-menu-right"></i>  <small>{props.label + ' :'}</small>
            </div>
            <div className="  d-inline-block" style={textStyle}  >
                <input type={props.isPassword ? 'password' : 'text'} className="from-control w-100"
                    value={props.value}
                    onChange={props.onChange}
                    maxLength={props.maxLength}
                />
            </div>
        </div>
    )
}
export const UserSetting_FormControl_Text22 = (label: string, value: string,
    labelWidth: string, textWidth: string, maxLength: number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    hidden?: boolean, className?: string) => {

    const labelStyle = { 'width': labelWidth }
    const textStyle = { 'width': textWidth }

    return (
        <div className={'form-row p-1 ' + (className ? className : '')} hidden={hidden} >
            <div className="  d-inline-block" style={labelStyle}  >
                <i className="mdi mdi-menu-right"></i>  <small>{label + ' :'}</small>
            </div>
            <div className="  d-inline-block" style={textStyle}  >
                <input type="text" className="from-control w-100"
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                />
            </div>
        </div>
    )
}

export const UserSetting_FormControl_Text_Password = (ref: React.RefObject<HTMLInputElement>, label: string, value: string,
    labelWidth: string, textWidth: string, maxLength: number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void) => {

    const labelStyle = { 'width': labelWidth }
    const textStyle = { 'width': textWidth }

    return (
        <div className="form-row p-1"  >
            <div className="  d-inline-block" style={labelStyle}  >
                <i className="mdi mdi-menu-right"></i>  <small>{label + ' :'}</small>
            </div>
            <div className="  d-inline-block" style={textStyle}  >
                <input type="password" className="from-control w-100"
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    ref={ref}
                />
            </div>
        </div>
    )
}


//export const UserSetting_FormControl_Text_Email = (label: string, value: string,
//    labelWidth: string, textWidth: string, maxLength: number,
//    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
//    ref?: React.RefObject<HTMLInputElement>) => {

//    const labelStyle = { 'width': labelWidth }
//    const textStyle = { 'width': textWidth }

//    return (
//        <div className="form-row p-1">
//            <div className="  d-inline-block" style={labelStyle}  >
//                <i className="mdi mdi-menu-right"></i>  <small>{label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle}  >
//                <input type="email" className="from-control w-100"
//                    value={value}
//                    onChange={onChange}
//                    maxLength={maxLength} ref={ref}
//                />
//            </div>
//        </div>
//    )


//}


//export const UserSetting_FormControl_Text_FxEmail: React.FC<{
//    label: string, value: string,
//    labelWidth: string, textWidth: string, maxLength: number,
//    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
//}> = (props) => {

//    const labelStyle = { 'width': props.labelWidth }
//    const textStyle = { 'width': props.textWidth }

//    return (
//        <div className="form-row p-1">
//            <div className="  d-inline-block" style={labelStyle}  >
//                <i className="mdi mdi-menu-right"></i>  <small>{props.label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle}  >
//                <input type="email" className="from-control w-100"
//                    value={props.value}
//                    onChange={props.onChange}
//                    maxLength={props.maxLength} //ref={props.ref}
//                />
//            </div>
//        </div>
//    )


//}

//type Props = {
//    label: string, value: string,
//    labelWidth: string, textWidth: string, maxLength: number,
//    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
//}
export const UserSetting_FormControl_Text_FxEmail =
    React.forwardRef<
        HTMLInputElement,
        {
            label: string, value: string,
            labelWidth: string, textWidth: string, maxLength: number,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
        }
    >(
        (props, ref) => {

            const labelStyle = { 'width': props.labelWidth }
            const textStyle = { 'width': props.textWidth }

            return (
                <div className="form-row p-1">
                    <div className="  d-inline-block" style={labelStyle}  >
                        <i className="mdi mdi-menu-right"></i>  <small>{props.label + ' :'}</small>
                    </div>
                    <div className="  d-inline-block" style={textStyle}  >
                        <input type="email" className="from-control w-100"
                            value={props.value}
                            onChange={props.onChange}
                            maxLength={props.maxLength}
                            ref={ref}
                        />
                    </div>
                </div>
            )


        }
    );

//export const UserSetting_FormControl_Text_FxEmail2: React.FC<{
//    label: string, value: string,
//    labelWidth: string, textWidth: string, maxLength: number,
//    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
//}> = (props) => {

//    const labelStyle = { 'width': props.labelWidth }
//    const textStyle = { 'width': props.textWidth }

//    return (
//        <div className="form-row p-1">
//            <div className="  d-inline-block" style={labelStyle}  >
//                <i className="mdi mdi-menu-right"></i>  <small>{props.label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle}  >
//                <input type="email" className="from-control w-100"
//                    value={props.value}
//                    onChange={props.onChange}
//                    maxLength={props.maxLength} //ref={props.ref}
//                />
//            </div>
//        </div>
//    )


//}


//export const UserSetting_FormControl_Combo = (label: string, value: string,
//    labelWidth: string, textWidth: string) => {

//    const labelStyle = { 'width': labelWidth ? labelWidth : '100px' }
//    const textStyle = { 'width': textWidth ? textWidth : '300px' }

//    return (
//        <div className="form-row p-1">
//            <div className="  d-inline-block" style={labelStyle}  >
//                <i className="mdi mdi-menu-right"></i>  <small>{label}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle} >
//                <select className="from-control w-100">
//                    <option value='0' key='0'>one</option>
//                    <option value='1' key='1'>uno</option>
//                    <option value='2' key='2'>dos</option>
//                </select>

//            </div>
//        </div>
//    )
//}


export const UserSetting_FormComtrol_FxComboBox = React.forwardRef<
    HTMLSelectElement,
    {
        className?: string,
        labelWidth: string,
        textWidth: string,
        label: string,
        disabled?: boolean,
        value: string,
        onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void,
        dataSource: IComboBoxDataSource[]
    }>((props, ref) => {
        const labelStyle = { 'width': props.labelWidth ? props.labelWidth : '100px' }
        const textStyle = { 'width': props.textWidth ? props.textWidth : '300px' }


        return (
            <div className={'form-row p-1 ' + (props.className ? props.className : '')}  >
              
                <div className="  d-inline-block" style={labelStyle}   >
                    <i className="mdi mdi-menu-right"></i>  <small>{props.label + ' :'}</small>
                </div>
                <div className="  d-inline-block" style={textStyle} >
                    <select
                        ref={ref}
                        className="from-control w-100"
                        disabled={props.disabled}
                        value={props.value}
                        onChange={props.onChange}>
                        {
                            props.dataSource.map(obj => (<option value={obj.Key} key={obj.Key}>{obj.Value}</option>))
                        }
                    </select>

                </div>
            </div>
        )
    })

//export const UserSetting_FormComtrol_FxComboBox: React.FC<{
//    className?: string,
//    labelWidth: string,
//    textWidth: string,
//    label: string,
//    disabled?: boolean,
//    value: string,
//    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void,
//    //  ref?: React.RefObject<HTMLSelectElement>,
//    dataSource: IComboBoxDataSource[]
//}> = (props) => {
//    const labelStyle = { 'width': props.labelWidth ? props.labelWidth : '100px' }
//    const textStyle = { 'width': props.textWidth ? props.textWidth : '300px' }


//    return (
//        <div className={'form-row p-1 ' + (props.className ? props.className : '')}  >


//            <div className="  d-inline-block" style={labelStyle}   >
//                <i className="mdi mdi-menu-right"></i>  <small>{props.label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle} >
//                <select

//                    className="from-control w-100"
//                    disabled={props.disabled}
//                    value={props.value}
//                    onChange={props.onChange}>
//                    {
//                        props.dataSource.map(obj => (<option value={obj.Key} key={obj.Key}>{obj.Value}</option>))
//                    }
//                </select>

//            </div>
//        </div>
//    )
//}

//export const UserSetting_FormControl_Combo22 = (label: string, value: string,
//    labelWidth: string, textWidth: string,
//    dataSource: IComboBoxDataSource[],
//    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
//    className?: string,
//    disabled: boolean = false,
//    ref?: React.RefObject<HTMLSelectElement>
//) => {

//    const labelStyle = { 'width': labelWidth ? labelWidth : '100px' }
//    const textStyle = { 'width': textWidth ? textWidth : '300px' }

//    return (
//        <div className={'form-row p-1 ' + (className ? className : '')}  >
//            <div className="  d-inline-block" style={labelStyle}   >
//                <i className="mdi mdi-menu-right"></i>  <small>{label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle} >
//                <select
//                    ref={ref}
//                    className="from-control w-100"
//                    disabled={disabled}
//                    value={value}
//                    onChange={onChange}>
//                    {
//                        dataSource.map(obj => (<option value={obj.Key} key={obj.Key}>{obj.Value}</option>))
//                    }
//                </select>

//            </div>
//        </div>
//    )
//}
//export const UserSetting_FormControl_Combo33 = (label: string, value: string,
//    labelWidth: string, textWidth: string,
//    dataSource: () => string,
//    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
//) => {

//    const labelStyle = { 'width': labelWidth ? labelWidth : '100px' }
//    const textStyle = { 'width': textWidth ? textWidth : '300px' }

//    return (
//        <div className="form-row p-1">
//            <div className="  d-inline-block" style={labelStyle}  >
//                <i className="mdi mdi-menu-right"></i>  <small>{label + ' :'}</small>
//            </div>
//            <div className="  d-inline-block" style={textStyle} >
//                <select className="from-control w-100"
//                    value={value}
//                    onChange={onChange}>
//                    {
//                        dataSource()
//                        // dataSource.map(obj => (<option value={obj.Key} key={obj.Key}>{obj.Value}</option>))
//                    }
//                </select>

//            </div>
//        </div>
//    )
//}

//export const UserSetting_FormControl_ButtonSave = () => (
//    < button className="btn btn-primary px-2      "  > Save</button>
//)


//export const UserSetting_FormControl_ButtonSave22 = (hidden: boolean,
//    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void) => {

//    let x =
//        React.createElement('button',
//            {
//                type: 'submit',
//                className: 'btn btn-primary px-2',
//                hidden: hidden,
//                onClick: onClick
//            }, 'Save')

//    return x


//}


export const UserSetting_FormControl_FxButton: React.FC<{
    hidden?: boolean|undefined,
    disabled?: boolean | undefined,
    title: string,
    className?: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}> = (props) => {

   

    return (
        <button
            className={'btn btn-primary p-2 ' + props.className}
            hidden={props.hidden}
            disabled={props.disabled}
            onClick={event=> props.onClick(event)}
        >{props.title}</button>
    )
}

//export const UserSetting_FormControl_ButtonSave33 = (hidden: boolean, title: string, className: string,
//    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void) => {

   
//    let x =
//        React.createElement('button',
//            {
//                type: 'submit',
//                className: 'btn btn-primary p-2 ' + className,
//                hidden: hidden,
//                onClick: onClick
//            }, title)

//    return x


//}


export default UserSetting
