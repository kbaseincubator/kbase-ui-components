import React from 'react';
import { Spin } from 'antd';
import './Loading.css';

export interface Props {
    message?: string;
}

interface State { }

export default class Loading extends React.Component<Props, State> {
    renderMessage() {
        if (!this.props.message) {
            return;
        }
        return <div>
            {this.props.message}
        </div>;
    }
    render() {
        return (
            <div className="Loading">
                <div className="-container">
                    <Spin size="large" />
                    {this.renderMessage()}
                </div>
            </div>
        );
    }
}
