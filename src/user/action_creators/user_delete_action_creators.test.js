import reduxMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
    deleteUser,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailure,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
} from './user_delete_action_creators';

const mockStore = reduxMockStore([thunk]);

describe('User delete action creators', () => {
    /**
     * Testing sync action creators
     */
    it('should create action to inform user is being deleted');
    it('should create action to inform user was deleted successfully');
    it('should create action to inform user was NOT deleted successfully');
    /**
     * Testing async action creators
     */
    it('should create action to delete user');

});