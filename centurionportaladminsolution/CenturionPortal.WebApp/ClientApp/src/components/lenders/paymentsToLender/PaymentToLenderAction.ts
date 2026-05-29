import { AggregateDescriptor, DataSourceRequestState, toDataSourceRequestString } from "@progress/kendo-data-query"
import { ExcelExport } from "@progress/kendo-react-excel-export"
import { Action } from "redux"
import { AppThunkAction } from "../../../store"
import { BackEndGenericResulInterface, BackEndResult3, PaymentToLender_ColumnConfiguration, Utilities_Convert_StringToStringDateFormat } from "../../../store/commons/LenderCommon2"
import { Auth, GlobalAnimation_Loaded, GlobalAnimation_Loading, Notify, Utils } from "../../../utilities/Functions"
import { IComboBoxDataSource } from "../../shared/customIEntities/IComboBoxDataSource"
import { IELSServiceMap } from "../../shared/dataBaseIEntities/IELSServiceMap"


const Title = 'Payment to Lender'
const Type = 'PaymentToLender/'

export const PaymentToLender_Grid_DataSourceRequestState_InitialValue: DataSourceRequestState = { skip: 0, take: 30 }


//*************************************************************************************************************************************************************************************************************************


export const PaymentToLender_Type_SetArrIELSServiceMap = Type + 'SetArrIELSServiceMap'
export interface PaymentToLender_Interface_SetArrIELSServiceMap extends Action<typeof PaymentToLender_Type_SetArrIELSServiceMap> {
    ArrIELSServiceMap: IComboBoxDataSource[]
}
export const PaymentToLender_Action_SetArrIELSServiceMap = (ArrIELSServiceMap: IComboBoxDataSource[]): PaymentToLender_Interface_SetArrIELSServiceMap => ({ type: PaymentToLender_Type_SetArrIELSServiceMap, ArrIELSServiceMap })


//*************************************************************************************************************************************************************************************************************************


export const PaymentToLender_Type_SetResult = Type + 'SetResult'
export interface PaymentToLender_Interface_SetResult extends Action<typeof PaymentToLender_Type_SetResult> {
    Rows: [],
    TotalRows: number,
    TotalSum: { [k: string]: number }
}
export const PaymentToLender_Action_SetResult = (Rows: [],
    TotalRows: number,
    TotalSum: { [k: string]: number }): PaymentToLender_Interface_SetResult => ({ type: PaymentToLender_Type_SetResult, Rows, TotalRows, TotalSum })

//*************************************************************************************************************************************************************************************************************************


export const PaymentToLender_Type_SetTotalSum = Type + 'SetTotalSum'
export interface PaymentToLender_Interface_SetTotalSum extends Action<typeof PaymentToLender_Type_SetTotalSum> {
    
    TotalSum: { [k: string]: number }
}
export const PaymentToLender_Action_SetTotalSum = ( 
     
    TotalSum: { [k: string]: number }): PaymentToLender_Interface_SetTotalSum => ({ type: PaymentToLender_Type_SetTotalSum,  TotalSum })

//*************************************************************************************************************************************************************************************************************************




export const PaymentToLender_Action_Load = (): AppThunkAction<Action> => (dispatch) => {

    dispatch(GlobalAnimation_Loading())

    fetch(`api/ELSUser/getAccount_AccountFullName/`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
        .then((data: BackEndResult3<IELSServiceMap[]>) => {

            dispatch(GlobalAnimation_Loaded())

            let arrAccount: IComboBoxDataSource[] = [{ Key: '0', Value: 'All' }]
            arrAccount.push(...data.ObjOptional.map(x => ({ Key: x.Account, Value: x.FullName + ' - ' + x.Account } as IComboBoxDataSource)))

            dispatch(PaymentToLender_Action_SetArrIELSServiceMap(arrAccount))

            dispatch(GlobalAnimation_Loaded());
        })
        .catch(error => {
            Utils.validateData(dispatch, error, Title)
        })



}



//*************************************************************************************************************************************************************************************************************************


export const PaymentToLender_Action_ExportThisPage =
    (objExcelExport: React.RefObject<ExcelExport>, data: []):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())

            objExcelExport?.current!.save(data)

            dispatch(GlobalAnimation_Loaded())


            Notify.success("", "Export Complete")


        }





//*************************************************************************************************************************************************************************************************************************



export const PaymentToLender_Action_Search = (
    gridState: DataSourceRequestState,
    account: string,
    onlyPending: boolean, objExcelExport: React.RefObject<ExcelExport> | undefined): AppThunkAction<Action> => (dispatch) => {
        dispatch(GlobalAnimation_Loading())

        let arrAggregateSum: AggregateDescriptor[] = []
        PaymentToLender_ColumnConfiguration().filter(x => x.IsAgregateSum).forEach(x => arrAggregateSum.push({ field: x.ColumnName!, aggregate: "sum" }))

        if (!objExcelExport) {
            gridState.aggregates = arrAggregateSum
        }
        else {
            gridState = { skip: 0, aggregates: arrAggregateSum }
        }

        fetch(`api/Lender/paymentToLender/${account}/${onlyPending}/?${toDataSourceRequestString(gridState)}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
            .then((data: BackEndResult3<BackEndGenericResulInterface<any>>) => {

                dispatch(GlobalAnimation_Loaded())

                console.log(data)
              

                if (data.ObjOptional !=null &&  data.ObjOptional.Total != 0) {



                    let totalSum: { [k: string]: number } = {}
                    data.ObjOptional.AggregateResults.forEach(x => totalSum[x.Member] = x.Value)

                    let rows = data.ObjOptional.Data as any[]

                    rows.forEach(obj => obj.CheckDate = new Date(obj.CheckDate))
                   
                    let totalRows = data.ObjOptional.Total

                    if (!objExcelExport) {
                        dispatch(PaymentToLender_Action_SetResult(rows as [], totalRows, totalSum))


                    }
                    else {

                        dispatch(PaymentToLender_Action_SetTotalSum(totalSum))

                        objExcelExport.current?.save(rows)

                        Notify.success("", "Export Complete")
                    }

                }

                dispatch(GlobalAnimation_Loaded());
            })
            .catch(error => {
                Utils.validateData(dispatch, error, Title)
            })



    }
