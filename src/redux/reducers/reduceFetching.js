import {IS_FETCHING_OFF, IS_FETCHING_ON} from '../types'

function reduceFetching(state = false, action) {
  switch (action.type) {
    case IS_FETCHING_ON:
      return true
    case IS_FETCHING_OFF:
      return false
    default:
      return state
  }
}

export default reduceFetching
