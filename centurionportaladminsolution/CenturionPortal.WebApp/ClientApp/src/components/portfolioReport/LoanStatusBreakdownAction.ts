import { Action } from "redux"
import { AppThunkAction } from "../../store"
import { BackEndResult3 } from "../../store/commons/LenderCommon2";
import { Auth, Utils, GlobalAnimation_Loading, GlobalAnimation_Loaded } from "../../utilities/Functions";


const Title = 'Loan Status Breakdown'
//const Type = 'LoanStatusBreakdown/'


//***************************************************************************************************************************************************************************


export const LoanStatusBreakdown_Action_Load =
    (
        afterActions: (
            ArrSummPort: [],
           ArrSumary:[],
            ArrOtherStatistics1: [],
            ArrOtherStatistics2: [],
            UserInfo: string
        ) => void
    ):
        AppThunkAction<Action> => (dispatch) => {


            dispatch(GlobalAnimation_Loading())

            let url = `/api/Lender/reportLoanStatusBreakdown`

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: BackEndResult3<{
                    ArrSummPort: [],
                  ArrSumary:[],
                    ArrOtherStatistics1: [],
                    ArrOtherStatistics2: [],
                    UserInfo: string
                
                }>) => {


                    afterActions(
                        data.ObjOptional.ArrSummPort,
                        data.ObjOptional.ArrSumary,
                        data.ObjOptional.ArrOtherStatistics1,
                        data.ObjOptional.ArrOtherStatistics2,
                        data.ObjOptional.UserInfo
                    )

                    dispatch(GlobalAnimation_Loaded())



                }).catch(error => {
                    Utils.validateData(dispatch, error, Title)
                });

        }
