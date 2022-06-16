import {Component, createRef} from 'react';
import { Button, Alert, Spin, Tag } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Authentication, AuthenticationStatus } from '../../redux/auth/store';
import {DevelopState, DevelopStateError, DevelopStateReady, DevelopStatus} from '../../redux/develop/store';
import './style.css';

function authStateLabel(status: AuthenticationStatus) {
    switch (status) {
        case AuthenticationStatus.NONE:
            return 'none';
        case AuthenticationStatus.CHECKING:
            return 'checking';
        case AuthenticationStatus.AUTHENTICATED:
            return 'authenticated';
        case AuthenticationStatus.UNAUTHENTICATED:
            return 'unauthenticated';
        case AuthenticationStatus.ERROR:
            return 'error';
        default:
            return 'OTHER';
    }
}

export interface DevelopProps {
    authentication: Authentication;
    develop: DevelopState;
    title: string;
    // hostChannelId: string | null;
    // pluginChannelId: string | null;
    // developStatus: DevelopStatus;
    removeAuthentication: () => void;
    addAuthentication: (token: string) => void;
    start: (window: Window) => void;
}

interface DevelopComponentState { }

export default class Develop extends Component<DevelopProps, DevelopComponentState> {
    tokenRef: React.RefObject<HTMLInputElement>;

    constructor(props: DevelopProps) {
        super(props);

        this.tokenRef = createRef();
    }

    // React Lifecycle
    componentDidMount() {
        this.props.start(window);
    }

    // Events

    onLoginClick() {
        if (this.tokenRef.current === null) {
            return;
        }
        const token = this.tokenRef.current.value;
        if (token.length === 0) {
            return;
        }
        this.props.addAuthentication(token);
    }

    onLogoutClick() {
        this.props.removeAuthentication();
    }

    // DEV

    renderAuthForm() {
        return (
            <div className="Develop-auth-form">
                <div>
                    <b>Not Logged In!</b> Enter a Login Token below.
                </div>
                Token: <input ref={this.tokenRef} style={{ width: '30em' }} />
                <Button icon={<LoginOutlined />} htmlType="submit" onClick={this.onLoginClick.bind(this)}>
                    Login
                </Button>
            </div>
        );
    }

    renderAuthToolbar() {
        if (this.props.authentication.status !== AuthenticationStatus.AUTHENTICATED) {
            return;
        }
        return (
            <div className="Develop-auth-toolbar">
                Logged in as{' '}
                <b>
                    <span>{this.props.authentication.userAuthentication.realname}</span> (
                    <span>{this.props.authentication.userAuthentication.username}</span>
                </b>
                ){' '}
                <Button icon={<LogoutOutlined />} onClick={this.onLogoutClick.bind(this)}>
                    Logout
                </Button>
            </div>
        );
    }

    renderAuth() {
        switch (this.props.authentication.status) {
            case AuthenticationStatus.NONE:
                return <div className="Auth Auth-unauthenticated scrollable-flex-column">NONE DEV AUTH</div>;
            case AuthenticationStatus.CHECKING:
                return <Spin />;
            case AuthenticationStatus.AUTHENTICATED:
                return <div className="Auth Auth-authenticated scrollable-flex-column">{this.renderAuthToolbar()}</div>;
            case AuthenticationStatus.UNAUTHENTICATED:
                return <div className="Auth Auth-unauthenticated scrollable-flex-column">{this.renderAuthForm()}</div>;
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

    renderDevError(develop: DevelopStateError) {
        return <div>Dev Error: ${develop.message}</div>;
    }

    renderDevWrapper(develop: DevelopStateReady) {
        if (develop.channels === null) {
            return;
        }
        const params = {
            hostChannelId: develop.channels.hostChannelId,
            pluginChannelId: develop.channels.pluginChannelId
        };
        const paramsString = JSON.stringify(params);
        return  <div data-params={encodeURIComponent(paramsString)} data-plugin-host="true" className="Develop">
            {this.props.children}
        </div>;
    }

    renderDevReady(develop: DevelopStateReady) {
        return (
            <div className="Develop">
                <div className="Develop-area">
                    <Tag>Develop Mode Area</Tag>
                    {this.renderTitleToolbar()}
                    {this.renderAuth()}
                </div>
                {this.renderDevWrapper(develop)}
            </div>
        );
    }

    renderDevLoading() {
        const message = (
            <div className="Develop-area">
                <Spin /> Loading Dev Environment...
            </div>
        );
        return <Alert message={message} />;
    }

    renderDevNone() {
        return <Alert message="None" />;
    }

    renderTitleToolbar() {
        return (
            <div className="Develop-toolbar">
                Title: <span>{this.props.title}</span>
            </div>
        );
    }

    render() {
        const develop = this.props.develop;
        switch (develop.status) {
            case DevelopStatus.NONE:
                return this.renderDevNone();
            case DevelopStatus.LOADING:
                return this.renderDevLoading();
            case DevelopStatus.ERROR:
                return this.renderDevError(develop);
            case DevelopStatus.READY:
                return this.renderDevReady(develop);
        }
    }
}
