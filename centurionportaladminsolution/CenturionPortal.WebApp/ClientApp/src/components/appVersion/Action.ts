import { AppThunkAction } from "../../store";
import { GlobalAnimation_Loaded, Utils, GlobalAnimation_Loading, Auth } from "../../utilities/Functions";
import { Action } from "redux";
import { BackEndResult3 } from "../../store/commons/LenderCommon2";





export const AppVersion_Action_Load =
    (
        afterActions: (
          rows:[]
        ) => void
    ):
        AppThunkAction<Action> => (dispatch) => {


            dispatch(GlobalAnimation_Loading())

            let url = `api/auth/appVersion_Full`

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Auth.getJWT()}`
                }
            }).then(res => res.json())
                .then((data: BackEndResult3<any>) => {

                    afterActions(
                        data.ObjOptional
                    )

                    dispatch(GlobalAnimation_Loaded())

                }).catch(error => {
                    Utils.validateData(dispatch, error, 'App Version')
                });

        }
