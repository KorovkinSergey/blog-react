import {CHANGE_PAGE} from '../types'

export function changePage(page) {
	return {type: CHANGE_PAGE, action: page}
}
