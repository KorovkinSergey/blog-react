import {IS_FETCHING_OFF, IS_FETCHING_ON} from '../types'

export const isFetchingOn = () => ({ type: IS_FETCHING_ON })

export const isFetchingOff = () => ({ type: IS_FETCHING_OFF })
