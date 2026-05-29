import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TreeView } from '@progress/kendo-react-treeview';
import { Redirect, RouteComponentProps } from 'react-router';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { MultiSelect, MultiSelectChangeEvent, MultiSelectFilterChangeEvent } from '@progress/kendo-react-dropdowns';

import { ApplicationState } from '../../store/index';
import * as UsersStore from '../../store/stores/users/UserStore';
import * as Enums from '../../utilities/Enums';
import { UserTypeEnum } from '../../utilities/Enums';
import BreadCrumb from '../shared/BreadCrumb';

const pageSize: number = 10;

// At runtime, Redux will merge together...
type UserstProps =
    UsersStore.State // ... state we've requested from the Redux store
    & typeof UsersStore.actions // ... plus action creators we've requested
    & RouteComponentProps<{ uid: string }>; // ... plus incoming routing parameters

class UserForm extends React.PureComponent<UserstProps> {
    filteredData: any[] = this.props.uidsLoans.slice();
    state = {
        subsetData: this.filteredData.slice(0, pageSize),
        skip: 0,
        total: this.filteredData.length,
        activeTab: 1
    };

    public componentDidMount() {
        this.props.fetchUser(this.props.match.params.uid);
    }

    public componentDidUpdate() {
        if (this.props.LoansChargedded) {
            this.filteredData = this.props.uidsLoans.slice();

            this.setState({
                subsetData: this.filteredData.slice(0, pageSize),
                skip: 0,
                total: this.filteredData.length
            });
            this.props.loansChargeddedEnd();
        }
    }

    public render() {
        return this.props.redirect ?
            <Redirect to="/users" /> :
            (
                <React.Fragment>
                    <BreadCrumb title={this.props.match.params.uid ? "Edit User" : "Create User"} />

                    <form name="saveUser" onSubmit={this.saveUser} encType="multipart/form-data">
                        <input type="hidden" name="Uid" value={this.props.user.Uid} />
                        <div className="card">
                            <div className="card-header p-0">
                                <Nav tabs className="border-0">
                                    <NavItem>
                                        <NavLink className={this.setActiveTab(1).trim()} onClick={() => this.changeTab(1)}>
                                            General
                                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={this.setActiveTab(2).trim()} onClick={() => this.changeTab(2)}>
                                            Security
                                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={this.setActiveTab(3).trim()} onClick={() => this.changeTab(3)}>
                                            Password Options
                                                </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-12">
                                        <TabContent activeTab={this.state.activeTab.toString()} className="border-0">
                                            <TabPane tabId="1">
                                                {this.renderGeneralTab()}
                                            </TabPane>
                                            <TabPane tabId="2">
                                                {this.renderSecurityTab()}
                                            </TabPane>
                                            <TabPane tabId="3">
                                                {this.renderPasswordOptionsTab()}
                                            </TabPane>
                                        </TabContent>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer text-right px-2">
                                <Link className="btn btn-primary" to="/users">Cancel</Link>
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>
                        </div>
                    </form>
                </React.Fragment>
            );
    }

    private renderGeneralTab() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className=" control-label" htmlFor="username">Username (*)</label>
                            <input className="form-control form-control-sm" disabled={this.props.match.params.uid ? true : false} type="text" name="Username" value={this.props.user.Username} onChange={this.changeStringForm} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className=" control-label" htmlFor="firstName">First Name (*)</label>
                            <input className="form-control form-control-sm" type="text" name="FirstName" value={this.props.user.FirstName} onChange={this.changeStringForm} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" htmlFor="middleName">Middle Name</label>
                            <input className="form-control form-control-sm" type="text" name="MiddleName" value={this.props.user.MiddleName} onChange={this.changeStringForm} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" htmlFor="lastName">Last Name (*)</label>
                            <input className="form-control form-control-sm" type="text" name="LastName" value={this.props.user.LastName} onChange={this.changeStringForm} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="control-label" htmlFor="address1">Address</label>
                            <input className="form-control form-control-sm" type="text" name="Address1" value={this.props.user.Address1} onChange={this.changeStringForm} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" htmlFor="homePhone">Home Phone</label>
                            <input className="form-control form-control-sm" type="text" name="HomePhone" value={this.props.user.HomePhone} onChange={this.changeNumberForm} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" htmlFor="mobilePhone">Mobile Phone</label>
                            <input className="form-control form-control-sm" type="text" name="MobilePhone" value={this.props.user.MobilePhone} onChange={this.changeNumberForm} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label" htmlFor="email">Email (*)</label>
                            <input className="form-control form-control-sm" type="text" name="Email" value={this.props.user.Email} onChange={this.changeStringForm} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="form-check mt-md-4">
                                <input className="form-check-input" type="checkbox" name="IsActive" checked={this.props.user.IsActive} onChange={this.changeBooleanForm} />
                                <label className="form-check-label" htmlFor="isActive">Is Active</label>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private renderSecurityTab() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label className="control-label" htmlFor="password">Password{this.props.match.params.uid ? "" : " (*)"}</label>
                        <input className="form-control form-control-sm" type="password" name="Password" placeholder="******" onChange={this.changeStringForm} />
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="rePassword">Confirm Password{this.props.match.params.uid ? "" : " (*)"}</label>
                        <input className="form-control form-control-sm" type="password" name="RePassword" placeholder="******" onChange={this.changeStringForm} />
                    </div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="userType">User Type (*)</label>
                        <select className="form-control form-control-sm" name="UserType" value={this.props.user.UserType.toString()} onChange={this.changeNumberForm}>
                            <option value="-1">- Select User Type -</option>
                            {this.props.userTypes.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                        </select>
                    </div>
                </div>
                {this.renderAssignLoansGroup()}
                {this.renderPermissionsGroup()}
            </div>
        );
    }

    private renderAssignLoansGroup() {
        if (
            this.props.user.UserType != UserTypeEnum.BROKER &&
            this.props.user.UserType != UserTypeEnum.LENDER &&
            this.props.user.UserType != UserTypeEnum.BORROWER
        ) return "";

        return (
            <div className="col-md-3">
                <div className="form-group">
                    <label className="control-label" htmlFor="userType">
                        {
                            this.props.user.UserType == UserTypeEnum.BROKER ? "Service Accounts" :
                                (this.props.user.UserType == UserTypeEnum.LENDER ? "Lender Accounts" : "Loan Accounts")
                        }
                    </label>
                    <MultiSelect
                        data={this.state.subsetData}
                        value={[]}
                        placeholder="Type to search..."
                        loading={this.props.loadingFilter}
                        className="form-control form-control-sm"
                        style={{ height: '30px', width: '100%', fontSize: '0.8em' }}
                        virtual={{
                            total: this.state.total,
                            pageSize: pageSize,
                            skip: this.state.skip
                        }}
                        onPageChange={this.pageChange}
                        filterable={true}
                        onFilterChange={this.onFilterChange}
                        onChange={this.onChange}
                        itemRender={(li) => this.itemRenderFilter(li)}
                        listNoDataRender={(element) => this.listNoDataRender(element)}
                    />
                </div>
                <div className="form-group">
                    {
                        this.props.assignedLoans.map((loan: any) =>
                            <div key={"loan" + loan.ParentUid} className="alert alert-success mb-2">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => this.props.removeLoan(loan.ParentUid)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                {this.itemChildrenFilter(loan)}
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }

    private renderPermissionsGroup() {
        if (this.props.user.UserType != UserTypeEnum.ADMIN)
            return "";

        return (
            <div className="col-md-6">
                <div className="form-group">
                    <TreeView
                        data={this.props.permissions}
                        expandIcons={true}
                        checkboxes={true}
                        checkIndeterminateField="indeterminate"
                        onExpandChange={this.onExpandChange}
                        onCheckChange={this.onCheckChange}
                        onItemClick={this.onItemClick}
                        aria-multiselectable={true}
                    />
                </div>
            </div>
        );
    }

    private renderPasswordOptionsTab() {
        return (
            <div className="row">
                <div className="col-md-7">
                    <div className="form-group mb-0">
                        <label className="text-bold">Password Option</label>
                        <div className="px-2">
                            <div className="form-inline mb-2">
                                <div className="form-check my-0 mr-3">
                                    <input className="form-check-input" type="checkbox" id="PassExpirEnable" name="PassExpirEnable" disabled={!this.props.user.PassOverride} checked={this.props.user.PassExpirEnable} onChange={this.changeBooleanForm} />
                                    <label className="form-check-label ml-1 mt-2" htmlFor="PassExpirEnable">Expiration After</label>
                                </div>

                                <input type="text" className="form-control form-control-sm input-password mr-3" name="PassExpirationTime" disabled={!this.props.user.PassOverride || !this.props.user.PassExpirEnable} value={this.props.user.PassExpirationTime} onChange={this.changeNumberForm} />

                                <select className="form-control form-control-sm" name="PassExpirationUnit" disabled={!this.props.user.PassOverride || !this.props.user.PassExpirEnable} value={this.props.user.PassExpirationUnit} onChange={this.changeNumberForm}>
                                    <option value="0">Day(s)</option>
                                    <option value="1">Week(s)</option>
                                    <option value="2">Month(s)</option>
                                </select>
                            </div>
                            <div className="form-inline mb-2">
                                <div className="form-check my-0 mr-3">
                                    <input className="form-check-input" type="checkbox" id="PassPreviousEnable" name="PassPreviousEnable" disabled={!this.props.user.PassOverride} checked={this.props.user.PassPreviousEnable} onChange={this.changeBooleanForm} />
                                    <label className="form-check-label ml-1 mt-2" htmlFor="PassPreviousEnable">User cannot use their previous</label>
                                </div>

                                <input type="text" className="form-control form-control-sm input-password mr-3" name="PassPreviousPsw" disabled={!this.props.user.PassOverride || !this.props.user.PassPreviousEnable} value={this.props.user.PassPreviousPsw} onChange={this.changeNumberForm} />

                                <label className="form-check-label mt-2">Password</label>
                            </div>
                        </div>
                    </div>

                    <hr className="m-0 my-2" />

                    <div className="form-group mb-0">
                        <label className="text-bold">Lock out Option</label>
                        <div className="px-2">
                            <div className="form-inline mb-2">
                                <div className="form-check my-0 mr-3">
                                    <input className="form-check-input" type="checkbox" id="PassLockoutEnable" name="PassLockoutEnable" disabled={!this.props.user.PassOverride} checked={this.props.user.PassLockoutEnable} onChange={this.changeBooleanForm} />
                                    <label className="form-check-label ml-1 mt-2" htmlFor="PassLockoutEnable">Lock out users after</label>
                                </div>

                                <input type="text" className="form-control form-control-sm input-password mr-3" name="PassLockoutAttempts" disabled={!this.props.user.PassOverride || !this.props.user.PassLockoutEnable} value={this.props.user.PassLockoutAttempts} onChange={this.changeNumberForm} />

                                <label className="form-check-label mr-3 mt-2">unsuccessful attempts for</label>

                                <input type="text" className="form-control form-control-sm input-password mr-3" name="PassLockoutMinutes" disabled={!this.props.user.PassOverride || !this.props.user.PassLockoutEnable} value={this.props.user.PassLockoutMinutes} onChange={this.changeNumberForm} />

                                <label className="form-check-label mt-2">minutes</label>
                            </div>
                        </div>
                    </div>

                    <hr className="m-0 my-2" />
                </div>
                <div className="col-md-5">
                    <div className="form-group mb-0">
                        <label className="text-bold">Password Complexity</label>
                        <div className="px-2">
                            <div className="form-inline mb-2">
                                <div className="form-check my-0 mr-3">
                                    <input className="form-check-input" type="checkbox" id="PassComLenEnable" name="PassComLenEnable" disabled={!this.props.user.PassOverride} checked={this.props.user.PassComLenEnable} onChange={this.changeBooleanForm} />
                                    <label className="form-check-label ml-1 mt-2" htmlFor="PassComLenEnable">Password Length</label>
                                </div>

                                <input type="text" className="form-control form-control-sm input-password mr-3" name="PassComLenFrom" disabled={!this.props.user.PassOverride || !this.props.user.PassComLenEnable} value={this.props.user.PassComLenFrom} onChange={this.changeNumberForm} />

                                <label className="form-check-label mr-3 mt-2">To</label>

                                <input type="text" className="form-control form-control-sm input-password" name="PassComLenTo" disabled={!this.props.user.PassOverride || !this.props.user.PassComLenEnable} value={this.props.user.PassComLenTo} onChange={this.changeNumberForm} />
                            </div>
                            <div className="form-inline mb-2">
                                <div className="form-check my-0">
                                    <input className="form-check-input" type="checkbox" id="PassComLowerEnable" name="PassComLowerEnable" disabled={!this.props.user.PassOverride} checked={this.props.user.PassComLowerEnable} onChange={this.changeBooleanForm} />
                                    <label className="form-check-label ml-1 mt-2" htmlFor="PassComLowerEnable">Minimun one lower case and one uppper case</label>
                                </div>
                            </div>
                            <div className="form-inline mb-2">
                                <div className="form-check my-0">
                                    <input className="form-check-input" type="checkbox" id="PassComDigitEnable" name="PassComDigitEnable" disabled={!this.props.user.PassOverride} checked={this.props.user.PassComDigitEnable} onChange={this.changeBooleanForm} />
                                    <label className="form-check-label ml-1 mt-2" htmlFor="PassComDigitEnable">Minimun one digit</label>
                                </div>
                            </div>
                            <div className="form-inline">
                                <div className="form-check my-0">
                                    <input className="form-check-input" type="checkbox" id="PassComSpecialEnable" name="PassComSpecialEnable" disabled={!this.props.user.PassOverride} checked={this.props.user.PassComSpecialEnable} onChange={this.changeBooleanForm} />
                                    <label className="form-check-label ml-1 mt-2" htmlFor="PassComSpecialEnable">Minimun one special character</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="m-0 my-2" />
                </div>
                <div className="col-md-12">
                    <div className="form-group mb-0">
                        <div className="form-inline">
                            <div className="form-check my-0">
                                <input className="form-check-input" type="checkbox" id="PassOverride" name="PassOverride" checked={this.props.user.PassOverride} onChange={this.changeBooleanForm} />
                                <label className="form-check-label ml-1 mt-2" htmlFor="PassOverride">Override Default Settings</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private listNoDataRender(element: any) {
        const noData = (
            <h4 style={{ fontSize: '0.8em' }}>
                <span className="k-icon k-i-warning" style={{ fontSize: '2.0em' }} />
                <br /><br />
                no data here
            </h4>
        );

        return React.cloneElement(element, { ...element.props }, noData);
    }

    private itemRenderFilter(li: any) {
        let loan = this.props.filteredLoans.filter(loan => loan.ParentUid === li.props.children)[0];
        return loan ? React.cloneElement(li, li.props, this.itemChildrenFilter(loan)) : "";
    }

    private itemChildrenFilter(loan: any) {
        return loan.Account === undefined ? <span className="text-sm">{loan.FullName}</span> :
            <span className="text-sm"><b>{`${loan.Account}: `}</b>{loan.FullName}</span>
    }

    private setActiveTab = (activeTab: number) => {
        return (this.state.activeTab === activeTab ? " active" : "");
    }

    private changeTab = (activeTab: number) => {
        this.setState({ activeTab });
    }

    private changeBooleanForm = (event: any) => {
        this.props.changeUser(event.target.name, event.target.checked);
    }

    private changeStringForm = (event: any) => {
        if (this.props.match.params.uid && event.target.name == 'Username') return;
        this.props.changeUser(event.target.name, event.target.value);
    }

    private changeNumberForm = (event: any) => {
        let value = Number(event.target.value);
        if (isNaN(value)) return;

        if (!this.props.user.PassExpirEnable && event.target.name == 'PassExpirationTime') return;
        if (!this.props.user.PassExpirEnable && event.target.name == 'PassExpirationUnit') return;

        if (!this.props.user.PassPreviousEnable && event.target.name == 'PassPreviousPsw') return;

        if (!this.props.user.PassLockoutEnable && event.target.name == 'PassLockoutAttempts') return;
        if (!this.props.user.PassLockoutEnable && event.target.name == 'PassLockoutMinutes') return;

        if (!this.props.user.PassComLenEnable && event.target.name == 'PassComLenFrom') return;
        if (!this.props.user.PassComLenEnable && event.target.name == 'PassComLenTo') return;

        this.props.changeUser(event.target.name, value);
    }

    private onChange = (event: MultiSelectChangeEvent) => {
        if (event.value.length > 0) {
            this.props.addLoan(event.value[event.value.length - 1]);
        }
    }

    private onFilterChange = (event: MultiSelectFilterChangeEvent) => {
        if (this.props.uidsLoans.indexOf(event.filter.value) === -1) {
            this.props.fetchLoans(event.filter.value, this.props.user.UserType);
        }
    }

    private pageChange = (event: any) => {
        const skip = event.page.skip;
        const take = event.page.take;
        const newSubsetData = this.filteredData.slice(skip, skip + take);

        this.setState({
            subsetData: newSubsetData,
            skip: skip
        });
    }

    private saveUser = (event: any) => {
        event.preventDefault();
        this.props.saveUser();
    }

    private onExpandChange = (event: any) => {
        event.item.expanded = !event.item.expanded;
        this.forceUpdate();
    }

    private onCheckChange = (event: any) => {
        event.item.checked = !event.item.checked;
        this.props.changePermission(event.item.uid, event.item.checked);
        this.forceUpdate();
    }

    private onItemClick = (event: any) => {
        event.item.checked = !event.item.checked;
        this.props.changePermission(event.item.uid, event.item.checked);
        this.forceUpdate();
    }
}

export default connect(
    (state: ApplicationState) => state.users,
    UsersStore.actions
)(UserForm as any);
