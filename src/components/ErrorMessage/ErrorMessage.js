import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

function ErrorMessage({ description }) {
  return <Alert message="Error" description={description} showIcon type="error" />
}

ErrorMessage.propTypes = {
  description: PropTypes.string,
}

ErrorMessage.defaultProps = {
  description: 'no error message :(',
}

export default ErrorMessage
