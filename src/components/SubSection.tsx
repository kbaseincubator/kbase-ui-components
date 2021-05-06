import React from "react";
import styles from './SubSection.module.css';

export interface SubSectionProps {
    title: string;
    renderToolbar?: () => JSX.Element;
}

interface SubSectionState {

}

export default class SubSection extends React.Component<SubSectionProps, SubSectionState> {
    renderToolbar() {
        if (!this.props.renderToolbar) {
            return;
        }
        return this.props.renderToolbar();
    }

    render() {
        return <div className={styles.SubSection}>
            <div className={styles.Header}>
                <div className={styles.Title}>{this.props.title}</div>
                <div>{this.renderToolbar()}</div>
            </div>
            <div className={styles.Body}>
                {this.props.children}
            </div>
        </div>;

    }
}