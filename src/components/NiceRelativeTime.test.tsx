/**
 * Unit tests for the KBaseIntegration component
 */

// We need to import React, even though we don't explicity use it, because
// it's presence is required for JSX transpilation (the React object is
// used  in the transpiled code)
import * as React from 'react';
// Enzyme needs
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// We always need to import the component we are testing
import NiceRelativeTime from './NiceRelativeTime';

const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<NiceRelativeTime time={new Date(Date.now() + 10000)} />);
});

it('renders and unmounts correctly', () => {
    const rendered = mount(<NiceRelativeTime time={new Date(Date.now() + 10000)} />);
    rendered.unmount();
});

it('renders and unmounts correctly check data', () => {
    const rendered = mount(<NiceRelativeTime time={new Date(Date.now() + 10000)} />);
    expect(rendered.exists('[data-k-b-testhook-element="label"]')).toEqual(true);
    expect(rendered.find('[data-k-b-testhook-element="label"]').first().text()).toEqual('in 10s');
    // console.log(label.text);
    rendered.unmount();
});

it('renders and unmounts correctly check data', () => {
    const rendered = mount(<NiceRelativeTime time={new Date(Date.now() - 10000)} />);
    expect(rendered.exists('[data-k-b-testhook-element="label"]')).toEqual(true);
    expect(rendered.find('[data-k-b-testhook-element="label"]').first().text()).toEqual('10s ago');
    // console.log(label.text);
    rendered.unmount();
});


it('renders and unmounts correctly check data', () => {
    const now = new Date().getTime();
    const thirtyDaysAgo = now - (DAY_MS * 30);
    const rendered = mount(<NiceRelativeTime time={new Date(thirtyDaysAgo)} />);
    expect(rendered.exists('[data-k-b-testhook-element="label"]')).toEqual(true);
    expect(rendered.find('[data-k-b-testhook-element="label"]').first().text()).toEqual('30d ago');
    // console.log(label.text);
    rendered.unmount();
});