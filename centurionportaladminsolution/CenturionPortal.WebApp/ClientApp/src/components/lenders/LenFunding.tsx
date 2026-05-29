

//ORIGINAL//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { State } from '@progress/kendo-data-query';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { GridColumn, GridColumnMenuFilter, GridDataStateChangeEvent, GridPageChangeEvent, GridSortChangeEvent } from '@progress/kendo-react-grid';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { LenFunding_Action_applyChangedColumns, LenFunding_Action_SetActiveColumn, LenFunding_Action_SetColumnsArray, LenFunding_Action_CallJson } from '../../store/actions/lenders/LenFundingAction';
import { ColumnConfiguration_Interface, StateInitialValue, Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2';
import { LenFunding_StateObject } from '../../store/stores/lenders/LenFundingStore';
import { Auth, Utils } from '../../utilities/Functions';
import Grid001 from '../genericComponents/Grid001';


type PropsType = RouteComponentProps 

export interface LenFunding_IParameters {
    LoanUid: string
}

const LenFunding: React.FC<PropsType> = (props) => {

    const ObjState = useSelector(LenFunding_StateObject)

    const dispatch = useDispatch()


    const LoanUid = (props.location.state as LenFunding_IParameters).LoanUid



    React.useEffect(() => {

        Refresh(true, false, StateInitialValue)

        return () => {

        }
    }, [])

    const Refresh = (getColumns: boolean, revertColumns: boolean, state: State) => {

        dispatch(LenFunding_Action_CallJson(LoanUid, getColumns, state, revertColumns))
    }

    const RenderExcelExport_Event_BnExportAllRows = (excelExporter: ExcelExport) => {


     //   dispatch(LenFungind_Action_ExportExcelAll(loanUid, GetToken(), excelExporter))

        dispatch(LenFunding_Action_CallJson(LoanUid, false,
            ObjState.GridState,
            false, excelExporter))

    }

    const RenderGrid_Event_PageChange = (event: GridPageChangeEvent) => {
        dispatch(LenFunding_Action_CallJson(LoanUid, false, 
            { ...ObjState.GridState, skip: event.page.skip, take: event.page.take },
            false))
    }

    const RenderGrid_Event_Sort = (event: GridSortChangeEvent) => {
        dispatch(LenFunding_Action_CallJson(LoanUid, false, 
            { ...ObjState.GridState, sort: event.sort },
            false))
    }

    const RenderGrid_Event_DataStateChange = (event: GridDataStateChangeEvent) => {
        dispatch(LenFunding_Action_CallJson(LoanUid, false, 
            event.dataState,
            false))
    }


    const RenderCustomColumns_Event_applyChangedColumns = (event: React.FormEvent<HTMLFormElement>) => {

        dispatch(LenFunding_Action_applyChangedColumns(ObjState.Columns))

    }
    const RenderCustomColumns_Event_activateColumn = (columnName: string) => {
        dispatch(LenFunding_Action_SetActiveColumn(columnName))
    }
    const RenderCustomColumns_Event_BnRevertColumns = () => {
        Refresh(true, true, StateInitialValue)
    }

    const RenderGrid_GridToolBar_BnRefresh = () => {
        Refresh(false, false, StateInitialValue)
    }


    const SaveColumns = (newColumns: ColumnConfiguration_Interface[]) => {
        dispatch(LenFunding_Action_SetColumnsArray(newColumns))

    }



    return (
        
            
        <Grid001

            key={1}

            LoanUid={LoanUid}
            Rows={ObjState.Rows as []}
            AllRows={ObjState.AllRows as []}
            Columns={ObjState.Columns}
            ActiveColumn={ObjState.ActiveColumn}
            GridState={ObjState.GridState}

            ExcelExport_FileName='Len Funding.xlsx'

            RenderCustomColumns_Event_activateColumn={(columnName) => RenderCustomColumns_Event_activateColumn(columnName)}
            RenderCustomColumns_Event_applyChangedColumns={(event) => RenderCustomColumns_Event_applyChangedColumns(event)}
            RenderCustomColumns_Event_BnRevertColumns={() => RenderCustomColumns_Event_BnRevertColumns()}

            RenderExcelExport_Event_BnExportAllRows={(excelExporter) => RenderExcelExport_Event_BnExportAllRows(excelExporter)}

            RenderGrid_GridToolBar_BnRefresh={() => RenderGrid_GridToolBar_BnRefresh()}
            RenderGrid_Event_DataStateChange={(event) => RenderGrid_Event_DataStateChange(event)}
            RenderGrid_Event_PageChange={(event) => RenderGrid_Event_PageChange(event)}
            RenderGrid_Event_Sort={(event) => RenderGrid_Event_Sort(event)}

            TotalRows={ObjState.TotalRows}

            TabIndex={1}
            Title='Borrower Payment History'


            RenderCustomColumns_SaveColumns={(newColumns) => SaveColumns(newColumns)}

            RenderExcelExport_Element_ExportColumn=
            {
                
                ObjState.Columns.filter(x => x.Checked === true && x.ParteDelGrid === true)
                    .map(column => {
                        if (column.IsNumber) {

                        return     (
                                <ExcelExportColumn
                                    key={column.ColumnName}
                                    field={column.ColumnName}
                                    title={column.ColumnName}
                                    width={column.Width}
                                    headerCellOptions={{ textAlign: 'center' }}
                                    footer={() =>
                                        Utils.currencyFormat(ObjState.TotalSum[column.ColumnName!])
                                    }
                                />
                            )
                        }
                        else {
                        return     (
                                <ExcelExportColumn
                                    key={column.ColumnName}
                                    field={column.ColumnName}
                                    title={column.ColumnName}
                                    width={column.Width}
                                    headerCellOptions={{ textAlign: 'center' }}
                                />
                            )
                        }
                    })
            }


            RenderGrid_Element_GridColumn={
                ObjState.Columns.filter(x => x.Checked === true && x.ParteDelGrid === true)
                    .map((column: ColumnConfiguration_Interface, index: number) => (
                        <GridColumn
                            title={column.Title}
                            key={column.ColumnName}
                            field={column.ColumnName}
                            className={column.ClassName}
                            width={(column.Width! * 2) + 'px'}
                            format={column.GridColumnFormat}
                            columnMenu={
                                props =>
                                    <GridColumnMenuFilter
                                        {...props}
                                        expanded={true}
                                    />
                            }
                            footerCell={(sender) =>
                                (
                                    <td style={sender.style} colSpan={sender.colSpan} className="text-right font-weight-bold">
                                        {
                                            Utils.currencyFormat(ObjState.TotalSum[sender?.field!])
                                        }
                                    </td>
                                )
                            }
                        />
                    ))
            }

            />

        
    )





}


export const LenFunding_Url = Utilities_Url_CreateUniquePath('LenFunding')

 

export default LenFunding
 