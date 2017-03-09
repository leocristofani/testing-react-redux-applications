import React, { PropTypes } from 'react';
import UserListItemContainer from './user_list_item_container';

export default function UserList({ userList }) {
    return userList.length ? (
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {userList.map(user => <UserListItemContainer key={user.id} user={user} />)}
          </tbody>
        </table>
      </div>
    ) : (<div className="alert alert-info">There are no users. Create one!</div>);
}

UserList.propTypes = {
  userList: PropTypes.array.isRequired
};