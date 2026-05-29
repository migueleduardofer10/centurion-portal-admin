import { Action } from "redux"
import { AppThunkAction } from "../.."
import { GlobalAnimation_Loading, Notify, Utils, GlobalAnimation_Loaded, Auth } from "../../../utilities/Functions"
import { FetchHeaders, INFState_Interface, BackEndResult2, BackEndResult1, ColumnConfiguration_Interface, LenLoanSearch_ColumnConfiguration, Utilities_Convert_StringToStringDateFormat } from "../../commons/LenderCommon2"
import { DataSourceRequestState, toDataSourceRequestString } from "@progress/kendo-data-query"
import { ExcelExport } from "@progress/kendo-react-excel-export"
import { GridEntityTypeEnum } from "../../../utilities/Enums"




const Type = 'LenLoansSearch_Action/'
export const Type_SetArrINFState = Type + 'SetArrINFState'
export const Type_SetArr = Type + 'SetArr'
export const Type_SetColumnsArray = Type + 'SetColumnsArray'
export const Type_SetActiveColumn = Type + 'SetActiveColumn'
export const Type_SetAllRows = Type + 'SetAllRows'

export interface Interface_SetArrINFState extends Action<typeof Type_SetArrINFState> {
    ArrInfState: INFState_Interface[]
}
export interface Interface_SetAllRows extends Action<typeof Type_SetAllRows> {
    AllRows: []
}
export interface Interface_SetArr extends Action<typeof Type_SetArr> {
    Rows: [],
    TotalRows: number,
    GridState: DataSourceRequestState
}
export interface Interface_SetActiveColumn extends Action<typeof Type_SetActiveColumn> { columnName: string }

export interface Interface_SetColumnsArray extends Action<typeof Type_SetColumnsArray> {
    Columns: ColumnConfiguration_Interface[]
}

const Title = 'Len Loans Search'


export const LenLoansSearch_Action_SetAllRows = (allRows: []):
    Interface_SetAllRows => ({
        type: Type_SetAllRows,
        AllRows: allRows
    })

export const LenLoansSearch_Action_SetColumnsArray = (columns: ColumnConfiguration_Interface[]):
    Interface_SetColumnsArray => ({
        type: Type_SetColumnsArray,
        Columns: columns
    })

export const LenLoansSearch_Action_SetActiveColumn = (columnName: string): Interface_SetActiveColumn => ({
    type: Type_SetActiveColumn,
    columnName
})


export const LenLoansSearch_Action_SetArrINFState = (ArrInfState: INFState_Interface[]): Interface_SetArrINFState => ({
    type: Type_SetArrINFState,
    ArrInfState
})

export const LenLoansSearch_Action_SetArr = (arrRows: [], totalRows: number, gridState: DataSourceRequestState): Interface_SetArr => ({
    type: Type_SetArr,
    Rows: arrRows,
    TotalRows: totalRows,
    GridState: gridState
})



export const LenLoansSearch_Action_applyChangedColumns =
    (columns: ColumnConfiguration_Interface[]):
        AppThunkAction<Action> => (dispatch, getState) => {

            dispatch(GlobalAnimation_Loading())


            fetch('/api/grid/' + Number(GridEntityTypeEnum.LEN_LOANS_SEARCH), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                },
                body: JSON.stringify(columns)
            }).then(res => res.json())
                .then((data: any) => {
                    dispatch(LenLoansSearch_Action_SetColumnsArray(columns))

                    dispatch(GlobalAnimation_Loaded())

                    Notify.success(data.message, Title);
                }).catch(error => {
                    Utils.validateData(dispatch, error, Title)
                });

        }

export const LenLoansSearch_Action_CallJson =
    (lastName: string, firstName: string, address: string, city: string, state: string,
        gridState: DataSourceRequestState,
        revertColumns: boolean,
        getColumns: boolean,
        objExcelExport: React.RefObject<ExcelExport> | undefined):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())

            if (lastName === '') lastName = ' '
            if (firstName === '') firstName = ' '
            if (address === '') address = ' '
            if (city === '') city = ' '



            fetch(`/api/Lender/loans/loansSearch_by/${lastName}/${firstName}/${address}/${city}/${state}/${getColumns}/?${toDataSourceRequestString(gridState)}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: BackEndResult1<any>) => {


                    let rows = data.ObjOptional.Result.Data;

                    rows.forEach(obj => {
                        obj.MaturityDate = Utilities_Convert_StringToStringDateFormat(obj.MaturityDate)
                        obj.NextDueDate = Utilities_Convert_StringToStringDateFormat(obj.NextDueDate)                        
                    })

                    if (!objExcelExport) {
                        dispatch(LenLoansSearch_Action_SetArr(rows as [], data.ObjOptional.Result.Total, gridState))
                    }

                    if (revertColumns) {



                        fetch('/api/grid/' + Number(GridEntityTypeEnum.LEN_LOANS_SEARCH), {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${Auth.getJWT()}`
                            },
                            body: JSON.stringify(LenLoanSearch_ColumnConfiguration)
                        })
                            .then(res => res.json())
                            .then((data: any) => {
                              
                                dispatch(LenLoansSearch_Action_SetColumnsArray(LenLoanSearch_ColumnConfiguration()))

                                dispatch(GlobalAnimation_Loaded())
                            })
                            .catch(error => {
                                Utils.validateData(dispatch, error, Title);
                            })

                    }
                    else if (getColumns) {


                        let columns = Utils.getColumns(LenLoanSearch_ColumnConfiguration(), data.ObjOptional.Columns)

                        columns.sort((a, b) => a.position - b.position)

                        dispatch(LenLoansSearch_Action_SetColumnsArray(columns))

                        dispatch(GlobalAnimation_Loaded())
                    }
                    else if (objExcelExport) {



                        objExcelExport.current?.save(rows)


                        dispatch(GlobalAnimation_Loaded())


                        Notify.success("", "Export Complete")

                    }
                    else {
                        dispatch(GlobalAnimation_Loaded())
                    }


                }).catch(error => {
                    Utils.validateData(dispatch, error, Title)
                });

        }


export const LenLoansSearch_Action_ExportThisPage =
    ( objExcelExport: React.RefObject<ExcelExport>, data: []):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())

            objExcelExport.current?.save(data)

            dispatch(GlobalAnimation_Loaded())

            Notify.success("", "Export Complete")
        }

export const LenLoansSearch_Action_CallJsonFillPropertyState =
    (getColumns: boolean):
        AppThunkAction<Action> => (dispatch, getState) => {

            dispatch(GlobalAnimation_Loading())



            fetch(`/api/Lender/loans/loansSearch_getInfState/${getColumns}`, {
                method: 'POST',
                headers: FetchHeaders(),
            }).then(res => res.json())
                .then((data: BackEndResult2<INFState_Interface>) => {

                    let columns = Utils.getColumns2(LenLoanSearch_ColumnConfiguration(), data.ObjOptional.Columns) as ColumnConfiguration_Interface[]

                    dispatch(LenLoansSearch_Action_SetArrINFState(data.ObjOptional.Result))

                    dispatch(LenLoansSearch_Action_SetColumnsArray(columns))

                    dispatch(GlobalAnimation_Loaded())

                }).catch(error => {
                    Utils.validateData(dispatch, error, Title)
                });

        }
