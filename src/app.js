import React from 'react';
import UserFormContainer from './user/components/user_form_container';
import UserListContainer from './user/components/user_list_container';

export default function App() {
    return (
        <div className="container">
            <header className="page-header">
                <h1 className="page-title">Users</h1>
            </header>
            <UserFormContainer />
            <UserListContainer />
        </div>
    );
}