import {ERROR} from '../types'

const initialState = {
	error: false,
	message: '',
}

function reduceErrors(state = initialState, action) {
	switch (action.type) {
		case ERROR:
			return {
				error: true,
				message: action.message,
			}
		default:
			return state
	}
}

export default reduceErrors
