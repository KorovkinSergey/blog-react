import setTokenToLocaleStorage from '../../localStorage/setTokenToLocaleStorage'
import setUsernameToLocaleStorage from '../../localStorage/setUsernameToLocaleStorage'
import {
	DEFAULT_ERROR,
	LOG_OUT,
	LOGIN_IS_FETCHING_OFF,
	LOGIN_IS_FETCHING_ON,
	SING_IN,
	SING_IN_WITH_TOKEN,
	SING_UP,
	UPDATE_USER
} from '../types'

const initialState = {
	user: {},
	isLoggin: false,
	isLogginFetching: false,
	errors: {
		email: [''],
		password: [''],
		username: ['']
	}
}

function reduceLogging(state = initialState, action) {
	switch (action.type) {
		case LOGIN_IS_FETCHING_ON:
			return {
				...state,
				isLogginFetching: true,
			}
		case LOGIN_IS_FETCHING_OFF:
			return {
				...state,
				isLogginFetching: false,
			}
		case SING_UP:
			return {
				...state,
				...action.user,
				isLoggin: action.user.errors === undefined,
				isLogginFetching: false,
			}
		case SING_IN:
			return {
				...state,
				errors: {...state.errors, ...action.user.errors},
				isLoggin: action.user.errors === undefined,
				isLogginFetching: false,
			}
		case SING_IN_WITH_TOKEN:
			return {
				...state,
				...action.user,
				isLoggin: action.user.errors === undefined,
				isLogginFetching: false,
			}
		case UPDATE_USER:
			return {
				...state,
				...action.user,
				errors: {...initialState.errors, ...action.errors},
				isLogginFetching: false,
			}
		case DEFAULT_ERROR:
			return {...state, errors: initialState.errors}
		case LOG_OUT:
			setUsernameToLocaleStorage('')
			setTokenToLocaleStorage('')
			return {...initialState}
		default:
			return state
	}
}

export default reduceLogging
