import { Action } from 'redux';
import { WindowChannel } from '@kbase/ui-lib';
import { BaseStoreState } from '../store';
import { ThunkDispatch } from 'redux-thunk';
import { AppConfig, Params } from '../integration/store';
import { Auth, AuthenticationStatus } from '@kbase/ui-lib';
import { WindowChannelInit } from "@kbase/ui-lib/lib/lib/windowChannel";
import { v4 as uuidv4 } from 'uuid';

export enum DevelopActionType {
    DEVELOP_SET_TITLE = '@kbase-ui-components:develop_set_title',
    DEVELOP_START = '@kbase-ui-components:develop_start',
    DEVELOP_LOAD_SUCCESS = '@kbase-ui-components:develop_load_success',
    DEVELOP_SET_VIEW = '@kbase-ui-components:develop_set_view',
    DEVELOP_SET_PARAMS = '@kbase-ui-components:develop_set_params'
}

// Action Types

export interface DevelopSetTitle extends Action<DevelopActionType.DEVELOP_SET_TITLE> {
    type: DevelopActionType.DEVELOP_SET_TITLE;
    title: string;
}

export interface DevelopStart extends Action<DevelopActionType.DEVELOP_START> {
    type: DevelopActionType.DEVELOP_START;
}

export interface DevelopLoadSuccess extends Action<DevelopActionType.DEVELOP_LOAD_SUCCESS> {
    type: DevelopActionType.DEVELOP_LOAD_SUCCESS;
    hostChannelId: string;
    pluginChannelId: string;
}

export interface DevelopSetView extends Action<DevelopActionType.DEVELOP_SET_VIEW> {
    type: DevelopActionType.DEVELOP_SET_VIEW,
    view: string;
}

export interface DevelopSetParams extends Action<DevelopActionType.DEVELOP_SET_PARAMS> {
    type: DevelopActionType.DEVELOP_SET_PARAMS,
    // TODO: can we make params generic?
    params: Params<string>;
}

// Action generators

export function setTitle(title: string): DevelopSetTitle {
    return {
        type: DevelopActionType.DEVELOP_SET_TITLE,
        title
    };
}

export function loadSuccess(hostChannelId: string, pluginChannelId: string): DevelopLoadSuccess {
    return {
        type: DevelopActionType.DEVELOP_LOAD_SUCCESS,
        hostChannelId,
        pluginChannelId
    };
}

export function setView(view: string): DevelopSetView {
    return {
        type: DevelopActionType.DEVELOP_SET_VIEW,
        view
    };
}

export function setParams(params: Params<string>): DevelopSetParams {
    return {
        type: DevelopActionType.DEVELOP_SET_PARAMS,
        params
    };
}

let channel: WindowChannel;

// dev config uses current host
const devOrigin = document.location.origin;

const devConfig: AppConfig = {
    baseUrl: devOrigin,
    defaultPath: '',
    services: {
        Groups: {
            url: `${devOrigin}/services/groups`
        },
        UserProfile: {
            url: `${devOrigin}/services/user_profile/rpc`
        },
        Workspace: {
            url: `${devOrigin}/services/ws`
        },
        SearchAPI2: {
            url: `${devOrigin}/services/searchapi2/rpc`
        },
        SearchAPI2Legacy: {
            url: `${devOrigin}/services/searchapi2/legacy`
        },
        ServiceWizard: {
            url: `${devOrigin}/services/service_wizard`
        },
        Auth: {
            url: `${devOrigin}/services/auth`
        },
        NarrativeMethodStore: {
            url: `${devOrigin}/services/narrative_method_store/rpc`
        },
        Catalog: {
            url: `${devOrigin}/services/catalog/rpc`
        },
        NarrativeJobService: {
            url: `${devOrigin}/services/njs_wrapper`
        },
        RelationEngine: {
            url: `${devOrigin}/services/relation_engine_api`
        }
    },
    dynamicServices: {
        JobBrowserBFF: {
            version: 'dev'
        },
        SampleService: {
            version: 'dev'
        },
        OntologyAPI: {
            version: 'dev'
        },
        TaxonomyAPI: {
            version: 'dev'
        }
    }
};

function setupAndStartChannel(dispatch: ThunkDispatch<BaseStoreState, void, Action>): WindowChannel {
    // The following simulates what a host environment would do.

    // Create a host channel.
    const chan = new WindowChannelInit()
    channel = chan.makeChannel(uuidv4())

    channel.on('ready', async (params) => {
        channel.setPartner(params.channelId);

        // We get the initial auth info for this kbase session.
        const auth = new Auth(devConfig.services.Auth.url);
        const authInfo = await auth.checkAuth();
        console.log('HMM', devConfig, authInfo);

        if (authInfo.status === AuthenticationStatus.AUTHENTICATED) {
            const {token, username, realname, roles} = authInfo.userAuthentication;
            channel.send('start', {
                authentication: {
                    token, username, realname, roles
                },
                config: devConfig,
                // TODO: refactor this to reflect the actual view and params in the dev tool.
                view: '',
                params: {
                }
            });
        } else {
            console.warn('[setupAndStartChannel] READY, sending "start"', devConfig);
            channel.send('start', {
                authentication: null,
                config: devConfig
            });
        }
    });

    channel.on('get-auth-status', async () => {
        const auth = new Auth(devConfig.services.Auth.url);
        const authInfo = await auth.checkAuth();
        if (authInfo.status === AuthenticationStatus.AUTHENTICATED) {
            const {token, username, realname, roles} = authInfo.userAuthentication;
            channel.send('auth-status', {
                token, username, realname, roles
            });
        } else {
            channel.send('auth-status', {
                token: null,
                username: '',
                realname: '',
                roles: []
            });
        }
    });

    channel.on('get-config', () => {
        channel.send('config', {
            value: devConfig
        });
    });

    channel.on('add-button', ({ button }) => {
        console.warn('add button not yet supported');
    });

    channel.on('open-window', ({ url }) => {
        window.location.href = url;
    });

    // this.channel.on('send-instrumentation', (instrumentation) => {
    // });

    channel.on('ui-navigate', (to) => {
        console.warn('ui-navigate not yet supported');
    });

    channel.on('post-form', (config) => {
        console.warn('form-post not yet supported');
        // this.formPost(config);
    });

    channel.on('set-title', (config) => {
        dispatch(setTitle(config.title));
    });

    channel.start();

    return channel;
}

export function start(window: Window) {
    return async (dispatch: ThunkDispatch<BaseStoreState, void, Action>, getState: () => BaseStoreState) => {
        console.log('[start] develop')
        dispatch({
            type: DevelopActionType.DEVELOP_START
        } as DevelopStart);

        // create channel
        const channel = setupAndStartChannel(dispatch);
        console.log('[start] develop 2')

        // set channel id via action
        dispatch(loadSuccess(channel.getId(), channel.getPartnerId()));

        // set up channel handlers, etc.
    };
}
