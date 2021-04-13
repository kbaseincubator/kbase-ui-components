import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { BaseStoreState } from '../../redux/store';
import Develop from './view';
import { Authentication } from '../../redux/auth/store';
import { start } from '../../redux/develop/actions';
import {DevelopState, DevelopStatus} from '../../redux/develop/store';
import { addAuthentication, removeAuthentication } from '../../redux/auth/actions';

export interface OwnProps { }

interface StateProps {
    develop: DevelopState
    title: string;
    // hostChannelId: string | null;
    // pluginChannelId: string | null;
    authentication: Authentication;
    // developStatus: DevelopStatus;
}

interface DispatchProps {
    start: (window: Window) => void;
    addAuthentication: (token: string) => void;
    removeAuthentication: () => void;
}

export function mapStateToProps(state: BaseStoreState, props: OwnProps): StateProps {
    const {
        app: {
            runtime: {
                title
            }
        },
        develop,
        // develop: { title, status: developStatus, channels },
        authentication
    } = state;

    return {
        develop,
        title,
        // hostChannelId: channels?.hostChannelId || null,
        // pluginChannelId: channels?.pluginChannelId || null,
        authentication
        // developStatus
    };
}

export function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        start: (window: Window) => {
            dispatch(start(window) as any);
        },
        addAuthentication: (token: string) => {
            dispatch(addAuthentication(token) as any);
        },
        removeAuthentication: () => {
            dispatch(removeAuthentication() as any);
        }
    };
}

export default connect<StateProps, DispatchProps, OwnProps, BaseStoreState>(
    mapStateToProps,
    mapDispatchToProps
)(Develop);
