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
import NiceElapsedTime from './NiceElapsedTime';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<NiceElapsedTime from={new Date().getTime()} to={new Date().getTime()} />);
});

it('renders and unmounts correctly', () => {
    const rendered = mount(<NiceElapsedTime from={new Date().getTime()} to={new Date().getTime()} />);
    rendered.unmount();
});

it('renders and unmounts correctly check data', () => {
    const from = new Date().getTime();
    const to = from + 10000;
    const rendered = mount(<NiceElapsedTime from={from} to={to} />);
    expect(rendered.exists('[data-k-b-testhook-element="label"]')).toEqual(true);
    expect(rendered.find('[data-k-b-testhook-element="label"]').first().text()).toEqual('10s');
    // console.log(label.text);
    rendered.unmount();
});

it('renders and unmounts correctly check data', () => {
    const from = new Date().getTime();
    const to = from + 60000;
    const rendered = mount(<NiceElapsedTime from={from} to={to} />);
    expect(rendered.exists('[data-k-b-testhook-element="label"]')).toEqual(true);
    expect(rendered.find('[data-k-b-testhook-element="label"]').first().text()).toEqual('1m 0s');
    // console.log(label.text);
    rendered.unmount();
});

it('renders and unmounts correctly check data', () => {
    const from = new Date().getTime();
    const to = from + 70000;
    const rendered = mount(<NiceElapsedTime from={from} to={to} />);
    expect(rendered.exists('[data-k-b-testhook-element="label"]')).toEqual(true);
    expect(rendered.find('[data-k-b-testhook-element="label"]').first().text()).toEqual('1m 10s');
    // console.log(label.text);
    rendered.unmount();
});

// it('renders and unmounts correctly check data', () => {
//     const rendered = mount(<NiceRelativeTime time={new Date(Date.now() - 10000)} />);
//     expect(rendered.exists('[data-k-b-testhook-element="label"]')).toEqual(true);
//     expect(rendered.find('[data-k-b-testhook-element="label"]').first().text()).toEqual('10s ago');
//     // console.log(label.text);
//     rendered.unmount();
// });


// it('renders and unmounts correctly check data', () => {
//     const rendered = mount(<NiceRelativeTime time={new Date(1569945915443)} />);
//     expect(rendered.exists('[data-k-b-testhook-element="label"]')).toEqual(true);
//     expect(rendered.find('[data-k-b-testhook-element="label"]').first().text()).toEqual('30d ago');
//     // console.log(label.text);
//     rendered.unmount();
// });