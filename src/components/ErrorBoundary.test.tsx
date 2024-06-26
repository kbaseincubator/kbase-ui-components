import { render, waitFor } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary'

const TIMEOUT = 10000;

test('renders an ErrorBoundary with no errors, should render internal element', async () => {
    const { getByText } = render(<ErrorBoundary><div>hi</div></ErrorBoundary>);
    await waitFor(() => {
        const messageElement = getByText('hi');
        expect(messageElement).toBeInTheDocument();
    }, {
        timeout: TIMEOUT
    });
});

test('renders an ErrorBoundary which throws an Error, should render message using the error\'s message', async () => {
    const expectedMessage = 'I am an error';
    const ThrowsError = () => {
        throw new Error(expectedMessage);
    }
    const { getByText } = render(<ErrorBoundary><ThrowsError /></ErrorBoundary>);
    await waitFor(() => {
        const messageElement = getByText(expectedMessage);
        expect(messageElement).toBeInTheDocument();
    }, {
        timeout: TIMEOUT
    });
});

test('renders an ErrorBoundary which throws a string, should render the string', async () => {
    const expectedMessage = 'I am an error';
    const ThrowsError = () => {
        throw expectedMessage;
    }
    const { getByText } = render(<ErrorBoundary><ThrowsError /></ErrorBoundary>);
    await waitFor(() => {
        const messageElement = getByText(expectedMessage);
        expect(messageElement).toBeInTheDocument();
    }, {
        timeout: TIMEOUT
    });
});

test('renders an ErrorBoundary which throws a Date, should render the string', async () => {
    const expectedMessage = 'Unknown error';
    const ThrowsError = () => {
        throw new Date();
    }
    const { getByText } = render(<ErrorBoundary><ThrowsError /></ErrorBoundary>);
    await waitFor(() => {
        const messageElement = getByText(expectedMessage);
        expect(messageElement).toBeInTheDocument();
    }, {
        timeout: TIMEOUT
    });
});
