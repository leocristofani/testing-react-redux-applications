import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import reduxMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import UserListContainer from './user_list_container';

const mockStore = reduxMockStore([thunk]);

describe('Userlist container', () => {

    it('should dispatch action to fetch users', () => {
        
        const state = {
            user: {
                list: []
            }
        };

        const store = mockStore(state);
        
        const wrapper = mount(
            <Provider store={store}>
                <UserListContainer />
            </Provider>
        );

        const expectedActions = [{"type": "FETCH_USERS_REQUEST"}];
        const actualActions = store.getActions();

        expect(expectedActions).toEqual(actualActions);
    });

    it('should connect UserList component to Redux store', () => {
        
        const state = {
            user: {
                list: [
                    { name: 'test1', email: 'test1@email.com', id: 1 },
                    { name: 'test2', email: 'test2@email.com', id: 2 },
                ]
            }
        };

        const store = mockStore(state);
        
        const wrapper = mount(
            <Provider store={store}>
                <UserListContainer />
            </Provider>
        ).find('UserList').first();

        expect(wrapper.props().userList.length).toEqual(state.user.list.length);
    });

});