import { DataSourceRequestState } from '@progress/kendo-data-query'
import { Grid, GridColumn, GridPageChangeEvent, GridSortChangeEvent, GridDataStateChangeEvent } from '@progress/kendo-react-grid'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { RPTCustomFullLoanPortfolio_ColumnConfiguration, Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2'
import { IComboBoxDataSource } from '../shared/customIEntities/IComboBoxDataSource'
import { UserSetting_Card, UserSetting_FormComtrol_FxComboBox, UserSetting_FormControl_FxButton, UserSetting_FormControl_FxCheck } from '../users/UserSetting'
import { LoanPortfolio_Action_Load, LoanPortfolio_Action_Search } from './LoanPortfolioAction'
import { ExcelexExport_Button_001, ExcelExport_001 } from '../shared/UtilComponent'
import { Notify, GlobalAnimation_Loading, GlobalAnimation_Loaded } from '../../utilities/Functions'
import { ExcelExport } from '@progress/kendo-react-excel-export'


const LoanPortfolio = () => {



    const [Rows_Value, Rows_SetValue] = React.useState([])
    const [TotalRows_Value, TotalRows_SetValue] = React.useState(0)
    const [GridState_Value, GridState_SetValue] = React.useState<DataSourceRequestState>({ skip: 0, take: 30 })


    const [ArrAccount_Value, ArrAccount_SetValue] = React.useState<IComboBoxDataSource[]>([])
    const [ArrCbLoansFilter_Value, ArrCbLoansFilter_SetValue] = React.useState<IComboBoxDataSource[]>([])
    const [CbFrom_Value, CbFrom_SetValue] = React.useState('0')
    const [CbTo_Value, CbTo_SetValue] = React.useState('0')
    const [CbLenderUid_Value, CbLenderUid_SetValue] = React.useState('0')


    const [ChkRange_Value, ChkRange_SetValue] = React.useState<boolean>(false)
    const [ChkIncludeInactives_Value, ChkIncludeInactives_SetValue] = React.useState(false)


    const ClassName = 'mr-2 d-inline-flex'
    const LabelWidth = '150px'
    const ControlWidth = '200px'


    const Dispatch = useDispatch()

    React.useEffect(() => {
        Dispatch(LoanPortfolio_Action_Load((arrCbLoansFilter: IComboBoxDataSource[], arrAccount: IComboBoxDataSource[]) => {

            ArrCbLoansFilter_SetValue(arrCbLoansFilter)
            ArrAccount_SetValue(arrAccount)
             
            if (arrAccount.length != 0) {
                CbFrom_SetValue(arrAccount[0].Key!)
                CbTo_SetValue(arrAccount[0].Key!)
            }

        }))

    }, [])

    const Refresh = (gridState: DataSourceRequestState, objExcelExport: React.RefObject<ExcelExport> | undefined = undefined) => {

        if (!ObjExcelExport) {
            Clear()
        }

        Dispatch(LoanPortfolio_Action_Search(objExcelExport, CbLenderUid_Value, ChkRange_Value, CbFrom_Value, String( Number(CbTo_Value) + 1),
            ChkIncludeInactives_Value,
            gridState,
            (rows, totalRows) => {

                if (!objExcelExport) {
                    TotalRows_SetValue(totalRows)
                    Rows_SetValue(rows)

                    GridState_SetValue(gridState)
                }
                else {
                    objExcelExport.current?.save(rows)

                    Notify.success("", "Export Complete")
                }
            }
        ))
    }
    const Clear = () => {
        TotalRows_SetValue(0)
        Rows_SetValue([])
    }
    const RenderGrid_Event_PageChange = (event: GridPageChangeEvent) => {
        Refresh({ ...GridState_Value, skip: event.page.skip, take: event.page.take })
    }
     
    const RenderGrid_Event_DataStateChange = (event: GridDataStateChangeEvent) => {
        Refresh(event.dataState)
    }


    const ObjExcelExport = React.useRef<ExcelExport>(null)


    const CanExport = (): boolean => {
        if (Rows_Value.length === 0) {
            Notify.info("", "No data to export")
            return false
        }
        else {
            return true
        }
    }


    return (

        <UserSetting_Card title='Loan Portfolio' cardBodyClassName='p-1 '>
            <UserSetting_Card title='Filters' cardBodyClassName='p-1 mb-1    '>

                <UserSetting_FormComtrol_FxComboBox labelWidth={LabelWidth} textWidth={ControlWidth}
                    dataSource={ArrCbLoansFilter_Value} className={ClassName}
                    label='Select Investor' value={CbLenderUid_Value} onChange={event => {
                        Clear()
                        CbLenderUid_SetValue(event.currentTarget.value)
                    }} />


                <UserSetting_FormControl_FxCheck label='Range' value={ChkRange_Value} className={ClassName}
                    id='ID0B1D213BB20FB409A86B34C3E0A68DD8C'
                    onChange={event => {
                        if (ArrAccount_Value.length != 0) {
                            ChkRange_SetValue(event.currentTarget.checked)
                        }
                    }}
                />

                <UserSetting_FormComtrol_FxComboBox
                    labelWidth={'60px'} textWidth={ControlWidth}
                    dataSource={ArrAccount_Value} className={ClassName}
                    disabled={!ChkRange_Value} label='From' value={CbFrom_Value} onChange={event => {
                        Clear()
                        CbFrom_SetValue(event.currentTarget.value)
                    }} />

                <UserSetting_FormComtrol_FxComboBox
                    labelWidth={'50px'} textWidth={ControlWidth}
                    dataSource={ArrAccount_Value} className={ClassName}
                    disabled={!ChkRange_Value} label='To' value={CbTo_Value} onChange={event => {
                        Clear()
                        CbTo_SetValue(event.currentTarget.value)
                    }} />

                <UserSetting_FormControl_FxCheck label='Include Inactives' value={ChkIncludeInactives_Value}
                    className={ClassName}
                    id='IDD712036A31424D0DBF6752D5131885FE4'
                    onChange={event => {
                        ChkIncludeInactives_SetValue(event.currentTarget.checked)
                    }}
                />


                <div className={ClassName}>

                    <UserSetting_FormControl_FxButton title='Search' className={ClassName}
                        onClick={event => {
                            Refresh(GridState_Value, undefined)

                        }}
                    />


                    <ExcelexExport_Button_001 className={ClassName}
                        exportAllPages={() => {
                            if (CanExport()) {
                                Refresh(GridState_Value, ObjExcelExport)
                            }
                        }}
                        exportThisPage={() => {
                            if (CanExport()) {


                                Dispatch(GlobalAnimation_Loading())

                                ObjExcelExport?.current!.save(Rows_Value)

                                Dispatch(GlobalAnimation_Loaded())


                                Notify.success("", "Export Complete")

                            }
                        }} />
                </div>
            </UserSetting_Card>


            <UserSetting_Card title='Results' cardBodyClassName='p-1'>

                <ExcelExport_001 arrColumn={RPTCustomFullLoanPortfolio_ColumnConfiguration()} fileName='Loan Portfolio' objExcelExport={ObjExcelExport} />


                <Grid
                    sortable={false}
                    pageable={true}

                    data={Rows_Value}
                    total={TotalRows_Value}

                    {...GridState_Value}
                     
                    onPageChange={RenderGrid_Event_PageChange}
                    onDataStateChange={RenderGrid_Event_DataStateChange}
                >
                    {
                        RPTCustomFullLoanPortfolio_ColumnConfiguration().map(obj =>
                            <GridColumn
                                key={obj.ColumnName}
                                title={obj.Title}
                                width={'150px'}
                                className='text-right'
                                field={obj.ColumnName}
                            />
                        )
                    }
                </Grid>
            </UserSetting_Card>
        </UserSetting_Card>

    )
}

export const LoanPortfolio_Url = Utilities_Url_CreateUniquePath('ReporLoanPortfolio')
export default LoanPortfolio