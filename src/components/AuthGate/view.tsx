import React from 'react';

import './style.css';
import { Alert, Spin } from 'antd';
import { Authentication, AuthenticationError, AuthenticationStatus } from '../../redux/auth/store';

// HMM: for some reason need to use PropsWithChildren. Otherwise,
// TS complains about not having the children prop
export type AuthGateProps = React.PropsWithChildren<{
    required: boolean;
    authentication: Authentication;
}>;

interface AuthGateState { }

export default class AuthGate extends React.Component<AuthGateProps, AuthGateState> {
    required: boolean;

    constructor(props: AuthGateProps) {
        super(props);
        this.required = props.required;
    }

    renderNone() {
        return <div>NONE</div>
    }

    renderChecking() {
        return <Spin />
    }

    renderUnauthenticated() {
        if (this.props.required) {
            const message = 'Not authenticated - authentication required';
            return <Alert type="error" message={message} style={{ width: '70%', margin: 'auto' }} />;
        }
        return this.renderKids();
    }

    renderKids() {
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }

    renderError(authentication: AuthenticationError) {
        return <Alert type="error" message={authentication.message} style={{ width: '70%', margin: 'auto' }} />;
    }

    render() {
        switch (this.props.authentication.status) {
            case AuthenticationStatus.NONE:
                return this.renderNone();
            case AuthenticationStatus.CHECKING:
                return this.renderChecking();
            case AuthenticationStatus.ERROR:
                return this.renderError(this.props.authentication);
            case AuthenticationStatus.UNAUTHENTICATED:
                return this.renderUnauthenticated();
            case AuthenticationStatus.AUTHENTICATED:
                return this.renderKids();
        }
    }
}
