import React from 'react';
import { shallow } from 'enzyme';
import UserListItem from './user_list_item';

describe('UserListItem component', () => {

    const noop = () => {};

    const baseProps = {
        user: {
            name: 'test name',
            email: 'test@email.com',
            id: 123
        },
        deleteUser: noop,
        deletingUserId: undefined
    };

    it('should display user\'s name', () => {
        const props = { ...baseProps };
        const wrapper = shallow(<UserListItem {...props} />);
        expect(
            wrapper.find('[data-r-test="user-list-item-name"]').text()
        ).toEqual(props.user.name);
    });

    it('should display user\'s email', () => {
        const props = { ...baseProps };
        const wrapper = shallow(<UserListItem {...props} />);
        expect(
            wrapper.find('[data-r-test="user-list-item-email"]').text()
        ).toEqual(props.user.email);
    });

    it('should delete user', () => {
        const deleteUser = jest.fn();
        const props = {
            ...baseProps,
            deleteUser
        };
        const wrapper = shallow(<UserListItem {...props} />)
        wrapper.find('[data-r-test="user-list-item-delete-button"]').simulate('click');
        expect(deleteUser).toHaveBeenCalledWith(props.user.id);
    });

    it('should disable the delete button while deleting user', () => {
        const props = {
            ...baseProps,
            deletingUserId: baseProps.user.id
        };
        const wrapper = shallow(<UserListItem {...props} />);
        expect(
            wrapper.find('[data-r-test="user-list-item-delete-button"]').is('[disabled]')
        ).toBeTruthy();
    });
});