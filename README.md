# Testing React/Redux Applications

### Table of content

1. (Im)pure functions and why they matter
2. React/Redux architecture from a (im)pure function perspective
3. Testing synchronous actions
4. Testing asynchronous actions
5. Testing reducers
6. Testing components
7. Testing containers
8. How to build and run the demo application
9. Links to useful resources

### 1. (Im)pure functions and why they matter

#### 1.1 Pure functions
- Don’t cause side effect
- Don’t access global state
- Given the same input, it’s guaranteed to always produce the same output
- **Easy to test**
    - Predictable
    - Don’t require mocks and/or interceptors
- In React/Redux applications, sync actions, reducers and presentational components should all be pure functions.

```
/* This is an example of a pure function. Notice that it does not mutate state, does not depend on global state and given the same input (user in this case), it will always produce the same output. */
function createUserSuccess(user) {
    return {
        type: CREATE_USER_SUCCESS,
        payload: { user }
    };
}
```

#### 1.2 Impure functions
- Cause side effects
- Mutate global state
- **Hard to test**
  - Not predictable
  - Require mocks and/or interceptors
- In React/Redux applications, async actions and containers are impure functions
```
/* this one on the other hand is impure. Notice that it interacts with the outside world by posting data to the backend and mutates the store by dispatching actions. */
function createUser(user) {
    return function(dispatch) {
        dispatch(createUserRequest());
        return axios.post('/api/users', user)
            .then(res => dispatch(createUserSuccess(res.data)))
            .catch(err => dispatch(createUserFailure(err.response.data)));
    }
}
```

#### 2.  React/Redux architecture from a (im)pure function perspective

![React/Redux architeture from (im)pure perspective](https://img.revinate.com/image/upload/c_fit,w_1200/qh9aacz9llm74jemazpa.png)

##### 3. Testing synchronous actions
- A sync action would say: *“Here’s a description of how the state should be changed, along with some data”*
- Sync action creators are pure functions and they are very easy to test

```
/* this is a sync action creator */
function createUserFailure(err) {
    return {
        type: CREATE_USER_FAILURE,
        payload: { err }
    };
}

/* this is how you test it */
it('should create action to inform that a user failed to be created', () => {
    const err = { message: 'test message' };
    const expectedAction = { type: CREATE_USER_FAILURE, payload: { err } };
    const actualAction = createUserFailure(err);
    expect(actualAction).toEqual(expectedAction);
});
```

#### 4. Testing asynchronous actions
- An async function would say *“Let me first talk to the backend first, ok? Then I can follow up with the store with description(s) of how the state should be changed, along with some data”*
- Sync actions are inpure, because most of the time they interact with the backend and dispatch actions to mutate the Redux store.

```
/* This is an async action creator. Notice that it makes an http call to the backend with axios and dispatches various actions to mutate the store. */
export function createUser(user) {
    return function(dispatch) {
        dispatch(createUserRequest());
        return axios.post('/api/users', user)
            .then(res => dispatch(createUserSuccess(res.data)))
            .catch(err => dispatch(createUserFailure(err.response.data)));
    }
}

/* This is how you test it. First you create an http interceptor with nock, create a mock store and then assert that the expected actions were dispatched to the store. */
it('should create action to create user', () => {
    const user = { name: 'test', email: 'test@email.com' };
    nock('http://localhost').post('/api/users', user).reply(200, user);
    const store = mockStore({ user: { list: [] } });
    return store.dispatch(createUser(user))
        .then(() => {
            expect(store.getActions()).toEqual([
                { type: CREATE_USER_REQUEST },
                { type: CREATE_USER_SUCCESS, payload: { user } }
            ]);
        });
});
```

#### 5. Testing reducers
- A reducer would say: “Just give me the current state and a description of what should be change along with data and I’ll change the part of the state I’m responsible for”
- Reducers are pure functions and should be very easy test.

```
/* This is the switch case in which a create user get's added to the store */
case CREATE_USER_SUCCESS:
    return {
        ...state,
        list: [payload.user, ...state.list],
        isCreatingUser: false,
        createUserFailureMessage: undefined
    };
```

#### 8.  How to run the application

1. `git clone git@github.com:leocristofani/testing-react-redux-applications.git`
2. `cd into testing-react-redux-applications`
3. `npm install`
4. `npm run build`
5. `node server/index.js`

*PS. This application was build with [Create React App](https://github.com/facebookincubator/create-react-app). Refer to the docs for further actions.*

#### 9. Links to useful resources

- [Writing tests section of the Redux docs](http://redux.js.org/docs/recipes/WritingTests.html)
- [Presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.2mmukevce)
- [What is a pure function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976#.c9omhz78d)
- Jest https://facebook.github.io/jest/
- Enzyme https://github.com/airbnb/enzyme
- Mock-redux-store http://arnaudbenard.com/redux-mock-store/
- Nock https://github.com/node-nock/nock

