import React from 'react';

export interface SectionStyles {
    Section: React.CSSProperties,
    Header: React.CSSProperties,
    Title: React.CSSProperties,
    Toolbar: React.CSSProperties,
    Body: React.CSSProperties
}

const styles: SectionStyles = {
    Section: {
        "flex": "1 1 0px",
        "display": "flex",
        "flexDirection": "column",
        "minHeight": "0"
    },
    Header: {
        "flex": "0 0 auto",
        "display": "flex",
        "flexDirection": "row",
        "marginBottom": "10px",
        "borderBottom": "2px solid rgba(76, 137, 38, 0.2)"
    },
    Title: {
        "textTransform": "uppercase",
        "flex": "0 0 auto",
        "marginTop": "0",
        "overflow": "visible",
        "padding": "2px 6px 2px 0",
        "borderRadius": "4px 4px 0 0",
        "fontWeight": "bold",
        "textAlign": "center",
        "color": "rgba(76, 137, 38, 1)"
    },
    Toolbar: {
        "flex": "1 1 0px",
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "center",
        "paddingLeft": "6px"
    },
    Body: {
        "flex": "1 1 0px",
        "display": "flex",
        "flexDirection": "column",
        "overflow": "auto"
    }
};

export default styles;
