import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {useForm} from 'react-hook-form'
import {Redirect} from 'react-router'

import classNames from 'classnames'

import classes from './Profile.module.sass'
import {updateUser} from '../../redux/actions/actionLogin'
import FormErrorMessage from '../FormErrorMessage'

function Profile({
									 username,
									 email,
									 isLoggin,
									 setNewUserData,
									 isFetching,
									 usernameError,
									 emailError,
									 passwordError,
									 imageError,
									 image,
								 }) {
	const {register, handleSubmit, errors} = useForm()
	const regEmail = /^([a-z0-9_-]+)@([a-z0-9_-]+)\.([a-z]{2,6})$/

	const regUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g

	const [isProfileEdit, setIsProfileEdit] = useState(true)

	if (!isLoggin) {
		return <Redirect to='/sing-in'/>
	}

	const onSubmit = (data) => {

		for (const key in data) {
			if (data[key].length === 0) delete data[key]
		}
		if (data.email === email && data.username === username && !data.password) {
			setIsProfileEdit(false)
			return
		}
		setNewUserData(data)
	}
	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.title}>Profile</div>
			<div className={classes['input-title']}>Username</div>
			<input
				name="username"
				type="text"
				defaultValue={username}
				className={classNames(classes.input, usernameError ? classes['input-invalid'] : null)}
				ref={register({required: true, minLength: 3, maxLength: 20})}
			/>
			{(errors.username || usernameError)
			&& <FormErrorMessage serverError={usernameError || "username should be from 3 to 20 letters"}/>}

			<div className={['input-title']}>Email address</div>
			<input
				name="email"
				type="email"
				placeholder="Email"
				className={classNames(classes.input, emailError ? classes['input-invalid'] : null)}
				ref={register({required: true, pattern: regEmail, minLength: 3})}
				defaultValue={email}
			/>
			{(errors.email || emailError) &&
			<FormErrorMessage serverError={emailError || "Error email"}/>}
			<div className={classes['input-title']}>New password</div>
			<input
				name="password"
				type="password"
				minLength='6'
				placeholder="Password"
				className={classNames(classes.input, passwordError ? classes['input-invalid'] : null)}
				ref={register({minLength: 6, maxLength: 20})}
			/>
			{(errors.password || passwordError) &&
			<FormErrorMessage serverError={passwordError || "password must be from 6 to 20 letters"}/>}

			<div className={classes['input-title']}>Avatar image (url)</div>
			<input
				name="image"
				type="text"
				defaultValue={image}
				placeholder="Avatar URL"
				className={classNames(classes.input, passwordError ? classes['input-invalid'] : null)}
				ref={register({pattern: regUrl, minLength: 3})}
			/>
			{(errors.image || imageError) &&
			<FormErrorMessage serverError={imageError || "Invalid url"}/>}
			<button
				type='submit'
				className={classes.button}
				disabled={isFetching}
			>
				{isFetching ? 'loading' : 'Save'}
			</button>
			{!isProfileEdit && <div className={classes['input-title']}>Nothing to change</div>}
		</form>
	)
}

Profile.propTypes = {
	username: PropTypes.string,
	email: PropTypes.string,
	isLoggin: PropTypes.bool.isRequired,
	isFetching: PropTypes.bool.isRequired,
	setNewUserData: PropTypes.func.isRequired,
	usernameError: PropTypes.string,
	emailError: PropTypes.string,
	passwordError: PropTypes.string,
	imageError: PropTypes.string,
	image: PropTypes.string.isRequired,
}

Profile.defaultProps = {
	username: 'no username',
	email: '',
	usernameError: '',
	emailError: '',
	passwordError: '',
	imageError: '',
}

const mapStateToProps = (state) => ({
		isLoggin: state.user.isLoggin,
		isFetching: state.user.isLogginFetching,
		usernameError: state.user.errors.username?.[0],
		emailError: state.user.errors?.email?.[0],
		passwordError: state.user.errors?.password?.[0],
		imageError: state.user.errors.imageError,
		email: state.user.user?.email,
		username: state.user.user?.username
	}
)

const mapDispatchToProps = dispatch => ({
	setNewUserData: userObj => dispatch(updateUser(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
