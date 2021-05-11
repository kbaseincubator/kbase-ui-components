import { AppStoreState, makeIntegrationStoreInitialState } from './integration/store';
import { AuthStoreState, makeAuthStoreInitialState } from './auth/store';
import { DevelopStoreState, makeDevelopStore } from './develop/store';
import { makeRootStoreInitialState, RootStoreState } from './root/store';
import { JSONObject } from '@kbase/ui-lib/lib/json';

export interface BaseStoreState extends RootStoreState, AppStoreState, AuthStoreState, DevelopStoreState { }

export function makeBaseStoreState(): BaseStoreState {
    const rootStore = makeRootStoreInitialState();
    const appStore = makeIntegrationStoreInitialState();
    const authStore = makeAuthStoreInitialState();
    const developStore = makeDevelopStore();
    return {
        ...rootStore,
        ...appStore,
        ...authStore,
        ...developStore
    };
}

export interface AppError {
    code: string;
    message: string;
    info?: JSONObject;
    generatedAt?: Date;
    trace?: Array<string>;
    errors?: Array<AppError>;
}
