import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import reduxMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import UserForm from './user_form';
import UserFormContainer from './user_form_container';

const mockStore = reduxMockStore([thunk]);

describe('UserForm container', () => {

    it('should bind UserForm to Redux store', () => {
        const state = {
            user: {
                isCreatingUser: false, 
                createUserFailureMessage: 'test msg'
            }
        };
        const store = mockStore(state);
        const wrapper = mount(
            <Provider store={store}>
                <UserFormContainer />
            </Provider>
        );

        const UserFormProps = wrapper.find(UserForm).first().props();
        
        expect(UserFormProps.isCreatingUser).toEqual(state.user.isCreatingUser);
        expect(UserFormProps.createUserFailureMessage).toEqual(state.user.createUserFailureMessage);
        expect(typeof UserFormProps.createUser).toBe('function');

    });

});
