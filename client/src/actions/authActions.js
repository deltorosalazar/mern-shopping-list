import axios from 'axios'
import { 
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types'
import { returnErrors  } from './errorActions'

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(response => dispatch({
      type: USER_LOADED,
      payload: response.data
    }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status))
      dispatch({
        type: AUTH_ERROR        
      })
    })
}

export const tokenConfig = (getState) => {
  const token = getState().auth.token

  const config = {
    headers: {
      'Content-Type': 'appplication/json',      
    }
  }

  if (token) {
    config.headers['X-AUTH-TOKEN'] = token
  }

  return config
}