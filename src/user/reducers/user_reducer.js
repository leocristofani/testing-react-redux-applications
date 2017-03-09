import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from '../action_creators/user_fetch_action_creators';
import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE } from '../action_creators/user_create_action_creators';
import { DELETE_USER_REQUEST, DELETE_USER_SUCCESS } from '../action_creators/user_delete_action_creators';

const initialState = {
    list: [],
    isCreatingUser: false,
    isFetchingUser: false,
    createUserFailureMessage: undefined
};

function userReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                isFetchingUser: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                list: payload.users,
                isFetchingUser: false
            };
        case CREATE_USER_REQUEST:
            return {
                ...state,
                isCreatingUser: true
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                list: [payload.user, ...state.list],
                isCreatingUser: false,
                createUserFailureMessage: undefined
            };
        case CREATE_USER_FAILURE:
            return {
                ...state,
                isCreatingUser: false,
                createUserFailureMessage: payload.err.message
            }
        case DELETE_USER_REQUEST:
            return {
                ...state,
                deletingUserId: payload.userId
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                list: state.list.filter(user => user.id !== payload.user.id),
                deletingUserId: undefined,
            }
        default:
            return state;
    }
}

export default userReducer;