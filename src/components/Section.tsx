import { Component, PropsWithChildren } from "react";
import styles from './Section.styles';

export interface SectionProps extends PropsWithChildren {
    title: string;
    renderToolbar?: () => JSX.Element;
}

interface SectionState {
}

export default class Section extends Component<SectionProps, SectionState> {
    renderToolbar() {
        if (!this.props.renderToolbar) {
            return;
        }
        return this.props.renderToolbar();
    }

    render() {
        return <div style={styles.Section}>
            <div style={styles.Header}>
                <div style={styles.Title}>{this.props.title}</div>
                <div style={styles.Toolbar}>{this.renderToolbar()}</div>
            </div>
            <div style={styles.Body}>
                {this.props.children}
            </div>
        </div>;
    }
}
