import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {useForm} from 'react-hook-form'
import {withRouter} from 'react-router'

import Button from '../Button'
import {Input} from '../formInputs'

import classes from './Profile.module.sass'
import {updateUser} from '../../redux/actions/actionLogin'
import FormErrorMessage from '../FormErrorMessage'

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
	const {register, handleSubmit, errors} = useForm()
	const regEmail =  /^([a-z0-9_-]+)@([a-z0-9_-]+)\.([a-z]{2,6})$/
	const regUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g


	const [emailInput, setEmailInput] = useState(email)
	const [usernameInput, setUsernameInput] = useState(username)
	const [imageInput, setImageInput] = useState(image)

	const [passwordInput, setPasswordInput] = useState('')

	const [isProfileEdit, setIsProfileEdit] = useState(true)

	if (!isLoggin) {
		history.push('/sing-in')
	}

	const onSubmit = (data) => {

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
				errorMessage={usernameError}
				ref={register({required: true, minLength: 3, maxLength: 20})}
			/>
			{errors.username && <FormErrorMessage serverError="username should be from 3 to 20 letters"/>}

			<div className={['input-title']}>Email address</div>
			<Input
				name="email"
				type="email"
				minLength="3"
				placeholder="Email"
				ref={register({required: true, pattern: regEmail})}
				required
				value={emailInput}
				errorMessage={emailError}
				onInput={setEmailInput}
			/>
			{errors.email && <FormErrorMessage serverError="Error email"/>}
			<div className={classes['input-title']}>New password</div>
			<Input
				name="password"
				type="password"
				minLength="8"
				maxLength="40"
				placeholder="Password"
				value={passwordInput}
				errorMessage={passwordError}
				onInput={setPasswordInput}
				ref={register({minLength: 6, maxLength: 20})}
			/>
			{errors.password && <FormErrorMessage serverError="password must be from 6 to 20 letters"/>}

			<div className={classes['input-title']}>Avatar image (url)</div>
			<Input
				name="image"
				type="text"
				minLength="3"
				placeholder="Avatar URL"
				ref={register({required: true, pattern: regUrl})}
				value={imageInput}
				errorMessage={imageError}
				onInput={setImageInput}
			/>
			{errors.image && <FormErrorMessage serverError="Invalid url"/>}
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
