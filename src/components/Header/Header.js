import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import classNames from 'classnames'
import deleteUserfromLocaleStorage from '../../localStorage/deleteUserfromLocaleStorage'

import avatar from '../../img/avatar.png'

import classes from './Header.module.sass'
import {logOut} from '../../redux/actions/actionLogin'

function Header({isLoggin, userName, imgUrl, logOut}) {
	const img = imgUrl || avatar

	function loggingOut() {
		logOut()
		deleteUserfromLocaleStorage()
	}

	return (
		<header className={classes.header}>
			<Link to="/">
				<div className={classes.title}>Realworld Blog</div>
			</Link>
			<div className={classes.wrapper}>
				{isLoggin && (
					<>
						<Link to="/new-article">
							<button
								type='button'
								className={classNames(classes.button,classes.small)}>
								Create article
							</button>
						</Link>
						<div className={classes.username}>{userName}</div>
						<Link to="/profile">
							<div className={classes.avatar}>
								<img src={img} alt="avatar"/>
							</div>
						</Link>
						<button
							type='button'
							className={classNames(classes.button,classes.outlined)}
							onClick={loggingOut}>
							Log Out
						</button>
					</>
				)}

				{!isLoggin && (
					<>
						<Link to="/sign-in">
							<button
								type='button'
								className={classNames(classes.button,classes.outlined)}
							>Sign In</button>
						</Link>
						<Link to="/sign-up">
							<button
								type='button'
								className={classNames(classes.button,classes.outlined,classes.green)}
							>Sign Up</button>
						</Link>
					</>
				)}
			</div>
		</header>
	)
}

Header.propTypes = {
	isLoggin: PropTypes.bool.isRequired,
	userName: PropTypes.string,
	imgUrl: PropTypes.string,
	logOut: PropTypes.func.isRequired,
}

Header.defaultProps = {
	userName: '',
	imgUrl: '',
}

const mapStateToProps = (state) => {
	const props = {
		isLoggin: state.user.isLoggin,
	}

	if (state.user.user) {
		props.userName = state.user.user.username
		props.imgUrl = state.user.user.image || ''
	}

	return props
}

const mapDispatchToProps = (dispatch) => ({
	logOut: () => dispatch(logOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
