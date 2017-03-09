import React from 'react';
import { shallow, mount } from 'enzyme';
import UserForm from './user_form';

describe('User form component', () => {

    /**
     * This is just a function that does nothing.
     */
    const noop = () => {};

    const baseProps = {
        createUser: noop,
        isCreatingUser: false,
        createUserFailureMessage: undefined
    };

    // mock user to help with filling the form and assertions
    const user = { name: 'test name', email: 'test@email.com' };

    it('should create a user', () => {
        // mock function
        const createUser = jest.fn();
        // override createUser
        const props = { ...baseProps, createUser };
        
        // create wrapper
        const wrapper = mount(<UserForm {...props} />);

        // find returns an array, so we have to call first()
        wrapper.find('#name').first().simulate('change', { target: { name: 'name', value: user.name } });
        wrapper.find('#email').first().simulate('change', { target: { name: 'email', value: user.email } });
        wrapper.find('form').first().simulate('submit');

        expect(createUser).toHaveBeenCalledWith(user);
    });

    it('should reset form only if user was created successfully', () => {
        // create wrapper
        const wrapper = mount(<UserForm {...baseProps} />);
        const nameField = wrapper.find('#name').first();
        const emailField = wrapper.find('#email').first();

        // find returns an array, so we have to call first()
        nameField.simulate('change', { target: { name: 'name', value: user.name } });
        emailField.simulate('change', { target: { name: 'email', value: user.email } });

        wrapper.setProps({ ...baseProps, createUserFailureMessage: 'test msg' });
        expect(nameField.props().value).toEqual(user.name);
        expect(emailField.props().value).toEqual(user.email);

        wrapper.setProps(baseProps);

        expect(nameField.props().value).toEqual('');
        expect(emailField.props().value).toEqual('');
    });

    it('should display given error message', () => {
        const props = { ...baseProps, createUserFailureMessage: 'test msg' };
        const wrapper = shallow(<UserForm {...props} />);

        expect(
            wrapper.find('.alert.alert-danger').first().text()
        ).toEqual(props.createUserFailureMessage);
    });

    it('should NOT submit form while user is being created', () => {
        const createUser = jest.fn();
        const props = { ...baseProps, isCreatingUser: true, createUser };
        const wrapper = mount(<UserForm {...props} />);
        wrapper.find('form').first().simulate('submit');
        expect(createUser).not.toHaveBeenCalled();
        expect(
            wrapper.find('[type="submit"]').first().prop('disabled')
        ).toBeTruthy();
    });

});