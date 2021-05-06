import React from "react";
import styles from './Section.module.css';

export interface SectionProps {
    title: string;
    renderToolbar?: () => JSX.Element;
}

interface SectionState {
}

export default class Section extends React.Component<SectionProps, SectionState> {
    renderToolbar() {
        if (!this.props.renderToolbar) {
            return;
        }
        return this.props.renderToolbar();
    }

    render() {
        return <div className={styles.Section}>
            <div className={styles.Header}>
                <div className="Title">{this.props.title}</div>
                <div>{this.renderToolbar()}</div>
            </div>
            <div className="Body">
                {this.props.children}
            </div>
        </div>;
    }
}
