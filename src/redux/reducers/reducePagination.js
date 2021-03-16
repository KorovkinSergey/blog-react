import {CHANGE_PAGE} from '../types'

function reducePagination(state = 1, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return action
    default:
      return state
  }
}

export default reducePagination
