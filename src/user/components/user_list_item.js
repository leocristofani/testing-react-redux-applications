import React, { PropTypes } from 'react';

export default function UserListItem({user, deleteUser, deletingUserId}) {
    return (
        <tr key={user.id}>
            <td data-r-test="user-list-item-name">{user.name}</td>
            <td data-r-test="user-list-item-email">{user.email}</td>
            <td style={{width: 65, textAlign: 'right'}}>
                <button
                    data-r-test="user-list-item-delete-button"
                    className="btn btn-xs btn-danger"
                    type="button"
                    disabled={deletingUserId === user.id}
                    onClick={() => deleteUser(user.id)}
                >{deletingUserId === user.id ? 'deleting...' : 'delete'}</button>
            </td>
        </tr>
    );
}

UserListItem.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        id: PropTypes.any.isRequired
    }),
    deleteUser: PropTypes.func.isRequired,
    deletingUserId: PropTypes.any
};