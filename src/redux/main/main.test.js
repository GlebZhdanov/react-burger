import {reducer} from "./reducer";
import {initialState} from "./reducer";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import {
  REGISTRATION_ERROR,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR
} from "../types/action";
import {authorizationUser,getUser,loginOut,patchUser,registrationUser} from "./actions";
import {userDataTest} from "../../utils/constain";

describe('check main reducer', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({result: "OK"}),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return initial state main', () => {
    expect(reducer(undefined,{})).toEqual(initialState)
  })

  it('should action after dispatched registrationUser', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({});

    const expectedAction = [
      {type: REGISTRATION_REQUEST},
      {type: REGISTRATION_SUCCESS},
    ]

    return store.dispatch(registrationUser({password: '', email: '', name: ''}))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('should action after dispatched authorizationUser', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({});

    const expectedAction = [
      {type: LOGIN_REQUEST},
      {type: LOGIN_SUCCESS, payload: {"result": "OK"}},
    ]

    return store.dispatch(authorizationUser({password: '', email: ''}))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('should action after dispatched getUser', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({});

    const expectedAction = [
      {type: USER_REQUEST},
      {type: USER_SUCCESS, payload: {"result": "OK"}},
    ]

    return store.dispatch(getUser())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('should action after dispatched patchUser', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({});

    const expectedAction = [
      {type: PATCH_USER_REQUEST},
      {type: PATCH_USER_SUCCESS, payload: {"result": "OK"}},
    ]

    return store.dispatch(patchUser({password: '', email: '', name: ''}))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('should action after dispatched loginOut', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({});

    const expectedAction = [
      {type: LOGOUT_USER_REQUEST},
      {type: LOGOUT_USER_SUCCESS},
    ]

    return store.dispatch(loginOut())
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('should has changed on action REGISTRATION_ERROR', () => {
    expect(reducer(initialState, {
      type: REGISTRATION_ERROR,
    })).toEqual({
      ...initialState,
      registrationSuccess: false,
      registrationError: true,
    })
  })

  it('should has changed on action REGISTRATION_REQUEST', () => {
    expect(reducer(initialState, {
      type: REGISTRATION_REQUEST,
    })).toEqual({
      ...initialState,
      registrationRequest: true,
    })
  })

  it('should has changed on action REGISTRATION_SUCCESS', () => {
    expect(reducer(initialState, {
      type: REGISTRATION_SUCCESS,
    })).toEqual({
      ...initialState,
      registrationSuccess: true,
      isToken: true,
    })
  })

  it('should has changed on action LOGIN_REQUEST', () => {
    expect(reducer(initialState, {
      type: LOGIN_REQUEST,
    })).toEqual({
      ...initialState,
      authorizationRequest: true,
    })
  })

  it('should has changed on action LOGIN_SUCCESS', () => {
    expect(reducer(initialState, {
      type: LOGIN_SUCCESS,
      payload: userDataTest
    })).toEqual({
      ...initialState,
      authorizationSuccess: true,
      isToken: true,
      name: userDataTest.user.name,
      email: userDataTest.user.email,
    })
  })

  it('should has changed on action LOGIN_ERROR', () => {
    expect(reducer(initialState, {
      type: LOGIN_ERROR,
    })).toEqual({
      ...initialState,
      authorizationSuccess: false,
      authorizationError: true,
    })
  })

  it('should has changed on action USER_REQUEST', () => {
    expect(reducer(initialState, {
      type: USER_REQUEST,
    })).toEqual({
      ...initialState,
      userRequest: true,
    })
  })

  it('should has changed on action USER_SUCCESS', () => {
    expect(reducer(initialState, {
      type: USER_SUCCESS,
      payload: userDataTest
    })).toEqual({
      ...initialState,
      userSuccess: true,
      authorizationSuccess: true,
      isToken: true,
      name: userDataTest.user.name,
      email: userDataTest.user.email,
    })
  })

  it('should has changed on action USER_ERROR', () => {
    expect(reducer(initialState, {
      type: USER_ERROR,
    })).toEqual({
      ...initialState,
      userSuccess: false,
      userError: true,
    })
  })

  it('should has changed on action PATCH_USER_REQUEST', () => {
    expect(reducer(initialState, {
      type: PATCH_USER_REQUEST,
    })).toEqual({
      ...initialState,
      patchUserRequest: true,
    })
  })

  it('should has changed on action PATCH_USER_SUCCESS', () => {
    expect(reducer(initialState, {
      type: PATCH_USER_SUCCESS,
      payload: userDataTest
    })).toEqual({
      ...initialState,
      patchUserSuccess: true,
      isToken: true,
      name: userDataTest.user.name,
      email: userDataTest.user.email,
    })
  })

  it('should has changed on action PATCH_USER_ERROR', () => {
    expect(reducer(initialState, {
      type: PATCH_USER_ERROR,
    })).toEqual({
      ...initialState,
      patchUserSuccess: false,
      patchUserError: true,
    })
  })

  it('should has changed on action LOGOUT_USER_REQUEST', () => {
    expect(reducer(initialState, {
      type: LOGOUT_USER_REQUEST,
    })).toEqual({
      ...initialState,
      logOutUserRequest: true,
    })
  })

  it('should has changed on action LOGOUT_USER_SUCCESS', () => {
    expect(reducer(initialState, {
      type: LOGOUT_USER_SUCCESS,
    })).toEqual({
      ...initialState,
      authorizationSuccess: false,
      logOutUserSuccess: true,
      registrationSuccess: false,
      isToken: false,
    })
  })

  it('should has changed on action LOGOUT_USER_ERROR', () => {
    expect(reducer(initialState, {
      type: LOGOUT_USER_ERROR,
    })).toEqual({
      ...initialState,
      logOutUserSuccess: false,
      logOutUserError: true,
    })
  })

})
