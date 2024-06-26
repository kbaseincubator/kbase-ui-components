import {Params} from "../integration/store";

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
    NONE = '@kbase-ui-components:developStatus/none',
    LOADING = '@kbase-ui-components:developStatus/loading',
    READY = '@kbase-ui-components:developStatus/ready',
    ERROR = '@kbase-ui-components:developStatus/error'
}

interface DevelopStateBase {
    status: DevelopStatus
}

export interface DevelopStateNone extends DevelopStateBase {
    status: DevelopStatus.NONE
}

export interface DevelopStateLoading extends DevelopStateBase {
    status: DevelopStatus.LOADING
}

// TODO: most ready state properties should be required
export interface DevelopStateReady extends DevelopStateBase {
    status: DevelopStatus.READY,
    title?: string,
    view?: string;
    params?: Params<string>;
    channels: {
        hostChannelId: string;
        pluginChannelId: string;
    } | null;
    auth?: DevelopAuthentication;
}

export interface DevelopStateError extends DevelopStateBase {
    status: DevelopStatus.ERROR,
    message: string
}

export type DevelopState =
    DevelopStateNone |
    DevelopStateLoading |
    DevelopStateReady |
    DevelopStateError;

export interface DevelopStoreState {
    develop: DevelopState
}

export function makeDevelopStore(): DevelopStoreState {
    return {
        develop: {
            status: DevelopStatus.NONE,
        }
    };
}
