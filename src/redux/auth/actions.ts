import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import * as Cookies from 'es-cookie';
import { AppError, BaseStoreState } from '../store';
import AuthClient from '@kbase/ui-lib/lib/lib/comm/coreServices/Auth';

export enum AuthActionType {
    AUTH_CHECK = '@kbase-ui-components:auth check',
    AUTH_CHECK_START = '@kbase-ui-components:auth check start',
    AUTH_CHECK_ERROR = '@kbase-ui-components:auth check error',
    AUTH_AUTHENTICATED = '@kbase-ui-components:auth authenticated',
    AUTH_UNAUTHENTICATED = '@kbase-ui-components:auth unauthenticated',
    AUTH_REMOVE_AUTHENTICATION = '@kbase-ui-components:auth remove authentication',
    AUTH_ADD_AUTHENTICATION = '@kbase-ui-components:auth add authentication',
    AUTH_ADD_AUTHENTICATION_ERROR = '@kbase-ui-components:auth add authentication error'
}

// Action Definitions

export interface AuthCheck extends Action {
    type: AuthActionType.AUTH_CHECK;
}

export interface AuthCheckStart extends Action {
    type: AuthActionType.AUTH_CHECK_START;
}

export interface AuthCheckError extends Action {
    type: AuthActionType.AUTH_CHECK_ERROR;
    error: AppError;
}

export interface AuthAuthenticated extends Action {
    type: AuthActionType.AUTH_AUTHENTICATED;
    token: string;
    username: string;
    realname: string;
    roles: Array<string>;
}

export interface AuthUnauthenticated extends Action {
    type: AuthActionType.AUTH_UNAUTHENTICATED;
}

export interface AuthRemoveAuthentication extends Action {
    type: AuthActionType.AUTH_REMOVE_AUTHENTICATION;
}

export interface AuthAddAuthentication extends Action {
    type: AuthActionType.AUTH_ADD_AUTHENTICATION;
    token: string;
}

// Action Creators

export function authCheckStart(): AuthCheckStart {
    return {
        type: AuthActionType.AUTH_CHECK_START
    };
}

export function authCheckError(error: AppError): AuthCheckError {
    return {
        type: AuthActionType.AUTH_CHECK_ERROR,
        error
    };
}

export function authAuthenticated(
    token: string,
    username: string,
    realname: string,
    roles: Array<string>
): AuthAuthenticated {
    return {
        type: AuthActionType.AUTH_AUTHENTICATED,
        token,
        username,
        realname,
        roles
    };
}

export function authUnauthenticated(): AuthUnauthenticated {
    return {
        type: AuthActionType.AUTH_UNAUTHENTICATED
    };
}

// Action Thunks

export function checkAuth() {
    return async (dispatch: ThunkDispatch<BaseStoreState, void, Action>, getState: () => BaseStoreState) => {
        dispatch(authCheckStart());

        const {
            app: {
                config: {
                    services: {
                        Auth: { url }
                    }
                }
            }
        } = getState();

        const token = Cookies.get('kbase_session');
        if (!token) {
            dispatch(authUnauthenticated());
            return;
        }

        const auth = new AuthClient({ url: url });

        // Oh no, an orphan promise!

        try {
            const account = await auth.getMe(token);
            const roles = account.roles.map(({ id, desc }) => id);
            dispatch(authAuthenticated(token, account.user, account.display, roles));
        } catch (err) {
            dispatch(
                authCheckError({
                    code: 'error',
                    message: err.message
                })
            );
        }
    };
}

export function removeAuthentication() {
    return (dispatch: ThunkDispatch<BaseStoreState, void, Action>, getState: () => BaseStoreState) => {
        // remove cookie
        Cookies.remove('kbase_session');

        // remove auth in state
        dispatch(authUnauthenticated());
    };
}

export function addAuthentication(token: string) {
    return async (dispatch: ThunkDispatch<BaseStoreState, void, Action>, getState: () => BaseStoreState) => {
        const {
            app: {
                config: {
                    services: {
                        Auth: { url }
                    }
                }
            }
        } = getState();

        // TODO: get auth info
        const auth = new AuthClient({ url });

        try {
            const account = await auth.getMe(token);
            const roles = account.roles.map(({ id }) => id);
            // add cookie
            Cookies.set('kbase_session', token);
            dispatch(authAuthenticated(token, account.user, account.display, roles));
        } catch (err) {
            console.error('auth check error', err);
            dispatch(
                authCheckError({
                    code: 'error',
                    message: err.message
                })
            );
        }
    };
}
