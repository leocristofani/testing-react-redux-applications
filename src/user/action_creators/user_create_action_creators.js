import axios from 'axios';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export function createUserRequest() {
    return {
        type: CREATE_USER_REQUEST
    };
}

export function createUserSuccess(user) {
    return {
        type: CREATE_USER_SUCCESS,
        payload: { user }
    };
}

export function createUserFailure(err) {
    return {
        type: CREATE_USER_FAILURE,
        payload: { err }
    };
}

export function createUser(user) {
    return function(dispatch) {
        dispatch(createUserRequest());
        /**
         * Make sure you return the promise, otherwise
         * you'll have problems testing with redux-mock-store & redux-thunk
         */
        return axios.post('/api/users', user)
            .then(res => dispatch(createUserSuccess(res.data)))
            .catch(err => dispatch(createUserFailure(err.response.data)));
    }
}