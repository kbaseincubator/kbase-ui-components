import * as React from 'react';
import Button from 'antd/lib/button';
import { Authentication, AuthenticationStatus } from '../../redux/auth/store';
import { SaveOutlined, LogoutOutlined } from '@ant-design/icons';
import './style.css';

export interface AuthIntegrationProps {
    authentication: Authentication;
    hosted: boolean;
    checkAuth: () => void;
    onRemoveAuthentication: () => void;
    onAddAuthentication: (token: string) => void;
}

export interface AuthIntegrationState { }

export default class Auth extends React.Component<AuthIntegrationProps, AuthIntegrationState> {
    tokenRef: React.RefObject<HTMLInputElement>;

    constructor(props: AuthIntegrationProps) {
        super(props);
        this.tokenRef = React.createRef();
    }

    componentDidMount() {
        this.props.checkAuth();
    }

    onLogoutClick() {
        this.props.onRemoveAuthentication();
    }

    onLoginClick() {
        if (this.tokenRef.current === null) {
            return;
        }
        const token = this.tokenRef.current.value;
        if (token.length === 0) {
            return;
        }
        this.props.onAddAuthentication(token);
    }

    buildAuthForm() {
        return (
            <div className="Auth-form">
                Token: <input ref={this.tokenRef} style={{ width: '30em' }} />
                <Button icon={<SaveOutlined />} htmlType="submit" onClick={this.onLoginClick.bind(this)}>
                    Assign Token
                </Button>
            </div>
        );
    }

    buildAuthToolbar() {
        if (this.props.authentication.status !== AuthenticationStatus.AUTHENTICATED) {
            return;
        }
        return (
            <div className="Auth-toolbar">
                Logged in as{' '}
                <b>
                    <span>{this.props.authentication.userAuthentication.realname}</span> (
                    <span>{this.props.authentication.userAuthentication.username}</span>
                </b>
                ) <Button icon={<LogoutOutlined />} onClick={this.onLogoutClick.bind(this)} />
            </div>
        );
    }

    buildAuthDev() {
        switch (this.props.authentication.status) {
            case AuthenticationStatus.NONE:
            case AuthenticationStatus.CHECKING:
                return <div />;
            case AuthenticationStatus.AUTHENTICATED:
                return (
                    <div className="Auth Auth-authenticated scrollable-flex-column">
                        {this.buildAuthToolbar()}
                        {this.props.children}
                    </div>
                );
            case AuthenticationStatus.UNAUTHENTICATED:
                return (
                    <div className="Auth Auth-unauthenticated scrollable-flex-column">
                        <p>Not authenticated! Enter a user token below</p>
                        {this.buildAuthForm()}
                    </div>
                );
            case AuthenticationStatus.ERROR:
                return (
                    <div className="Auth Auth-unauthenticated scrollable-flex-column">
                        <p>Error</p>
                        {this.props.authentication.message}
                    </div>
                );
            default:
                return <div />;
        }
    }

    buildAuthProd() {
        switch (this.props.authentication.status) {
            case AuthenticationStatus.NONE:
            case AuthenticationStatus.CHECKING:
                return <div />;
            case AuthenticationStatus.AUTHENTICATED:
                return <div className="Auth Auth-authenticated scrollable-flex-column">{this.props.children}</div>;
            case AuthenticationStatus.UNAUTHENTICATED:
                return (
                    <div className="Auth Auth-unauthenticated scrollable-flex-column">
                        <p>Not authenticated!</p>
                    </div>
                );
            case AuthenticationStatus.ERROR:
                return (
                    <div className="Auth Auth-error scrollable-flex-column">
                        <p>Error: ??</p>
                    </div>
                );
            default:
                return <div />;
        }
    }

    render() {
        return (
            <div className="Auth scrollable-flex-column">
                {this.props.hosted ? this.buildAuthProd() : this.buildAuthDev()}
            </div>
        );
    }
}
