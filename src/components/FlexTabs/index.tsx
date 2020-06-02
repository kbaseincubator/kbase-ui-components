import React from 'react';
import { Button } from 'antd';
import './style.css';

export interface FlexTab {
    tab: string;
    title: JSX.Element | string;
    component: JSX.Element;
}

export interface FlexTabsProps {
    tabs: Array<FlexTab>;
}

interface FlexTabsState {
    selectedTabIndex: number;
}

export default class FlexTabs extends React.Component<FlexTabsProps, FlexTabsState> {
    constructor(props: FlexTabsProps) {
        super(props);
        this.state = {
            selectedTabIndex: 0
        };
    }

    selectTab(tabIndex: number) {
        this.setState({ selectedTabIndex: tabIndex });
    }

    renderTabs() {
        return this.props.tabs.map((tab, index) => {
            const classNames = ['FlexTabs-tab'];
            if (index === this.state.selectedTabIndex) {
                classNames.push('FlexTabs-tab-active');
            }
            return (
                <span key={String(index)} className={classNames.join(' ')}>
                    <Button type="link" onClick={() => { this.selectTab(index); }}>{tab.title}</Button>
                </span>
            );
        });
    }

    renderTabBody() {
        return this.props.tabs[this.state.selectedTabIndex].component;
    }

    render() {
        return <div className="FlexTabs">
            <div className="FlexTabs-header">
                {this.renderTabs()}
            </div>
            <div className="FlexTabs-body">
                {this.renderTabBody()}
            </div>
        </div>;
    }
}