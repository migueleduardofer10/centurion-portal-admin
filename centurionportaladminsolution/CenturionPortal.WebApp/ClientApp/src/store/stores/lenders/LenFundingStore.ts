import { DataSourceRequestState } from "@progress/kendo-data-query";
import { ApplicationState } from '../..';
import { LenFunding_Interface_SetActiveColumn, LenFunding_Interface_SetAllRows, LenFunding_Interface_SetColumnsArray, LenFunding_Interface_SetFundingArray, LenFunding_Interface_SetTotalSum, LenFunding_Type_SetActiveColumn, LenFunding_Type_SetAllRows, LenFunding_Type_SetColumnsArray, LenFunding_Type_SetFundingArray, LenFunding_Type_SetTotalSum } from '../../actions/lenders/LenFundingAction';
import { ColumnConfiguration_Interface, LenFunding_Interface, StateInitialValue } from '../../commons/LenderCommon2';


export interface LenFunding_StateDefinition {
    Rows: LenFunding_Interface[],
    AllRows: LenFunding_Interface[],
    Columns: ColumnConfiguration_Interface[],
    ActiveColumn: string,
    TotalSum: { [k: string]: number }   
    TotalRows: number,    
    GridState: DataSourceRequestState,
}


export const LenFunding_Reducer = (
    state: LenFunding_StateDefinition = {
        Rows: [], Columns: [], ActiveColumn: '', TotalSum: {}  , TotalRows: 0,
        AllRows: [], GridState: StateInitialValue
    },
    action: LenFunding_Interface_SetFundingArray | LenFunding_Interface_SetColumnsArray |
        LenFunding_Interface_SetActiveColumn | LenFunding_Interface_SetAllRows | LenFunding_Interface_SetTotalSum
): LenFunding_StateDefinition => {
     
    switch (action.type) {
        case LenFunding_Type_SetFundingArray:
            {
                let obj = action as LenFunding_Interface_SetFundingArray
                return {
                    ...state,
                    TotalSum: obj.TotalSum,
                    Rows: obj.Fundings,
                    TotalRows: obj.TotalRows,
                    AllRows: [],
                    GridState: obj.GridState
                }
            }
        case LenFunding_Type_SetAllRows:
            {
                let obj = action as LenFunding_Interface_SetAllRows

                return {
                    ...state,
                    AllRows: obj.AllRows
                }
            }
        case LenFunding_Type_SetTotalSum:
            {
                let obj = action as LenFunding_Interface_SetTotalSum

                return {
                    ...state,
                    TotalSum: obj.TotalSum
                }
            }

        case LenFunding_Type_SetColumnsArray:
            {
                let obj = action as LenFunding_Interface_SetColumnsArray
                
                return  {
                    ...state,
                    Columns: obj.Columns
                }
                
            }       
        case LenFunding_Type_SetActiveColumn:
            {
                let obj = action as LenFunding_Interface_SetActiveColumn
                return {
                    ...state,
                    ActiveColumn: obj.columnName
                }
            }
        default:
            return state
    }
}



export const LenFunding_StateObject = (state: ApplicationState) => state.lenFunding


export default LenFunding_Reducer
