import { render, screen } from '@testing-library/react';
import NoData from './NoData'

test('renders the default No Data symbol', async () => {
    const content = '∅';
    render(<NoData />);
    expect(screen.getByText(content)).toBeInTheDocument();
});

test('renders a custom no data symbol', async () => {
    const message = 'n/a';
    render(<NoData message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
});
