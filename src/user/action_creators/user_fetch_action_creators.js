import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export function fetchUsersRequest() {
    return {
        type: FETCH_USERS_REQUEST
    };
}

export function fetchUsersSuccess(users) {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: { users }
    };
}

export function fetchUsersFailure(err) {
    return {
        type: FETCH_USERS_FAILURE,
        payload: { err }
    };
}

export function fetchUsers() {
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        return axios.get('/api/users')
            .then(res => dispatch(fetchUsersSuccess(res.data)))
            .catch(err => dispatch(fetchUsersFailure(err.response.data)));
    }
}