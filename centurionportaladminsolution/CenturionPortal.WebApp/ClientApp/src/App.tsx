import '@progress/kendo-theme-bootstrap/dist/all.css';
import * as React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Carousel from './app/advanced-ui/Carousel';
import Clipboard from './app/advanced-ui/Clipboards';
import ContextMenu from './app/advanced-ui/ContextMenus';
import Dragula from './app/advanced-ui/Dragula';
import Loaders from './app/advanced-ui/Loaders';
import Sliders from './app/advanced-ui/Sliders';
import TreeView from './app/advanced-ui/TreeView';
import Calendar from './app/apps/Calendar';
import Chats from './app/apps/Chats';
import Email from './app/apps/Email';
import Gallery from './app/apps/Gallery';
import KanbanBoard from './app/apps/KanbanBoard';
import KanbanBoard1 from './app/apps/KanbanBoard1';
import KanbanBoard2 from './app/apps/KanbanBoard2';
import KanbanBoard3 from './app/apps/KanbanBoard3';
import Tickets from './app/apps/Tickets';
import TodoList from './app/apps/TodoList';
import Accordions from './app/basic-ui/Accordions';
import Badges from './app/basic-ui/Badges';
import Breadcrumbs from './app/basic-ui/Breadcrumbs';
import Buttons from './app/basic-ui/Buttons';
import Dropdowns from './app/basic-ui/Dropdowns';
import Modals from './app/basic-ui/Modals';
import Paginations from './app/basic-ui/Paginations';
import Popups from './app/basic-ui/Popups';
import Progress from './app/basic-ui/Progress';
import TabsPage from './app/basic-ui/TabsPage';
import Tooltips from './app/basic-ui/Tooltips';
import Typography from './app/basic-ui/Typography';
import C3Charts from './app/charts/C3Charts';
import Chartist from './app/charts/Chartist';
import ChartJs from './app/charts/ChartJs';
import GoogleCharts from './app/charts/GoogleCharts';
import GuageChart from './app/charts/GuageChart';
import SparkLineCharts from './app/charts/SparkLineCharts';
import CodeEditor from './app/code-editor/CodeEditor';
import Dashboard from './app/dashboard/Dashboard';
import Invoice from './app/ecommerce/Invoice';
import Orders from './app/ecommerce/Orders';
import Pricing from './app/ecommerce/Pricing';
import ProductCatalogue from './app/ecommerce/ProductCatalogue';
import ProjectList from './app/ecommerce/ProjectList';
import AdvancedElements from './app/form-elements/AdvancedElements';
import BasicElements from './app/form-elements/BasicElements';
import Validation from './app/form-elements/Validation';
import Wizard from './app/form-elements/Wizard';
import BlankPage from './app/general-pages/BlankPage';
import Faq from './app/general-pages/Faq';
import Faq2 from './app/general-pages/Faq2';
import LandingPage from './app/general-pages/LandingPage';
import NewsGrid from './app/general-pages/NewsGrid';
import Portfolio from './app/general-pages/Portfolio';
import Profile from './app/general-pages/Profile';
import SearchResults from './app/general-pages/SearchResults';
import Timeline from './app/general-pages/Timeline';
import UserListing from './app/general-pages/UserListing';
import FlagIcons from './app/icons/FlagIcons';
import FontAwesome from './app/icons/FontAwesome';
import Mdi from './app/icons/Mdi';
import SimpleLine from './app/icons/SimpleLine';
import Themify from './app/icons/Themify';
import TypIcons from './app/icons/TypIcons';
import RtlLayout from './app/layout/RtlLayout';
import SimpleMap from './app/maps/SimpleMap';
import VectorMap from './app/maps/VectorMap';
import Notifications from './app/notifications/Notifications';
import Loans from './app/portfolio/Loans';
import BasicTable from './app/tables/BasicTable';
import DataTable from './app/tables/DataTables';
import ReactTable from './app/tables/ReactTable';
import SortableTable from './app/tables/SortableTable';
import TextEditors from './app/text-editors/TextEditors';
import Lockscreen from './app/user-pages/Lockscreen';
import Register1 from './app/user-pages/Register';
import Register2 from './app/user-pages/Register2';
import Widgets from './app/widgets/Widgets';
import './assets/css/custom.css';
import './assets/css/error-pages.css';
import './assets/css/toastr.min.css';
import './assets/styles/App.scss';
import Login from './components/auth/Login';
import Error404 from './components/errors/404';
import Error500 from './components/errors/500';
import Home from './components/Home';
import PaidInvoices from './components/invoices/PaidInvoices';
import PendingInvoices from './components/invoices/PendingInvoices';
import LenAttachment, { LenAttachment_Url } from './components/lenders/LenAttachment';
import LenCharges from './components/lenders/LenCharges';
import LenDashboard from './components/lenders/LenDashboard';
import LenFunding, { LenFunding_Url } from './components/lenders/LenFunding';
import LenLoansSearch, { LenLoansSearch_Url } from './components/lenders/LenLoansSearch';
import LenNotes, { LenNotes_Url } from './components/lenders/LenNotes';
import LenPortfolioReports, { LenPortfolioReports_Url } from './components/lenders/LenPortfolioReports';
import LenPayments from './components/lenders/LenPayments';
import LenVendors from './components/lenders/LenVendors';
import { PaymentToLender_Url } from './components/lenders/paymentsToLender/PaymentToLender';
import PartialOwnershipPortfolio, { PartialOwnershipPortfolio_Url } from './components/loan/PartialOwnershipPortfolio';
import ReportLogin from './components/users/ReportLogin';
import UserForm from './components/users/UserForm';
import UserList from './components/users/UserList';
import UserSetting_Account, { UserSetting_Account_Url } from './components/users/UserSetting_Account';
import UserSetting_ChangePassword, { UserSetting_ChangePassword_Url } from './components/users/UserSetting_ChangePassword';
import UserSetting_General, { UserSetting_General_Url } from './components/users/UserSetting_General';
//import UserSetting, { UserSetting_Url } from './components/users/UserSetting';
import UserSetting_LirsOption, { UserSetting_LirsOption_Url } from './components/users/UserSetting_LirsOption';
import UserSetting_PasswordDefault, { UserSetting_PasswordDefault_Url } from './components/users/UserSetting_PasswordDefault';
import UserSetting_PersonalInformation, { UserSetting_PersonalInformation_Url } from './components/users/UserSetting_PersonalInformation';
import UserSetting_RecoverySetting, { UserSetting_RecoverySetting_Url } from './components/users/UserSetting_RecoverySetting';
import AppRoute from './routes/AppRoute';
import AuthRoute from './routes/AuthRoute';
import ErrorRoute from './routes/ErrorRoute';
import { UserTypeEnum } from './utilities/Enums';
import { Utils } from './utilities/Functions';
import PaymentToLender from './components/lenders/paymentsToLender/PaymentToLender';
import LoanStatusBreakdown, { LoanStatusBreakdown_Url } from './components/portfolioReport/LoanStatusBreakdown';
import LoanPortfolio, { LoanPortfolio_Url } from './components/portfolioReport/LoanPortfolio';
import ACHStatusReport from './components/reports/ACHStatusReport';
import Version, { Version_Url } from './components/appVersion/Index';

export default () => {
    
    //  <AuthRoute path='/lender/loan/:loanUid/funding' component={LenPayments} role={UserTypeEnum.LENDER} />
    return (
        <Router>
            <Switch>
                <AppRoute path='/login' component={Login} />

                <AuthRoute exact path='/' component={Home} role={UserTypeEnum.ADMIN} />
                <AuthRoute path='/user/add' component={UserForm} role={UserTypeEnum.ADMIN} />
                <AuthRoute path='/user/edit/:uid' component={UserForm} role={UserTypeEnum.ADMIN} />
                <AuthRoute path='/users/:skip?/:take?/:column?/:sortDirection?' component={UserList} role={UserTypeEnum.ADMIN} />
                <AuthRoute path='/report/login' component={ReportLogin} role={UserTypeEnum.ADMIN} />

                <AuthRoute path='/invoice/paid/' component={PaidInvoices} role={UserTypeEnum.LENDER} />
                <AuthRoute path='/invoice/pending/' component={PendingInvoices} role={UserTypeEnum.LENDER} />

                <AuthRoute path='/dashboard' component={LenDashboard} role={UserTypeEnum.LENDER} />
                <AuthRoute path={LenAttachment_Url} component={LenAttachment} role={UserTypeEnum.LENDER} />
                <AuthRoute exact path='/lender/loans' component={LenVendors} role={UserTypeEnum.LENDER} />
                <AuthRoute path={LenFunding_Url} component={LenFunding} role={UserTypeEnum.LENDER} />
                <AuthRoute path={LenNotes_Url} component={LenNotes} role={UserTypeEnum.LENDER} />
                <AuthRoute path={LenLoansSearch_Url} component={LenLoansSearch} role={UserTypeEnum.LENDER} />
                <AuthRoute path={"/reports/achstatus"} component={ACHStatusReport} role={UserTypeEnum.LENDER} />
                <AuthRoute path={LenPortfolioReports_Url} component={LenPortfolioReports} role={UserTypeEnum.LENDER} />
                <AuthRoute path={PartialOwnershipPortfolio_Url} component={PartialOwnershipPortfolio} role={UserTypeEnum.LENDER} />
                <AuthRoute path={LoanStatusBreakdown_Url} component={LoanStatusBreakdown} role={UserTypeEnum.LENDER} />
                <AuthRoute path={LoanPortfolio_Url} component={LoanPortfolio} role={UserTypeEnum.LENDER} />



                <AuthRoute path={UserSetting_LirsOption_Url} component={UserSetting_LirsOption} role={UserTypeEnum.LENDER} />
                <AuthRoute path={UserSetting_General_Url} component={UserSetting_General} role={UserTypeEnum.LENDER} />
                <AuthRoute path={UserSetting_PersonalInformation_Url} component={UserSetting_PersonalInformation} role={UserTypeEnum.LENDER} />
                <AuthRoute path={UserSetting_ChangePassword_Url} component={UserSetting_ChangePassword} role={UserTypeEnum.LENDER} />
                <AuthRoute path={UserSetting_RecoverySetting_Url} component={UserSetting_RecoverySetting} role={UserTypeEnum.LENDER} />
                <AuthRoute path={UserSetting_PasswordDefault_Url} component={UserSetting_PasswordDefault} role={UserTypeEnum.LENDER} />
                <AuthRoute path={UserSetting_Account_Url} component={UserSetting_Account} role={UserTypeEnum.LENDER} />

                <AuthRoute path={Version_Url} component={Version} role={UserTypeEnum.ADMIN} />

                <AuthRoute path={PaymentToLender_Url} component={PaymentToLender} role={UserTypeEnum.LENDER} />

                {/* <AuthRoute path="/reports/achstatus" component={RptACHStatus} role={UserTypeEnum.LENDER} />*/}


                <AuthRoute path='/lender/loan/:loanUid/payments' component={LenPayments} role={UserTypeEnum.LENDER} />
                <AuthRoute path='/lender/loan/:loanUid/notes' component={LenPayments} role={UserTypeEnum.LENDER} />
                <AuthRoute path='/lender/loan/:loanUid/attachments' component={LenPayments} role={UserTypeEnum.LENDER} />
                <AuthRoute path='/lender/loan/:loanUid/charges' component={LenCharges} role={UserTypeEnum.LENDER} />
                <ErrorRoute path='/error/404' component={Error404} />
                <ErrorRoute path='/error/405' component={Error500} />
                <ErrorRoute exact path='*' component={Error404} />

                <AuthRoute exact path="/dashboard/new" component={Dashboard} role={UserTypeEnum.LENDER} />

                <AuthRoute exact path="/layout/RtlLayout" component={RtlLayout} role={UserTypeEnum.LENDER} />

                <AuthRoute exact path="/widgets" component={Widgets} role={UserTypeEnum.LENDER} />

                <AuthRoute exact path="/apps/kanban-board" component={KanbanBoard} role={UserTypeEnum.LENDER} />
                <AuthRoute exact path="/apps/kanban-board1" component={KanbanBoard1} role={UserTypeEnum.LENDER} />
                <AuthRoute exact path="/apps/kanban-board2" component={KanbanBoard2} role={UserTypeEnum.LENDER} />
                <AuthRoute exact path="/apps/kanban-board3" component={KanbanBoard3} role={UserTypeEnum.LENDER} />
                <AuthRoute exact path="/apps/todo-list" component={TodoList} role={UserTypeEnum.LENDER} />
                <AuthRoute exact path="/apps/tickets" component={Tickets} role={UserTypeEnum.LENDER} />
                <AuthRoute exact path="/apps/chats" component={Chats} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/basic-ui/accordions" component={Accordions} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/buttons" component={Buttons} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/badges" component={Badges} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/breadcrumbs" component={Breadcrumbs} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/dropdowns" component={Dropdowns} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/modals" component={Modals} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/progressbar" component={Progress} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/pagination" component={Paginations} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/tabs" component={TabsPage} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/typography" component={Typography} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/tooltips" component={Tooltips} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/basic-ui/popups" component={Popups} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/advanced-ui/dragula" component={Dragula} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/advanced-ui/clipboard" component={Clipboard} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/advanced-ui/context-menu" component={ContextMenu} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/advanced-ui/sliders" component={Sliders} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/advanced-ui/carousel" component={Carousel} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/advanced-ui/loaders" component={Loaders} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/advanced-ui/tree-view" component={TreeView} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/form-Elements/basic-elements" component={BasicElements} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/form-Elements/advanced-elements" component={AdvancedElements} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/form-Elements/validation" component={Validation} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/form-Elements/wizard" component={Wizard} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/tables/basic-table" component={BasicTable} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/tables/data-table" component={DataTable} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/tables/react-table" component={ReactTable} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/tables/sortable-table" component={SortableTable} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/maps/vector-map" component={VectorMap} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/maps/simple-map" component={SimpleMap} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/notifications" component={Notifications} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/icons/mdi" component={Mdi} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/icons/flag-icons" component={FlagIcons} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/icons/font-awesome" component={FontAwesome} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/icons/simple-line" component={SimpleLine} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/icons/themify" component={Themify} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/icons/typicons" component={TypIcons} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/text-editors" component={TextEditors} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/code-editor" component={CodeEditor} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/icons/themify" component={Themify} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/charts/chart-js" component={ChartJs} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/charts/c3-chart" component={C3Charts} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/charts/chartist" component={Chartist} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/charts/google-charts" component={GoogleCharts} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/charts/sparkline-charts" component={SparkLineCharts} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/charts/guage-chart" component={GuageChart} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/user-pages/register-1" component={Register1} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/user-pages/register-2" component={Register2} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/user-pages/lockscreen" component={Lockscreen} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/general-pages/blank-page" component={BlankPage} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/general-pages/landing-page" component={LandingPage} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/general-pages/profile" component={Profile} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/general-pages/faq-1" component={Faq} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/general-pages/faq-2" component={Faq2} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/general-pages/news-grid" component={NewsGrid} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/general-pages/timeline" component={Timeline} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/general-pages/search-results" component={SearchResults} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/general-pages/portfolio" component={Portfolio} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/general-pages/user-listing" component={UserListing} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/ecommerce/invoice" component={Invoice} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/ecommerce/pricing" component={Pricing} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/ecommerce/product-catalogue" component={ProductCatalogue} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/ecommerce/project-list" component={ProjectList} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/ecommerce/orders" component={Orders} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/lender/loans/new" component={Loans} role={UserTypeEnum.LENDER} />

                <AuthRoute path="/apps/email" component={Email} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/apps/calendar" component={Calendar} role={UserTypeEnum.LENDER} />
                <AuthRoute path="/apps/gallery" component={Gallery} role={UserTypeEnum.LENDER} />

                <ErrorRoute path='/error/404' component={Error404} role={UserTypeEnum.LENDER} />
                <ErrorRoute path='/error/500' component={Error500} role={UserTypeEnum.LENDER} />
                <ErrorRoute exact path='*' component={Error404} />

                <Redirect to={Utils.homeUrl()} />
            </Switch>
        </Router>
    );
};