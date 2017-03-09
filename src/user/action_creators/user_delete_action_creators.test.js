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

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create action to inform user is being deleted', () => {
        const userId = 123;
        const expectedAction = {
            type: DELETE_USER_REQUEST,
            payload: { userId }
        }
        const actualAction = deleteUserRequest(userId);

        expect(expectedAction).toEqual(actualAction);
    });
    
    it('should create action to inform user was deleted successfully');
    it('should create action to inform user was NOT deleted successfully');

    it('should create action to delete user', () => {
        const user = { name: 'test', email: 'test@email.com', id: 123 };
        nock('http://localhost').delete(`/api/users/${user.id}`).reply(200, user);
        const store = mockStore({ user: { list: [user] } });
        return store.dispatch(deleteUser(user.id))
            .then(() => {
                expect(store.getActions()).toEqual([
                    { type: DELETE_USER_REQUEST, payload: { userId: user.id } },
                    { type: DELETE_USER_SUCCESS, payload: { user } }
                ]);
            });
    });

});