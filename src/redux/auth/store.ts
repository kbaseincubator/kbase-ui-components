// Auth state

export enum AuthenticationStatus {
    NONE = 'NONE',
    CHECKING = 'CHECKING',
    AUTHENTICATED = 'AUTHENTICATED',
    UNAUTHENTICATED = 'UNAUTHENTICATED',
    ERROR = 'ERROR'
}

export interface UserAuthentication {
    token: string;
    username: string;
    realname: string;
    roles: Array<string>;
}

interface AuthenticationBase {
    status: AuthenticationStatus;
}

export interface AuthenticationNone extends AuthenticationBase {
    status: AuthenticationStatus.NONE;
}

export interface AuthenticationChecking extends AuthenticationBase {
    status: AuthenticationStatus.CHECKING
}

export interface AuthenticationAuthenticated extends AuthenticationBase {
    status: AuthenticationStatus.AUTHENTICATED,
    userAuthentication: UserAuthentication
}

export interface AuthenticationUnauthenticated extends AuthenticationBase {
    status: AuthenticationStatus.UNAUTHENTICATED
}

export interface AuthenticationError extends AuthenticationBase {
    status: AuthenticationStatus.ERROR,
    message: string
}

export type Authentication =
    AuthenticationNone |
    AuthenticationChecking |
    AuthenticationAuthenticated |
    AuthenticationUnauthenticated |
    AuthenticationError;


export interface AuthStoreState {
    authentication: Authentication;
}

export function makeAuthStoreInitialState(): AuthStoreState {
    return {
        authentication: {
            status: AuthenticationStatus.NONE
        }
    };
}
