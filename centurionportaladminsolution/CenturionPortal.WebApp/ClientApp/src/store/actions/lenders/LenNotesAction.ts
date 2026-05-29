import { State, toDataSourceRequestString } from "@progress/kendo-data-query";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { formatDate } from '@telerik/kendo-intl';
import { Action } from "redux";
import { AppThunkAction } from "../..";
import { GridEntityTypeEnum } from '../../../utilities/Enums';
import { GlobalAnimation_Loaded, GlobalAnimation_Loading, Notify, Utils } from "../../../utilities/Functions";
import { BackEndResult1, ColumnConfiguration_Interface, FetchHeaders, LenNotes_ColumnConfiguration, LenNotes_Interface } from "../../commons/LenderCommon2";



const Type = 'Notes_Action/'
export const Type_SetNotesArray = Type + 'SetNotesArray'
export const Type_SetColumnsArray = Type + 'SetColumnsArray'
export const Type_SetActiveColumn = Type + 'SetActiveColumn'
export const Type_SetAllRows = Type + 'SetAllRows'



export interface Interface_SetAllRows extends Action<typeof Type_SetAllRows> {
    AllRows: LenNotes_Interface[]
}

export interface Interface_SetNotesArray extends Action<typeof Type_SetNotesArray> {
    Notes: LenNotes_Interface[],
    TotalRows: number, GridState: State
}
export interface Interface_SetColumnsArray extends Action<typeof Type_SetColumnsArray> { Columns: ColumnConfiguration_Interface[] }
export interface Interface_SetActiveColumn extends Action<typeof Type_SetNotesArray> { columnName: string }




export const LenNotes_Action_SetAllRows = (allRows: LenNotes_Interface[]):
    Interface_SetAllRows => ({
        type: Type_SetAllRows,
        AllRows: allRows
    })

export const LenNotes_Action_SetNotessArray = (notes: LenNotes_Interface[],
    totalRows: number, gridState: State): Interface_SetNotesArray => ({
        type: Type_SetNotesArray,
        Notes: notes,
        TotalRows: totalRows,
        GridState: gridState
    })


export const LenNotes_Action_SetActiveColumn = (columnName: string): Interface_SetActiveColumn => ({
    type: Type_SetActiveColumn,
    columnName
})

export const LenNotes_Action_SetColumnsArray = (columns: ColumnConfiguration_Interface[]):
    Interface_SetColumnsArray => ({
        type: Type_SetColumnsArray,
        Columns: columns
    })

const Title = "Notes";



export const LenNotes_Action_applyChangedColumns =
    (columns: ColumnConfiguration_Interface[]):
        AppThunkAction<Action> => (dispatch, getState) => {

            dispatch(GlobalAnimation_Loading())



            fetch('/api/grid/' + Number(GridEntityTypeEnum.VWL_LOANNOTES), {
                method: 'POST',
                headers: FetchHeaders(),
                body: JSON.stringify(columns)
            }).then(res => res.json())
                .then((data: any) => {

                    dispatch(LenNotes_Action_SetColumnsArray(columns))

                    dispatch(GlobalAnimation_Loaded())

                    Notify.success(data.message, Title);
                }).catch(error => {
                    Utils.validateData(dispatch, error, Title)
                });

        }

export const LenFungind_Action_CallJson = (
    loanUid: string,
    getColumns: boolean,
    gridState: State,
    revertColumns: boolean,
    excelExporter_allRows?: ExcelExport): AppThunkAction<any> => (dispatch) => {


        dispatch(GlobalAnimation_Loading())

      
        let url = ''
        if (!excelExporter_allRows)
            url = `/api/Lender/loans/notes/${loanUid}/${getColumns}/?${toDataSourceRequestString(gridState)}`
        else
            url = `/api/Lender/loans/notes/${loanUid}/${getColumns}`

        fetch(url,
            {
                method: 'POST',
                headers: FetchHeaders()
            }).then(res => res.json())
            .then((data: BackEndResult1<LenNotes_Interface> ) =>{

           

                let notes = data.ObjOptional.Result.Data//(notes === null ? [] : notes.Rows) as Notes_Entity_Interface[]
                let totalNotes = data.ObjOptional.Result.Total//(notes === null ? 0 : notes.TotalRows) as number

         
                notes.forEach(x => x.Date = formatDate(new Date(x.Date), "yyyy/MM/dd HH:mm"))


                if (!excelExporter_allRows) {
                    dispatch(LenNotes_Action_SetNotessArray(notes, totalNotes, gridState))
                }

                if (revertColumns) {

                    fetch('/api/grid/' + Number(GridEntityTypeEnum.VWL_LOANNOTES), {
                        method: 'POST',
                        headers: FetchHeaders(),
                        body: JSON.stringify(LenNotes_ColumnConfiguration())
                    })
                        .then(res => res.json())
                        .then((data: any) => {

                            dispatch(LenNotes_Action_SetColumnsArray(LenNotes_ColumnConfiguration()))

                            dispatch(GlobalAnimation_Loaded())
                        })
                        .catch(error => {
                            Utils.validateData(dispatch, error, Title);
                        })

                }
                else if (getColumns) {

                    let columns = data.ObjOptional.Columns

                    dispatch(LenNotes_Action_SetColumnsArray(Utils.getColumns2(LenNotes_ColumnConfiguration(), columns) as ColumnConfiguration_Interface[]))

                    dispatch(GlobalAnimation_Loaded())
                }
                else if (excelExporter_allRows) {


                    dispatch(LenNotes_Action_SetAllRows(notes))

                    excelExporter_allRows.save()

                    dispatch(LenNotes_Action_SetAllRows([]))

                    dispatch(GlobalAnimation_Loaded())


                    Notify.success("", "Export Complete")

                }
                else {
                    dispatch(GlobalAnimation_Loaded())
                }






            }).catch(error => {

                Utils.validateData(dispatch, error, Title);
            });






    }