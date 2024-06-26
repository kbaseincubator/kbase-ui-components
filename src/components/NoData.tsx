import {Component} from 'react';

const DEFAULT_MESSAGE = '∅';

export interface NoDataProps {
    message?: string;
}

export default class NoData extends Component<NoDataProps, {}> {
    renderMessage() {
        if (this.props.message) {
            return this.props.message;
        }
        return DEFAULT_MESSAGE;
    }
    render() {
        return <span style={{ color: 'gray' }}>{this.renderMessage()}</span>;
    }
}
