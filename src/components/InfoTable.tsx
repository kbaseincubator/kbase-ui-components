import React from 'react';
import styles from './InfoTable.module.css';

export type ValueColString = string;
export type ValueColRenderer = () => React.ReactNode;
export type ValueCol = ValueColString | ValueColRenderer;

export interface InfoTableRow {
    label: string;
    value: ValueCol;
}


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

    renderValue(value: ValueCol) {
        if (typeof value === 'string') {
            return value;
        }
        return value();
    }

    renderRows() {
        return this.props.table.map(({label, value}) => {
            return <tr className={styles.Row} key={label}>
                <th className={styles.LabelCol}>
                    {label}
                </th>
                <td className={styles.ValueCol}>
                    {this.renderValue(value)}
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
        return <table className={tableStyle}>
            {this.renderRows()}
        </table>
    }
}
