import React from 'react';
import styles from './InfoTable.styles';
import {Tooltip} from "antd";

export interface InfoTableRowBase {
    label: string;
    labelTooltip?: string | (() => React.ReactNode)
}

export interface InfoTableStringRow extends InfoTableRowBase {
    value: string;
}

export interface InfoTableRenderRow extends InfoTableRowBase {
    render: () => React.ReactNode
}

export type InfoTableRow = InfoTableStringRow | InfoTableRenderRow;


export interface InfoTableProps {
    table: Array<InfoTableRow>;
    bordered?: boolean;
}

interface InfoTableState {

}

export default class InfoTable extends React.Component<InfoTableProps, InfoTableState> {
    constructor(props: InfoTableProps) {
        super(props);
    }

    renderContent(row: InfoTableRow) {
        if ('value' in row) {
            return row.value;
        } else if ('render' in row) {
            return row.render();
        }
    }

    renderLabel(row: InfoTableRow) {
        if (row.labelTooltip) {
            if (typeof row.labelTooltip === 'string') {
                return <Tooltip title={row.labelTooltip}>{row.label}</Tooltip>
            } else {
                return <Tooltip title={row.labelTooltip()}>{row.label}</Tooltip>
            }
        } else {
            return row.label;
        }
    }

    renderRows() {
        return this.props.table.map((row) => {
            return <tr style={styles.Row} key={row.label}>
                <th style={styles.LabelCol}>
                    {this.renderLabel(row)}
                </th>
                <td style={styles.ValueCol}>
                    {this.renderContent(row)}
                </td>
            </tr>;
        });
    }

    render() {
        const tableStyle = (() => {
            if (this.props.bordered) {
                return styles.BorderedTable;
            } else {
                return styles.NormalTable;
            }
        })();
        return <table style={tableStyle}>
            {this.renderRows()}
        </table>
    }
}
