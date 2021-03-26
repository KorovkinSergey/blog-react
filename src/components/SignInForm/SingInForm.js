import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'
import {useForm} from 'react-hook-form'

import classNames from 'classnames'
import classes from './SingInForm.module.sass'

import FormErrorMessage from '../FormErrorMessage'
import {singIn} from '../../redux/actions/actionLogin'
import {defaultError} from '../../redux/actions/actionErrors'

function SingInForm({singIn, isLoggin, isFetching, defaultError, emailOrPasswordInvalid}) {

	useEffect(() => defaultError(), [defaultError])

	const {register, handleSubmit, errors} = useForm()

	const reg = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:com|coop|edu|gov|info|ru|jobs|mil|mobi|museum|name|net|[a-z][a-z])$/

	if (isLoggin) return <Redirect to='/articles/page/1'/>

	const onSubmit = (data) => {
		singIn({
			email: data.email,
			password: data.password,
		})
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.title}>Sing In</div>
			<div className={classes['input-title']}>Email address</div>
			<input
				name="email"
				type="email"
				placeholder="Email"
				className={classNames(classes.input, errors.email ? classes['input-invalid'] : null)}
				ref={register({required: true, pattern: reg, minLength: 3})}
			/>
			{errors.email && <FormErrorMessage serverError="Error email"/>}

			<div className={classes['input-title']}>Password</div>
			<input
				name="password"
				type="password"
				placeholder="Password"
				className={classNames(classes.input, errors.password ? classes['input-invalid'] : null)}
				ref={register({required: true, minLength: 6, maxLength: 20})}
			/>
			{errors.password && <FormErrorMessage serverError="password must be from 6 to 20 letters"/>}
			<button
				type='submit'
				className={classes.button}
				disabled={isFetching}
			>
				{isFetching ? 'loading' : 'Login'}
			</button>
			{emailOrPasswordInvalid && <FormErrorMessage serverError="email or password is invalid"/>}
			<div className={classes['sing-up']}>
				Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
			</div>
		</form>
	)
}

SingInForm.propTypes = {
	singIn: PropTypes.func.isRequired,
	isLoggin: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	emailOrPasswordInvalid: PropTypes.bool.isRequired,
	defaultError: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	isLoggin: state.user.isLoggin,
	isFetching: state.user.isLogginFetching,
	emailOrPasswordInvalid: !!state.user.errors['email or password'],
})

const mapDispatchToProps = dispatch => ({
	singIn: user => dispatch(singIn(user)),
	defaultError: () => dispatch(defaultError())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingInForm)
