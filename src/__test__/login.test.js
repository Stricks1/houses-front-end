import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LogInForm from '../containers/login';
import Wrapper from './Wrapper';

Enzyme.configure({ adapter: new Adapter() });

describe('Login', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Wrapper>
        <LogInForm />
      </Wrapper>,
    );
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });

  it('Has a non empty form', () => {
    expect(wrapper.find('form').children()).not.toBeNull();
  });
});
