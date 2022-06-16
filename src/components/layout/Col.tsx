import {Component} from 'react';
import { Testhook } from '../common';

export interface ColProps {
    scrollable?: boolean;
    testhook?: Testhook;
    scrolling?: boolean;
}

interface ColState {

}

export default class Col extends Component<ColProps, ColState> {
    render() {
        const style: React.CSSProperties = {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column'
        };

        if (this.props.scrollable !== false) {
            style.minHeight = 0;
            style.minWidth = 0;
        }
        if (this.props.scrolling) {
            style.overflowY = 'auto';
        }
        let attributes: { [x: string]: any; } = {};
        if (this.props.testhook) {
            const { type, id } = this.props.testhook;
            attributes[`data-k-b-testhook=${type}`] = id;
        }
        return (
            <div
                {...attributes}
                style={style}>
                {this.props.children}
            </div>
        );
    }
}