import { Grid, GridColumn, GridHeaderCellProps } from '@progress/kendo-react-grid'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Utilities_Url_CreateUniquePath } from '../../store/commons/LenderCommon2'
import { Utils } from '../../utilities/Functions'
import { UserSetting_Card } from '../users/UserSetting'
import { LoanStatusBreakdown_Action_Load } from './LoanStatusBreakdownAction'

const LoanStatusBreakdown = () => {

    const Dispatch = useDispatch()

    React.useEffect(() => {

        Dispatch(LoanStatusBreakdown_Action_Load((
            ArrSummPort: [],
            ArrSumary: [],
            ArrOtherStatistics1: [],
            ArrOtherStatistics2: [],
            UserInfo: string
        ) => {
            Rows1_SetValue(ArrSummPort)
            Rows2_SetValue(ArrSumary)
            Rows3_SetValue(ArrOtherStatistics1)
            Rows4_SetValue(ArrOtherStatistics2)
            UserInfo_SetValue(UserInfo)
        }))

    }, [])


    const [Rows1_Value, Rows1_SetValue] = React.useState([])
    const [Rows2_Value, Rows2_SetValue] = React.useState([])
    const [Rows3_Value, Rows3_SetValue] = React.useState([])
    const [Rows4_Value, Rows4_SetValue] = React.useState([])
    const [UserInfo_Value, UserInfo_SetValue] = React.useState('')

    const HeaderCell = () => (
        <span style={{ height: '0', width: '0', display: 'none', margin: '0', padding: '0' }}></span>
    )

    const CreateColumn = (width: string, title: string, field: string, key: string, headerCell: React.ComponentType<GridHeaderCellProps> | undefined = undefined) => {

        let sumField = ''
        let sumValue = 0
        switch (field) {
            case 'TotalLoans':

            case 'OriginalBalance':
            case 'PrincipalBalance':
                sumField = field;
                break;
        }
        if (sumField != '') {
            Rows1_Value.forEach(x => sumValue += x[sumField])
        }

        return (
            <GridColumn key={'reportLoanStatusBreakdownColumnId' + key}
                title='' width={width + 'px'}
                className={title === '' ? 'text-left' : 'text-right'} field={field}
                headerCell={headerCell}
                footerCell={
                    sumField != ''
                        ?
                        (sender) =>
                            (
                                <td style={sender.style} colSpan={sender.colSpan} className="text-right font-weight-bold" >
                                    {
                                        Utils.currencyFormat(sumValue)//Rows_Value.reduce((a, b) => (a[sumField] + b[sumField])))
                                    }
                                </td>
                            )
                        :
                        undefined
                }
            />
        )


    }





    return (
        <UserSetting_Card title='Loan Status Breakdown' cardBodyClassName='p-1 d-flex justify-content-center flex-column align-items-center'   >

            <h4 className='p-2'>Loan Status Breackdown for: {UserInfo_Value}</h4>



            <Grid
                sortable={true}
                pageable={false}
                data={Rows1_Value}
                scrollable='none'
            >
                <GridColumn
                    title={'Loan Status Breakdown'}
                    key={'c1'}
                    headerClassName='text-left'
                >
                    {CreateColumn('150', '', 'Status', 'c2')}
                    {CreateColumn('150', 'Number of Loans', 'TotalLoans', 'c3')}
                    {CreateColumn('150', 'Original Loan Balance', 'OriginalBalance', 'c4')}
                    {CreateColumn('150', 'Current Loan Balance', 'PrincipalBalance', 'c5')}
                </GridColumn>

            </Grid>

            <Grid
                sortable={true}
                pageable={false}
                data={Rows2_Value}
                scrollable='none'
            >
                <GridColumn
                    title={'Other Portfolio Statistics'}
                    key='g2'
                    headerClassName='text-left'
                >
                    {CreateColumn('300', '', 'Title', 'c6', HeaderCell)}
                    {CreateColumn('300', ' ', 'Value', 'c7', HeaderCell)}
                </GridColumn>
            </Grid>


            <Grid
                sortable={true}
                pageable={false}
                data={Rows3_Value}
                scrollable='none'
            >
                {CreateColumn('300', '', 'Title', 'c6', HeaderCell)}
                {CreateColumn('300', ' ', 'Value', 'c7', HeaderCell)}
            </Grid>



            <Grid
                sortable={true}
                pageable={false}
                data={Rows4_Value}
                scrollable='none'
            >
                {CreateColumn('300', '', 'Title', 'c8', HeaderCell)}
                {CreateColumn('300', ' ', 'Value', 'c9', HeaderCell)}
            </Grid>

            
        </UserSetting_Card>


    )
}


 


export const LoanStatusBreakdown_Url = Utilities_Url_CreateUniquePath('ReportLoanStatusBreakdown')

export default LoanStatusBreakdown
