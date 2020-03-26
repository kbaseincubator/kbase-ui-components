import React from 'react';

import './style.css';
import { Alert } from 'antd';
import { AuthState } from '../../redux/auth/store';

export interface AuthGatePropsx {
    required: boolean;
    token: string | null;
    authState: AuthState;
    isAuthorized: boolean;
}

// HMM: for some reason need to use PropsWithChildren. Otherwise,
// TS complains about not having the children prop
export type AuthGateProps = React.PropsWithChildren<{
    required: boolean;
    token: string | null;
    authState: AuthState;
    isAuthorized: boolean;
}>;

interface AuthGateState { }

export default class AuthGate extends React.Component<AuthGateProps, AuthGateState> {
    required: boolean;

    constructor(props: AuthGateProps) {
        super(props);
        this.required = props.required;
    }

    renderUnauthorized() {
        const message = 'Not authorized - authentication required';
        return <Alert type="error" message={message} style={{ width: '70%', margin: 'auto' }} />;
    }

    render() {
        if (!this.props.isAuthorized) {
            return this.renderUnauthorized();
        }
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}
