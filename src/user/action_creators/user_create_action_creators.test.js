import reduxMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {
    createUser,
    createUserRequest,
    createUserSuccess,
    createUserFailure,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
} from './user_create_action_creators';

const mockStore = reduxMockStore([thunk]);

describe('User create action creators', () => {

    afterEach(() => {
        nock.cleanAll();
    });

    it('should create action to inform that a request to create a user is in progress', () => {
        const expectedAction = { type: CREATE_USER_REQUEST };
        const actualAction = createUserRequest();
        expect(actualAction).toEqual(expectedAction);
    });

    it('should create action to inform that a user was created succesfully', () => {
        const user = { name: 'test', email: 'test@email.com', id: 123 };
        const expectedAction = { type: CREATE_USER_SUCCESS, payload: { user } };
        const actualAction = createUserSuccess(user);
        expect(expectedAction).toEqual(actualAction);
    });

    it('should create action to inform that a user failed to be created', () => {
        const err = { message: 'test message' };
        const expectedAction = { type: CREATE_USER_FAILURE, payload: { err } };
        const actualAction = createUserFailure(err);
        expect(actualAction).toEqual(expectedAction);
    });

    it('should create action to create user', () => {
        const user = { name: 'test', email: 'test@email.com' };
        nock('http://localhost').post('/api/users', user).reply(200, user);
        const store = mockStore({ user: { list: [] } });
        return store.dispatch(createUser(user))
            .then(() => {
                /**
                 * Verify that the expected actions are actually dispatched
                 * to the Redux store
                 */
                expect(store.getActions()).toEqual([
                    { type: CREATE_USER_REQUEST },
                    { type: CREATE_USER_SUCCESS, payload: { user } }
                ]);
            });
    });

});