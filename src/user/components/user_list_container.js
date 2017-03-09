import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../action_creators/user_fetch_action_creators';
import UserList from './user_list';

function mapStateToProps(state) {
    return {
        userList: state.user.list,
        isFetchingUser: state.user.isFetchingUser
    };
}

function mapDispatchToProps(dispatch) {
    dispatch(fetchUsers());
    return {};
}

function UserListContainer({ userList, isFetchingUser }) {
    return isFetchingUser
        ? (<div className="alert alert-info">Fetching users...</div>)
        : <UserList userList={userList} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);