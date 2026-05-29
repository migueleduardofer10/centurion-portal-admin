import * as Enums from '../../utilities/Enums';

const userTypes = Enums.EnumToArray(Enums.UserTypeEnum).map(item => {
    return { UserType: item.value, UserTypeDesc: item.label };
});

export interface User {
    Uid: string;
    Username: string;
    FirstName: string;
    LastName: string;
    MiddleName: string;
    Address1: string;
    Email: string;
    MobilePhone: string;
    HomePhone: string;
    IsActive: boolean;
    IsActiveStr?: string;
    UserType: number;
    UserTypeDesc?: string;
    LastAliveCheck?: Date;
    LoggedIP?: string;
}

export interface UserBody {
    Uid: string;
    Username: string;
    FirstName: string,
    LastName: string;
    MiddleName: string;
    Address1: string;
    Email: string;
    MobilePhone: string;
    HomePhone: string;
    UserType: number;
    UserTypeDesc?: string;
    IsActive: boolean;
    Password?: string;
    RePassword?: string;
    StrPermissions?: string;
    Photo: string;
    PassExpirEnable: boolean;
    PassExpirationTime: number;
    PassExpirationUnit: number;
    PassPreviousEnable: boolean;
    PassPreviousPsw: number;
    PassLockoutEnable: boolean;
    PassLockoutAttempts: number;
    PassLockoutMinutes: number;
    PassComLenEnable: boolean;
    PassComLenFrom: number;
    PassComLenTo: number;
    PassComLowerEnable: boolean;
    PassComDigitEnable: boolean;
    PassComSpecialEnable: boolean;
    PassOverride: boolean;

    IsActiveStr?: string;
    LastAliveCheck?: Date;
}

export interface Permission {
    bit: number;
    uid: string;
    text: string;
    expanded: boolean;
    checked: boolean;
    items: Permission[];
}

export interface ReportLogin {
    Chart: number;
    UserType: number;
    Status: number;
    ChkUserType: boolean;
    ChkStatus: boolean;
}

export interface AllLoginUser {
    Month: string;
    Year: string;
    DayName: string;
    Day: string;
    Hour: string;
    NroSuccess: number;
    NroFail: number;
}

export const newUserBody: UserBody = {
    Uid: '',
    Username: '',
    FirstName: '',
    LastName: '',
    MiddleName: '',
    Address1: '',
    Email: '',
    MobilePhone: '',
    HomePhone: '',
    UserType: -1,
    IsActive: true,
    Password: '',
    RePassword: '',
    Photo: '',
    PassExpirEnable: false,
    PassExpirationTime: 0,
    PassExpirationUnit: 0,
    PassPreviousEnable: false,
    PassPreviousPsw: 0,
    PassLockoutEnable: false,
    PassLockoutAttempts: 0,
    PassLockoutMinutes: 0,
    PassComLenEnable: false,
    PassComLenFrom: 0,
    PassComLenTo: 0,
    PassComLowerEnable: false,
    PassComDigitEnable: false,
    PassComSpecialEnable: false,
    PassOverride: false
};

export const newReportLogin: ReportLogin = {
    Chart: 0,
    UserType: 0,
    Status: 1,
    ChkStatus: false,
    ChkUserType: false
}

export const initialColumns: any[] = [
    { position: 1, checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 120, title: 'User #', columnName: 'Username' },
    { position: 2, checked: true, className: "text-left", alignExcel: "left", filter: 'text', width: 200, title: 'Last Name', columnName: 'LastName' },
    { position: 3, checked: true, className: "text-left", alignExcel: "left", filter: 'text', width: 200, title: 'First Name', columnName: 'FirstName' },
    { position: 4, checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 120, title: 'User Type', columnName: 'UserTypeDesc', enum: userTypes, columnDisplay: 'UserTypeDesc' },
    { position: 5, checked: true, className: "text-center", alignExcel: "center", filter: 'boolean', width: 80, title: 'Active', columnName: 'IsActiveStr' },
    { position: 6, checked: true, className: "text-left", alignExcel: "left", filter: 'text', width: 300, title: 'User Address', columnName: 'Address1' },
    { position: 7, checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 150, title: 'Home Phone', columnName: 'HomePhone' },
    { position: 8, checked: true, className: "text-center", alignExcel: "center", filter: 'date', width: 100, title: 'Last Alive', columnName: 'LastAliveCheck', format: "{0:d}" },
    { position: 9, checked: true, className: "text-center", alignExcel: "center", filter: 'text', width: 130, title: 'Last Logged IP', columnName: 'LoggedIP' },
];