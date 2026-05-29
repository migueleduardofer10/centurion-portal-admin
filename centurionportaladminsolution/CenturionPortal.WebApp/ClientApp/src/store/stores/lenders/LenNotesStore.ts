import { State } from "@progress/kendo-data-query";
import { ApplicationState } from '../..';
import { Interface_SetActiveColumn, Interface_SetAllRows, Interface_SetColumnsArray, Interface_SetNotesArray, Type_SetActiveColumn, Type_SetAllRows, Type_SetColumnsArray, Type_SetNotesArray } from '../../actions/lenders/LenNotesAction';
import { ColumnConfiguration_Interface, LenNotes_Interface, StateInitialValue, AggregateResult_Interface } from '../../commons/LenderCommon2';


export interface LenNotes_StateDefinition {
    Rows: LenNotes_Interface[],
    AllRows: LenNotes_Interface[],
    Columns: ColumnConfiguration_Interface[],
    ActiveColumn: string,
     
    TotalRows: number,
    GridState: State,
}


export const LenNotes_Reducer = (
    state: LenNotes_StateDefinition = {
        Rows: [], Columns: [], ActiveColumn: '',   TotalRows: 0,
        AllRows: [], GridState: StateInitialValue
    },
    action: Interface_SetNotesArray | Interface_SetColumnsArray |
        Interface_SetActiveColumn | Interface_SetAllRows 
): LenNotes_StateDefinition => {

    switch (action.type) {
        case Type_SetNotesArray:
            {
                let obj = action as Interface_SetNotesArray
                return {
                    ...state,                   
                    Rows: obj.Notes,
                    TotalRows: obj.TotalRows,
                    AllRows: [],
                    GridState: obj.GridState
                }
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
        case Type_SetActiveColumn:
            {
                let obj = action as Interface_SetActiveColumn
                return {
                    ...state,
                    ActiveColumn: obj.columnName
                }
            }
        default:
            return state
    }
}



export const LenNotes_StateObject = (state: ApplicationState) => state.lenNotes


export default LenNotes_Reducer
