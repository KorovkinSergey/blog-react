import React from 'react'
import PropTypes from 'prop-types'
import classes from './FormErrorMessage.module.sass'

function FormErrorMessage({serverError}) {
	if (!serverError) return null

	return <span className={classes.error}>{serverError}</span>
}

FormErrorMessage.propTypes = {
	serverError: PropTypes.string,
}

FormErrorMessage.defaultProps = {
	serverError: '',
}

export default FormErrorMessage
