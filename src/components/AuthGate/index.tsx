import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { BaseStoreState } from '../../redux/store';
import AuthGate from './view';
import { Authentication } from '../../redux/auth/store';

export interface OwnProps { }

interface StateProps {
    authentication: Authentication;
}

interface DispatchProps { }

function mapStateToProps(state: BaseStoreState, props: OwnProps): StateProps {
    const {
        authentication
    } = state;

    return {
        authentication
    };
}

function mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: OwnProps): DispatchProps {
    return {};
}

export default connect<StateProps, DispatchProps, OwnProps, BaseStoreState>(
    mapStateToProps,
    mapDispatchToProps
)(AuthGate);
