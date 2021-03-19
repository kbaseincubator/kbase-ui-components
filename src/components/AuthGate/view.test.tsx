import * as React from 'react';
import {render} from '@testing-library/react';
import AuthGate from './view'
import { AuthState } from '../../redux/auth/store';

it('renders without crashing', () => {
    render(<AuthGate token="abc" isAuthorized={true} required={true} authState={AuthState.AUTHORIZED} />);
});

// TODO

// it('renders children ', () => {
//     const children = (
//         <div>
//             hello
//         </div>
//     )
//     const component = <AuthGate token="abc" isAuthorized={true} required={true} authState={AuthState.AUTHORIZED}>
//         {children}
//     </AuthGate>
//     const rendered = mount(component);
//     rendered.unmount();
//
// })