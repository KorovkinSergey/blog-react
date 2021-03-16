import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import {useForm} from 'react-hook-form'

import classes from './SingInForm.module.sass'
import Button from '../Button'
import FormErrorMessage from '../FormErrorMessage'

import {Input} from '../formInputs'
import {singIn} from '../../redux/actions/actionLogin'

function SingInForm({singIn, isLoggin, history, isFetching, emailOrPasswordInvalid}) {
	const {register, handleSubmit} = useForm()

	const [emailInput, setEmailInput] = useState('')
	const [emailErrorMessage, setEmailErrorMessage] = useState('')

	const [passwordInput, setPasswordInput] = useState('')
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

	if (isLoggin) {
		history.push('/articles/page/1')
		return null // ?? это не проблема??
	}

	const onSubmit = (data) => {
		const isEmail = emailInput.includes('@', 0)

		if (isEmail === false) {
			setEmailErrorMessage('email should contain "@"')
			return
		}
		if (isEmail === true) setEmailErrorMessage('')

		const isPasswordValid = passwordInput.length > 7 && passwordInput.length < 41
		if (isPasswordValid === false) {
			setPasswordErrorMessage('password must be from 8 to 40 letters')
			return
		}
		if (isPasswordValid === true) {
			setPasswordErrorMessage('')
		}

		const newUserObj = {
			email: data.email,
			password: data.password,
		}
		singIn(newUserObj)
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.title}>Sing In</div>
			<div className={classes['input-title']}>Email address</div>
			<Input
				name="email"
				type="email"
				minLength="3"
				placeholder="Email"
				ref={register}
				required
				value={emailInput}
				errorMessage={emailErrorMessage}
				onInput={setEmailInput}
			/>
			<div className={classes['input-title']}>Password</div>
			<Input
				name="password"
				type="password"
				minLength="8"
				maxLength="40"
				placeholder="Password"
				value={passwordInput}
				errorMessage={passwordErrorMessage}
				onInput={setPasswordInput}
				ref={register}
				required
			/>
			<Button submit style={['wide', 'blue', 'margin-bottom']} disabled={isFetching} loading={isFetching}>
				Login
			</Button>
			{emailOrPasswordInvalid && <FormErrorMessage serverError="email or password is invalid"/>}
			<div className={classes['sing-up']}>
				Don’t have an account? <Link to="/sing-up">Sign Up.</Link>
			</div>
		</form>
	)
}

SingInForm.propTypes = {
	singIn: PropTypes.func.isRequired,
	isLoggin: PropTypes.bool.isRequired,
	history: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	emailOrPasswordInvalid: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
	const props = {
		isLoggin: state.user.isLoggin,
		isFetching: state.user.isLogginFetching,
		emailOrPasswordInvalid: false,
	}

	if (state.user.errors) props.emailOrPasswordInvalid = true

	return props
}

const mapDispatchToProps = dispatch => ({
	singIn: user => dispatch(singIn(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingInForm))
