import React from 'react';
import { shallow } from 'enzyme';

import UserList from './user_list';
import UserListItemContainer from './user_list_item_container';

describe('UserList component', () => {

    it('should display list of users', () => {
        const props = { userList: [{ name: '', email: '', id: 1 }, { name: '', email: '', id: 2 }]  };
        const wrapper = shallow(<UserList {...props} />);
        expect(
            wrapper.find(UserListItemContainer).length
        ).toBe(2);
    });

    it('should display info alert list of users is empty', () => {
        const props = { userList: [] };
        const wrapper = shallow(<UserList {...props} />);
        expect(
            wrapper.find('.alert').first().length
        ).toBe(1);
    });

});