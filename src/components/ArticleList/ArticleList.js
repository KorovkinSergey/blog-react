import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import ArticleItem from '../ArticleItem'
import Pagination from '../Pagination'

import LoadingBar from '../LoadingBar'

import classes from './ArticleList.module.sass'
import pageSize from '../Pagination/pageSize'

function ArticleList({articles, isFetching, articlesCount, page}) {

	if (isFetching) return <LoadingBar/>

	if (!articles.length && !isFetching) return <div>No data :((</div>



	const renderArticle = ({title, favoritesCount, tagList, author, updatedAt, description, slug, body, favorited}) => (
		<li className={classes.li} key={slug}>
			<ArticleItem
				title={title}
				likesCount={favoritesCount}
				tags={tagList}
				username={author.username}
				publishDate={updatedAt}
				avatarUrl={author.image}
				description={description}
				body={body}
				key={slug}
				id={slug}
				favorited={favorited}
			/>
		</li>
	)

	return (
		<>
			<ul className={classes.ul}>{articles.map((article) => renderArticle(article))}</ul>
			{articlesCount > pageSize && <Pagination page={page}/>}
		</>
	)
}

ArticleList.propTypes = {
	articles: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	articlesCount: PropTypes.number,
	page: PropTypes.number,
}

ArticleList.defaultProps = {
	articlesCount: 1,
	page: 1,
}

const mapStateToProps = state => ({
	articles: state.articles.articles,
	isFetching: state.isFetching,
	articlesCount: state.articles.totalCount,
})

export default connect(mapStateToProps, null)(ArticleList)
