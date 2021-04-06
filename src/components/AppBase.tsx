/**
 * A base react component wraps the kbase-ui integration components.
 */
import * as React from 'react';
import './AppBase.css';
import '../style/common.css';
import Integration from './Integration';
import Root from './Root';

export interface AppProps { }

interface AppState {
    clicks: number;
}

function There() {
    console.log('THERE!');
    return <div>there</div>;
}

export default class AppBase extends React.Component<AppProps, AppState> {
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
                <There />
                <Integration>
                    <There />
                    <div className="AppBase"
                        data-k-b-testhook-component="AppBase">
                        {this.props.children}
                    </div>
                </Integration>
            </Root>
        );
    }
}
