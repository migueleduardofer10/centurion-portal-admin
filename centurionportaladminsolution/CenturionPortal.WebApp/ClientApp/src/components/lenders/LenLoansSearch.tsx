import { DataSourceRequestState } from '@progress/kendo-data-query';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Grid, GridDataStateChangeEvent, GridPageChangeEvent, GridSortChangeEvent } from '@progress/kendo-react-grid';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LenLoansSearch_Action_applyChangedColumns, LenLoansSearch_Action_CallJson, LenLoansSearch_Action_CallJsonFillPropertyState, LenLoansSearch_Action_ExportThisPage, LenLoansSearch_Action_SetActiveColumn, LenLoansSearch_Action_SetColumnsArray } from '../../store/actions/lenders/LenLoansSearchAction';
import { ColumnConfiguration_Interface, LenLoanSearch_ColumnConfiguration, Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2';
import { LenLoansSearch_StateObject } from '../../store/stores/lenders/LenLoansSearchStore';
import { Notify } from '../../utilities/Functions';
import { IComboBoxDataSource } from '../shared/customIEntities/IComboBoxDataSource';
import { ExcelexExport_Button_001, ExcelExport_001, GridColumn_001 } from '../shared/UtilComponent';
import { UserSetting_Card, UserSetting_FormComtrol_FxComboBox, UserSetting_FormControl_FxButton, UserSetting_FormControl_FxText } from '../users/UserSetting';




const LenLoansSearch: React.FC = (props) => {


    const State = useSelector(LenLoansSearch_StateObject)
    const Dispatch = useDispatch()



    React.useEffect(() => {
        Dispatch(LenLoansSearch_Action_CallJsonFillPropertyState(true))
    }, [])



    const [FirstName_Value, FirstName_SetValue] = React.useState('')
    const [LastName_Value, LastName_SetValue] = React.useState('')
    const [Address_Value, Address_SetValue] = React.useState('')
    const [City_Value, City_SetValue] = React.useState('')
    const [State_Value, State_SetValue] = React.useState('0')

    const RenderGrid_Event_DataStateChange = (event: GridDataStateChangeEvent) => {


        Dispatch(LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value,
            event.dataState,
            false, false, undefined));

    }


    const RenderGrid_Event_PageChange = (event: GridPageChangeEvent) => {


        Dispatch(LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value,
            { ...State.GridState, skip: event.page.skip, take: event.page.take },
            false, false, undefined));
    }

    const RenderGrid_Event_Sort = (event: GridSortChangeEvent) => {

        Dispatch(LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value,
            { ...State.GridState, sort: event.sort },
            false, false, undefined));
    }


    const GridStateInitialValue: DataSourceRequestState = { skip: 0, take: 20 }

    const RenderCustomColumns_Event_applyChangedColumns = (event: React.FormEvent<HTMLFormElement>) => {

        Dispatch(LenLoansSearch_Action_applyChangedColumns(State.Columns))

    }
    const RenderCustomColumns_Event_activateColumn = (columnName: string) => {
        Dispatch(LenLoansSearch_Action_SetActiveColumn(columnName))
    }
    const RenderCustomColumns_Event_BnRevertColumns = () => {
        Refresh(true, true, GridStateInitialValue)
    }

    const RenderGrid_GridToolBar_BnRefresh = () => {
        Refresh(false, false, GridStateInitialValue)
    }

    const Refresh = (getColumns: boolean, revertColumns: boolean, gridState: DataSourceRequestState) => {

        Dispatch(LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value,
            gridState, revertColumns, getColumns, undefined));

    }


    const SaveColumns = (newColumns: ColumnConfiguration_Interface[]) => {
        Dispatch(LenLoansSearch_Action_SetColumnsArray(newColumns))
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


    const ObjExcelExport = React.useRef<ExcelExport>(null)
    const lw = '6em'
    const tw = '13em'
    const ClassName1 = 'd-inline-block mr-2'

    return (
        <React.Fragment>

            <UserSetting_Card title='Loans Search' cardBodyClassName='p-1' >




                <UserSetting_Card title='Filters' className='d-inline-flex mb-2' cardBodyClassName='p-1'>

                    <UserSetting_FormControl_FxText label='Last Name' value={LastName_Value} labelWidth={lw} textWidth={tw} maxLength={50} onChange={e => LastName_SetValue(e.target.value)} className={ClassName1} />
                    <UserSetting_FormControl_FxText label='First Name' value={FirstName_Value} labelWidth={lw} textWidth={tw} maxLength={50} onChange={e => FirstName_SetValue(e.target.value)} className={ClassName1} />
                    <UserSetting_FormControl_FxText label='Address' value={Address_Value} labelWidth={lw} textWidth={tw} maxLength={50} onChange={e => Address_SetValue(e.target.value)} className={ClassName1} />
                    <UserSetting_FormControl_FxText label='City' value={City_Value} labelWidth={lw} textWidth={tw} maxLength={50} onChange={e => City_SetValue(e.target.value)} className={ClassName1} />




                    <UserSetting_FormComtrol_FxComboBox
                        label='State' value={State_Value} labelWidth={lw}
                        textWidth={tw}
                        dataSource={
                            State.ArrInfState.map<IComboBoxDataSource>((x) => {
                                return { Key: x.Abbreviation, Value: x.Name }
                            })}
                        onChange={event => {
                            State_SetValue(event.target.value)
                        }} className={                        ClassName1}/>


                    <div className={ClassName1}>

                        <UserSetting_FormControl_FxButton title='Search' className='mr-2' onClick={event => {
                            Dispatch(LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value,
                                GridStateInitialValue,
                                false, false, undefined));
                        }} />
                        <UserSetting_FormControl_FxButton title='Clear' className='mr-2' onClick={event => {
                            LastName_SetValue('')
                            FirstName_SetValue('')
                            City_SetValue('')
                            Address_SetValue('')
                            State_SetValue('0')

                        }} />

                        <ExcelexExport_Button_001 className={ClassName1}
                            exportAllPages={() => {
                                if (CanExport()) {
                                    Dispatch(LenLoansSearch_Action_CallJson(LastName_Value, FirstName_Value, Address_Value, City_Value, State_Value,
                                        { skip: 0 }, false, false, ObjExcelExport));
                                }
                            }
                            }
                            exportThisPage={() => {

                                if (CanExport()) {
                                    Dispatch(LenLoansSearch_Action_ExportThisPage(ObjExcelExport, State.Rows))
                                }
                            }}

                        />

                    </div>

                </UserSetting_Card>



                <UserSetting_Card title='Results' cardBodyClassName='p-0' >

                    <ExcelExport_001
                        arrColumn={LenLoanSearch_ColumnConfiguration()}
                        fileName='Len Loan Search.xlsx'
                        objExcelExport={ObjExcelExport}
                    />

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
                        {GridColumn_001(LenLoanSearch_ColumnConfiguration(), undefined)}

                    </Grid>




                </UserSetting_Card>




            </UserSetting_Card>

        </React.Fragment>
    )
}



export const LenLoansSearch_Url = Utilities_Url_CreateUniquePath('LenLoanSearch')//    '/lender/LenSoansSearch'


export default LenLoansSearch