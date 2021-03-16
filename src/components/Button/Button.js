import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import classes from './Button.module.sass'

function createRipple(event) {
	const button = event.target

	const circle = document.createElement('span')
	const diameter = Math.max(button.clientWidth, button.clientHeight)
	const radius = diameter / 2

	const styleDiametr = `${diameter}px`

	circle.style.width = styleDiametr
	circle.style.height = styleDiametr
	circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`
	circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`
	circle.classList.add(classes.ripple)

	const ripple = button.getElementsByClassName(classes.ripple)[0]

	if (ripple) {
		ripple.remove()
	}

	button.appendChild(circle)
}

function Button({children, style, submit, disabled, loading, onClick}) {
	let styles = null

	if (Array.isArray(style)) {
		styles = style.map((i) => classes[i])
	}

	const resultClass = classNames(classes.base, styles)

	return (
		<button
			className={resultClass}
			type={submit ? 'submit' : 'button'}
			disabled={disabled}
			onClick={(e) => {
				createRipple(e)
				onClick()
			}}
		>
			{loading ? 'loading' : children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.string,
	style: PropTypes.array,
	submit: PropTypes.bool,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	onClick: PropTypes.func,
}

Button.defaultProps = {
	children: 'Click Me',
	style: [],
	submit: false,
	disabled: false,
	loading: false,
	onClick: () => {
	},
}

export default Button
