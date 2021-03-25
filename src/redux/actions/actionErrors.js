import {DEFAULT_ERROR, ERROR} from '../types'

export const setLogginError = message => ({type: ERROR, message})
export const defaultError = () => ({type: DEFAULT_ERROR})
