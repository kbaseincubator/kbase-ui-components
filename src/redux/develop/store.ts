import { Params } from "../integration/store";

export enum DevelopAuthStatus {
    NONE = 'NONE',
    CHECKING = 'CHECKING',
    AUTHENTICATED = 'AUTHENTICATED',
    UNAUTHENTICATED = 'UNAUTHENTICATED',
    ERROR = 'ERROR'
}

export interface DevelopUserAuthentication {
    token: string;
    username: string;
    realname: string;
    roles: Array<string>;
}

interface DevelopAuthenticationBase {
    status: DevelopAuthStatus;
}

export interface DevelopAuthenticationNone extends DevelopAuthenticationBase {
    status: DevelopAuthStatus.NONE;
}

export interface DevelopAuthenticationChecking extends DevelopAuthenticationBase {
    status: DevelopAuthStatus.CHECKING
}

export interface DevelopAuthenticationAuthenticated extends DevelopAuthenticationBase {
    status: DevelopAuthStatus.AUTHENTICATED,
    authentication: DevelopUserAuthentication
}

export interface DevelopAuthenticationUnauthenticated extends DevelopAuthenticationBase {
    status: DevelopAuthStatus.UNAUTHENTICATED
}

export interface DevelopAuthenticationError extends DevelopAuthenticationBase {
    status: DevelopAuthStatus.ERROR,
    message: string
}

export type DevelopAuthentication =
    DevelopAuthenticationNone |
    DevelopAuthenticationChecking |
    DevelopAuthenticationAuthenticated |
    DevelopAuthenticationUnauthenticated |
    DevelopAuthenticationError;

export enum DevelopStatus {
    NONE = 'developStatus/none',
    LOADING = 'developStatus/loading',
    READY = 'developStatus/ready',
    ERROR = 'developStatus/error'
}

export interface DevelopStoreState {
    develop: {
        title: string;
        status: DevelopStatus;
        view: string;
        params: Params<string>;
        channels: {
            hostChannelId: string;
            pluginChannelId: string;
        } | null;
        auth: DevelopAuthentication;
    };
}

export function makeDevelopStore(): DevelopStoreState {
    return {
        develop: {
            title: 'SET TITLE HERE',
            status: DevelopStatus.NONE,
            view: '',
            params: {},
            channels: null,
            auth: {
                status: DevelopAuthStatus.NONE
            }
        }
    };
}
