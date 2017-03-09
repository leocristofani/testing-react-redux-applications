import userReducer from './user_reducer';

describe('User reducer', () => {

    const initialState = {
        list: [],
        isCreatingUser: false,
        isFetchingUser: false,
        createUserFailureMessage: undefined
    };

    it('should return the initial state', () => {
        expect(
            userReducer(undefined, {})
        ).toEqual(initialState);
    });

    it('should handle FETCH_USERS_REQUEST', () => {
        expect(
            userReducer(undefined, { type: 'FETCH_USERS_REQUEST' })
        ).toEqual(
            { ...initialState, isFetchingUser: true }
        );
    });

    it('should handle FETCH_USERS_SUCCESS', () => {

        const users = [{}, {}];

        expect(
            userReducer(undefined, {
                type: 'FETCH_USERS_SUCCESS',
                payload: { users }
            })
        ).toEqual(
            { ...initialState, list: users, isFetchingUser: false }
        );
    });

    it('should handle DELETE_USER_REQUEST', () => {
        expect(
            userReducer(undefined, { 
                type: 'DELETE_USER_REQUEST', 
                payload: { userId: 123 }
            })
        ).toEqual(
            { ...initialState, deletingUserId: 123 }
        )
    });

    it('should handle DELETE_USER_SUCCESS', () => {
        const user = { id: 123 };
        expect(
            userReducer({ 
                ...initialState, 
                deletingUserId: user.id, 
                list: [user] 
            }, {
                type: 'DELETE_USER_SUCCESS',
                payload: { user }
            })
        ).toEqual({
            ...initialState,
            deletingUserId: undefined,
            list: []
        });
    });

});