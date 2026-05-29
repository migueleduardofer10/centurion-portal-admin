export interface AuthBody {
    Username: string;
    Password: string;
}

export const newAuthBody: AuthBody = {
    Username: '',
    Password: ''
};