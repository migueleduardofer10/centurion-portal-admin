import { INFState_Interface, ColumnConfiguration_Interface } from "../../commons/LenderCommon2";
import {
    Interface_SetArrINFState, Type_SetArrINFState, Type_SetArr, Interface_SetArr, Interface_SetAllRows,
    Interface_SetColumnsArray, Type_SetAllRows, Type_SetColumnsArray, Interface_SetActiveColumn, Type_SetActiveColumn
} from "../../actions/lenders/LenLoansSearchAction";
import { ApplicationState } from "../..";
import { DataSourceRequestState } from "@progress/kendo-data-query";


export interface LenLoansSearch_StateDefinition {
    ArrInfState: INFState_Interface[],
    Rows: [],
    AllRows:[],
    TotalRows: number,
    GridState: DataSourceRequestState,
    Columns: ColumnConfiguration_Interface[],
    ActiveColumn: string,
}







export const LenLoansSearch_Reducer = (
    state: LenLoansSearch_StateDefinition = {
        ArrInfState: [],
        Rows: [],
        AllRows:[],
        TotalRows: 0,
        GridState: { skip: 0, take: 10 },
        Columns: [],
        ActiveColumn:''
    },
    action: Interface_SetArrINFState | Interface_SetArr |
        Interface_SetAllRows | Interface_SetColumnsArray | Interface_SetActiveColumn
): LenLoansSearch_StateDefinition => {

    switch (action.type) {
        case Type_SetArrINFState:
            {
                let obj = action as Interface_SetArrINFState
                
                return {
                    ...state,
                    ArrInfState: obj.ArrInfState
                }
            }
        case Type_SetActiveColumn:
            {
                let obj = action as Interface_SetActiveColumn
                return { ...state, ActiveColumn: obj.columnName }
            }
        case Type_SetAllRows:
            {
                let obj = action as Interface_SetAllRows
                return {
                    ...state,
                    AllRows: obj.AllRows
                }
            }
        case Type_SetColumnsArray:
            {
                let obj = action as Interface_SetColumnsArray
               
                return {
                    ...state,
                    Columns: obj.Columns
                }
            }
        case Type_SetArr:
            {
                let obj = action as Interface_SetArr
                return {
                    ...state,
                    Rows: obj.Rows,
                    TotalRows: obj.TotalRows,
                    GridState: obj.GridState
                }

            }
        default:
            return state
    }
}




export const LenLoansSearch_StateObject = (state: ApplicationState) =>
    state.lenLoansSearch


export default LenLoansSearch_Reducer
