import { AggregateDescriptor, DataSourceRequestState, toDataSourceRequestString } from "@progress/kendo-data-query";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { Action } from "redux";
import { AppThunkAction } from "../..";
import { GridEntityTypeEnum } from '../../../utilities/Enums';
import { GlobalAnimation_Loaded, GlobalAnimation_Loading, Notify, Utils } from "../../../utilities/Functions";
import { BackEndResult1, ColumnConfiguration_Interface, FetchHeaders, LeFunding_ColumnConfiguration, LenFunding_Interface } from "../../commons/LenderCommon2";


const Type = 'Funding_Type/'
export const LenFunding_Type_SetFundingArray = Type + 'SetFundingArray'
export const LenFunding_Type_SetColumnsArray = Type + 'SetColumnsArray'
export const LenFunding_Type_SetActiveColumn = Type + 'SetActiveColumn'
export const LenFunding_Type_SetAllRows = Type + 'SetAllRows'
export const LenFunding_Type_SetTotalSum = Type + 'SetTotalSum'


export interface LenFunding_Interface_SetTotalSum extends Action<typeof LenFunding_Type_SetTotalSum> {
    TotalSum: { [k: string]: number } 
}

export interface LenFunding_Interface_SetAllRows extends Action<typeof LenFunding_Type_SetAllRows> {
    AllRows: LenFunding_Interface[]
}

export interface LenFunding_Interface_SetFundingArray extends Action<typeof LenFunding_Type_SetFundingArray> {
    Fundings: LenFunding_Interface[], TotalSum: { [k: string]: number } ,
    TotalRows: number, GridState: DataSourceRequestState
}
export interface LenFunding_Interface_SetColumnsArray extends Action<typeof LenFunding_Type_SetColumnsArray> {
    Columns: ColumnConfiguration_Interface[]
}
export interface LenFunding_Interface_SetActiveColumn extends Action<typeof LenFunding_Type_SetActiveColumn> {
    columnName: string
}



export const LenFunding_Action_SetTotalSum = (totalSum: { [k: string]: number } ):
    LenFunding_Interface_SetTotalSum => ({
        type: LenFunding_Type_SetTotalSum,
        TotalSum: totalSum
    })

export const LenFunding_Action_SetAllRows = (allRows: LenFunding_Interface[]):
    LenFunding_Interface_SetAllRows => ({
        type: LenFunding_Type_SetAllRows,
        AllRows: allRows
    })

export const LenFunding_Action_SetFundingsArray = (fundings: LenFunding_Interface[],
    totalSum: { [k: string]: number } , totalRows: number, gridState: DataSourceRequestState): LenFunding_Interface_SetFundingArray => ({
        type: LenFunding_Type_SetFundingArray,
        Fundings: fundings,
        TotalSum: totalSum,
        TotalRows: totalRows,
        GridState: gridState
    })


export const LenFunding_Action_SetActiveColumn = (columnName: string): LenFunding_Interface_SetActiveColumn => ({
    type: LenFunding_Type_SetActiveColumn,
    columnName
})

export const LenFunding_Action_SetColumnsArray = (columns: ColumnConfiguration_Interface[]):
    LenFunding_Interface_SetColumnsArray => ({
        type: LenFunding_Type_SetColumnsArray,
        Columns: columns
    })

const Title = "Funding";



export const LenFunding_Action_applyChangedColumns =
    (columns: ColumnConfiguration_Interface[]):
        AppThunkAction<Action> => (dispatch, getState) => {

            dispatch(GlobalAnimation_Loading())

        

            fetch('/api/grid/' + Number(GridEntityTypeEnum.VWL_FUNDING), {
                method: 'POST',
                headers: FetchHeaders(),
                body: JSON.stringify(columns)
            }).then(res => res.json())
                .then((data: any) => {

                    dispatch(LenFunding_Action_SetColumnsArray(columns))

                    dispatch(GlobalAnimation_Loaded())

                    Notify.success(data.message, Title);
                }).catch(error => {
                    Utils.validateData(dispatch, error, Title)
                });

        }




export const LenFunding_Action_CallJson = (
    loanUid: string,
    getColumns: boolean,
    gridState: DataSourceRequestState,
    revertColumns: boolean,
    excelExporter_allRows?: ExcelExport): AppThunkAction<any> => (dispatch) => {


        dispatch(GlobalAnimation_Loading())

      
        


        let arrAggregates: AggregateDescriptor[] = [
            { field: "LenderCurrentBalance", aggregate: "sum" },
            { field: "LenderAmountFunded", aggregate: "sum" },
            { field: "InvestorRate", aggregate: "sum" },
            { field: "PercentageOwned", aggregate: "sum" },
            { field: "PaymentInformation", aggregate: "sum" }];


        let url = ''
        if (!excelExporter_allRows) {
            gridState = {
                ...gridState,
                aggregates: arrAggregates
            }
            url = `/api/Lender/loans/funding/${loanUid}/${getColumns}/?${toDataSourceRequestString(gridState)}`
        } else {
            let dsrs: DataSourceRequestState = {
                aggregates: arrAggregates 
            }
            url = `/api/Lender/loans/funding/${loanUid}/${getColumns}/?${toDataSourceRequestString(dsrs)}`
         
        }
        fetch(url,
            {
                method: 'POST',
                headers: FetchHeaders()
            }).then(res => res.json())
            .then((data: BackEndResult1<LenFunding_Interface>) => {

                let arrFundings = data.ObjOptional.Result.Data
                let totalFundings = data.ObjOptional.Result.Total
                let totalSum: { [k: string]: number } = {}
                data.ObjOptional.Result.AggregateResults.map(obj => totalSum[obj.Member] = obj.Value)

                if (!excelExporter_allRows) {
                    dispatch(LenFunding_Action_SetFundingsArray(arrFundings, totalSum, totalFundings, gridState))
                }

                if (revertColumns) {

                    fetch('/api/grid/' + Number(GridEntityTypeEnum.VWL_FUNDING), {
                        method: 'POST',
                        headers: FetchHeaders(),
                        body: JSON.stringify(LeFunding_ColumnConfiguration())
                    })
                        .then(res => res.json())
                        .then((data: any) => {

                            dispatch(LenFunding_Action_SetColumnsArray(LeFunding_ColumnConfiguration()))

                            dispatch(GlobalAnimation_Loaded())
                        })
                        .catch(error => {
                            Utils.validateData(dispatch, error, Title);
                        })

                }
                else if (getColumns) {

                    
                    let columns = data.ObjOptional.Columns as ColumnConfiguration_Interface[]

                  
                    columns = Utils.getColumns2(LeFunding_ColumnConfiguration(), columns) as ColumnConfiguration_Interface[]

                 
                    dispatch(LenFunding_Action_SetColumnsArray(columns))

                    dispatch(GlobalAnimation_Loaded())
                }
                else if (excelExporter_allRows) {


                    dispatch(LenFunding_Action_SetAllRows(arrFundings))
                    dispatch(LenFunding_Action_SetTotalSum(totalSum))

                    excelExporter_allRows.save()

                    dispatch(LenFunding_Action_SetAllRows([]))

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



