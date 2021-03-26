import {
	LOG_OUT,
	LOGIN_IS_FETCHING_OFF,
	LOGIN_IS_FETCHING_ON,
	SING_IN,
	SING_IN_WITH_TOKEN,
	UPDATE_USER
} from '../types'
import realWorldService from '../../API/RealWorldService'
import {setLogginError} from './actionErrors'

export const isLogginFetchingOn = () => ({type: LOGIN_IS_FETCHING_ON})

export const isLogginFetchingOff = () => ({type: LOGIN_IS_FETCHING_OFF})

export const logOut = () => ({type: LOG_OUT})

export function singUp(userObj) {
	return async dispatch => {
		dispatch(isLogginFetchingOn())
		try {
			const result = await realWorldService.registerNewUser(userObj)
			const action = {
				type: SING_IN,
				user: {...result},
			}
			dispatch(action)
		} catch (e) {
			dispatch(isLogginFetchingOff())
			dispatch(setLogginError(e.message))
		}
	}
}

export function singIn(userObj) {
	return async dispatch => {
		dispatch(isLogginFetchingOn())

		try {
			const result = await realWorldService.singIn(userObj)
			const action = {
				type: SING_IN,
				user: {...result},
			}
			dispatch(action)
		} catch (e) {
			dispatch(isLogginFetchingOff())
			dispatch(setLogginError(e.message))
		}
	}
}

export function singInWithToken() {
	return async dispatch => {
		dispatch(isLogginFetchingOn())

		try {
			const result = await realWorldService.singIn()
			const action = {
				type: SING_IN_WITH_TOKEN,
				user: {...result},
			}
			dispatch(action)
		} catch (e) {
			dispatch(isLogginFetchingOff())
			dispatch(setLogginError(e.message))
		}
	}
}

export function updateUser(userObj) {
	return async dispatch => {
		dispatch(isLogginFetchingOn())
		try {
			const result = await realWorldService.updateUser(userObj)
			const action = {
				type: UPDATE_USER,
				errors: '',
			}
			if (result.errors) action.errors = result.errors
			if (!result.errors) action.user = {...result}
			dispatch(action)
		} catch (e) {
			dispatch(isLogginFetchingOff())
			dispatch(setLogginError(e.message))
		}
	}
}
