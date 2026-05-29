import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { Grid, GridColumn, GridColumnMenuCheckboxFilter, GridColumnMenuFilter, GridToolbar } from '@progress/kendo-react-grid';
import * as React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { ApplicationState } from '../../store/index';
import * as UserStore from '../../store/stores/users/UserStore';
import BreadCrumb from '../shared/BreadCrumb';
import { UtilControl_Text, UtilControl_ComboBox } from '../shared/UtilControls';
import { IComboBoxDataSource } from '../shared/customIEntities/IComboBoxDataSource';
import * as Enums from '../../utilities/Enums'



// At runtime, Redux will merge together...
type UserListProps =
    UserStore.State // ... state we've requested from the Redux store
    & typeof UserStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{ skip: string, take: string, column: string, sortDirection: string }>; // ... plus incoming routing parameters


class UserList extends React.PureComponent<UserListProps> {
    _export: any;

    state = {
        sort: [],
        activeColumn: '',
        dataState: {},
        dropdownExcel: false,
        dropdownColumns: false,

        userName: '',
        firstName: '',
        lastName: '',

        status: 'ALL',
        userType: 'ALL'
    };

    public componentDidMount() {
        let isRedirect = this.props.redirect;
        this.props.redirectedUsers();
        this.fetchUsersPage(this.props.gridProps, true, isRedirect);
    }

    public componentDidUpdate() {
        if (this.props.redirect)
            this.fetchUsersPage(this.props.gridProps, false);

        //Evaluamos si la propiedad export es true para exportar los datos a un archivo excel
        if (this.props.export) {
            this._export.save(); //exportamos
            this.props.disabledExport(); //retornamos la propiedad export a false
        }

        if (this.props.isLoginAs && this.props.redirectUrl !== '' && this.props.token !== '') {
            this.props.redirectedLoginAs();
            let url = `${this.props.redirectUrl}/loginAs/${this.props.token}`;
            if (!window.open(url, "_blank"))
                window.parent.location.href = url;
        }
    }

    controlClassName = 'd-inline-flex ml-1 ';
    labelWidth = '100px';
    controlWidth = '200px';


    public render() {


        return (
            <React.Fragment>
                <BreadCrumb title="Users" />
                <div className="card-group">
                    <div className="card">
                        <div className="card-header">
                            <h4 id="tabelLabel">Users</h4>
                        </div>
                        <div className="card-body p-0">


                            <div className='mb-1'>
                                    <UtilControl_Text label='User Name' value={this.state.userName} className={this.controlClassName} maxLength={20} labelWidth={this.labelWidth} textWidth={this.controlWidth}
                                        onChange={(event) => {
                                            this.setState({ ...this.setState, userName: event.currentTarget.value })
                                        }}
                                    />
                                    <UtilControl_Text label='Last Name' value={this.state.lastName} className={this.controlClassName} maxLength={20} labelWidth={this.labelWidth} textWidth={this.controlWidth}
                                        onChange={(event) => {
                                            this.setState({ ...this.setState, lastName: event.currentTarget.value })
                                        }}
                                    />
                                    <UtilControl_Text label='First Name' value={this.state.firstName} className={this.controlClassName} maxLength={20} labelWidth={this.labelWidth} textWidth={this.controlWidth}
                                        onChange={(event) => {
                                            this.setState({ ...this.setState, firstName: event.currentTarget.value })
                                        }}
                                    />
                                    <button className={"btn btn-primary " + this.controlClassName}
                                    onClick={() =>
                                        this.fetchUsersPage({ skip: 0, take: 10 }, false, false,
                                            this.state.userName, this.state.lastName, this.state.firstName, this.state.status, this.state.userType)
                                    }
                                    >
                                        <i className="ti-reload"></i>
                                        <span className="d-none d-md-inline"> Search</span>
                                    </button>
                                </div>
                              
                            
                            {this.renderUsersGrid()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private renderUsersGrid() {

        let arrStatus: IComboBoxDataSource[] = [
            { Key: 'ALL', Value: 'ALL' },
            { Key: 'true', Value: 'ACTIVE' },
            { Key: 'false', Value: 'INACTIVE' }
        ];

        let arrUserType: IComboBoxDataSource[] = [
            { Key: 'ALL', Value: 'ALL' },
            { Key: String(Enums.UserTypeEnum.ADMIN), Value: Enums.UserTypeEnum[Enums.UserTypeEnum.ADMIN] },
            { Key: String(Enums.UserTypeEnum.BORROWER), Value: Enums.UserTypeEnum[Enums.UserTypeEnum.BORROWER] },
            { Key: String(Enums.UserTypeEnum.BROKER), Value: Enums.UserTypeEnum[Enums.UserTypeEnum.BROKER] },
            { Key: String(Enums.UserTypeEnum.LENDER), Value: Enums.UserTypeEnum[Enums.UserTypeEnum.LENDER] }
        ];

        return (
            <React.Fragment>
                <ExcelExport
                    data={this.props.exportAll ? this.props.usersAll : this.props.usersPage}
                    fileName="Users.xlsx"
                    ref={(exporter: any) => this._export = exporter}
                >
                    {
                        this.props.columns.map(column => (
                            <ExcelExportColumn
                                key={column.enum ? column.columnDisplay : column.columnName}
                                field={column.enum ? column.columnDisplay : column.columnName}
                                title={column.title}
                                headerCellOptions={{ textAlign: 'center' }}
                                cellOptions={{ textAlign: column.alignExcel }}
                                width={Number(column.width)} />
                        ))
                    }
                </ExcelExport>
                <Grid
                    data={this.props.usersPage}
                    {...this.props.gridProps}
                    sortable={{ allowUnsort: true, mode: 'single' }}
                    pageable={{ buttonCount: 4, pageSizes: true }}
                    onDataStateChange={this.dataStateChange}
                    resizable
                >
                    <GridToolbar>

                        <div className='mb-2'>
                            <UtilControl_ComboBox
                                label='Status'
                                className={this.controlClassName}
                                dataSource={arrStatus}
                                labelWidth={this.labelWidth}
                                textWidth={this.controlWidth}
                                value={this.state.status}
                                onChange={event => {
                                    this.setState({ ...this.setState, status: event.currentTarget.value });
                                    this.fetchUsersPage({ skip: 0, take: 10 }, false, false,
                                        this.state.userName, this.state.lastName, this.state.firstName, event.currentTarget.value, this.state.userType);
                                }}
                            />
                            <UtilControl_ComboBox
                                label='User Type'
                                className={this.controlClassName}
                                dataSource={arrUserType}
                                labelWidth={this.labelWidth}
                                textWidth={this.controlWidth}
                                value={this.state.userType}
                                onChange={event => {
                                    this.setState({ ...this.setState, userType: event.currentTarget.value });
                                    this.fetchUsersPage({ skip: 0, take: 10 }, false, false,
                                        this.state.userName, this.state.lastName, this.state.firstName, this.state.status, event.currentTarget.value);
                                }}
                            />
                        </div>

                        <ul className="list-inline mb-0">
                            <li className="list-inline-item ml-0">
                                <button className="btn btn-primary"
                                    onClick={() => this.fetchUsersPage({ skip: 0, take: 10 }, false, false,
                                        this.state.userName, this.state.lastName, this.state.firstName, this.state.status, this.state.userType)}
                                >
                                    <i className="ti-reload"></i>
                                    <span className="d-none d-md-inline"> Refresh</span>
                                </button>
                            </li>
                            <li className="list-inline-item ml-0">
                                <button className="btn btn-primary"
                                    onClick={() => {
                                        this.setState({ ...this.state, userName: '', lastName: '', firstName: '', status: 'ALL', userType: 'ALL' })

                                        this.fetchUsersPage({ skip: 0, take: 10 })
                                    }}
                                >
                                    <i className="mdi mdi-filter-remove"></i>
                                    <span className="d-none d-md-inline"> Clear Filters</span>
                                </button>
                            </li>
                            <li className="list-inline-item ml-0">
                                <Link className="btn btn-primary" to="/user/add">
                                    <i className="fa fa-plus-circle"></i>
                                    <span className="d-none d-md-inline"> New</span>
                                </Link>
                            </li>
                            <li className="list-inline-item ml-0">
                                <Dropdown isOpen={this.state.dropdownExcel} toggle={this.toggleExcel}>
                                    <DropdownToggle caret className="btn btn-secondary">
                                        <i className="ti ti-share"></i>
                                        <span className="d-none d-md-inline"> Export</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={(event: any) => this.exportExcel(event, false)}>
                                            <i className="ti ti-layout-width-full mr-2"></i> This page
                                        </DropdownItem>
                                        <DropdownItem onClick={(event: any) => {
                                            this.exportExcel(event, true,
                                                this.state.userName, this.state.lastName, this.state.firstName, this.state.status, this.state.userType);
                                        }}>
                                            <i className="ti ti-layers-alt mr-2"></i> All pages
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                            <li className="list-inline-item dropdown mega-dropdown customize-column ml-0">
                                {this.renderCustomColumns()}
                            </li>
                        </ul>
                    </GridToolbar>
                    <GridColumn title="" width="100px"
                        cell={(props: any) => (
                            <td className="text-center">
                                <a href="# " className="text-info" onClick={(event: any) => { event.preventDefault(); this.loginAs(props.dataItem["Username"], props.dataItem['UserType']); }}>
                                    <i className="fa fa-sign-in" title={"Sign-in like " + props.dataItem["Username"]}></i>
                                </a>&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link className="text-warning" to={"/user/edit/" + props.dataItem["Uid"]}>
                                    <i className="fa fa-edit" title="Edit User"></i>
                                </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="# " className="text-danger" onClick={e => { e.preventDefault(); this.deleteUser(props.dataItem["Uid"]) }}>
                                    <i className="fa fa-trash" title="Delete User"></i>
                                </a>
                            </td>
                        )} />
                    {
                        this.props.columns.filter(column => column.checked).map(column => (
                            column.columnName === 'Username' ? (
                                <GridColumn
                                    key={column.columnName}
                                    field={column.columnName}
                                    title={column.title}
                                    width={column.width + "px"}
                                    filter={column.filter}
                                    columnMenu={props =>
                                        <GridColumnMenuFilter {...props} expanded={true} />}
                                    cell={(props: any) => (
                                        <td className={column.className}>
                                            <a href="#" onClick={(event: any) => { event.preventDefault(); this.loginAs(props.dataItem[props.field], props.dataItem['UserType']); }}>
                                                {props.dataItem[props.field]}
                                            </a>
                                        </td>
                                    )}
                                />
                            ) : (
                                    column.columnName === "IsActiveStr" ? (
                                        <GridColumn
                                            key="IsActive"
                                            field="IsActive"
                                            title={column.title}
                                            width={column.width + "px"}
                                            filter={column.filter}
                                            columnMenu={props =>
                                                <GridColumnMenuFilter {...props} expanded={true} />}
                                            cell={(props: any) => (
                                                <td className={column.className}>
                                                    <input type="checkbox" checked={props.dataItem[props.field]} disabled />
                                                </td>
                                            )}
                                        />
                                    ) : (
                                            column.enum ? (
                                                <GridColumn
                                                    key={column.columnName}
                                                    field={column.columnName}
                                                    format={column.format}
                                                    title={column.title}
                                                    className={column.className}
                                                    width={column.width + "px"}
                                                    filter={column.filter}
                                                    columnMenu={props =>
                                                        <GridColumnMenuCheckboxFilter {...props} data={column.enum} expanded={true} />}
                                                />
                                            ) : (
                                                    <GridColumn
                                                        key={column.columnName}
                                                        field={column.columnName}
                                                        format={column.format}
                                                        title={column.title}
                                                        className={column.className}
                                                        width={column.width + "px"}
                                                        filter={column.filter}
                                                        columnMenu={props =>
                                                            <GridColumnMenuFilter {...props} expanded={true} />}
                                                    />
                                                )
                                        )
                                )
                        ))
                    }
                </Grid>
            </React.Fragment>
        );
    }

    private renderCustomColumns() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownColumns} toggle={this.toggleColumns}>
                <DropdownToggle className="btn btn-secondary dropdown-toggle waves-effect waves-dark">
                    <i className="fa fa-columns"></i>
                    <span className="d-none d-md-inline"> Colums</span>
                </DropdownToggle>
                <form name="customizeColumns" onSubmit={(event) => this.applyChangedColumns(event)}>
                    <DropdownMenu className="dropdown-menu animated bounceInDown">
                        <div className="mega-dropdown-menu row">
                            <div className="col-md-7">
                                <ul className="list-group">
                                    {
                                        this.props.columns.map(column => (
                                            <li key={column.columnName}
                                                className={"list-group-item" + (this.state.activeColumn === column.columnName ? " active" : "")}
                                                onClick={() => this.activateColumn(column.columnName)}
                                            >
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" checked={column.checked} onChange={e => this.toggleColumn(e, column.columnName)} />
                                                    <label className="form-check-label">
                                                        {column.title}
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
                                        <button type="submit" className="btn btn-fcicolor btn-block btn-sm">
                                            <i className="ti ti-save"></i> Apply
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block btn-sm mt-1" onClick={(event) => this.revertColumns(event)}>
                                            <i className="fa fa-undo"></i> Cancel
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-info btn-block mt-1" onClick={(event) => this.sortColumn(event, this.state.activeColumn, -1)}>
                                            <i className="fa fa-arrow-up"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-info btn-block mt-1" onClick={(event) => this.sortColumn(event, this.state.activeColumn, 1)}>
                                            <i className="fa fa-arrow-down"></i>
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block btn-sm mt-1" onClick={(event) => this.toggleAllColumn(event, true)}>
                                            <i className="ti ti-check-box"></i> Check All
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn-secondary btn-block btn-sm mt-1" onClick={(event) => this.toggleAllColumn(event, false)}>
                                            <i className="ti ti-control-stop"></i> Uncheck All
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DropdownMenu>
                </form>
            </ButtonDropdown>
        );
    }

    private fetchUsersPage = (dataState: any, getColumns: boolean = false, forced: boolean = false,
        userName: string = '', lastName: string = '', firstName: string = '', status: string = '', userType: string = ''
    ) => {
        this.props.fetchUsersPage(dataState, getColumns, forced,
            userName, lastName, firstName, status, userType);
    }

    private exportExcel = (event: any, allPages: boolean = false,
        userName: string = '', lastName: string = '', firstName: string = '', status: string = '', userType: string = ''
    ) => {
        event.preventDefault();
        //Evaluamos si se exportará todas las paginas o sólo una 
        if (allPages) {
            //Llamamos al metodo fetchUsersAll que nos retornará todos los registros de usuarios
            this.props.fetchUsersAll(true, userName, lastName, firstName, status, userType);
        }
        else { //Sino asignamos los registros que se muestran en la grilla a la lista de exportación 
            this.props.enabledExport(false);
        }
        //Una vez finalizada este metodo actualizará las propiedades usersExport y export
    }

    private toggleExcel = () => {
        this.setState({ dropdownExcel: !this.state.dropdownExcel });
    }

    private toggleColumns = () => {
        this.setState({ dropdownColumns: !this.state.dropdownColumns });
    }


    private dataStateChange = (event: any) => {
        this.fetchUsersPage(event.data);
    }

    private activateColumn(field: string) {
        this.setState({ activeColumn: field });
    }

    private toggleColumn(event: any, field: string) {
        this.props.toggleColumn(field, event.target.checked);
    }

    private toggleAllColumn(event: any, checked: boolean) {
        event.preventDefault();
        this.props.toggleAllColumns(checked);
    }

    private sortColumn(event: any, field: string, move: number) {
        event.preventDefault();
        this.props.sortColumn(field, move);
    }

    private revertColumns(event: any) {
        event.preventDefault();
        this.props.revertColumns();
    }

    private applyChangedColumns(event: any) {
        event.preventDefault();
        this.props.applyChangedColumns();
    }

    private deleteUser(uid: string) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <form name="deleteUser" onSubmit={(event) => { this.confirmDeleteUser(event, uid); onClose(); }}>
                        <div className="card">
                            <div className="card-header">
                                Confirm Delete
                        </div>
                            <div className="card-body">
                                Are you sure to want to delete this user?
                        </div>
                            <div className="card-footer text-right">
                                <button className="btn btn-danger btn-sm" onClick={onClose}>No</button>
                                <button type="submit" className="btn btn-success btn-sm">Yes</button>
                            </div>
                        </div>
                    </form>
                );
            }
        });
    }

    private confirmDeleteUser(event: any, uid: string) {
        event.preventDefault();
        this.props.deleteUser(uid);
    }

    private loginAs(username: string, usertype: number) {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <form name="loginAs" onSubmit={(event) => { this.confirmLoginAs(event, username, usertype); onClose(); }}>
                        <div className="card">
                            <div className="card-header">
                                Confirm Login As
                        </div>
                            <div className="card-body">
                                Are you sure to want to login as '{username}'?
                        </div>
                            <div className="card-footer text-right">
                                <button className="btn btn-secondary" onClick={onClose}>No</button>
                                <button type="submit" className="btn btn-primary">Yes</button>
                            </div>
                        </div>
                    </form>
                );
            }
        });
    }

    private confirmLoginAs(event: any, username: string, usertype: number) {
        event.preventDefault();
        this.props.loginAs(username, usertype);
    }
}

export default connect(
    (state: ApplicationState) => state.users,
    UserStore.actions
)(UserList as any);
