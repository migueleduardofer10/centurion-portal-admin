import * as React from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {
    Grid,
    GridColumn,
    GridToolbar,
    GridColumnMenuFilter,
    GridColumnMenuCheckboxFilter,
    GridDetailRow,
    GridNoRecords
} from '@progress/kendo-react-grid';
import * as Enums from '../../store/commons/AppCommon';
import CustomContextMenu from './CustomContextMenu';
import CustomExcelExport from './CustomExcelExport';
import CustomColumns from './CustomColumns';

interface ICustomGridProps {
    data: any[];
    dataAll: any[];
    columns: any[];
    realColumns: any[];
    dataState: any;
    fileName: string;
    exportExcel: boolean;
    currentPage: boolean;
    withDetails?: boolean;
    withContextMenu?: boolean;
    forceUpdate?: boolean;
    menuOptions?: string[];
    selectedRow?: Enums.SelectRowTypeEnum;
    fetchData: Function;
    fetchDataAll: Function;
    fetchDataDetails?: Function;
    updateData?: Function;
    selectItem?: Function;
    selectOption?: Function;
    changedColumns: Function;
    applyChangedColumns: Function;
    disableForceUpdate?: Function;
    enableExportExcel: Function;
}

class CustomGrid extends React.PureComponent<ICustomGridProps> {
    state = {
        offset: undefined,
        openPopUp: false,
        dropdownExcel: false
    };

    public componentDidUpdate() {
        if (this.props.forceUpdate && this.props.disableForceUpdate) {
            this.props.disableForceUpdate();
            this.forceUpdate();
        }
    }

    public render() {
        return (
            <React.Fragment>
                {
                    !this.props.withContextMenu ? "" :
                        <CustomContextMenu
                            offset={this.state.offset}
                            isOpen={this.state.openPopUp}
                            options={this.props.menuOptions!}
                            onClose={this.closePopUp}
                            onSelect={this.selectOption}
                        />
                }

                <CustomExcelExport
                    data={this.props.currentPage ? this.props.data : this.props.dataAll}
                    columns={this.props.columns}
                    exportExcel={this.props.exportExcel}
                    fileName={`${this.props.fileName}.xlsx`}
                    enableExportExcel={this.props.enableExportExcel}
                />

                <Grid
                    {...this.props.dataState}
                    resizable={true}
                    data={this.getData()}
                    detail={this.getDetail()}
                    expandField="Expanded"
                    selectedField="Selected"
                    pageable={{ buttonCount: 4, pageSizes: true }}
                    sortable={{ allowUnsort: true, mode: 'single' }}
                    onHeaderSelectionChange={this.headerSelectionChange}
                    onDataStateChange={this.fetchData}
                    onExpandChange={this.expandChange}
                    onRowClick={this.rowClick}
                    rowRender={this.rowRender}
                >
                    <GridToolbar>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item ml-0">
                                <button type="button" className="btn btn-primary" onClick={() => this.props.fetchData(this.props.dataState, true, true)}>
                                    <i className="ti ti-reload"></i>
                                    <span className="d-none d-md-inline"> Refresh</span>
                                </button>
                            </li>
                            <li className="list-inline-item ml-0">
                                <Dropdown isOpen={this.state.dropdownExcel} toggle={this.toggleExcel}>
                                    <DropdownToggle caret className="btn btn-primary">
                                        <i className="ti ti-file"></i>
                                        <span className="d-none d-md-inline"> Export</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={(event: any) => this.exportExcel(event, true)}>
                                            <i className="ti ti-layout-width-full mr-2"></i> This page
                                        </DropdownItem>
                                        <DropdownItem onClick={(event: any) => this.exportExcel(event, false)}>
                                            <i className="ti ti-layers-alt mr-2"></i> All pages
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                            <li className="list-inline-item dropdown mega-dropdown customize-column ml-0">
                                <CustomColumns
                                    columns={this.props.columns}
                                    realColumns={this.props.realColumns}
                                    changed={this.props.changedColumns}
                                    applyChanged={this.props.applyChangedColumns}
                                />
                            </li>
                        </ul>
                    </GridToolbar>

                    {
                        this.props.selectedRow !== Enums.SelectRowTypeEnum.MULTIPLE ? "" : (
                            <GridColumn
                                field="Selected"
                                width="50px"
                                className="text-center"
                                headerSelectionValue={
                                    this.props.data.length > 0 &&
                                    this.props.data.filter(dataItem => dataItem.Selected === true).length === this.props.data.length
                                }
                                cell={
                                    (props: any) => (
                                        <td colSpan={1} className="text-center">
                                            <input type="checkbox" className="k-checkbox" defaultChecked={props.dataItem.Selected} />
                                        </td>
                                    )
                                }
                            />
                        )
                    }

                    {
                        this.props.columns.filter(column => column.Checked).map((column: any) => (
                            <GridColumn
                                title={column.Title}
                                key={column.ColumnName}
                                field={column.HasCustomValue ? `${column.ColumnName}_String` : column.ColumnName}
                                className={column.ClassName}
                                width={column.Width + "px"}
                                format={column.Format}
                                filter={column.Filter}
                                columnMenu={props => this.columnMenuFilter(props, column.Enum)}
                            />
                        ))
                    }
                </Grid>

            </React.Fragment>
        );
    }

    private fetchData = (event: any) => {
        this.props.fetchData(event.data, false, false);
    }

    private getData = () => {
        let itemsChecked = this.props.columns.filter((column: any) => column.Checked).length;
        return itemsChecked > 0 ? this.props.data : [];
    }

    private getDetail = () => {
        return this.props.withDetails ? CustomGridDetails : undefined;
    }

    private columnMenuFilter = (props: any, enumFilter: any) => {
        return enumFilter ?
            <GridColumnMenuCheckboxFilter {...props} expanded={true} data={enumFilter} /> :
            <GridColumnMenuFilter {...props} expanded={true} />;
    }

    private headerSelectionChange = (event: any) => {
        if (this.props.selectedRow !== Enums.SelectRowTypeEnum.MULTIPLE)
            return;

        let checked = event.syntheticEvent.target.checked;
        let data = this.props.data.map((item: any) => {
            item.Selected = checked;
            return item;
        });

        if (this.props.updateData)
            this.props.updateData(data);
    }

    private rowClick = (event: any) => {
        let data = this.props.data.map((item: any) => {
            if (item.Uid === event.dataItem.Uid) {
                item.Selected = !event.dataItem.Selected;
            } else if (this.props.selectedRow !== Enums.SelectRowTypeEnum.MULTIPLE) {
                item.Selected = false;
            }
            return item;
        });

        if (this.props.updateData)
            this.props.updateData(data);
    }

    private expandChange = (event: any) => {
        if (!this.props.fetchDataDetails) return;

        event.dataItem.Expanded = !event.dataItem.Expanded;

        if (event.dataItem.Details == null || event.dataItem.Details.Length == 0)
            this.props.fetchDataDetails(event.dataItem, this.props.data);

        this.forceUpdate();
    }

    private toggleExcel = () => {
        this.setState({ dropdownExcel: !this.state.dropdownExcel });
    }

    private exportExcel = (event: any, currentPage: boolean) => {
        event.preventDefault();

        if (currentPage || this.props.dataState.total <= this.props.dataState.take)
            this.props.enableExportExcel(true);
        else
            this.props.fetchDataAll();
    }

    private rowRender = (trElement: any, dataItem: any) => {
        const trProps = this.props.withContextMenu ? {
            ...trElement.props,
            onContextMenu: (event: any) => {
                event.preventDefault();
                this.contextMenuOpen(event, dataItem.dataItem);
            }
        } : trElement.props;

        return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
    }

    private contextMenuOpen = (event: any, dataItem: any) => {
        if(this.props.selectItem) this.props.selectItem(dataItem.Uid);
        this.setState({ offset: { left: event.clientX, top: event.clientY } });
        this.setState({ openPopUp: true });
    }

    private selectOption = (event: any) => {
        this.props.selectOption!(event.item.text);
        this.closePopUp();
    }

    private closePopUp = () => {
        this.setState({ openPopUp: false });
    }
}

class CustomGridDetails extends GridDetailRow {
    public render() {
        return (
            <Grid data={this.props.dataItem.Details}>
                <GridNoRecords>
                    {
                        this.props.dataItem.IsLoading ? (
                            <div>
                                <i className="fa fa-spinner fa-spin fa-2x fa-fw text-muted"></i>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : "No record details available"
                    }
                </GridNoRecords>

                {
                    this.props.dataItem.Columns ? this.props.dataItem.Columns.map((column: any) => (
                        <GridColumn
                            title={column.Title}
                            key={column.ColumnName}
                            field={column.HasCustomValue ? `${column.ColumnName}_String` : column.ColumnName}
                            className={column.ClassName}
                            width={column.Width + "px"}
                            format={column.Format}
                        />
                    )) : ""
                }
            </Grid>
        );
    }
}

export default CustomGrid;
