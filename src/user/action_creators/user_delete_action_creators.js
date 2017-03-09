import axios from 'axios';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export function deleteUserRequest(userId) {
    return {
        type: DELETE_USER_REQUEST,
        payload: { userId }
    };
}

export function deleteUserSuccess(user) {
    return {
        type: DELETE_USER_SUCCESS,
        payload: { user }
    };
}

export function deleteUserFailure(user) {
    return {
        type: DELETE_USER_FAILURE,
        payload: { user }
    };
}

export function deleteUser(userId) {
    return function(dispatch) {
        dispatch(deleteUserRequest(userId));
        return axios.delete(`/api/users/${userId}`)
            .then(res => dispatch(deleteUserSuccess(res.data)))
            .catch(err => dispatch(deleteUserFailure(err.response.data)));
    }
}