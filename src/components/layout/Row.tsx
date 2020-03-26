import React from 'react';
import { Testhook } from '../common';



export interface RowProps {
    fullheight?: boolean;
    scrollable?: boolean;
    testhook?: Testhook;
    scrolling?: boolean;
}

interface RowState {

}

export default class Row extends React.Component<RowProps, RowState> {

    render() {
        const style: React.CSSProperties = {
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'row'
        };
        if (this.props.fullheight) {
            style.flex = '1 1 0px';
        }
        if (this.props.scrollable !== false) {
            style.minHeight = 0;
            style.minWidth = 0;
        }
        if (this.props.scrolling) {
            style.overflowX = 'auto';
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