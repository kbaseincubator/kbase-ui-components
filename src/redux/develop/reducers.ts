import {Action, Reducer} from 'redux';
import {DevelopStatus} from './store';
import {DevelopActionType, DevelopLoadSuccess, DevelopSetParams, DevelopSetTitle, DevelopSetView} from './actions';
import {BaseStoreState} from '../store';

function setTitle(state: BaseStoreState, action: DevelopSetTitle): BaseStoreState {
    const {
        develop
    } = state;
    if (develop.status !== DevelopStatus.READY) {
        return state;
    }
    return {
        ...state,
        develop: {
            ...develop,
            title: action.title
        }
    };
}

function loadSuccess(state: BaseStoreState, action: DevelopLoadSuccess): BaseStoreState {
    return {
        ...state,
        develop: {
            // ...state.develop,
            status: DevelopStatus.READY,
            channels: {
                hostChannelId: action.hostChannelId,
                pluginChannelId: action.pluginChannelId
            }
        }
    };
}

function setView(state: BaseStoreState, action: DevelopSetView): BaseStoreState {
    const {
        develop
    } = state;
    if (develop.status !== DevelopStatus.READY) {
        return state;
    }
    return {
        ...state,
        app: {
            ...state.app,
            runtime: {
                ...state.app.runtime,
                navigation: {
                    ...state.app.runtime.navigation,
                    view: action.view
                }
            }
        },
        develop: {
            ...develop,
            view: action.view
        }
    }
}

function setParams(state: BaseStoreState, action: DevelopSetParams): BaseStoreState {
     const {
        develop
    } = state;
    if (develop.status !== DevelopStatus.READY) {
        return state;
    }
    return {
        ...state,
        app: {
            ...state.app,
            runtime: {
                ...state.app.runtime,
                navigation: {
                    ...state.app.runtime.navigation,
                    params: action.params
                }
            }
        },
        develop: {
            ...develop,
            params: action.params
        }
    }
}

const reducer: Reducer<BaseStoreState | undefined, Action> = (state: BaseStoreState | undefined, action: Action) => {
    if (!state) {
        return state;
    }

    switch (action.type) {
        case DevelopActionType.DEVELOP_SET_TITLE:
            return setTitle(state, action as DevelopSetTitle);
        case DevelopActionType.DEVELOP_LOAD_SUCCESS:
            return loadSuccess(state, action as DevelopLoadSuccess);
        case DevelopActionType.DEVELOP_SET_VIEW:
            return setView(state, action as DevelopSetView);
        case DevelopActionType.DEVELOP_SET_PARAMS:
            return setParams(state, action as DevelopSetParams);
        default:
            return;
    }
};

export default reducer;
