"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@progress/kendo-theme-bootstrap/dist/all.css");
var React = require("react");
require("react-confirm-alert/src/react-confirm-alert.css");
var react_router_dom_1 = require("react-router-dom");
var Carousel_1 = require("./app/advanced-ui/Carousel");
var Clipboards_1 = require("./app/advanced-ui/Clipboards");
var ContextMenus_1 = require("./app/advanced-ui/ContextMenus");
var Dragula_1 = require("./app/advanced-ui/Dragula");
var Loaders_1 = require("./app/advanced-ui/Loaders");
var Sliders_1 = require("./app/advanced-ui/Sliders");
var TreeView_1 = require("./app/advanced-ui/TreeView");
var Calendar_1 = require("./app/apps/Calendar");
var Chats_1 = require("./app/apps/Chats");
var Email_1 = require("./app/apps/Email");
var Gallery_1 = require("./app/apps/Gallery");
var KanbanBoard_1 = require("./app/apps/KanbanBoard");
var KanbanBoard1_1 = require("./app/apps/KanbanBoard1");
var KanbanBoard2_1 = require("./app/apps/KanbanBoard2");
var KanbanBoard3_1 = require("./app/apps/KanbanBoard3");
var Tickets_1 = require("./app/apps/Tickets");
var TodoList_1 = require("./app/apps/TodoList");
var Accordions_1 = require("./app/basic-ui/Accordions");
var Badges_1 = require("./app/basic-ui/Badges");
var Breadcrumbs_1 = require("./app/basic-ui/Breadcrumbs");
var Buttons_1 = require("./app/basic-ui/Buttons");
var Dropdowns_1 = require("./app/basic-ui/Dropdowns");
var Modals_1 = require("./app/basic-ui/Modals");
var Paginations_1 = require("./app/basic-ui/Paginations");
var Popups_1 = require("./app/basic-ui/Popups");
var Progress_1 = require("./app/basic-ui/Progress");
var TabsPage_1 = require("./app/basic-ui/TabsPage");
var Tooltips_1 = require("./app/basic-ui/Tooltips");
var Typography_1 = require("./app/basic-ui/Typography");
var C3Charts_1 = require("./app/charts/C3Charts");
var Chartist_1 = require("./app/charts/Chartist");
var ChartJs_1 = require("./app/charts/ChartJs");
var GoogleCharts_1 = require("./app/charts/GoogleCharts");
var GuageChart_1 = require("./app/charts/GuageChart");
var SparkLineCharts_1 = require("./app/charts/SparkLineCharts");
var CodeEditor_1 = require("./app/code-editor/CodeEditor");
var Dashboard_1 = require("./app/dashboard/Dashboard");
var Invoice_1 = require("./app/ecommerce/Invoice");
var Orders_1 = require("./app/ecommerce/Orders");
var Pricing_1 = require("./app/ecommerce/Pricing");
var ProductCatalogue_1 = require("./app/ecommerce/ProductCatalogue");
var ProjectList_1 = require("./app/ecommerce/ProjectList");
var AdvancedElements_1 = require("./app/form-elements/AdvancedElements");
var BasicElements_1 = require("./app/form-elements/BasicElements");
var Validation_1 = require("./app/form-elements/Validation");
var Wizard_1 = require("./app/form-elements/Wizard");
var BlankPage_1 = require("./app/general-pages/BlankPage");
var Faq_1 = require("./app/general-pages/Faq");
var Faq2_1 = require("./app/general-pages/Faq2");
var LandingPage_1 = require("./app/general-pages/LandingPage");
var NewsGrid_1 = require("./app/general-pages/NewsGrid");
var Portfolio_1 = require("./app/general-pages/Portfolio");
var Profile_1 = require("./app/general-pages/Profile");
var SearchResults_1 = require("./app/general-pages/SearchResults");
var Timeline_1 = require("./app/general-pages/Timeline");
var UserListing_1 = require("./app/general-pages/UserListing");
var FlagIcons_1 = require("./app/icons/FlagIcons");
var FontAwesome_1 = require("./app/icons/FontAwesome");
var Mdi_1 = require("./app/icons/Mdi");
var SimpleLine_1 = require("./app/icons/SimpleLine");
var Themify_1 = require("./app/icons/Themify");
var TypIcons_1 = require("./app/icons/TypIcons");
var RtlLayout_1 = require("./app/layout/RtlLayout");
var SimpleMap_1 = require("./app/maps/SimpleMap");
var VectorMap_1 = require("./app/maps/VectorMap");
var Notifications_1 = require("./app/notifications/Notifications");
var Loans_1 = require("./app/portfolio/Loans");
var BasicTable_1 = require("./app/tables/BasicTable");
var DataTables_1 = require("./app/tables/DataTables");
var ReactTable_1 = require("./app/tables/ReactTable");
var SortableTable_1 = require("./app/tables/SortableTable");
var TextEditors_1 = require("./app/text-editors/TextEditors");
var Lockscreen_1 = require("./app/user-pages/Lockscreen");
var Register_1 = require("./app/user-pages/Register");
var Register2_1 = require("./app/user-pages/Register2");
var Widgets_1 = require("./app/widgets/Widgets");
require("./assets/css/custom.css");
require("./assets/css/error-pages.css");
require("./assets/css/toastr.min.css");
require("./assets/styles/App.scss");
var Login_1 = require("./components/auth/Login");
var _404_1 = require("./components/errors/404");
var _500_1 = require("./components/errors/500");
var Home_1 = require("./components/Home");
var PaidInvoices_1 = require("./components/invoices/PaidInvoices");
var PendingInvoices_1 = require("./components/invoices/PendingInvoices");
var LenAttachment_1 = require("./components/lenders/LenAttachment");
var LenCharges_1 = require("./components/lenders/LenCharges");
var LenDashboard_1 = require("./components/lenders/LenDashboard");
var LenFunding_1 = require("./components/lenders/LenFunding");
var LenLoansSearch_1 = require("./components/lenders/LenLoansSearch");
var LenNotes_1 = require("./components/lenders/LenNotes");
var LenPortfolioReports_1 = require("./components/lenders/LenPortfolioReports");
var LenPayments_1 = require("./components/lenders/LenPayments");
var LenVendors_1 = require("./components/lenders/LenVendors");
var PaymentToLender_1 = require("./components/lenders/paymentsToLender/PaymentToLender");
var PartialOwnershipPortfolio_1 = require("./components/loan/PartialOwnershipPortfolio");
var ReportLogin_1 = require("./components/users/ReportLogin");
var UserForm_1 = require("./components/users/UserForm");
var UserList_1 = require("./components/users/UserList");
var UserSetting_Account_1 = require("./components/users/UserSetting_Account");
var UserSetting_ChangePassword_1 = require("./components/users/UserSetting_ChangePassword");
var UserSetting_General_1 = require("./components/users/UserSetting_General");
//import UserSetting, { UserSetting_Url } from './components/users/UserSetting';
var UserSetting_LirsOption_1 = require("./components/users/UserSetting_LirsOption");
var UserSetting_PasswordDefault_1 = require("./components/users/UserSetting_PasswordDefault");
var UserSetting_PersonalInformation_1 = require("./components/users/UserSetting_PersonalInformation");
var UserSetting_RecoverySetting_1 = require("./components/users/UserSetting_RecoverySetting");
var AppRoute_1 = require("./routes/AppRoute");
var AuthRoute_1 = require("./routes/AuthRoute");
var ErrorRoute_1 = require("./routes/ErrorRoute");
var Enums_1 = require("./utilities/Enums");
var Functions_1 = require("./utilities/Functions");
var PaymentToLender_2 = require("./components/lenders/paymentsToLender/PaymentToLender");
var LoanStatusBreakdown_1 = require("./components/portfolioReport/LoanStatusBreakdown");
var LoanPortfolio_1 = require("./components/portfolioReport/LoanPortfolio");
var ACHStatusReport_1 = require("./components/reports/ACHStatusReport");
var Index_1 = require("./components/appVersion/Index");
exports.default = (function () {
    //  <AuthRoute path='/lender/loan/:loanUid/funding' component={LenPayments} role={UserTypeEnum.LENDER} />
    return (React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(AppRoute_1.default, { path: '/login', component: Login_1.default }),
            React.createElement(AuthRoute_1.default, { exact: true, path: '/', component: Home_1.default, role: Enums_1.UserTypeEnum.ADMIN }),
            React.createElement(AuthRoute_1.default, { path: '/user/add', component: UserForm_1.default, role: Enums_1.UserTypeEnum.ADMIN }),
            React.createElement(AuthRoute_1.default, { path: '/user/edit/:uid', component: UserForm_1.default, role: Enums_1.UserTypeEnum.ADMIN }),
            React.createElement(AuthRoute_1.default, { path: '/users/:skip?/:take?/:column?/:sortDirection?', component: UserList_1.default, role: Enums_1.UserTypeEnum.ADMIN }),
            React.createElement(AuthRoute_1.default, { path: '/report/login', component: ReportLogin_1.default, role: Enums_1.UserTypeEnum.ADMIN }),
            React.createElement(AuthRoute_1.default, { path: '/invoice/paid/', component: PaidInvoices_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: '/invoice/pending/', component: PendingInvoices_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: '/dashboard', component: LenDashboard_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: LenAttachment_1.LenAttachment_Url, component: LenAttachment_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { exact: true, path: '/lender/loans', component: LenVendors_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: LenFunding_1.LenFunding_Url, component: LenFunding_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: LenNotes_1.LenNotes_Url, component: LenNotes_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: LenLoansSearch_1.LenLoansSearch_Url, component: LenLoansSearch_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/reports/achstatus", component: ACHStatusReport_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: LenPortfolioReports_1.LenPortfolioReports_Url, component: LenPortfolioReports_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: PartialOwnershipPortfolio_1.PartialOwnershipPortfolio_Url, component: PartialOwnershipPortfolio_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: LoanStatusBreakdown_1.LoanStatusBreakdown_Url, component: LoanStatusBreakdown_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: LoanPortfolio_1.LoanPortfolio_Url, component: LoanPortfolio_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: UserSetting_LirsOption_1.UserSetting_LirsOption_Url, component: UserSetting_LirsOption_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: UserSetting_General_1.UserSetting_General_Url, component: UserSetting_General_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: UserSetting_PersonalInformation_1.UserSetting_PersonalInformation_Url, component: UserSetting_PersonalInformation_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: UserSetting_ChangePassword_1.UserSetting_ChangePassword_Url, component: UserSetting_ChangePassword_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: UserSetting_RecoverySetting_1.UserSetting_RecoverySetting_Url, component: UserSetting_RecoverySetting_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: UserSetting_PasswordDefault_1.UserSetting_PasswordDefault_Url, component: UserSetting_PasswordDefault_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: UserSetting_Account_1.UserSetting_Account_Url, component: UserSetting_Account_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: Index_1.Version_Url, component: Index_1.default, role: Enums_1.UserTypeEnum.ADMIN }),
            React.createElement(AuthRoute_1.default, { path: PaymentToLender_1.PaymentToLender_Url, component: PaymentToLender_2.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: '/lender/loan/:loanUid/payments', component: LenPayments_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: '/lender/loan/:loanUid/notes', component: LenPayments_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: '/lender/loan/:loanUid/attachments', component: LenPayments_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: '/lender/loan/:loanUid/charges', component: LenCharges_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(ErrorRoute_1.default, { path: '/error/404', component: _404_1.default }),
            React.createElement(ErrorRoute_1.default, { path: '/error/405', component: _500_1.default }),
            React.createElement(ErrorRoute_1.default, { exact: true, path: '*', component: _404_1.default }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/dashboard/new", component: Dashboard_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/layout/RtlLayout", component: RtlLayout_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/widgets", component: Widgets_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/apps/kanban-board", component: KanbanBoard_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/apps/kanban-board1", component: KanbanBoard1_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/apps/kanban-board2", component: KanbanBoard2_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/apps/kanban-board3", component: KanbanBoard3_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/apps/todo-list", component: TodoList_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/apps/tickets", component: Tickets_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { exact: true, path: "/apps/chats", component: Chats_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/accordions", component: Accordions_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/buttons", component: Buttons_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/badges", component: Badges_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/breadcrumbs", component: Breadcrumbs_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/dropdowns", component: Dropdowns_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/modals", component: Modals_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/progressbar", component: Progress_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/pagination", component: Paginations_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/tabs", component: TabsPage_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/typography", component: Typography_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/tooltips", component: Tooltips_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/basic-ui/popups", component: Popups_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/advanced-ui/dragula", component: Dragula_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/advanced-ui/clipboard", component: Clipboards_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/advanced-ui/context-menu", component: ContextMenus_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/advanced-ui/sliders", component: Sliders_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/advanced-ui/carousel", component: Carousel_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/advanced-ui/loaders", component: Loaders_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/advanced-ui/tree-view", component: TreeView_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/form-Elements/basic-elements", component: BasicElements_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/form-Elements/advanced-elements", component: AdvancedElements_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/form-Elements/validation", component: Validation_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/form-Elements/wizard", component: Wizard_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/tables/basic-table", component: BasicTable_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/tables/data-table", component: DataTables_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/tables/react-table", component: ReactTable_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/tables/sortable-table", component: SortableTable_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/maps/vector-map", component: VectorMap_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/maps/simple-map", component: SimpleMap_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/notifications", component: Notifications_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/icons/mdi", component: Mdi_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/icons/flag-icons", component: FlagIcons_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/icons/font-awesome", component: FontAwesome_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/icons/simple-line", component: SimpleLine_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/icons/themify", component: Themify_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/icons/typicons", component: TypIcons_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/text-editors", component: TextEditors_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/code-editor", component: CodeEditor_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/icons/themify", component: Themify_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/charts/chart-js", component: ChartJs_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/charts/c3-chart", component: C3Charts_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/charts/chartist", component: Chartist_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/charts/google-charts", component: GoogleCharts_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/charts/sparkline-charts", component: SparkLineCharts_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/charts/guage-chart", component: GuageChart_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/user-pages/register-1", component: Register_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/user-pages/register-2", component: Register2_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/user-pages/lockscreen", component: Lockscreen_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/general-pages/blank-page", component: BlankPage_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/general-pages/landing-page", component: LandingPage_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/general-pages/profile", component: Profile_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/general-pages/faq-1", component: Faq_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/general-pages/faq-2", component: Faq2_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/general-pages/news-grid", component: NewsGrid_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/general-pages/timeline", component: Timeline_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/general-pages/search-results", component: SearchResults_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/general-pages/portfolio", component: Portfolio_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/general-pages/user-listing", component: UserListing_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/ecommerce/invoice", component: Invoice_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/ecommerce/pricing", component: Pricing_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/ecommerce/product-catalogue", component: ProductCatalogue_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/ecommerce/project-list", component: ProjectList_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/ecommerce/orders", component: Orders_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/lender/loans/new", component: Loans_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/apps/email", component: Email_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/apps/calendar", component: Calendar_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(AuthRoute_1.default, { path: "/apps/gallery", component: Gallery_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(ErrorRoute_1.default, { path: '/error/404', component: _404_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(ErrorRoute_1.default, { path: '/error/500', component: _500_1.default, role: Enums_1.UserTypeEnum.LENDER }),
            React.createElement(ErrorRoute_1.default, { exact: true, path: '*', component: _404_1.default }),
            React.createElement(react_router_dom_1.Redirect, { to: Functions_1.Utils.homeUrl() }))));
});
//# sourceMappingURL=App.js.map