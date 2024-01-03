import { notification } from "../../types/notification";
import { User } from "../../types/user";

export interface IUser{
    email?: string;
    token?: string;
}

export interface IContext extends IUser {
    signin: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loadingUserFromLocalStorage: boolean;
    userInfo?: User;
    authorities?: string[];
    notificationNew?: notification[] | null;
}

export interface IAuthProvider {
    children: JSX.Element
}