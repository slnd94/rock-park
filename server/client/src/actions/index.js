import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS } from './types'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token)
  // /api/stripe will return the user model, because it
  // contains the updated number of credits (or cart),
  // so we will use the FETCH_USER action type here
  // to update state.auth
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitSurvey = (values, history) => async dispatch => {
  // /api/surveys will return the user model, because it
  // contains the updated number of credits (or cart),
  // so we will use the FETCH_USER action type here
  // to update state.auth
  const res = await axios.post('/api/surveys', values)
  history.push('/surveys')
  dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys')
  dispatch({ type: FETCH_SURVEYS, payload: res.data })
}