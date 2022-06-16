import {Component} from "react";
import styles from "./SubSection.styles";

export interface SubSectionProps {
    title: string;
    renderToolbar?: () => JSX.Element;
}

interface SubSectionState {

}

export default class SubSection extends Component<SubSectionProps, SubSectionState> {
    renderToolbar() {
        if (!this.props.renderToolbar) {
            return;
        }
        return this.props.renderToolbar();
    }

    render() {
        return <div style={styles.SubSection}>
            <div style={styles.Header}>
                <div style={styles.Title}>
                    {this.props.title}
                </div>
                <div style={styles.Toolbar}>
                    {this.renderToolbar()}
                </div>
            </div>
            <div style={styles.Body}>
                {this.props.children}
            </div>
        </div>;

    }
}