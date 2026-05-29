import { IELSServiceMap } from "../../shared/dataBaseIEntities/IELSServiceMap";
import { PaymentToLender_Interface_SetArrIELSServiceMap, PaymentToLender_Type_SetArrIELSServiceMap, PaymentToLender_Grid_DataSourceRequestState_InitialValue, PaymentToLender_Type_SetResult, PaymentToLender_Interface_SetResult } from "./PaymentToLenderAction";
import { ApplicationState } from "../../../store";
import { DataSourceRequestState } from "@progress/kendo-data-query";
import { IComboBoxDataSource } from "../../shared/customIEntities/IComboBoxDataSource";


export interface PaymentToLender_StateDefinition {
    ArrIELSServiceMap: IComboBoxDataSource[],
    Rows: [],
    TotalRows: number,
    GridState: DataSourceRequestState,
    TotalSum: { [k: string]: number }
}




export const PaymentToLender_Reducer = (
    state: PaymentToLender_StateDefinition = {
        ArrIELSServiceMap: [],
        Rows: [],
        TotalRows: 0,
        GridState: PaymentToLender_Grid_DataSourceRequestState_InitialValue,
        TotalSum: {}
    },
    action: PaymentToLender_Interface_SetArrIELSServiceMap | PaymentToLender_Interface_SetResult
): PaymentToLender_StateDefinition => {
    switch (action.type) {
        case PaymentToLender_Type_SetArrIELSServiceMap: {
            let x = (action as PaymentToLender_Interface_SetArrIELSServiceMap);
            return {
                ...state,
                ArrIELSServiceMap: x.ArrIELSServiceMap
            }
        }
        case PaymentToLender_Type_SetResult: {
            let x = action as PaymentToLender_Interface_SetResult
            return {
                ...state,
                Rows: x.Rows, TotalRows: x.TotalRows, TotalSum: x.TotalSum
            }
        }

        default:
            return state
    }

}




export const PaymentToLender_StateObject = (state: ApplicationState): PaymentToLender_StateDefinition =>
    state.paymentToLender


export default PaymentToLender_Reducer




