import * as React from 'react';
import AuthComponent from './view';
import { Authentication, AuthenticationStatus } from '../../redux/auth/store';
import { render } from '@testing-library/react'

it('renders without crashing', () => {
    const authentication: Authentication = {
        status: AuthenticationStatus.NONE,
    };
    const checkAuth = () => { };
    const onRemoveAuthentication = () => { };
    const onAddAuthentication = (token: string) => { };
    const hosted = false;
    render(
        <AuthComponent
            authentication={authentication}
            hosted={hosted}
            checkAuth={checkAuth}
            onRemoveAuthentication={onRemoveAuthentication}
            onAddAuthentication={onAddAuthentication}
        />
    );
});
