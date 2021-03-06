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

export const register = ({ name, email, password }) => dispatch => {  
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password })

  axios.post('api/users/register', body, config)
    .then(res => {    
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    })
    .catch(error => {      
      dispatch(returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL'))      
      dispatch({
        type: REGISTER_FAIL
      })
    })
}

export const login = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  axios.post('api/auth', body, config)
    .then(res => {    
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    })
    .catch(error => {      
      dispatch(returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL'))
      dispatch({
        type: LOGIN_FAIL
      })
    })

}

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

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
      'Content-Type': 'application/json',      
    }
  }

  if (token) {
    config.headers['X-AUTH-TOKEN'] = token
  }

  return config
}