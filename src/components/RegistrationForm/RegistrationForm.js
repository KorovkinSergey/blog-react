import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'
import classNames from 'classnames'

import classes from './RegistrationForm.module.sass'
import {singUp} from '../../redux/actions/actionLogin'
import FormErrorMessage from '../FormErrorMessage'
import {defaultError} from '../../redux/actions/actionErrors'

function RegistrationForm({
														singUp,
														usernameError,
														emailError,
														passwordError,
														defaultError,
														isFetching,
														isLoggin,
													}) {

	useEffect(() => defaultError(), [defaultError])

	const {register, handleSubmit, errors} = useForm()

	const [confirmError, setConfirmError] = useState('')

	const reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:com|coop|edu|gov|info|ru|jobs|mil|mobi|museum|name|net|[a-z][a-z])$/

	if (isLoggin) {
		return <Redirect to='/articles/page/1'/>
	}

	const onSubmit = (data) => {
		if (data.password !== data.confirm) {
			setConfirmError('passwords are not match')
			return
		}
		setConfirmError('')
		singUp({
			username: data.username,
			email: data.email,
			password: data.password,
		})
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.title}>Create new account</div>
			<div className={classes['input-title']}>Username</div>
			<input
				name="username"
				type="text"
				placeholder="Username"
				className={classNames(classes.input, usernameError ? classes['input-invalid'] : null)}
				ref={register({required: true, minLength: 3, maxLength: 20})}
			/>
			{(errors.username || usernameError) &&
			<FormErrorMessage serverError={usernameError || "Error name"}/>}

			<div className={classes['input-title']}>Email address</div>
			<input
				name="email"
				type="email"
				placeholder="Email"
				className={classNames(classes.input, emailError ? classes['input-invalid'] : null)}
				ref={e => register(e, {required: true, pattern: reg, minLength: 3})}
			/>
			{(errors.email || emailError) &&
			<FormErrorMessage serverError={emailError || 'Error email'}/>}

			<div className={classes['input-title']}>Password</div>
			<input
				name="password"
				type="password"
				placeholder="Password"
				className={classNames(classes.input, passwordError ? classes['input-invalid'] : null)}
				ref={register({required: true, minLength: 6, maxLength: 20})}
			/>
			{(errors.password || passwordError) &&
			<FormErrorMessage serverError={passwordError || "password must be from 6 to 20 letters"}/>}

			<div className={classes['input-title']}>Confirm password</div>
			<input
				name="confirm"
				type="password"
				placeholder="Confirm password"
				className={classNames(classes.input, confirmError ? classes['input-invalid'] : null)}
				ref={register({required: true, minLength: 6, maxLength: 20})}
			/>
			{confirmError && <FormErrorMessage serverError={confirmError}/>}

			<button
				type='submit'
				className={classNames(classes.button)}
				disabled={isFetching}>
				{isFetching ? 'loading' : 'Create'}
			</button>
			<div className={classes['sing-in']}>
				Already have an account? <Link to="/sign-in">Sign In.</Link>
			</div>
		</form>
	)
}

RegistrationForm.propTypes = {
	singUp: PropTypes.func.isRequired,
	usernameError: PropTypes.string,
	emailError: PropTypes.string,
	passwordError: PropTypes.string,
	isFetching: PropTypes.bool.isRequired,
	isLoggin: PropTypes.bool,
	defaultError: PropTypes.func.isRequired,
}

RegistrationForm.defaultProps = {
	usernameError: '',
	emailError: '',
	passwordError: '',
	isLoggin: false,
}

const mapStateToProps = (state) => ({
	isFetching: state.user.isLogginFetching,
	isLoggin: state.user.isLoggin,
	usernameError: state.user.errors.username[0],
	emailError: state.user.errors.email[0],
	passwordError: state.user.errors.password[0]
})

const mapDispatchToProps = (dispatch) => ({
	singUp: (user) => dispatch(singUp(user)),
	defaultError: () => dispatch(defaultError())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
