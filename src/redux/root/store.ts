export enum RootState {
    NONE = 0,
    HOSTED,
    DEVELOP,
    ERROR
}

export interface RootStoreState {
    root: {
        hostChannelId: string | null;
        channelId: string | null;
        state: RootState;
    };
}

export function makeRootStoreInitialState(): RootStoreState {
    return {
        root: {
            hostChannelId: null,
            channelId: null,
            state: RootState.NONE
        }
    };
}
