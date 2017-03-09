import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import reduxMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import UserListItem from './user_list_item';
import UserListItemContainer from './user_list_item_container';

const mockStore = reduxMockStore([thunk]);

describe('UserListItem container', () => {

    it('should bind UserListItem to Redux store and pass user from user list', () => {
        const store = mockStore({user: { deletingUserId: 123 }});
        const user = { name: '', email: '', id: 1 };
        const wrapper = mount(
            <Provider store={store}>
                <UserListItemContainer user={user} />
            </Provider>
        );

        const userListItemProps = wrapper.find(UserListItem).first().props();
        
        expect(userListItemProps.user).toEqual(user);
        expect(typeof userListItemProps.deleteUser).toEqual('function');
        expect(userListItemProps.deletingUserId).toEqual(123);

    });

});
