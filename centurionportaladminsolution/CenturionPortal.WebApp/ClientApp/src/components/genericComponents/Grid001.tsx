import { State } from '@progress/kendo-data-query';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Grid, GridDataStateChangeEvent, GridPageChangeEvent, GridSortChangeEvent, GridToolbar, GridExpandChangeEvent, GridDetailRow, GridDetailRowProps } from '@progress/kendo-react-grid';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ButtonDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Dropdown } from 'react-bootstrap';
import { ColumnConfiguration_Interface, AggregateResult_Interface } from '../../store/commons/LenderCommon2';
import { GlobalAnimation_Loaded, GlobalAnimation_Loading, Notify, Utils, Auth } from '../../utilities/Functions';
import LenOptions from '../lenders/LenOptions';
import BreadCrumb from '../shared/BreadCrumb';




type PropsType = {

    TabIndex: number,
    Title: string,

    Rows: [],
    AllRows: [],
    TotalRows: number,
    GridState: State,
    Columns: ColumnConfiguration_Interface[],
    //  Total: TotalSum_Entity_Interface[],
    ActiveColumn: string,

    LoanUid: string,



    //  Grid_expandField?: boolean,// = "expanded"
    Grid_onExpandChange?: (event: GridExpandChangeEvent) => void,
    GridDetailRowProps?: React.FC<GridDetailRowProps>,//any,// React.ReactComponentElement<GridDetailRowProps>,
    //  Grid_Property_Detail?:any,

    ExcelExport_FileName: string,

    RenderGrid_Element_GridColumn: any,


    RenderGrid_Event_PageChange: (event: GridPageChangeEvent) => void,
    RenderGrid_Event_Sort: (event: GridSortChangeEvent) => void,
    RenderGrid_Event_DataStateChange: (event: GridDataStateChangeEvent) => void,

    RenderGrid_GridToolBar_BnRefresh: (event: React.MouseEvent<HTMLButtonElement>) => void,


    RenderCustomColumns_Event_applyChangedColumns: (event: React.FormEvent<HTMLFormElement>) => void,
    RenderCustomColumns_Event_activateColumn: (columnName: string) => void,
    RenderCustomColumns_Event_BnRevertColumns: () => void,

    RenderCustomColumns_SaveColumns: (newColumns: ColumnConfiguration_Interface[]) => void,

    RenderExcelExport_Event_BnExportAllRows: (excelExporter: ExcelExport) => void,


    RenderExcelExport_Element_ExportColumn: any
}

const Grid001: React.FC<PropsType> = (props) => {



    const dispatch = useDispatch()






    const RenderExcelExport_ObjAllRows = React.useRef<ExcelExport>(null)
    const RenderExcelExport_ObjCurrentRow = React.useRef<ExcelExport>(null)

    const RenderExcelExport_Event_BnExport = (currentPage: boolean) => {

        if (currentPage) {
            dispatch(GlobalAnimation_Loading())

            RenderExcelExport_ObjCurrentRow.current?.save()

            dispatch(GlobalAnimation_Loaded())

            Notify.success("", "Export Complete")
        } else {
            props.RenderExcelExport_Event_BnExportAllRows(RenderExcelExport_ObjAllRows?.current!)
        }

    }
    const RenderExcelExport = (currentRow: boolean) => (
        <ExcelExport
            ref={currentRow ? RenderExcelExport_ObjCurrentRow! : RenderExcelExport_ObjAllRows!}
            data={currentRow ? props?.Rows : props?.AllRows}
            fileName={props.ExcelExport_FileName}
        >
            {props.RenderExcelExport_Element_ExportColumn}
        </ExcelExport>

    )



    const RenderGrid_Event_PageChange = (event: GridPageChangeEvent) => {
        props.RenderGrid_Event_PageChange(event)
    }

    const RenderGrid_Event_Sort = (event: GridSortChangeEvent) => {
        props.RenderGrid_Event_Sort(event)
    }

    const RenderGrid_Event_DataStateChange = (event: GridDataStateChangeEvent) => {
        props.RenderGrid_Event_DataStateChange(event)
    }



    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const Grid_onExpandChange = (event: GridExpandChangeEvent) => {
        event.dataItem.expanded = !event.dataItem.expanded;
        forceUpdate()

    }

    const RenderGrid = () => {
        return (
            <React.Fragment>

                {RenderExcelExport(true)}

                {RenderExcelExport(false)}

                {
                    props.GridDetailRowProps
                        ?//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        (
                            <Grid
                                sortable={true}
                                pageable={true}

                                data={props.Rows}
                                total={props.TotalRows}

                                {...props.GridState}

                                onSortChange={RenderGrid_Event_Sort}
                                onPageChange={RenderGrid_Event_PageChange}
                                onDataStateChange={RenderGrid_Event_DataStateChange}

                                expandField="expanded"
                                onExpandChange={(event) => Grid_onExpandChange(event)}
                                detail={props.GridDetailRowProps}


                            >
                                <GridToolbar>
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item ml-0">

                                            <button className="btn btn-primary" onClick={(event) => RenderGrid_GridToolBar_Event_Refresh(event)}>
                                                <i className="ti ti-reload"></i>
                                                <span className="d-none d-md-inline"> Refresh</span>
                                            </button>
                                        </li>
                                        <li className="list-inline-item ml-0">
                                            <Dropdown>
                                                <Dropdown.Toggle id="dropdownMenuExport">
                                                    <i className="fa fa-file-excel"></i>
                                                    <span className="d-none d-md-inline"> Export</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => RenderExcelExport_Event_BnExport(true)}>
                                                        <i className="ti ti-layout-width-full mr-2"></i> This page
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => RenderExcelExport_Event_BnExport(false)}>
                                                        <i className="ti ti-layers-alt mr-2"></i> All pages
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>

                                        <li className="list-inline-item dropdown mega-dropdown customize-column ml-0">
                                            {RenderCustomColumns()}
                                        </li>
                                    </ul>
                                </GridToolbar>
                                {props.RenderGrid_Element_GridColumn}
                            </Grid>
                        )
                        ://----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                        (
                            <Grid
                                sortable={true}
                                pageable={true}

                                data={props.Rows}
                                total={props.TotalRows}

                                {...props.GridState}

                                onSortChange={RenderGrid_Event_Sort}
                                onPageChange={RenderGrid_Event_PageChange}
                                onDataStateChange={RenderGrid_Event_DataStateChange}



                            >
                                <GridToolbar>
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item ml-0">

                                            <button className="btn btn-primary" onClick={(event) => RenderGrid_GridToolBar_Event_Refresh(event)}>
                                                <i className="ti ti-reload"></i>
                                                <span className="d-none d-md-inline"> Refresh</span>
                                            </button>
                                        </li>
                                        <li className="list-inline-item ml-0">
                                            <Dropdown>
                                                <Dropdown.Toggle id="dropdownMenuExport">
                                                    <i className="fa fa-file-excel"></i>
                                                    <span className="d-none d-md-inline"> Export</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => RenderExcelExport_Event_BnExport(true)}>
                                                        <i className="ti ti-layout-width-full mr-2"></i> This page
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => RenderExcelExport_Event_BnExport(false)}>
                                                        <i className="ti ti-layers-alt mr-2"></i> All pages
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>

                                        <li className="list-inline-item dropdown mega-dropdown customize-column ml-0">
                                            {RenderCustomColumns()}
                                        </li>
                                    </ul>
                                </GridToolbar>
                                {props.RenderGrid_Element_GridColumn}
                            </Grid>
                        )
                }



            </React.Fragment>
        )
    }



    const RenderGrid_GridToolBar_Event_Refresh = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        props.RenderGrid_GridToolBar_BnRefresh(event)
    }

    const [RenderCustomColumns_Property_show, RenderCustomColumns_Property_setShow] = React.useState(false)

    const RenderCustomColumns_Event_applyChangedColumns = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        props.RenderCustomColumns_Event_applyChangedColumns(event)

        RenderCustomColumns_Property_setShow(false)
    }

    const RenderCustomColumns_Event_activateColumn = (columnName: string) => {
        props.RenderCustomColumns_Event_activateColumn(columnName)
    }

    const RenderCustomColumns_Event_BnRevertColumns = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        props.RenderCustomColumns_Event_BnRevertColumns()

        RenderCustomColumns_Property_setShow(false)
    }

    const ObjUl = React.useRef<HTMLUListElement>(null)

    const ColumnMove = (columnName: string, moveUp: boolean) => {

        let move = moveUp ? -1 : 1

        let arrColumns = props.Columns.sort(Utils.compareColumn)

        let objColumn = arrColumns.filter(x => x.ColumnName === columnName)[0]

        if (objColumn) {

            let objColumnAux = arrColumns[objColumn.Position! + move - 1]

            if (objColumnAux) {

                objColumn.Position! += move
                objColumnAux.Position! -= move
                 
                arrColumns = arrColumns.sort(Utils.compareColumn)

                props.RenderCustomColumns_SaveColumns(arrColumns)

                let height = (ObjUl.current?.scrollHeight! / arrColumns.length)
                let index=0
                arrColumns.forEach((obj, i) => {
                    if (obj.ColumnName === columnName) {
                        index=i
                        return
                    }
                })
                let y = height * (index - 1)

                ObjUl.current?.scroll(0, y)
            }
        }

       
    }
    const RenderCustomColumns_Event_BnMoveColumnUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        ColumnMove(props.ActiveColumn, true)
    }

    const RenderCustomColumns_Event_BnMovColumnDown = (event: React.MouseEvent<HTMLButtonElement>) => {


        event.preventDefault()
        ColumnMove(props.ActiveColumn, false)
    }

    const ChecketAllColumns = (value: boolean) => {
        let newColumns = props.Columns.map(column => {
            column.Checked = value;
            return column;
        }).sort(Utils.compareColumn);

        props.RenderCustomColumns_SaveColumns(newColumns)
    }

    const RenderCustomColumns_Event_BnCheckAllColumn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        ChecketAllColumns(true)
    }
    const RenderCustomColumns_Event_BnUncheckAllColumn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        ChecketAllColumns(false)
    }
    const RenderCustomColumns_Event_checkColumn = (event: React.ChangeEvent<HTMLInputElement>, columnName: string) => {

        let obj = props.Columns.filter(x => x.ColumnName === columnName)[0]
        if (obj) {
            obj.Checked = event.target.checked
        }

        props.RenderCustomColumns_SaveColumns(props.Columns)
    }

    const RenderCustomColumns = () => {
        return (



            <Dropdown show={RenderCustomColumns_Property_show}>

                <Dropdown.Toggle id="dropdownCustomColumns"
                    className="waves-effect waves-dark"
                    onClick={() => { RenderCustomColumns_Property_setShow(true) }}
                >
                    <i className="fa fa-columns"></i>
                    <span className="d-none d-md-inline"> Colums</span>
                </Dropdown.Toggle>

                <form name="customizeColumns" onSubmit={(event) => RenderCustomColumns_Event_applyChangedColumns(event)}>
                    <Dropdown.Menu className="animated bounceInDown">
                        <div className="mega-dropdown-menu row">
                            <div className="col-md-7">
                                <ul ref={ObjUl} className="list-group">
                                    {
                                        props.Columns &&
                                        props.Columns.filter(x => x.ParteDelGrid === true)
                                            .map(column => (
                                                <li key={column.ColumnName}
                                                    className={"list-group-item " + (props.ActiveColumn === column.ColumnName ? " active" : "")}
                                                    onClick={() => RenderCustomColumns_Event_activateColumn(column.ColumnName!)}
                                                >
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" checked={column.Checked}
                                                            onChange={(event) => RenderCustomColumns_Event_checkColumn(event, column.ColumnName!)} />
                                                        <label className="form-check-label">
                                                            {column.Title}
                                                        </label>
                                                    </div>
                                                </li>
                                            ))
                                    }
                                </ul>
                            </div>
                            <div className="col-md-5 mt-2">
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit"
                                            className="btn btn-secondary btn-block btn-sm">
                                            <i className="ti ti-save"></i> Apply
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block btn-sm mt-1" onClick={event => RenderCustomColumns_Event_BnRevertColumns(event)}>
                                            <i className="fa fa-undo"></i> Cancel
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-info btn-block mt-1" onClick={event => RenderCustomColumns_Event_BnMoveColumnUp(event)}>
                                            <i className="fa fa-arrow-up"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-info btn-block mt-1" onClick={event => RenderCustomColumns_Event_BnMovColumnDown(event)}>
                                            <i className="fa fa-arrow-down"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block btn-sm mt-1" onClick={(event) => RenderCustomColumns_Event_BnCheckAllColumn(event)}>
                                            <i className="ti ti-check-box"></i> Check All
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block btn-sm mt-1" onClick={(event) => RenderCustomColumns_Event_BnUncheckAllColumn(event)}>
                                            <i className="ti ti-control-stop"></i> Uncheck All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Dropdown.Menu>
                </form>
            </Dropdown>

        )

    }

    return (
        <React.Fragment>
            <BreadCrumb title={props.Title} />
            <div className="card-group">
                <div className="card">
                    <div className="card-header p-0">
                        <LenOptions option={props.TabIndex} loanUid={props.LoanUid} />
                    </div>

                    <div className="card-body">
                        {RenderGrid()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )





}


export default Grid001