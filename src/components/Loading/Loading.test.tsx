import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import React from 'react';
import Loading from './Loading';

it('Renders a simple loading component with a message', () => {
    render(<Loading message="Loading" />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.queryByText('foo')).toBeNull();
});
