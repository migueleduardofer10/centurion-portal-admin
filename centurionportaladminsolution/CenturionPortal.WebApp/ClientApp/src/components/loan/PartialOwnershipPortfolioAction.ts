import { AggregateDescriptor, DataSourceRequestState, toDataSourceRequestString } from "@progress/kendo-data-query"
import { ExcelExport } from "@progress/kendo-react-excel-export"
import { Action } from "redux"
import { AppThunkAction } from "../../store"
import { BackEndGenericResulInterface, BackEndResult3, ColumnConfiguration_Interface, INFState_Interface, PartialOwnershipPortfolio_ColumnConfiguration, Utilities_Convert_StringToStringDateFormat, VCW_VendorPortfolioSecondary_ColumnConfiguration } from "../../store/commons/LenderCommon2"
import { Auth, GlobalAnimation_Loaded, GlobalAnimation_Loading, Notify, Utils } from "../../utilities/Functions"
import { IComboBoxDataSource } from "../shared/customIEntities/IComboBoxDataSource"
import { IGraphSecondaryLoan } from "../shared/customIEntities/IGraphSecondaryLoan"
import { ILNSBorrower } from "../shared/dataBaseIEntities/ILNSBorrower"
import { ILNSLoan } from "../shared/dataBaseIEntities/ILNSLoan"
import { ILNSProperty } from "../shared/dataBaseIEntities/ILNSProperty"
import { PartialOwnershipPortfolio_GridDetailDictionary } from "./PartialOwnershipPortfolioStore"

//***************************************************************************************************************************************************************************
const Title = 'Partial Ownership Portfolio'
const Type = 'PartialOwnershipPortfolio/'

export const PartialOwnershipPortfolio_Grid_DataSourceRequestState_InitialValue: DataSourceRequestState = { skip: 0, take: 30 }

//***************************************************************************************************************************************************************************

export const PartialOwnershipPortfolio_Type_SetColumns = Type + 'SetColumns'

export interface PartialOwnershipPortfolio_Interface_SetColumns
    extends Action<typeof PartialOwnershipPortfolio_Type_SetColumns> {
    Columns: ColumnConfiguration_Interface[]
}

export const PartialOwnershipPortfolio_Action_SetColumns =
    (Columns: ColumnConfiguration_Interface[])
        : PartialOwnershipPortfolio_Interface_SetColumns =>
        ({
            type: PartialOwnershipPortfolio_Type_SetColumns,
            Columns
        })

//***************************************************************************************************************************************************************************

export const PartialOwnershipPortfolio_Type_SetRows = Type + 'SetRows'

export interface PartialOwnershipPortfolio_Interface_SetRows
    extends Action<typeof PartialOwnershipPortfolio_Type_SetRows> {
    Rows: [],
    TotalSum: { [k: string]: number },
    GridState: DataSourceRequestState,
    TotalRows: number,
    GridDetailDictionary: { [k: string]: PartialOwnershipPortfolio_GridDetailDictionary }
}

export const PartialOwnershipPortfolio_Action_SetRows =
    (Rows: [], TotalSum: { [k: string]: number }, GridState: DataSourceRequestState, TotalRows: number, GridDetailDictionary: { [k: string]: PartialOwnershipPortfolio_GridDetailDictionary })
        : PartialOwnershipPortfolio_Interface_SetRows =>
        ({
            type: PartialOwnershipPortfolio_Type_SetRows,
            Rows,
            TotalSum,
            GridState,
            TotalRows,
            GridDetailDictionary
        })
 

//***************************************************************************************************************************************************************************

export const PartialOwnershipPortfolio_Type_SetArr = Type + 'SetArr'

export interface PartialOwnershipPortfolio_Interface_SetArr
    extends Action<typeof PartialOwnershipPortfolio_Type_SetArr> {
    ArrStatus: IComboBoxDataSource[],
    ArrState: IComboBoxDataSource[],
    ArrBalance: IComboBoxDataSource[]
}

export const PartialOwnershipPortfolio_Action_SetArr =
    (ArrStatus: IComboBoxDataSource[],
        ArrState: IComboBoxDataSource[],
        ArrBalance: IComboBoxDataSource[])
        : PartialOwnershipPortfolio_Interface_SetArr =>
        ({
            type: PartialOwnershipPortfolio_Type_SetArr,
            ArrState,
            ArrStatus,
            ArrBalance
        })

//***************************************************************************************************************************************************************************

export const PartialOwnershipPortfolio_Type_SetDetailDictionary = Type + 'SetDetailDictionary'

export interface PartialOwnershipPortfolio_Interface_SetDetailDictionary
    extends Action<typeof PartialOwnershipPortfolio_Type_SetDetailDictionary> {
    GridDetailDictionary: { [k: string]: PartialOwnershipPortfolio_GridDetailDictionary }
}

export const PartialOwnershipPortfolio_Action_SetDetailDictionary =
    (GridDetailDictionary: { [k: string]: PartialOwnershipPortfolio_GridDetailDictionary })
        : PartialOwnershipPortfolio_Interface_SetDetailDictionary =>
        ({
            type: PartialOwnershipPortfolio_Type_SetDetailDictionary,
            GridDetailDictionary
        })

//***************************************************************************************************************************************************************************

export const PartialOwnershipPortfolio_Type_SetActiveColumn = Type + 'SetActiveColumn'

export interface PartialOwnershipPortfolio_Interface_SetActiveColumn
    extends Action<typeof PartialOwnershipPortfolio_Type_SetActiveColumn> {
    ActiveColumn: string

}

export const PartialOwnershipPortfolio_Action_SetActiveColumn =
    (ActiveColumn: string)
        : PartialOwnershipPortfolio_Interface_SetActiveColumn =>
        ({
            type: PartialOwnershipPortfolio_Type_SetActiveColumn,
            ActiveColumn
        })


//***************************************************************************************************************************************************************************


export const PartialOwnershipPortfolio_Action_Graph =
    (loanUid: string,
        afterActions: (
            arr: IGraphSecondaryLoan[]) => void
    ):
        AppThunkAction<Action> => (dispatch, getState) => {





            let url = `/api/Lender/loans/secondaryLoansView_graphSecondaryLoan/${loanUid}`

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }

            }).then(res => res.json())
                .then((data: BackEndResult3<{
                    Result: IGraphSecondaryLoan[]
                }>) => {

                     if (data.ObjOptional.Result != null) {
                        data.ObjOptional.Result.forEach(x => {

                            x.DateDue = Utilities_Convert_StringToStringDateFormat(x.DateDue)
                            x.DateReceived = Utilities_Convert_StringToStringDateFormat(x.DateReceived)
                        })
                    }



                    afterActions(data.ObjOptional.Result)



                }).catch(error => {
                    Utils.validateData(dispatch, error, Title)
                });

        }

//***************************************************************************************************************************************************************************

export interface PartialOwnershipPortfolio_SubReportTable {

    Group1_Label: string,
    Group1_Value: string,
    Group2_Label: string,
    Group2_Value: string,
    Group3_Label: string,
    Group3_Value: string,
    Group4_Label: string,
    Group4_Value: string,
}



export const PartialOwnershipPortfolio_Action_Details =
    (loanUid: string,
        afterActions: (
            report1_agregate_sum: { [k: string]: number },
            report1: [],
            report2: PartialOwnershipPortfolio_SubReportTable[],
            report3: PartialOwnershipPortfolio_SubReportTable[],
            report4: PartialOwnershipPortfolio_SubReportTable[]) => void
    ):
        AppThunkAction<Action> => (dispatch, getState) => {


            let arrAggregateSum: AggregateDescriptor[] = []
            VCW_VendorPortfolioSecondary_ColumnConfiguration().filter(x => x.IsAgregateSum).forEach(x => arrAggregateSum.push({ field: x.ColumnName!, aggregate: "sum" }))
            let dsrs: DataSourceRequestState = { aggregates: arrAggregateSum }



            let url = `/api/Lender/loans/secondaryLoansView_subReports/${loanUid}/?${toDataSourceRequestString(dsrs)}`

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }

            }).then(res => res.json())
                .then((data: BackEndResult3<{
                    Loan: ILNSLoan,
                    Borrower: ILNSBorrower,
                    Property: ILNSProperty,
                    ValuationType: string,
                    VendorPortfolioSecondary: BackEndGenericResulInterface<any>
                }>) => {


                    let loan = data.ObjOptional.Loan
                    let property = data.ObjOptional.Property
                    let borrower = data.ObjOptional.Borrower

                    let report1_agregate_sum: { [k: string]: number } = {}
                    if (data.ObjOptional.VendorPortfolioSecondary.Total != 0) {
                        data.ObjOptional.VendorPortfolioSecondary.AggregateResults.map(x => report1_agregate_sum[x.Member] = x.Value)
                    }
                    let report1: [] = data.ObjOptional.VendorPortfolioSecondary.Data as [];


                    let report2: PartialOwnershipPortfolio_SubReportTable[] = []
                    report2.push(
                        {
                            Group1_Label: 'Original Loan Amount', Group1_Value: Utils.currencyFormat(loan.OriginalBalance),
                            Group2_Label: 'Loan Position', Group2_Value: String(Number(loan.LienPosition) + 1),
                            Group3_Label: 'Accrued Late Charges', Group3_Value: Utils.currencyFormat(loan.UnpaidLateCharges),//falta implementar funcion de calculo
                            Group4_Label: '', Group4_Value: '',
                        },
                        {
                            Group1_Label: 'Current Loan Amount', Group1_Value: Utils.currencyFormat(loan.PrincipalBalance),
                            Group2_Label: 'Escrow Balance', Group2_Value: Utils.currencyFormat(loan.ImpoundBalance),
                            Group3_Label: 'Loan Charges', Group3_Value: Utils.currencyFormat(loan.UnpaidCharges),
                            Group4_Label: '', Group4_Value: '',
                        },
                        {
                            Group1_Label: 'Note Rate', Group1_Value: String(Number(loan.NoteRate) / 100) + '%',
                            Group2_Label: 'Suspense Balance', Group2_Value: Utils.currencyFormat(loan.ReserveBalance),
                            Group3_Label: 'Unpaid Interest', Group3_Value: Utils.currencyFormat(loan.UnpaidInterest),
                            Group4_Label: '', Group4_Value: '',
                        }

                    )


                    let report3: PartialOwnershipPortfolio_SubReportTable[] = []
                    report3.push(
                        {
                            Group1_Label: 'Paid To', Group1_Value: Utilities_Convert_StringToStringDateFormat(loan.PaidToDate),
                            Group2_Label: 'Loan Marutity', Group2_Value: Utilities_Convert_StringToStringDateFormat(loan.MaturityDate),
                            Group3_Label: 'Loan Origination', Group3_Value: Utilities_Convert_StringToStringDateFormat(loan.OriginationDate),
                            Group4_Label: '', Group4_Value: '',
                        },
                        {
                            Group1_Label: 'Next Payment Due', Group1_Value: Utilities_Convert_StringToStringDateFormat(loan.NextDueDate),
                            Group2_Label: 'Loan Payoff', Group2_Value: Utilities_Convert_StringToStringDateFormat(loan.PaidOffDate),
                            Group3_Label: '', Group3_Value: '',
                            Group4_Label: '', Group4_Value: '',
                        }
                    )


                    let report4: PartialOwnershipPortfolio_SubReportTable[] = []
                    report4.push(
                        {
                            Group1_Label: 'Loan', Group1_Value: Utilities_Convert_StringToStringDateFormat(loan.PaidToDate),
                            Group2_Label: 'Type', Group2_Value: Utilities_Convert_StringToStringDateFormat(loan.MaturityDate),
                            Group3_Label: 'APN', Group3_Value: Utilities_Convert_StringToStringDateFormat(loan.OriginationDate),
                            Group4_Label: 'FAX', Group4_Value: '',
                        },
                        {
                            Group1_Label: 'Borrower', Group1_Value: borrower.FullName,
                            Group2_Label: 'Occupancy', Group2_Value: 'occupacity',
                            Group3_Label: 'LTV', Group3_Value: String(property.ValuationAmount != 0 ? loan.PrincipalBalance! / property.ValuationAmount! : 0),
                            Group4_Label: 'Email', Group4_Value: '',
                        }
                        ,
                        {
                            Group1_Label: 'TIN', Group1_Value: borrower.TIN,
                            Group2_Label: 'Appr. Value', Group2_Value: Utils.currencyFormat(property.ValuationAmount),
                            Group3_Label: 'HOME', Group3_Value: borrower.HomePhone,
                            Group4_Label: '', Group4_Value: '',
                        }
                        ,
                        {
                            Group1_Label: 'Mail Address', Group1_Value: loan.BorrowerAddress + ', ' + loan.BorrowerCity + ', ' + loan.BorrowerState + ', ' + loan.BorrowerZip,
                            Group2_Label: 'Appr. Date', Group2_Value: Utilities_Convert_StringToStringDateFormat(property.ValuationDate),
                            Group3_Label: 'Work', Group3_Value: borrower.WorkPhone,
                            Group4_Label: '', Group4_Value: '',
                        }
                        ,
                        {
                            Group1_Label: 'Prop. Address', Group1_Value: property.Street!,
                            Group2_Label: 'App. Source', Group2_Value: data.ObjOptional.ValuationType,
                            Group3_Label: 'Mobile', Group3_Value: borrower.MobilePhone,
                            Group4_Label: '', Group4_Value: '',
                        }
                    )


                    afterActions(report1_agregate_sum, report1, report2, report3, report4)



                }).catch(error => {
                    Utils.validateData(dispatch, error, Title)
                });

        }





//***************************************************************************************************************************************************************************


const GetStatusName = (value: number) => {

    switch (value) {
        case -1: return 'Asigned'
        case 0: return "Performing"
        case 1: return "Closed" //Non Active
        case 2: return "Paid Off"
        case 3: return "Transferred"
        case 4: return "Bankruptcy"
        case 5: return "Foreclosure"
        case 6: return "REO"
        case 7: return "Charge Off"
        case 8: return "Complete Charge Off"
        case 9: return "Transfer Out"
        case 10: return "Payoff Demand"
        case 11: return "Pre Boarding"
        case 12: return "Final Boarding"
        case 13: return "RESPA"
        case 14: return "Loss-Mit Request"
        case 15: return "Delinquent"
        default: return ''
    }
}


const GetStatusArray = (): IComboBoxDataSource[] => (
    [{ Key: "-2", Value: "All" },
    { Key: "-1", Value: "Asigned" },
    { Key: "0", Value: "Performing" },
    { Key: '1', Value: "Closed" }, //Non Active
    { Key: '2', Value: "Paid Off" },
    { Key: '3', Value: "Transferred" },
    { Key: '4', Value: "Bankruptcy" },
    { Key: '5', Value: "Foreclosure" },
    { Key: '6', Value: "REO" },
    { Key: '7', Value: "Charge Off" },
    { Key: '8', Value: "Complete Charge Off" },
    { Key: '9', Value: "Transfer Out" },
    { Key: '10', Value: "Payoff Demand" },
    { Key: '11', Value: "Pre Boarding" },
    { Key: '12', Value: "Final Boarding" },
    { Key: '13', Value: "RESPA" },
    { Key: '14', Value: "Loss-Mit Request" },
    { Key: '15', Value: "Delinquent" },
    ]
)


export const PartialOwnershipPortfolio_Action_Search =
    (
        state: string,
        status: number,
        balance: number,
        gridState: DataSourceRequestState,
        excelExporter_allRows: React.RefObject<ExcelExport> | undefined):
        AppThunkAction<Action> => (dispatch) => {

         


            dispatch(GlobalAnimation_Loading())


            //totales
            let arrAggregateSum: AggregateDescriptor[] = []
            PartialOwnershipPortfolio_ColumnConfiguration().filter(x => x.IsAgregateSum).forEach(x => arrAggregateSum.push({ field: x.ColumnName!, aggregate: "sum" }))
            gridState = { ...gridState, aggregates: arrAggregateSum }

            if (excelExporter_allRows) {
                gridState = { ...gridState, skip: 0, take: undefined }
            }

            let url = `/api/Lender/loans/secondaryLoansView_search/${state}/${status}/${balance}/?${toDataSourceRequestString(gridState)}`
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: BackEndResult3<{

                    Result: BackEndGenericResulInterface<any>,

                }>) => {




                    if (data.ObjOptional.Result.Total != 0) {

                        let totalSum: { [k: string]: number } = {}
                        data.ObjOptional.Result.AggregateResults.map(x => totalSum[x.Member] = x.Value)

                        let dateColumnName = PartialOwnershipPortfolio_ColumnConfiguration().filter(x => x.IsDate)[0].ColumnName!

                        data.ObjOptional.Result.Data.forEach(x => {
                            x[dateColumnName] = Utilities_Convert_StringToStringDateFormat(x[dateColumnName])
                            x['Status'] = GetStatusName(x['Status'])
                        })

                        if (!excelExporter_allRows) {
                            dispatch(PartialOwnershipPortfolio_Action_SetRows(data.ObjOptional.Result.Data as [], totalSum, gridState, data.ObjOptional.Result.Total, {}))

                        }
                        else {// (excelExporter_allRows) {


                            //dispatch(LenLoansSearch_Action_SetAllRows(data.ObjOptional.Result.Data as []))

                            excelExporter_allRows?.current!.save(data.ObjOptional.Result.Data)

                            //excelExporter_allRows.save()

                            //dispatch(LenLoansSearch_Action_SetAllRows([]))

                            dispatch(GlobalAnimation_Loaded())


                            Notify.success("", "Export Complete")

                        }

                    }
                    dispatch(GlobalAnimation_Loaded())

                }).catch(error => {
                   
                    Utils.showError(dispatch, error, Title)
                });

        }




export const PartialOwnershipPortfolio_Action_ExportThisPage=
    (excelExporter_allRows: React.RefObject<ExcelExport>, data: []):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())

            excelExporter_allRows?.current!.save(data)

            dispatch(GlobalAnimation_Loaded())


            Notify.success("", "Export Complete")


        }






export const PartialOwnershipPortfolio_Action_FillCombos =
    (
    ):
        AppThunkAction<Action> => (dispatch) => {

            dispatch(GlobalAnimation_Loading())



            dispatch(PartialOwnershipPortfolio_Action_SetColumns(PartialOwnershipPortfolio_ColumnConfiguration()))



            let url = `/api/Lender/loans/secondaryLoansView_fillCombos`

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: BackEndResult3<{
                    INFState: INFState_Interface[]
                }>) => {



                    let INFState = data.ObjOptional.INFState.map(x => ({ Key: x.Abbreviation, Value: x.Name } as IComboBoxDataSource))


                    let balanceFilter: IComboBoxDataSource[] =
                        [
                            { Key: '-1', Value: 'Display Open & Closed Loans' },
                            { Key: '0', Value: 'Display All Open Loans' },
                            { Key: '1', Value: 'Display All Closed Loans' }
                        ]


                    dispatch(PartialOwnershipPortfolio_Action_SetArr(GetStatusArray(), INFState, balanceFilter))



                    dispatch(GlobalAnimation_Loaded())
                }).catch(error => {

                    Utils.showError(dispatch, error, Title)
                });

        }

