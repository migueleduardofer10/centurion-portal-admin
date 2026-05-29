import { DataSourceRequestState } from '@progress/kendo-data-query'
import { ExcelExport } from '@progress/kendo-react-excel-export'
import { Grid, GridDataStateChangeEvent, GridPageChangeEvent, GridSortChangeEvent } from '@progress/kendo-react-grid'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExcelexExport_Button_001, ExcelExport_001, GridColumn_001 } from '../../../components/shared/UtilComponent'
import { PaymentToLender_ColumnConfiguration, Utilities_Url_CreateUniquePath } from '../../../store/commons/LenderCommon2'
import { Notify } from '../../../utilities/Functions'
import { UserSetting_Card, UserSetting_FormComtrol_FxComboBox, UserSetting_FormControl_FxButton, UserSetting_FormControl_FxCheck } from '../../users/UserSetting'
import { PaymentToLender_Action_ExportThisPage, PaymentToLender_Action_Load, PaymentToLender_Action_Search, PaymentToLender_Action_SetResult } from './PaymentToLenderAction'
import { PaymentToLender_StateObject } from './PaymentToLenderStore'

const PaymentToLender = () => {

    const State = useSelector(PaymentToLender_StateObject)
    const Dispatch = useDispatch()

    const [Account_Value, Account_SetValue] = React.useState('0')
    const [OnlyPending_Value, OnlyPending_SetValue] = React.useState(false)

    React.useEffect(() => {

        Dispatch(PaymentToLender_Action_Load())



    }, [])

    const Clear = () => {
        Dispatch(PaymentToLender_Action_SetResult([], 0, {}))
    }
    const Search = (gs: DataSourceRequestState, objExcelExport: React.RefObject<ExcelExport> | undefined = undefined) => {
        Dispatch(PaymentToLender_Action_Search(gs, Account_Value, OnlyPending_Value, objExcelExport))
    }

    const ObjExcelExport = React.useRef<ExcelExport>(null)
    const ClassName = 'mr-1 d-inline-flex'

    const RenderGrid_Event_PageChange = (event: GridPageChangeEvent) => {
        Search({ ...State.GridState, skip: event.page.skip, take: event.page.take })
    }
    const RenderGrid_Event_Sort = (event: GridSortChangeEvent) => {
        Search({ ...State.GridState, sort: event.sort })
    }
    const RenderGrid_Event_DataStateChange = (event: GridDataStateChangeEvent) => {
        Search(event.dataState)
    }


    const Excel_ExportThisPage = () => {
        if (CanExport()) {
            Dispatch(PaymentToLender_Action_ExportThisPage(ObjExcelExport, State.Rows))
        }
    }
    const Excel_ExportAllPages = () => {
        if (CanExport()) {
            Search(State.GridState, ObjExcelExport)
        }
    }



    const CanExport = (): boolean => {
        if (State.Rows.length === 0) {
            Notify.info("", "No data to export")
            return false
        }
        else {
            return true
        }
    }



    return (
        <    UserSetting_Card title='Payment to Lender' cardBodyClassName='p-1 '>
            {
                <UserSetting_Card title='Filters' cardBodyClassName='p-1  align-items-center' className='mb-1'>

                    <UserSetting_FormComtrol_FxComboBox label='Accounts' value={Account_Value} labelWidth='100px' textWidth='300px' dataSource={
                            State.ArrIELSServiceMap}
                        onChange={
                            event => {
                                Clear()
                                Account_SetValue(event.currentTarget.value)
                            }}
                        className={ClassName} />
                    <UserSetting_FormControl_FxCheck label='Only Pending' value={OnlyPending_Value} className={ClassName} id='OnlyPending' onChange={
                        event => {
                            Clear()
                            OnlyPending_SetValue(event.target.checked)
                        }} />
                    <div className={ClassName}>

                        <UserSetting_FormControl_FxButton title='Search' className={ClassName} onClick={event => {
                            Clear()
                            Search(State.GridState)
                        }} />

                        <ExcelexExport_Button_001 className={ClassName} exportAllPages={Excel_ExportAllPages} exportThisPage={Excel_ExportThisPage} />

                    </div>

                </UserSetting_Card>
            }
            <UserSetting_Card title='Results' cardBodyClassName='p-0'>

                <ExcelExport_001 totalSum={State.TotalSum} arrColumn={PaymentToLender_ColumnConfiguration()} fileName='Partial ownership Portfolio' objExcelExport={ObjExcelExport} />

                <Grid

                    sortable={true}
                    pageable={true}

                    data={State.Rows}
                    total={State.TotalRows}

                    {...State.GridState}

                    onSortChange={RenderGrid_Event_Sort}
                    onPageChange={RenderGrid_Event_PageChange}
                    onDataStateChange={RenderGrid_Event_DataStateChange}

                >


                    {GridColumn_001(PaymentToLender_ColumnConfiguration(), State.TotalSum)}

                </Grid>

            </UserSetting_Card>

        </UserSetting_Card>
    )
}





export const PaymentToLender_Url = Utilities_Url_CreateUniquePath('paymentsToLender')

export default PaymentToLender

