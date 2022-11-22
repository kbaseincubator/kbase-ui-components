/**
 * A base react component wraps the kbase-ui integration components.
 */
import { Component, PropsWithChildren } from 'react';
import '../style/common.css';
import './AppBase.css';
import Integration from './Integration';
import Root from './Root';

export interface AppProps extends PropsWithChildren { }

interface AppState {
    clicks: number;
}

export default class AppBase extends Component<AppProps, AppState> {
    hosted: boolean;
    constructor(props: AppProps) {
        super(props);
        this.hosted = window.frameElement ? true : false;
        this.state = {
            clicks: 0
        };
    }

    clickMe() {
        this.setState({ clicks: this.state.clicks + 1 });
    }
    render() {
        return (
            <Root>
                <Integration>
                    <div className="AppBase"
                        data-k-b-testhook-component="AppBase">
                        {this.props.children}
                    </div>
                </Integration>
            </Root>
        );
    }
}
