import { DataSourceRequestState } from "@progress/kendo-data-query";
import { ColumnConfiguration_Interface, INFState_Interface } from "../../store/commons/LenderCommon2";
import { PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue, PartialOwnershipPortfolio_Interface_SetActiveColumn, PartialOwnershipPortfolio_Interface_SetColumns, PartialOwnershipPortfolio_Interface_SetRows, PartialOwnershipPortfolio_Type_SetRows, PartialOwnershipPortfolio_Type_SetColumns, PartialOwnershipPortfolio_Type_SetActiveColumn, PartialOwnershipPortfolio_Type_SetArr, PartialOwnershipPortfolio_Interface_SetArr, PartialOwnershipPortfolio_SubReportTable, PartialOwnershipPortfolio_Interface_SetDetailDictionary, PartialOwnershipPortfolio_Type_SetDetailDictionary } from "./PartialOwnershipPortfolioAction";
import { ApplicationState } from "../../store";
import { IComboBoxDataSource } from '../shared/customIEntities/IComboBoxDataSource'
import { IGraphSecondaryLoan } from "../shared/customIEntities/IGraphSecondaryLoan";


export interface PartialOwnershipPortfolio_GridDetailDictionary {
    Report1_Value: [],
    Report1_Agregate_Sum_Value: { [k: string]: number },
    Report2_Value: PartialOwnershipPortfolio_SubReportTable[],
    Report3_Value: PartialOwnershipPortfolio_SubReportTable[],
    Report4_Value: PartialOwnershipPortfolio_SubReportTable[],
    Graph_Value: IGraphSecondaryLoan[]
}

export interface PartialOwnershipPortfolio_StateDefinition {
    Columns: ColumnConfiguration_Interface[]
    Rows: [],
    GridState: DataSourceRequestState,
    ActiveColumn: string,
    TotalSum: { [k: string]: number }
    AllRows: [],
    TotalRows: number,
    ArrState: IComboBoxDataSource[],
    ArrStatus: IComboBoxDataSource[],
    ArrBalance: IComboBoxDataSource[],
    GridDetailDictionary: { [k: string]: PartialOwnershipPortfolio_GridDetailDictionary }
}


export const PartialOwnershipPortfolio_Reducer = (

    state: PartialOwnershipPortfolio_StateDefinition = {
        Columns: [],
        Rows: [],
        GridState: PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue,
        ActiveColumn: '',
        TotalSum: {},
        AllRows: [],
        TotalRows: 0,
        ArrState: [],
        ArrStatus: [],
        ArrBalance: [],
        GridDetailDictionary: {}


    },
    action: PartialOwnershipPortfolio_Interface_SetActiveColumn |
        PartialOwnershipPortfolio_Interface_SetColumns |
        PartialOwnershipPortfolio_Interface_SetRows |
        PartialOwnershipPortfolio_Interface_SetArr |
        PartialOwnershipPortfolio_Interface_SetDetailDictionary
): PartialOwnershipPortfolio_StateDefinition => {
    switch (action.type) {
        case PartialOwnershipPortfolio_Type_SetDetailDictionary: {
            state= {
                ...state,
                GridDetailDictionary: (action as PartialOwnershipPortfolio_Interface_SetDetailDictionary).GridDetailDictionary
            }

            
            return state
        }
        case PartialOwnershipPortfolio_Type_SetRows:
            {
                let x = action as PartialOwnershipPortfolio_Interface_SetRows
                return {
                    ...state, Rows: x.Rows,
                    GridState: x.GridState,
                    TotalSum: x.TotalSum,
                    TotalRows: x.TotalRows,
                    GridDetailDictionary: x.GridDetailDictionary
                }
            }
        case PartialOwnershipPortfolio_Type_SetArr: {
            let x = action as PartialOwnershipPortfolio_Interface_SetArr
            return {
                ...state,
                ArrStatus: x.ArrStatus,
                ArrState: x.ArrState,
                ArrBalance: x.ArrBalance
            }
        }
        case PartialOwnershipPortfolio_Type_SetColumns:
            return {
                ...state, Columns: (action as PartialOwnershipPortfolio_Interface_SetColumns).Columns
            }
        case PartialOwnershipPortfolio_Type_SetActiveColumn:
            return {
                ...state, ActiveColumn: (action as PartialOwnershipPortfolio_Interface_SetActiveColumn).ActiveColumn
            }
        default:
            return state
    }

}




export const PartialOwnershipPortfolio_StateObject = (state: ApplicationState): PartialOwnershipPortfolio_StateDefinition =>
    state.partialOwnershipPortfolio


export default PartialOwnershipPortfolio_Reducer





