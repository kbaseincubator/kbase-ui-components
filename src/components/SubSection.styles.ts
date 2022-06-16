import { CSSProperties } from "react";

export interface SubSectionStyles {
  SubSection: CSSProperties;
  Header: CSSProperties;
  Title: CSSProperties;
  Toolbar: CSSProperties;
  Body: CSSProperties;
}

const styles: SubSectionStyles = {
  SubSection: {
    "flex": "1 1 0px",
    "display": "flex",
    "flexDirection": "column",
    "margin": "20px 0 6px 0",
    "minHeight": "0",
  },
  Header: {
    "flex": "0 0 auto",
    "display": "flex",
    "flexDirection": "row",
    "marginBottom": "10px",
  },
  Title: {
    "textTransform": "lowercase",
    "flex": "0 0 auto",
    "marginTop": "0",
    "overflow": "visible",
    "padding": "2px 6px 2px 0",
    "borderRadius": "4px 4px 0 0",
    "fontWeight": "bold",
    "textAlign": "center",
    "color": "rgba(76, 137, 38, 1)",
    "borderBottom": "2px solid rgba(76, 137, 38, 0.2)",
  },
  Toolbar: {
    "flex": "1 1 0px",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "paddingLeft": "6px",
  },
  Body: {
    "display": "flex",
    "flexDirection": "column",
  },
};

export default styles;
