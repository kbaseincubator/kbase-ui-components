import * as React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AuthGate from './view'
import { AuthState } from '../../redux/auth/store';
configure({ adapter: new Adapter() })

it('renders without crashing', () => {
    shallow(<AuthGate token="abc" isAuthorized={true} required={true} authState={AuthState.AUTHORIZED} />);
});

it('renders children ', () => {
    const children = (
        <div>
            hello
        </div>
    )
    const component = <AuthGate token="abc" isAuthorized={true} required={true} authState={AuthState.AUTHORIZED}>
        {children}
    </AuthGate>
    const rendered = mount(component);
    rendered.unmount();

})