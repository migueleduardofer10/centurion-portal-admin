 

import { DataSourceRequestState } from '@progress/kendo-data-query';
import { Chart, ChartCategoryAxis, ChartCategoryAxisItem, ChartLegend, ChartSeries, ChartSeriesItem, ChartTitle, ChartTooltip, ChartValueAxis, ChartValueAxisItem } from "@progress/kendo-react-charts";
import { Dialog } from '@progress/kendo-react-dialogs';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Grid, GridCellProps, GridColumn, GridColumnMenuFilter, GridDataStateChangeEvent, GridDetailRowProps, GridExpandChangeEvent, GridPageChangeEvent, GridSortChangeEvent } from '@progress/kendo-react-grid';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import * as React from 'react';
import { useRef, useState } from 'react';
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Utilities_Convert_StringToStringDateFormat, Utilities_Url_CreateUniquePath, VCW_VendorPortfolioSecondary_ColumnConfiguration } from '../../store/commons/LenderCommon2';
import { Notify, Utils } from '../../utilities/Functions';
import { IGraphSecondaryLoan } from '../shared/customIEntities/IGraphSecondaryLoan';
import { ExcelexExport_Button_001 } from '../shared/UtilComponent';
import { UserSetting_Card, UserSetting_FormComtrol_FxComboBox, UserSetting_FormControl_FxButton } from '../users/UserSetting';
import { PartialOwnershipPortfolio_Action_Details, PartialOwnershipPortfolio_Action_ExportThisPage, PartialOwnershipPortfolio_Action_FillCombos, PartialOwnershipPortfolio_Action_Graph, PartialOwnershipPortfolio_Action_Search, PartialOwnershipPortfolio_Action_SetDetailDictionary, PartialOwnershipPortfolio_Action_SetRows, PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue, PartialOwnershipPortfolio_SubReportTable } from './PartialOwnershipPortfolioAction';
import { PartialOwnershipPortfolio_StateObject } from './PartialOwnershipPortfolioStore';


//******************************************************************************************************************************************************************************************************************************************

const GridDetail_BuiltColumn_Generic = (
    title: string,
    dataSource: PartialOwnershipPortfolio_SubReportTable[],
    fourGroups: boolean, width: string) => {


    const HeaderCell = () => (
        <span style={{ height: '0', width: '0', display: 'none', margin: '0', padding: '0' }}></span>
    )


    const ColumnType1 = (number: number) => (
        <GridColumn
            headerCell={HeaderCell}

            field={'Group' + number + '_Label'}
            width='100px'
        />
    )
    const ColumnType2 = (number: number) => (
        <GridColumn
            headerCell={HeaderCell}

            field={'Group' + number + '_Value'}
            width='100px'
            className={'text-right font-weight-bold'}
        />
    )



    return (
        <PanelBarItem title={title}  >
            <Grid data={dataSource} style={{ width: width }} >
                {ColumnType1(1)}
                {ColumnType2(1)}

                {ColumnType1(2)}
                {ColumnType2(2)}

                {ColumnType1(3)}
                {ColumnType2(3)}

                {fourGroups && ColumnType1(4)}
                {fourGroups && ColumnType2(4)}
            </Grid>
        </PanelBarItem>
    )
}

const GridDetail_BuiltColumn_SecondaryInformation = (groupTitle: string, groupNumber: number, agregate_sum: { [k: string]: number }) =>
    (
        <GridColumn title={groupTitle}  >
            {
                VCW_VendorPortfolioSecondary_ColumnConfiguration().filter(c => c.MultiColumnHeader1_Index === groupNumber).map(c =>
                    <GridColumn
                        width='100px'
                        title={c.Title}
                        key={c.ColumnName}
                        field={c.ColumnName}
                        className={c.IsNumber ? 'text-right font-weight-bold' : ''}
                        format={c.GridColumnFormat}
                        footerCell={(sender) => (
                            <td style={sender.style} colSpan={sender.colSpan} className="text-right font-weight-bold">
                                {
                                    c.IsAgregateSum ? Utils.currencyFormat(agregate_sum[sender?.field!]) : ''
                                }
                            </td>
                        )}
                    />
                )
            }
        </GridColumn>
    )

//******************************************************************************************************************************************************************************************************************************************




const GridDetail: React.FC<GridDetailRowProps> = (props) => {

    const LoanUid = props.dataItem.LoanUid
    const Key = `x${LoanUid}x`

    const State = useSelector(PartialOwnershipPortfolio_StateObject)
    const Dispatch = useDispatch()

    const [Report1_Value, Report1_SetValue] = React.useState([])
    const [Report1_Agregate_Sum_Value, Report1_Agregate_Sum_SetValue] = React.useState<{ [k: string]: number }>({})
    const [Report2_Value, Report2_SetValue] = React.useState<PartialOwnershipPortfolio_SubReportTable[]>([])
    const [Report3_Value, Report3_SetValue] = React.useState<PartialOwnershipPortfolio_SubReportTable[]>([])
    const [Report4_Value, Report4_SetValue] = React.useState<PartialOwnershipPortfolio_SubReportTable[]>([])

    const [Loading_Value, Loading_SetValue] = React.useState(true)


    React.useEffect(() => {

        const cache = State.GridDetailDictionary[Key]
        if (cache) {
            Report1_Agregate_Sum_SetValue(cache.Report1_Agregate_Sum_Value)
            Report1_SetValue(cache.Report1_Value)
            Report2_SetValue(cache.Report2_Value)
            Report3_SetValue(cache.Report3_Value)
            Report4_SetValue(cache.Report4_Value)

            Loading_SetValue(false)
        }
        else {

            Dispatch(PartialOwnershipPortfolio_Action_Details(LoanUid, (report1_agregate_sum, report1, report2, report3, report4) => {


                Report1_Agregate_Sum_SetValue(report1_agregate_sum)
                Report1_SetValue(report1)
                Report2_SetValue(report2)
                Report3_SetValue(report3)
                Report4_SetValue(report4)

                State.GridDetailDictionary[Key] = {
                    Report1_Agregate_Sum_Value: report1_agregate_sum, Report1_Value: report1, Report2_Value: report2, Report3_Value: report3, Report4_Value: report4, Graph_Value: []
                }

                Dispatch(PartialOwnershipPortfolio_Action_SetDetailDictionary(State.GridDetailDictionary))

                Loading_SetValue(false)
            }))
        }
    }, [])




    return (
        <section >
            {
                Loading_Value ?
                    <div className='d-inline-flex align-items-center'>
                        <ReactLoading type='bars' color='#CC3717' height='70%' width='100px' className='mr-2' />
                        <h6 style={{ color: '#CC3717' }}>Loading Sub Report</h6>
                    </div>
                    :
                    <PanelBar style={{ width: '100%' }} >

                        <PanelBarItem title='Secondary Information' >
                            <Grid data={Report1_Value} style={{ width: '1150px' }} >

                                {GridDetail_BuiltColumn_SecondaryInformation('Primary', 1, Report1_Agregate_Sum_Value)}
                                {GridDetail_BuiltColumn_SecondaryInformation('Secondary', 2, Report1_Agregate_Sum_Value)}

                            </Grid>
                        </PanelBarItem>

                        {GridDetail_BuiltColumn_Generic('Original Loan Amount', Report2_Value, false, '650px')}
                        {GridDetail_BuiltColumn_Generic('Date Information', Report3_Value, false, '650px')}
                        {GridDetail_BuiltColumn_Generic('Borrower Information', Report4_Value, true, '850px')}

                    </PanelBar>
            }
        </section>
    )
}
//******************************************************************************************************************************************************************************************************************************************

type PropsType = RouteComponentProps


export interface PartialOwnershipPortfolio_IParameters {
    LoanUid: string
}

const PartialOwnershipPortfolio: React.FC<PropsType> = (props) => {

    const State = useSelector(PartialOwnershipPortfolio_StateObject)

    const Dispatch = useDispatch()

    React.useEffect(() => {

        Dispatch(PartialOwnershipPortfolio_Action_FillCombos())


        return () => {

        }
    }, [])

    const Refresh = (gridState: DataSourceRequestState) => {
        ClearGrid()
        Dispatch(PartialOwnershipPortfolio_Action_Search(State_Value, Number(Status_Value), Number(Balance_Value), gridState, undefined))
    }
    const ClearGrid = () => {
        Dispatch(PartialOwnershipPortfolio_Action_SetRows([], {}, PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue, 0, {}))
    }
    const RenderGrid_Event_PageChange = (event: GridPageChangeEvent) => {
        Refresh({ ...State.GridState, skip: event.page.skip, take: event.page.take })
    }
    const RenderGrid_Event_Sort = (event: GridSortChangeEvent) => {

        Refresh({ ...State.GridState, sort: event.sort })
    }
    const RenderGrid_Event_DataStateChange = (event: GridDataStateChangeEvent) => {
        Refresh(event.dataState)
    }



    const CreateSubColumns = (groupNumber: number) =>
        State.Columns.filter(column => column.MultiColumnHeader1_Index === groupNumber).map(column => (
            <GridColumn
                title={column.Title}
                key={column.ColumnName}
                field={column.ColumnName}
                filter={column.GridColumnFilter}
                width={'150px'}
                format={column.GridColumnFormat}

                className={column.IsNumber ? 'text-right' : ''}

                columnMenu={
                    props =>
                        <GridColumnMenuFilter
                            {...props}
                            expanded={true}
                        />
                }

                footerCell={(sender) => (
                    <td style={sender.style} colSpan={sender.colSpan} className="text-right font-weight-bold" >
                        {
                            column.IsAgregateSum ? Utils.currencyFormat(State.TotalSum[sender?.field!]) : ''
                        }
                    </td>
                )}

            />
        ))




    const LabelWidth = '6em'
    const ControlWidth = '15em'
    const ClassName = 'mr-1 d-inline-flex'
    const [Balance_Value, Balance_SetValue] = React.useState('0')
    const [State_Value, State_SetValue] = React.useState('0')
    const [Status_Value, Status_SetValue] = React.useState('-2')



    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const Grid_onExpandChange = (event: GridExpandChangeEvent) => {
        event.dataItem.expanded = !event.dataItem.expanded;
        forceUpdate()
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
    const Excel_ExportThisPage = () => {
        if (CanExport()) {
            Dispatch(PartialOwnershipPortfolio_Action_ExportThisPage(ObjExcelExport, State.Rows))
        }
    }
    const Excel_ExportAllPages = () => {
        if (CanExport()) {
            Dispatch(PartialOwnershipPortfolio_Action_Search(State_Value, Number(Status_Value), Number(Balance_Value),
                State.GridState, ObjExcelExport
            ))
        }
    }

    const ObjExcelExport = useRef<ExcelExport>(null)
    const ObjGrid = useRef<Grid>(null)
    return (

        <UserSetting_Card title='Partial Ownership Portfolio' cardBodyClassName='p-1'   >

            <UserSetting_Card title='Filters' cardBodyClassName='align-items-center'  >
                <UserSetting_FormComtrol_FxComboBox
                    label='Balance' value={Balance_Value} labelWidth={LabelWidth} textWidth={ControlWidth}
                    dataSource={State.ArrBalance} onChange={event => {
                        Balance_SetValue(event.target.value)
                        ClearGrid()
                    }} className={ClassName} />

                <UserSetting_FormComtrol_FxComboBox
                    label='Status' value={Status_Value} labelWidth={LabelWidth} textWidth={ControlWidth}
                    dataSource={State.ArrStatus} onChange={ event => {
                        Status_SetValue(event.target.value)
                        ClearGrid()
                      }} className={ClassName} />
                
                <UserSetting_FormComtrol_FxComboBox
                    label='State' value={State_Value} labelWidth={LabelWidth} textWidth={ControlWidth}
                    dataSource={State.ArrState} onChange={ event => {
                        State_SetValue(event.target.value)
                        ClearGrid()
                      }} className={ClassName} />

                <div className={ClassName}>


                    
                        < UserSetting_FormControl_FxButton title='Search' className={ClassName}
                            onClick={event => {
                                ClearGrid()

                                Refresh(PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue)
                            }}/>
                    




                    <ExcelexExport_Button_001 className={ClassName} exportAllPages={Excel_ExportAllPages}
                        exportThisPage={Excel_ExportThisPage} />
                </div>

            </UserSetting_Card>


            <UserSetting_Card title='Results' cardBodyClassName='p-0 m-0  ' className='mt-1'   >

                <ExcelExport fileName='Partial Ownership Portfolio' ref={ObjExcelExport}>


                    <Grid


                        ref={ObjGrid}

                        sortable={true}
                        pageable={true}

                        data={State.Rows}
                        total={State.TotalRows}

                        {...State.GridState}

                        onSortChange={RenderGrid_Event_Sort}
                        onPageChange={RenderGrid_Event_PageChange}
                        onDataStateChange={RenderGrid_Event_DataStateChange}

                        expandField="expanded"

                        onExpandChange={(event) => Grid_onExpandChange(event)}
                        detail={GridDetail}

                    >

                        <GridColumn key='graph' >
                            <GridColumn width='40px' cell={GridColumn_ButtonCell} ></GridColumn>
                        </GridColumn>
                        <GridColumn title={'Loan Information'} key='loan_information' >
                            {CreateSubColumns(1)}
                        </GridColumn>
                        <GridColumn title={'Primary Investor'} key='primary_investor' >
                            {CreateSubColumns(2)}
                        </GridColumn>
                        <GridColumn title={'Secondary Investor'} key='secondary_investor' >
                            {CreateSubColumns(3)}
                        </GridColumn>


                    </Grid>

                </ExcelExport>

            </UserSetting_Card>

        </UserSetting_Card>
    )




}
//******************************************************************************************************************************************************************************************************************************************
const GridColumn_ButtonCell: React.FC<GridCellProps> = (props) => {
    const [Modal_Visible, Modal_SetVisible] = useState(false)
    const [Loading_Visible, Loading_SetVisible] = useState(true)
    const [areaData_Value, areaData_SetValue] = useState<any[]>([])
    const [categories_Value, categories_SetValue] = useState<string[]>([])

    const LoanUid = props.dataItem['LoanUid']
    const Key = `g${LoanUid}g`

    const Dispatch = useDispatch()
    const State = useSelector(PartialOwnershipPortfolio_StateObject)

    const BuiltGraph = (arr: IGraphSecondaryLoan[]) => {

        let balanceFull = arr.map(x => x.BalanceFull)
        let partialBalance = arr.map(x => x.PartialBalance)

        let areaData = [
            { name: 'Full', data: balanceFull, color: '#e5cc7f', },
            { name: 'Partial', data: partialBalance, color: '#CC99B2', }
        ]
        let categories = arr.map(x => Utilities_Convert_StringToStringDateFormat(x.DateDue))


        areaData_SetValue(areaData)
        categories_SetValue(categories)

        Loading_SetVisible(false)
    }


    const ButtonClick = () => {

        Modal_SetVisible(true)

        const cache = State.GridDetailDictionary[Key]

        if (cache) {
            BuiltGraph(cache.Graph_Value)
        } else {

            Loading_SetVisible(true)

            Dispatch(PartialOwnershipPortfolio_Action_Graph(LoanUid, arr => {

                BuiltGraph(arr)

                State.GridDetailDictionary[Key] = { Graph_Value: arr, Report1_Agregate_Sum_Value: {}, Report1_Value: [], Report2_Value: [], Report3_Value: [], Report4_Value: [] }

                Dispatch(PartialOwnershipPortfolio_Action_SetDetailDictionary(State.GridDetailDictionary))

            }))

        }
    }


    return (
        <td>

            <button onClick={() => ButtonClick()} className='btn btn-primary p-1 m-0'>
                <i className="fa fa-bar-chart" aria-hidden="true"  ></i>
            </button>

            {
                Modal_Visible &&
                (
                    <Dialog
                        onClose={() => { Modal_SetVisible(false) }}
                        title={'Loan Account: ' + props.dataItem['Account']} >
                        <div style={{ width: '70vw', height: '70vh' }}
                            className='d-flex align-items-center justify-content-center flex-row'
                        >
                            {
                                Loading_Visible
                                    ?
                                    (
                                        <div>
                                            <ReactLoading type="spinningBubbles" color='#CC3717' height='100px' width='100px' className='mr2' />
                                            <br />
                                            <h6 style={{ color: '#CC3717' }}>Loading Graph</h6>
                                        </div>
                                    )
                                    :
                                    (

                                        <Chart style={{ height: '100%', width: '100%', background: '#ffffff' }} >
                                            <ChartTitle text="Entire Note vs Partial Price" />
                                            <ChartLegend position="bottom" orientation="horizontal" />
                                            <ChartTooltip shared={true} />
                                            <ChartValueAxis>
                                                <ChartValueAxisItem title={{ text: 'Loan Amount' }} />
                                            </ChartValueAxis>
                                            <ChartCategoryAxis  >
                                                <ChartCategoryAxisItem name='Loan Amount' categories={categories_Value} labels={{ rotation: -45, font: '9px helvetica' }} />
                                            </ChartCategoryAxis>
                                            <ChartSeries>
                                                {areaData_Value.map((item, idx) => (
                                                    <ChartSeriesItem
                                                        key={idx}
                                                        type="area"
                                                        tooltip={{ visible: true }}
                                                        data={item.data}
                                                        name={item.name}

                                                        color={item.color}
                                                    >

                                                    </ChartSeriesItem>
                                                ))}
                                            </ChartSeries>
                                        </Chart>
                                    )

                            }

                        </div>
                    </Dialog>
                )
            }
        </td>
    )

}


export const PartialOwnershipPortfolio_Url = Utilities_Url_CreateUniquePath("PartialOwnershipPortfolio")


export default PartialOwnershipPortfolio
