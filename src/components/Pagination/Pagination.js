import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Pagination as AntdPagination} from 'antd'

import './Pagination.sass'

import pageSize from './pageSize'
import {changePage} from '../../redux/actions/actionPagination'

function Pagination({total, page, history, onChangePage}) {
	return (
		<AntdPagination
			size="small"
			total={total}
			current={page}
			pageSize={pageSize}
			showSizeChanger={false}
			onChange={(newPage) => {
				onChangePage(newPage)
				history.push(`/articles/page/${newPage}`)
			}}
		/>
	)
}

Pagination.propTypes = {
	total: PropTypes.number,
	page: PropTypes.number,
	history: PropTypes.object.isRequired,
	onChangePage:PropTypes.func.isRequired,
}

Pagination.defaultProps = {
	total: 20,
	page: 1,
}

const mapStateToProps = (state) => ({
	total: state.articles.totalCount,
})

const mapDispatchToProps = dispatch => ({
	onChangePage: newPage => dispatch(changePage(newPage))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pagination))
