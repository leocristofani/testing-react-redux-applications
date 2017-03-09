import reduxMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    fetchUsers,
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS
} from './user_fetch_action_creators';

const mockStore = reduxMockStore([thunk]);

describe('User fetch action creators', () => {

    it('should create action to inform users are being fetched');
    it('should create action to inform users have been fetched successfully');
    it('should create action to inform users failed to be fetched');
    it('should create action to fetch users');

});