
 
import { State } from '@progress/kendo-data-query';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { Grid, GridColumn, GridColumnMenuFilter, GridDataStateChangeEvent, GridDetailRowProps, GridPageChangeEvent, GridSortChangeEvent } from '@progress/kendo-react-grid';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { LenFungind_Action_CallJson, LenNotes_Action_applyChangedColumns, LenNotes_Action_SetActiveColumn, LenNotes_Action_SetColumnsArray } from '../../store/actions/lenders/LenNotesAction';
import { ColumnConfiguration_Interface, LenNotes_Interface, StateInitialValue, Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2';
import { LenNotes_StateObject } from '../../store/stores/lenders/LenNotesStore';
import Grid001 from '../genericComponents/Grid001';
import { LocationState } from 'history';



type PropsType = RouteComponentProps


export interface LenNotes_IParameters {
    LoanUid: string
}

const LenNotes: React.FC<PropsType> = (props) => {

    const ObjState = useSelector(LenNotes_StateObject)

    const dispatch = useDispatch()

    const loanUid = (props.location.state as LenNotes_IParameters).LoanUid

    React.useEffect(() => {

        Refresh(true, false, StateInitialValue)

        return () => {

        }
    }, [])

    const Refresh = (getColumns: boolean, revertColumns: boolean, state: State) => {

        dispatch(LenFungind_Action_CallJson(loanUid, getColumns, state, revertColumns))
    }

    const RenderExcelExport_Event_BnExportAllRows = (excelExporter: ExcelExport) => {

        dispatch(LenFungind_Action_CallJson(loanUid, false,
            ObjState.GridState,
            false, excelExporter))

    }


    const RenderGrid_Event_PageChange = (event: GridPageChangeEvent) => {
        dispatch(LenFungind_Action_CallJson(loanUid, false,
            { ...ObjState.GridState, skip: event.page.skip, take: event.page.take },
            false))
    }

    const RenderGrid_Event_Sort = (event: GridSortChangeEvent) => {
        dispatch(LenFungind_Action_CallJson(loanUid, false,
            { ...ObjState.GridState, sort: event.sort },
            false))
    }

    const RenderGrid_Event_DataStateChange = (event: GridDataStateChangeEvent) => {
        dispatch(LenFungind_Action_CallJson(loanUid, false,
            event.dataState,
            false))
    }


    const RenderCustomColumns_Event_applyChangedColumns = (event: React.FormEvent<HTMLFormElement>) => {

        dispatch(LenNotes_Action_applyChangedColumns(ObjState.Columns))

    }
    const RenderCustomColumns_Event_activateColumn = (columnName: string) => {
        dispatch(LenNotes_Action_SetActiveColumn(columnName))
    }
    const RenderCustomColumns_Event_BnRevertColumns = () => {
        Refresh(true, true, StateInitialValue)
    }

    const RenderGrid_GridToolBar_BnRefresh = () => {
        Refresh(false, false, StateInitialValue)
    }


    const SaveColumns = (newColumns: ColumnConfiguration_Interface[]) => {
        dispatch(LenNotes_Action_SetColumnsArray(newColumns))

    }



    const ChargesDetailsGrid = () => (

        <Grid data={ObjState.Rows}>
            <GridColumn title="Date" key="Date" field="Subject"
                className="text-center" width="40px" format="{0:d}"
            />

        </Grid>
    )



    const GridDetailRowProps: React.FC<GridDetailRowProps> = (props) => {
        //    <p dangerouslySetInnerHTML={{ __html: obj.Note }}> </p>
        const obj = props.dataItem as LenNotes_Interface;
        return (
            <section>

                <div dangerouslySetInnerHTML={{ __html: obj.Note_Plain && obj.Note_Plain != '' ? obj.Note_Plain : 'Sorry, no records found' }} />

            </section>
        )
    }




    return (
        <Grid001
            
            GridDetailRowProps={GridDetailRowProps}

            key={1}

            LoanUid={loanUid}//{props.match.params.loanUid}
            Rows={ObjState.Rows as []}
            AllRows={ObjState.AllRows as []}
            Columns={ObjState.Columns}
            ActiveColumn={ObjState.ActiveColumn}
            GridState={ObjState.GridState}

            ExcelExport_FileName='Len Notes.xlsx'

            RenderCustomColumns_Event_activateColumn={(columnName) => RenderCustomColumns_Event_activateColumn(columnName)}
            RenderCustomColumns_Event_applyChangedColumns={(event) => RenderCustomColumns_Event_applyChangedColumns(event)}
            RenderCustomColumns_Event_BnRevertColumns={() => RenderCustomColumns_Event_BnRevertColumns()}

            RenderExcelExport_Event_BnExportAllRows={(excelExporter) => RenderExcelExport_Event_BnExportAllRows(excelExporter)}

            RenderGrid_GridToolBar_BnRefresh={() => RenderGrid_GridToolBar_BnRefresh()}
            RenderGrid_Event_DataStateChange={(event) => RenderGrid_Event_DataStateChange(event)}
            RenderGrid_Event_PageChange={(event) => RenderGrid_Event_PageChange(event)}
            RenderGrid_Event_Sort={(event) => RenderGrid_Event_Sort(event)}

            TotalRows={ObjState.TotalRows}

            TabIndex={3}
            Title='Borrower Payment History'


            RenderCustomColumns_SaveColumns={(newColumns) => SaveColumns(newColumns)}

            RenderExcelExport_Element_ExportColumn=

            {
                ObjState.Columns &&
                ObjState.Columns.filter(x => x.Checked === true && x.ParteDelGrid === true)
                    .map(column => {

                        return (
                            <ExcelExportColumn
                                key={column.ColumnName}
                                field={column.ColumnName}
                                title={column.ColumnName}
                                width={column.Width}
                                headerCellOptions={{ textAlign: 'center' }}
                            />
                        )

                    })
            }


            RenderGrid_Element_GridColumn={

                ObjState.Columns && ObjState.Columns.filter(x => x.Checked === true && x.ParteDelGrid === true)
                    .map((column: ColumnConfiguration_Interface, index: number) =>
                        (
                            column.ColumnName === "Date" ?
                                <GridColumn
                                    title={column.Title}
                                    key={column.ColumnName}
                                    field={"Date"}

                                    width={(column.Width! * 2) + 'px'}

                                    filter="date"
                                    format="{0:d-MM-y}"
                                    columnMenu={
                                        props =>
                                            <GridColumnMenuFilter
                                                {...props}
                                                expanded={true}
                                            />
                                    }

                                />
                                :
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

                                />
                        )
                    )
            }

        />
    )





}


export const LenNotes_Url =  Utilities_Url_CreateUniquePath('LenNotes')
 

export default LenNotes
