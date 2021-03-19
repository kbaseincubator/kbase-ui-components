import * as React from 'react';
import AuthComponent from './view';
import { Authorization, AuthState } from '../../redux/auth/store';
import {render} from '@testing-library/react'

it('renders without crashing', () => {
    const authorization: Authorization = {
        status: AuthState.NONE,
        message: '',
        userAuthorization: {
            token: '',
            username: '',
            realname: '',
            roles: []
        }
    };
    const checkAuth = () => {};
    const onRemoveAuthorization = () => {};
    const onAddAuthorization = (token: string) => {};
    const hosted = false;
    render(
        <AuthComponent
            authorization={authorization}
            hosted={hosted}
            checkAuth={checkAuth}
            onRemoveAuthorization={onRemoveAuthorization}
            onAddAuthorization={onAddAuthorization}
        />
    );
});
