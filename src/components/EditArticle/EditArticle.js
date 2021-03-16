import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import throttle from 'lodash.throttle'
import {withRouter} from 'react-router'

import LoadingBar from '../LoadingBar'
import ErrorMessage from '../ErrorMessage'
import NewArticle from '../NewArticle'
import getUsernameFromLocaleSorage from '../../localStorage/getUsernameFromLocaleSorage'
import {getOneArticle} from '../../redux/actions/actionArticles'

function EditArticle({articles, id, getArticleById, isFetching, error, errorMessage, isLoggin, username, history}) {
	if (username === null) username = getUsernameFromLocaleSorage()

	const article = articles.find((item) => item.slug === id)

	if (article && article.author.username !== username) {
		history.push(`/article/${id}`)
		return null
	}

	if (article) {
		const {title, description, body, tagList} = article

		return (
			<NewArticle
				title="Edit article"
				articleTitle={title}
				articleDescription={description}
				articleBody={body}
				loading={isFetching}
				isLoggin={isLoggin}
				id={id}
				articleTagList={tagList}
			/>
		)
	}

	const throttleGetArticleById = throttle(() => {
		if (article === undefined) return getArticleById(id)

		return null
	}, 300)

	if (article === undefined && !isFetching && !error) throttleGetArticleById()

	if (isFetching) return <LoadingBar/>

	if (error) return <ErrorMessage description={errorMessage}/>

	return <div>No data :((</div>
}

EditArticle.propTypes = {
	isFetching: PropTypes.bool.isRequired,
	isLoggin: PropTypes.bool.isRequired,
	getArticleById: PropTypes.func.isRequired,
	articles: PropTypes.array.isRequired,
	id: PropTypes.string.isRequired,
	error: PropTypes.bool,
	errorMessage: PropTypes.string,
	history: PropTypes.object.isRequired,
	username: PropTypes.string,
}

EditArticle.defaultProps = {
	error: false,
	errorMessage: '',
	username: null,
}

const mapStateToProps = state => ({
	isFetching: state.isFetching,
	isLoggin: state.user.isLoggin,
	articles: state.articles.articles,
	error: state.errors.error,
	errorMessage: state.errors.message,
	username: state.user.user.username,
})

const mapDispatchToProps = dispatch => ({
	getArticleById: id => dispatch(getOneArticle(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditArticle))
