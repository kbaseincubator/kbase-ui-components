import React from 'react';
import { Alert } from 'antd';

export interface ErrorBoundaryProps {
}

interface ErrorInfo {
    error: any;
    message: string;
}

interface ErrorBoundaryState {
    error: null | ErrorInfo;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            error: null
        };
    }

    renderError(error: ErrorInfo) {
        console.error('Caught by ErrorBoundary', error);
        return <Alert type="error" message={
            <div>
                <p>Error!</p>
                <p>{error.message}</p>
            </div>
        } />;
    }

    /**
     * Implements the standard getDerivedStateFromError React Component method.
     * @param error -
     */
    static getDerivedStateFromError(error: any) {
        if (error.message) {
            return {
                error: {
                    error,
                    message: error.message
                }
            };
        } else if (typeof error === 'string') {
            return {
                error: {
                    error,
                    message: error
                }
            };
        } else {
            return {
                error: {
                    error,
                    message: 'Unknown error'
                }
            };
        }
    }

    render() {
        if (this.state.error !== null) {
            return this.renderError(this.state.error);
        }
        return this.props.children;
    }
}
