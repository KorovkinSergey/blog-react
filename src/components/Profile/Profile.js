import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {useForm} from 'react-hook-form'
import {withRouter} from 'react-router'

import Button from '../Button'
import {Input} from '../formInputs'

import classes from './Profile.module.sass'
import {updateUser} from '../../redux/actions/actionLogin'

function Profile({
									 username,
									 email,
									 isLoggin,
									 history,
									 setNewUserData,
									 isFetching,
									 usernameError,
									 emailError,
									 passwordError,
									 imageError,
									 image,
								 }) {
	const {register, handleSubmit} = useForm()

	const [emailInput, setEmailInput] = useState(email)
	const [emailErrorMessage, setEmailErrorMessage] = useState('')

	const [usernameInput, setUsernameInput] = useState(username)
	const [usernameErrorMessage, setUsernameErrorMessage] = useState('')

	const [imageInput, setImageInput] = useState(image)
	const [imageInputErrorMessage, setImageInputErrorMessage] = useState('')

	const [passwordInput, setPasswordInput] = useState('')
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

	const [isProfileEdit, setIsProfileEdit] = useState(true)

	if (!isLoggin) {
		history.push('/sing-in')
	}

	const onSubmit = (data) => {
		const isEmail = emailInput.includes('@', 0)
		if (isEmail === false) {
			setEmailErrorMessage('email should contain "@"')
			return
		}
		if (isEmail === true) setEmailErrorMessage('')

		const validUserName = usernameInput.length > 2 && usernameInput.length < 21
		if (validUserName === false) {
			setUsernameErrorMessage('username should be from 3 to 20 letters')
			return
		}
		if (validUserName !== false) {
			setUsernameErrorMessage('')
		}

		const validImage = imageInput.length > 5 || imageInput.length === 0
		if (validImage === false) {
			setImageInputErrorMessage('it is too short URL')
			return
		}
		if (validImage === true) setImageInputErrorMessage('')


		const isPasswordValid = (passwordInput.length > 7 && passwordInput.length < 41) || passwordInput.length === 0
		if (isPasswordValid === false) {
			setPasswordErrorMessage('password must be from 8 to 40 letters')
			return
		}
		if (isPasswordValid === true) {
			setPasswordErrorMessage('')
		}

		for (const key in data) {
			if (data[key].length === 0) delete data[key]
		}

		if (emailInput === email && usernameInput === username && passwordInput.length === 0 && imageInput === image) {
			setIsProfileEdit(false)
			return
		}

		setNewUserData(data)
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.title}>Profile</div>
			<div className={classes['input-title']}>Username</div>
			<Input
				name="username"
				value={usernameInput}
				type="text"
				minLength="3"
				maxLength="20"
				placeholder=""
				onInput={setUsernameInput}
				errorMessage={usernameError || usernameErrorMessage}
				ref={register}
			/>
			<div className={['input-title']}>Email address</div>
			<Input
				name="email"
				type="email"
				minLength="3"
				placeholder="Email"
				ref={register}
				required
				value={emailInput}
				errorMessage={emailError || emailErrorMessage}
				onInput={setEmailInput}
			/>
			<div className={classes['input-title']}>New password</div>
			<Input
				name="password"
				type="password"
				minLength="8"
				maxLength="40"
				placeholder="Password"
				value={passwordInput}
				errorMessage={passwordError || passwordErrorMessage}
				onInput={setPasswordInput}
				ref={register}
			/>

			<div className={classes['input-title']}>Avatar image (url)</div>
			<Input
				name="image"
				type="text"
				minLength="3"
				placeholder="Avatar URL"
				ref={register}
				value={imageInput}
				errorMessage={imageError || imageInputErrorMessage}
				onInput={setImageInput}
			/>

			<Button submit style={['wide', 'blue', 'margin-bottom']} disabled={isFetching} loading={isFetching}>
				Save
			</Button>
			{!isProfileEdit && <div className={classes['input-title']}>Nothing to change</div>}
		</form>
	)
}

Profile.propTypes = {
	username: PropTypes.string,
	email: PropTypes.string,
	isLoggin: PropTypes.bool.isRequired,
	history: PropTypes.object.isRequired,
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

const mapStateToProps = (state) => {
	const props = {
		isLoggin: false,
		isFetching: state.isFetching,
	}

	if (state.user.errors) {
		const {errors} = state.user
		if (errors.username) props.usernameError = errors.username
		if (errors.email) props.emailError = errors.email
		if (errors.password) props.passwordError = errors.password
		if (errors.image) props.imageError = errors.image
	}

	const userInState = state.user.user
	const {isLoggin} = state.user

	if (userInState && isLoggin) {
		props.username = userInState.username
		props.email = userInState.email
		props.isLoggin = isLoggin
		props.image = userInState.image
	}

	return props
}

const mapDispatchToProps = dispatch => ({
	setNewUserData: userObj => dispatch(updateUser(userObj))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
