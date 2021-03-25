import React, {useState, useEffect} from 'react'
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
import {defaultError} from '../../redux/actions/actionErrors'

function SingInForm({singIn, isLoggin, history, isFetching,defaultError, emailOrPasswordInvalid}) {

	useEffect(() => defaultError(),[defaultError])


	const {register, handleSubmit, errors, reset} = useForm()

	const [emailInput, setEmailInput] = useState('')
	const [passwordInput, setPasswordInput] = useState('')
	const reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:com|coop|edu|gov|info|ru|jobs|mil|mobi|museum|name|net|[a-z][a-z])$/

	useEffect(() => {
		reset()
	}, [reset,emailInput, passwordInput])

	if (isLoggin) {
		history.push('/articles/page/1')
		return null
	}



	const onSubmit = (data) => {
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
				ref={register({required: true, pattern: reg})}
				required
				value={emailInput}
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
				onInput={setPasswordInput}
				required
				ref={register({required: true, minLength: 6, maxLength: 20})}
			/>
			{errors.password && <FormErrorMessage serverError="password must be from 6 to 20 letters"/>}

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
	defaultError:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
	const props = {
		isLoggin: state.user.isLoggin,
		isFetching: state.user.isLogginFetching,
		emailOrPasswordInvalid: !!state.user.errors['email or password'],
	}
	return props
}

const mapDispatchToProps = dispatch => ({
	singIn: user => dispatch(singIn(user)),
	defaultError: () => dispatch(defaultError())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingInForm))
