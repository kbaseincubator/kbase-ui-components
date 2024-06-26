import { Action, Reducer } from 'redux';
import { AuthenticationStatus } from './store';
import { BaseStoreState } from '../store';
import { AuthCheckStart, AuthCheckError, AuthAuthenticated, AuthUnauthenticated, AuthActionType } from './actions';

export function authCheckStart(state: BaseStoreState, action: AuthCheckStart): BaseStoreState {
    return {
        ...state,
        authentication: {
            status: AuthenticationStatus.CHECKING,
        }
    };
}

export function authCheckError(state: BaseStoreState, action: AuthCheckError): BaseStoreState {
    return {
        ...state,
        authentication: {
            status: AuthenticationStatus.ERROR,
            message: action.error.message
        }
    };
}

export function authAuthenticated(state: BaseStoreState, action: AuthAuthenticated): BaseStoreState {
    return {
        ...state,
        authentication: {
            status: AuthenticationStatus.AUTHENTICATED,
            userAuthentication: {
                token: action.token,
                username: action.username,
                realname: action.realname,
                roles: action.roles
            }
        }
    };
}

export function authUnauthenticated(state: BaseStoreState, action: AuthUnauthenticated): BaseStoreState {
    return {
        ...state,
        authentication: {
            status: AuthenticationStatus.UNAUTHENTICATED,
        }
    };
}

const reducer: Reducer<BaseStoreState | undefined, Action> = (state: BaseStoreState | undefined, action: Action) => {
    if (!state) {
        return state;
    }

    // function reducer(state: BaseStoreState, action: Action): BaseStoreState | null {
    switch (action.type) {
        case AuthActionType.AUTH_CHECK_START:
            return authCheckStart(state, action as AuthCheckStart);
        case AuthActionType.AUTH_AUTHENTICATED:
            return authAuthenticated(state, action as AuthAuthenticated);
        case AuthActionType.AUTH_UNAUTHENTICATED:
            return authUnauthenticated(state, action as AuthUnauthenticated);
        case AuthActionType.AUTH_CHECK_ERROR:
            return authCheckError(state, action as AuthCheckError);
        default:
            return;
    }
};

export default reducer;
