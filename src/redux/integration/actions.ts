import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { WindowChannelInit } from "@kbase/ui-lib/lib/windowChannel";
import { WindowChannel } from '@kbase/ui-lib';

import { AppConfig, AppRuntime, Navigation } from './store';
import { AppError, BaseStoreState } from '../store';
import { getParamsFromDOM, isDevFrame } from '../../lib/IFrameIntegration';
import { authAuthenticated, authUnauthenticated } from '../auth/actions';

// Action types

export enum ActionType {
    APP_LOAD = '@kbase-ui-components/app/load',
    APP_LOAD_START = '@kbase-ui-components/app/load/start',
    APP_LOAD_SUCCESS = '@kbase-ui-components/app/load/success',
    APP_LOAD_ERROR = '@kbase-ui-components/app/load/error',
    APP_SEND_MESSAGE = '@kbase-ui-components/app/send/message',
    APP_SEND_TITLE = '@kbase-ui-components/app/send/title',
    APP_SET_TITLE = '@kbase-ui-components/app/set/title',
    APP_NAVIGATE = '@kbase-ui-components/app/navigate'
}

// Action Definitions

// export interface AppStart extends Action {
//     type: ActionFlag.APP_START,

// }

export interface AppLoadSuccess extends Action {
    type: ActionType.APP_LOAD_SUCCESS;
    config: AppConfig;
    runtime: AppRuntime;
}

export interface AppLoadError extends Action {
    type: ActionType.APP_LOAD_ERROR;
    error: AppError;
}

export interface AppSendTitle extends Action<ActionType.APP_SEND_TITLE> {
    type: ActionType.APP_SEND_TITLE;
    title: string;
}

export interface AppSetTitle extends Action<ActionType.APP_SET_TITLE> {
    type: ActionType.APP_SET_TITLE;
    title: string;
}

export interface AppNavigate extends Action<ActionType.APP_NAVIGATE> {
    type: ActionType.APP_NAVIGATE,
    navigation: Navigation;
}
// Action Creators

export function loadSuccess(config: AppConfig, runtime: AppRuntime): AppLoadSuccess {
    return {
        type: ActionType.APP_LOAD_SUCCESS,
        config,
        runtime
    };
}

export function loadError(error: AppError): AppLoadError {
    return {
        type: ActionType.APP_LOAD_ERROR,
        error
    };
}

export function sendTitle(title: string) {
    return async (dispatch: ThunkDispatch<BaseStoreState, void, Action>, getState: () => BaseStoreState) => {
        if (!channel) {
            console.warn('Trying to set title without a channel!');
            return;
        }

        dispatch(sendMessage('set-title', { title }));
        dispatch(setTitle(title));
    };
}

export function setTitle(title: string): AppSetTitle {
    return {
        type: ActionType.APP_SET_TITLE,
        title
    };
}

export function navigate(navigation: Navigation) {
    return {
        type: ActionType.APP_NAVIGATE,
        navigation
    };
}

let channel: WindowChannel;
let windowListener: any;

export function appStart() {
    return (dispatch: ThunkDispatch<BaseStoreState, void, Action>, getState: () => BaseStoreState) => {
        // check and see if we are in an iframe
        let iframeParams = getParamsFromDOM();
        if (!iframeParams) {
            console.warn('No iframe params');
            return;
        }

        // Here we establish our comm channel, based on postMessage.
        // If iframe params are detected, we are operating in an iframe which
        // also means inside kbase-ui. The iframe will have a data- attribute
        // containing the id of the channel already set up by the ui. We call
        // this the host channel.
        // Without the ui, most commonly in develop mode but also testing,
        // the host channel is set up by a "fake iframe" object, which simulates
        // the host environment.

        const hostChannelId = iframeParams.hostChannelId;
        const channelId = iframeParams.pluginChannelId;
        const chan = new WindowChannelInit({ id: channelId });
        channel = chan.makeChannel(hostChannelId);
        const devMode = isDevFrame();

        // A plugin will wait until receiving a 'start' message. The
        // start message contains enough data for most apps to start
        // going, including core service configuration and communication
        // settings.
        channel.on('start',
            (params: any) => {
                try {
                    const services = params.config.services;
                    const dynamicServices = params.config.dynamicServices;
                    dispatch(loadSuccess({
                        baseUrl: '',
                        services: {
                            Groups: {
                                url: services.Groups.url
                            },
                            UserProfile: {
                                url: services.UserProfile.url
                            },
                            Workspace: {
                                url: services.Workspace.url
                            },
                            SampleService: {
                                url: services.SampleService.url
                            },
                            SearchAPI2: {
                                url: services.SearchAPI2.url
                            },
                            SearchAPI2Legacy: {
                                url: services.SearchAPI2Legacy.url
                            },
                            ServiceWizard: {
                                url: services.ServiceWizard.url
                            },
                            Auth: {
                                url: services.Auth.url
                            },
                            NarrativeMethodStore: {
                                url: services.NarrativeMethodStore.url
                            },
                            Catalog: {
                                url: services.Catalog.url
                            },
                            NarrativeJobService: {
                                url: services.NarrativeJobService.url
                            },
                            RelationEngine: {
                                url: services.RelationEngine.url
                            }
                        },
                        dynamicServices: {
                            JobBrowserBFF: {
                                version: dynamicServices.JobBrowserBFF.version
                            },
                            OntologyAPI: {
                                version: dynamicServices.OntologyAPI.version
                            },
                            TaxonomyAPI: {
                                version: dynamicServices.TaxonomyAPI.version
                            }
                        },
                        defaultPath: '/'
                    },
                        {
                            channelId: channel.getId(),
                            hostChannelId,
                            devMode,
                            title: '',
                            navigation: {
                                view: params.view,
                                params: params.params || {}
                            }
                        }));

                    if (params.authentication) {
                        const { token, username, realname, roles } = params.authentication;
                        dispatch(authAuthenticated(token, username, realname, roles));
                    } else {
                        dispatch(authUnauthenticated());
                    }
                } catch (ex) {
                    channel.send('start-error', {
                        message: ex.message
                    });
                }

                channel.send('started', {});
            },
            (err: Error) => {
                console.error('Error starting...', err);
            }
        );

        channel.on(
            'navigate',
            ({ to, params }) => {
                dispatch(navigate({ view: to, params: params }));
            },
            (err) => {
                console.error('Error processing "navigate" message');
            }
        );

        channel.start();

        // Here we propagate the click event to the parent window (or at least the host channel).
        windowListener = () => {
            channel.send('clicked', {});
        };
        window.document.body.addEventListener('click', windowListener);

        // The 'ready' message is sent by the plugin (via the integration component and
        // associated actions like this one) to the ui to indicate that the initial code is loaded
        // and it is ready for further instructions (which in all likelihood is the 'start'
        // message handled above.)
        channel.send('ready', {
            channelId: channel.getId(),
            greeting: 'hello'
        });

        // dispatch(appStartSuccess(channelId));

        // channel.on('set-title', ({ title }) => {
        //     dispatch(appSetTitle(title));
        // });
    };
}

export interface SendMessage {
    type: ActionType.APP_SEND_MESSAGE;
    messageName: string;
    payload: object;
}

// export function sendMessage(id: string, payload: object) {
//     return {
//         type: ActionType.APP_SEND_MESSAGE,
//         id,
//         payload
//     };
// }

export function sendMessage(messageName: string, payload: object) {
    return (dispatch: ThunkDispatch<BaseStoreState, void, Action>, getState: () => BaseStoreState) => {
        channel.send(messageName, payload);
    };
}
