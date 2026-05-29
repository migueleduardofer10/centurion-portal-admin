import { Action } from "redux"
import { AppThunkAction } from "../../store"
import { BackEndResult3, Utilities_DefaultOneSpace, BackEndGenericResulInterface } from "../../store/commons/LenderCommon2"
import { Auth, GlobalAnimation_Loaded, GlobalAnimation_Loading, Utils } from "../../utilities/Functions"
import { IComboBoxDataSource } from "../shared/customIEntities/IComboBoxDataSource"
import { IELSServiceMap } from "../shared/dataBaseIEntities/IELSServiceMap"
import { ILNSLoan } from "../shared/dataBaseIEntities/ILNSLoan"
import { DataSourceRequestState, toDataSourceRequestString } from "@progress/kendo-data-query"
import { ExcelExport } from "@progress/kendo-react-excel-export"

 

const Title = 'Loan Portfolio'


//**********************************************************************************************************************************************************************


export const LoanPortfolio_Action_Load = (
    afterActions: (arrCbLoansFilter: IComboBoxDataSource[], arrAccount: IComboBoxDataSource[]) => void
): AppThunkAction<Action> => (dispatch) => {

    dispatch(GlobalAnimation_Loading())
    fetch(`api/Lender/reportLoanPortfolioLoad/`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
        .then((data: BackEndResult3<{ ArrCbLoansFilter: IELSServiceMap[], ArrAccount: ILNSLoan[] }>) => {

            dispatch(GlobalAnimation_Loaded())
             
            let arrCbLoansFilter: IComboBoxDataSource[] = [{ Key: '0', Value: 'All' }]
            arrCbLoansFilter.push(...data.ObjOptional.ArrCbLoansFilter.map(obj => ({ Key: obj.ParentUid, Value: obj.Account } as IComboBoxDataSource)))
             
            let cont=0
            let arrAccount: IComboBoxDataSource[] = []
            arrAccount.push(...data.ObjOptional.ArrAccount.map(obj => ({ Key: String(cont++), Value: obj.Account } as IComboBoxDataSource)))
             
            afterActions(arrCbLoansFilter, arrAccount)

            dispatch(GlobalAnimation_Loaded());
        })
        .catch(error => {
            Utils.validateData(dispatch, error, Title)
        })



}



//**********************************************************************************************************************************************************************


export const LoanPortfolio_Action_Search = (
    objExcelExport: React.RefObject<ExcelExport> | undefined,
    lenderUid: string, useRange: boolean, from: string, to: string, includeInactives: boolean,
    gridState: DataSourceRequestState,
    afterActions: (rows: [], totalRows: number) => void

): AppThunkAction<Action> => (dispatch) => {



    dispatch(GlobalAnimation_Loading())
    fetch(`api/Lender/reportLoanPortfolioDocument/${Utilities_DefaultOneSpace(lenderUid)}/${useRange}/${Utilities_DefaultOneSpace(from)}/${Utilities_DefaultOneSpace(to)}/${includeInactives}/?${toDataSourceRequestString(objExcelExport ? { skip:0 } as DataSourceRequestState : gridState)}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getJWT()}`
            }
        }).then(res => res.json())
        .then((data: BackEndResult3<{ Result: BackEndGenericResulInterface<any> }>) => {

            dispatch(GlobalAnimation_Loaded())


            afterActions(data.ObjOptional.Result.Data as [], data.ObjOptional.Result.Total)



            dispatch(GlobalAnimation_Loaded());
        })
        .catch(error => {
            Utils.validateData(dispatch, error, Title)
        })



    }

 



//**********************************************************************************************************************************************************************


















