import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import Button from '../Button'
import {Input} from '../formInputs'

import classes from './RegistrationForm.module.sass'
import {singUp} from '../../redux/actions/actionLogin'
import FormErrorMessage from '../FormErrorMessage'
import {defaultError} from '../../redux/actions/actionErrors'

function RegistrationForm({singUp, usernameError, emailError, passwordError,defaultError, isFetching, isLoggin, history}) {

	useEffect(() =>  defaultError(),[defaultError])

	const {register, handleSubmit, errors, reset} = useForm()

	const [usernameInput, setUsernameInput] = useState('')
	const [emailInput, setEmailInput] = useState('')
	const [passwordInput, setPasswordInput] = useState('')
	const [confirmPasswordInput, setConfirmPasswordInput] = useState('')

	const [confirmError, setConfirmError] = useState('')


	const reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:com|coop|edu|gov|info|ru|jobs|mil|mobi|museum|name|net|[a-z][a-z])$/

	if (isLoggin) history.push('/articles/page/1')

	useEffect(() => {
		reset()
	}, [reset,emailInput, passwordInput, confirmPasswordInput, usernameInput])

	const onSubmit = (data) => {
		if (passwordInput !== confirmPasswordInput) {
			setConfirmError('passwords are not match')
			return
		}
		setConfirmError('')
		const newUserObj = {
			username: data.username,
			email: data.email,
			password: data.password,
		}
		singUp(newUserObj)
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.title}>Create new account</div>
			<div className={classes['input-title']}>Username</div>
			<Input
				name="username"
				value={usernameInput}
				type="text"
				minLength="3"
				maxLength="20"
				required
				placeholder="Username"
				onInput={setUsernameInput}
				errorMessage={usernameError}
				ref={register({required: true, minLength: 3, maxLength: 20})}
			/>
			{errors.username && <FormErrorMessage serverError="username should be from 3 to 20 letters"/>}

			<div className={classes['input-title']}>Email address</div>
			<Input
				name="email"
				type="email"
				minLength="3"
				placeholder="Email"
				ref={register({required: true, pattern: reg})}
				required
				value={emailInput}
				errorMessage={emailError}
				onInput={setEmailInput}
			/>
			{errors.email && <FormErrorMessage serverError="Error email"/>}

			<div className={classes['input-title']}>Password</div>
			<Input
				name="password"
				type="password"
				minLength="6"
				maxLength="20"
				placeholder="Password"
				value={passwordInput}
				errorMessage={passwordError}
				onInput={setPasswordInput}
				required
				ref={register({required: true, minLength: 6, maxLength: 20})}
			/>
			{errors.password && <FormErrorMessage serverError="password must be from 6 to 20 letters"/>}

			<div className={classes['input-title']}>Confirm password</div>
			<Input
				name="confirm"
				type="password"
				minLength="6"
				maxLength="20"
				placeholder="Confirm password"
				value={confirmPasswordInput}
				onInput={setConfirmPasswordInput}
				ref={register({required: true, minLength: 6, maxLength: 20})}
			/>
			{confirmError && <FormErrorMessage serverError={confirmError}/>}

			<Button submit style={['wide', 'blue', 'margin-bottom']} disabled={isFetching} loading={isFetching}>
				Create
			</Button>
			<div className={classes['sing-in']}>
				Already have an account? <Link to="/sing-in">Sign In.</Link>
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
	history: PropTypes.object.isRequired,
	defaultError:PropTypes.func.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm))
