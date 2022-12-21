export enum ActionTypes {
  REGISTER = '[Auth] Sign in',
  REGISTER_SUCCESS = '[Auth] Sign in success',
  REGISTER_ERROR = '[Auth] Sign in error',

  LOGIN = '[Auth] Log in',
  LOGIN_SUCCESS = '[Auth] Log in success',
  LOGIN_FAILURE = '[Auth] Log in failure',

  GET_CURRENT_USER = '[Auth] Get current user',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get current user success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get current user failure',

  UPDATE_CURRENT_USER = '[Auth] Update current user',
  UPDATE_CURRENT_USER_SUCCESS = '[Auth] Update current user success',
  UPDATE_CURRENT_USER_FAILURE = '[Auth] Update current user failure',
}
