import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { Authentication } from '../../redux/auth/store';
import { BaseStoreState } from '../../redux/store';
import { checkAuth, removeAuthentication, addAuthentication } from '../../redux/auth/actions';

import AuthComponent from './view';
export interface OwnProps {
    hosted: boolean;
}

interface StateProps {
    authentication: Authentication;
}

interface DispatchProps {
    checkAuth: () => void;
    onRemoveAuthentication: () => void;
    onAddAuthentication: (token: string) => void;
}

function mapStateToProps(state: BaseStoreState, props: OwnProps): StateProps {
    const { authentication } = state;
    return {
        authentication
    };
}

export function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        checkAuth: () => {
            dispatch(checkAuth() as any);
        },
        onRemoveAuthentication: () => {
            dispatch(removeAuthentication() as any);
        },
        onAddAuthentication: (token: string) => {
            dispatch(addAuthentication(token) as any);
        }
    };
}

export default connect<StateProps, DispatchProps, OwnProps, BaseStoreState>(
    mapStateToProps,
    mapDispatchToProps
)(AuthComponent);
