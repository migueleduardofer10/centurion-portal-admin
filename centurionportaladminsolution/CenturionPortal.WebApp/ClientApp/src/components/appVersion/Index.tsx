import * as React from 'react'
import { useDispatch } from 'react-redux'
import { AppVersion_Action_Load } from './Action'
import { GridCellProps, Grid, GridColumn } from '@progress/kendo-react-grid'
import { UserSetting_Card } from '../users/UserSetting'



enum IDataType {
    Group,
    Detail,
}
interface IData {

    C1?: string,
    C2?: string,
    Type: IDataType
}

interface IAppVersion {
    Group: string,
    Details: { Title: string, Description: string }[]
}


const Version = () => {

    const dispatch = useDispatch()
    const [Data_Value, Data_SetValue] = React.useState<IData[]>([])
    React.useEffect(() => {

        dispatch(AppVersion_Action_Load((rows) => {

            let data: IData[] = [];

            (rows as IAppVersion[]).forEach(obj => {
                data.push({ C1: obj.Group, Type: IDataType.Group })
                obj.Details.forEach(detail => {
                    data.push({ C1: detail.Title, C2: detail.Description, Type: IDataType.Detail })
                })
            })

            Data_SetValue(data)
        }))

    }, [])


    return (
        <UserSetting_Card title='Version'
            cardBodyClassName='d-flex flex-column align-items-center p-1'
        >
            <img src="/images/logo-redplus.png" className='mb-2' alt="logo" style={{ width: '100px', height: '100px' }} />
            <Grid
                data={Data_Value}
                scrollable='none'
                sortable={false}
                pageable={false}
            >
                {CreateColumn('150', 'C1')}
                {CreateColumn('150', 'C2')}

            </Grid>
        </UserSetting_Card>
    )
}


const CreateColumn = (width: string, field: string) => {
    const HeaderCell = () => (
        <span style={{ height: '0', width: '0', display: 'none', margin: '0', padding: '0' }}></span>
    )

    return (
        <GridColumn
            key={field}
            width={width + 'px'}
            headerClassName='text-center'

            field={field}
            headerCell={HeaderCell}
            cell={CellStyle}
        />
    )
}


const CellStyle: React.FC<GridCellProps> = (props) => {

    let backgrounColorDark = '#3A4B54'
    let colorWhite = 'white'
    let style: React.CSSProperties | undefined = undefined
    let colSpan: number | undefined = undefined

    let obj = props.dataItem as IData
    let value = props.dataItem[props.field!]


    switch (obj.Type) {
        case IDataType.Group:
            switch (props.columnIndex) {
                case 0:
                    colSpan = 2
                    style = {
                        backgroundColor: backgrounColorDark, color: colorWhite, textAlign: 'center'
                    }
                    value = obj.C1
                    break
                default:
                    style = { display: 'none' }
                    break
            }
            break
        case IDataType.Detail:
            switch (props.columnIndex) {
                case 0:
                    style = {
                        textAlign: 'left'
                    }
                    value = obj.C1
                    break
                case 1:
                    style = {
                        textAlign: 'right'
                    }
                    value = obj.C2
                    break
            }
            break
    }

    return (
        <td colSpan={colSpan} style={style}>
            {value}
        </td>
    )
}





export default Version

export const Version_Url = '/Version'
