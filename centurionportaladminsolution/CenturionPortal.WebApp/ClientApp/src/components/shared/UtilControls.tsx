

import * as React from 'react'
import { IComboBoxDataSource } from './customIEntities/IComboBoxDataSource'





export const UtilControl_Card: React.FC<{
    title: string,
    className?: string,
    width?: string,
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




export const UtilControl_Check: React.FC<{
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


export const UtilControl_Label: React.FC<{
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

export const UtilControl_Text: React.FC<{
    label: string,
    value?: string,
    labelWidth: string,
    textWidth: string,
    maxLength?: number,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
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

export const UtilControl_Email =
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

export const UtilControl_ComboBox = React.forwardRef<
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

export const UtilControl_Button: React.FC<{
    hidden?: boolean | undefined,
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
            onClick={event => props.onClick(event)}
        >{props.title}</button>
    )
}