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
            Object.assign({}, initialState, { isFetchingUser: true })
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
            Object.assign({}, initialState, { list: users })
        );
    });

});