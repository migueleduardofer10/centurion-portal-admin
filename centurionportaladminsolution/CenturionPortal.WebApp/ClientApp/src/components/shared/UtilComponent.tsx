import * as React from 'react'
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export'
import { Utils } from '../../utilities/Functions'
import { ColumnConfiguration_Interface } from '../../store/commons/LenderCommon2'
import { Dropdown } from 'react-bootstrap'
import { GridColumn, GridColumnMenuFilter } from '@progress/kendo-react-grid'

//****************************************************************************************************************************************************************************************************************************************************************************************


export const GridColumn_001 = (
    arrColumns: ColumnConfiguration_Interface[],
    totalSum: { [k: string]: number } | undefined
) =>
    (
        arrColumns.map(column => (
            <GridColumn
                title={column.Title}
                key={column.ColumnName}
                field={column.ColumnName}
                filter={column.GridColumnFilter}
                width={'150px'}
                format={column.GridColumnFormat}

                className={column.IsNumber ? 'text-right' : ''}

                columnMenu={
                    props =>
                        <GridColumnMenuFilter
                            {...props}
                            expanded={true}
                        />
                }

                footerCell={
                    totalSum
                        ?
                        (sender) =>
                            (
                                <td style={sender.style} colSpan={sender.colSpan} className="text-right font-weight-bold" >
                                    {
                                        column.IsAgregateSum ? Utils.currencyFormat(totalSum[sender?.field!]) : ''
                                    }
                                </td>
                            )
                        :
                        undefined
                }

            />
        ))
    )







//****************************************************************************************************************************************************************************************************************************************************************************************

export const ExcelexExport_Button_001: React.FC<{ className: string, exportThisPage: () => void, exportAllPages: () => void }> = (props) => {
    return (
        <Dropdown className={props.className} >
            <Dropdown.Toggle id="dropdownMenuExport" className='btn btn-primary p-2'>
                <i className="mdi mdi-file-excel-box"></i>
                <span className="d-none d-md-inline"> Export</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => props.exportThisPage()}>
                    <i className="ti ti-layout-width-full mr-2"></i> This page
                        </Dropdown.Item>
                <Dropdown.Item onClick={() => props.exportAllPages()}>
                    <i className="ti ti-layers-alt mr-2"></i> All pages
                        </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

//****************************************************************************************************************************************************************************************************************************************************************************************

export const ExcelExport_001: React.FC<{ totalSum?: { [k: string]: number }, fileName: string, arrColumn: ColumnConfiguration_Interface[], objExcelExport: React.RefObject<ExcelExport> }> = (props) => {

    return (
        <ExcelExport fileName={props.fileName} ref={props.objExcelExport}>
            {
                props.arrColumn.map(obj => {
                    return (
                        <ExcelExportColumn
                            key={obj.ColumnName}
                            field={obj.ColumnName}
                            title={obj.ColumnName}
                            width={obj.Width}
                            headerCellOptions={{ textAlign: 'center' }}
                            footer={

                                props.totalSum && obj.IsNumber
                                    ?
                                    () => Utils.currencyFormat(props.totalSum![obj.ColumnName!])
                                    :
                                    undefined
                            }
                        />
                    )
                })
            }
        </ExcelExport>

    )
}