import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Button from '../Button'
import { Input, Checkbox } from '../formInputs'

import classes from './RegistrationForm.module.sass'
import {singUp} from '../../redux/actions/actionLogin'

function RegistrationForm({ singUp, usernameError, emailError, passwordError, isFetching, isLoggin, history }) {
  const [emailInput, setEmailInput] = useState('')
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [usernameInput, setUsernameInput] = useState('')
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')

  const [passwordInput, setPasswordInput] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')
  const [confirmPasswordInputErrorMessage, setConfirmPasswordInputErrorMessage] = useState('')

  const { register, handleSubmit } = useForm()

  if (isLoggin) {
    history.push('/articles/page/1')
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
    if (validUserName === true) {
      setUsernameErrorMessage('')
    }

    const isPasswordValid = passwordInput.length > 7 && passwordInput.length < 41
    if (isPasswordValid === false) {
      setPasswordErrorMessage('password must be from 8 to 40 letters')
      return
    }
    if (isPasswordValid === true) {
      setPasswordErrorMessage('')
    }

    const confirmPassword = passwordInput === confirmPasswordInput
    if (confirmPassword === false) {
      setConfirmPasswordInputErrorMessage('passwords are not match')
      return
    }
    if (confirmPassword === true) {
      setConfirmPasswordInputErrorMessage('')
    }
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
        errorMessage={usernameError || usernameErrorMessage}
        ref={register}
      />

      <div className={classes['input-title']}>Email address</div>
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
      <div className={classes['input-title']}>Password</div>
      <Input
        name="password"
        type="password"
        minLength="8"
        maxLength="40"
        placeholder="Password"
        value={passwordInput}
        errorMessage={passwordError || passwordErrorMessage}
        onInput={setPasswordInput}
        required
        ref={register}
      />
      <div className={classes['input-title']}>Confirm password</div>
      <Input
        name="confirm password"
        type="password"
        minLength="8"
        maxLength="40"
        placeholder="Confirm password"
        value={confirmPasswordInput}
        errorMessage={confirmPasswordInputErrorMessage}
        onInput={setConfirmPasswordInput}
        required
      />
      <hr />
      <Checkbox description="I agree to the processing of my personal information" required />

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
}

RegistrationForm.defaultProps = {
  usernameError: '',
  emailError: '',
  passwordError: '',
  isLoggin: false,
}

const mapStateToProps = (state) => {
  const { user } = state
  const props = {
    isFetching: state.user.isLogginFetching,
    isLoggin: user.isLoggin,
  }
  if (user.errors) {
    if (user.errors.username) props.usernameError = '' || user.errors.username[0]
    if (user.errors.email) props.emailError = '' || user.errors.email[0]
    if (user.errors.password) props.passwordError = '' || user.errors.password[0]
  }

  return props
}

const mapDispatchToProps = (dispatch) => ({
  singUp: (user) => dispatch(singUp(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm))
