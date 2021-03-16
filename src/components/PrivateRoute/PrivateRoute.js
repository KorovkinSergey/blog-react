import React from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'


function PrivateRoute({Component, render, ...rest}) {

	if (Component !== false) return <Route {...rest} component={Component}/>

	if (Component === false) return <Route {...rest} render={render}/>

}

PrivateRoute.propTypes = {
	Component: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
	render: PropTypes.func,
}

PrivateRoute.defaultProps = {
	Component: false,
	render: () => {
	},
}


export default PrivateRoute
