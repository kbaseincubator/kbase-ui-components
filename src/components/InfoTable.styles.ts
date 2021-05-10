import React from 'react';

export interface InfoTableStyles {
    NormalTable: React.CSSProperties,
    BorderedTable: React.CSSProperties,
    Row: React.CSSProperties,
    LabelCol: React.CSSProperties,
    ValueCol: React.CSSProperties;
}

const styles: InfoTableStyles = {
    NormalTable: {},
    BorderedTable: {
        border: '1px solid rgba(200, 200, 200, 0.2)'
    },
    Row: {},
    LabelCol: {
        color: 'rgba(175, 175, 175, 1)',
        padding: '4px',
        verticalAlign: 'top',
        textAlign: 'left'
    },
    ValueCol: {
        padding: '4px'
    }
};

export default styles;
