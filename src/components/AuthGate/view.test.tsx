import * as React from 'react';
import { render } from '@testing-library/react';
import AuthGate from './view'
import { AuthenticationAuthenticated, AuthenticationStatus } from '../../redux/auth/store';

it('renders without crashing', () => {
    const authentication: AuthenticationAuthenticated = {
        status: AuthenticationStatus.AUTHENTICATED,
        userAuthentication: {
            token: 'abc123',
            username: 'abc',
            realname: 'A B C',
            roles: []
        }

    }
    render(<AuthGate required={true} authentication={authentication} />);
});
