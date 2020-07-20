import { AUTH } from '../actions/types.action';

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    token: null,
    uid: null,
    user: null,
    authSource: null,
    isSigningUp: false
};

export function auth(state = initialState, action) {
  switch (action.type) {
    
    case AUTH.LOGIN.REQUEST:
      return Object.assign({}, state, {
        isLoggingIn: true,
        authSource: action.authSource
      });

    case AUTH.LOGIN.SUCCESS:
      return Object.assign({}, state, {
        isLoggingIn: false,
        isLoggedIn: true,
        token: action.token,
        uid: action.uid,
        user: action.user
      });

    case AUTH.LOGIN.FAILED:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoggingIn: false,
        authSource: null,
      });
      
    case AUTH.LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        isLoggingIn: false,
        authSource: null,
        token: null,
        uid: null,
        user: null
      });

    case AUTH.SIGNUP.REQUEST:
      return Object.assign({}, state, {
        isSigningUp: true,
      });
      
    case AUTH.SIGNUP.SUCCESS:
        return Object.assign({}, state, {
          isSigningUp: false,
        });
    default:
      return state;
  }
}
