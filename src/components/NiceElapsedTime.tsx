import * as React from 'react';
import { Tooltip } from 'antd';
import { niceElapsed } from '@kbase/ui-lib';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const CLOCK_INTERVAL_SECOND = SECOND / 4;
const CLOCK_INTERVAL_MINUTE = MINUTE / 4;
const CLOCK_INTERVAL_HOUR = HOUR / 4;

export interface NiceElapsedTimeProps {
    from: number;
    to?: number;
    precision?: number;
    showTooltip?: boolean;
    tooltipPrefix?: string;
    useClock?: boolean
}

interface NiceElapsedTimeState {
    clockTime: number;
}

export default class NiceElapsedTime extends React.Component<NiceElapsedTimeProps, NiceElapsedTimeState> {
    clockTimer: number | null;

    constructor(props: NiceElapsedTimeProps) {
        super(props);
        this.clockTimer = null;
        this.state = {
            clockTime: Date.now()
        }
    }

    startClock() {
        this.clockTimer = window.setInterval(() => {
            this.setState({
                clockTime: Date.now()
            })
        }, CLOCK_INTERVAL_SECOND);
    }

    componentDidMount() {
        if (!this.props.to && this.props.useClock) {
            this.startClock();
        }
    }
    componentWillUnmount() {
        if (this.clockTimer) {
            window.clearInterval(this.clockTimer);
        }
    }
    render() {
        let elapsed;
        if (this.props.to) {
            elapsed = this.props.to - this.props.from;
        } else {
            elapsed = this.state.clockTime - this.props.from;
        }
        const [tooltipContent,] = niceElapsed(elapsed, {})
        if (this.props.showTooltip === false) {
            return <span>{tooltipContent}</span>;
        }

        let tooltip;
        if (this.props.tooltipPrefix) {
            tooltip = (
                <span>
                    {this.props.tooltipPrefix}
                    <span>{tooltipContent}</span>
                </span>
            );
        } else {
            tooltip = <span>{tooltipContent}</span>;
        }
        const [content, time] = niceElapsed(elapsed, { precision: this.props.precision })
        return (
            <Tooltip placement="bottomRight" title={tooltip}>
                {content}
            </Tooltip>
        );
    }
}
