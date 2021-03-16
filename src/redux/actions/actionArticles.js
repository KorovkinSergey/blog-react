import realWorldService from '../../API/RealWorldService'
import {isFetchingOff, isFetchingOn} from './actionFetching'
import {CLEAR_JUST_NEW_ARTICLE, DELETE_ARTICLE, ERROR, GET_ARTICLES, GET_MY_ARTICLES, UPDATE_ARTICLE} from '../types'
import {setLogginError} from './actionErrors'

export function getArticles(offset) {
	return async dispatch => {
		dispatch(isFetchingOn())

		try {
			const result = await realWorldService.getArticles(offset)
			const action = {
				type: GET_ARTICLES,
				articles: result.articles,
				totalCount: result.articlesCount,
			}
			dispatch(action)

			dispatch(isFetchingOff())

		} catch (e) {
			dispatch(isFetchingOff())

			dispatch(setLogginError(e.message))
		}
	}
}

export const clearJustCreateArticle = () => ({type: CLEAR_JUST_NEW_ARTICLE})

export function getMyArticles(offset) {
	return async dispatch => {
		try {
			const result = await realWorldService.getMyArticles(offset)
			const action = {
				type: GET_ARTICLES,
				articles: result.articles,
				totalCount: result.articlesCount
			}
			dispatch(action)
		} catch (e) {
			dispatch(isFetchingOff())

			dispatch(setLogginError(e.message))
		}

	}
}

export function getOneArticle(id) {
	return async dispatch => {
		dispatch(isFetchingOn())

		try {
			const result = await realWorldService.getOneArticle(id)
			const action = {
				type: GET_MY_ARTICLES,
				articles: [result.article],
				totalCount: 1,
			}

			dispatch(action)
			dispatch(isFetchingOff())

		} catch (e) {
			const action = {
				type: ERROR,
				message: e.message,
			}
			dispatch(action)
			dispatch(isFetchingOff())
		}
	}
}

export function createArticle(article) {
	return async dispatch => {
		dispatch(isFetchingOn())

		try {
			const result = await realWorldService.createArticle(article)
			const action = {
				type: CLEAR_JUST_NEW_ARTICLE,
				article: result.article,
				newArticle: result.article.slug,
			}
			dispatch(action)
			dispatch(isFetchingOff())
		} catch (e) {
			dispatch(isFetchingOff())
			dispatch(setLogginError(e.message))
		}
	}
}

export function updateArticle(article, id) {
	return async dispatch => {
		dispatch(isFetchingOn())

		try {
			const result = await realWorldService.updateArticle(article, id)
			const action = {
				type: UPDATE_ARTICLE,
				article: result.article,
				newArticle: result.article.slug,
			}
			dispatch(action)
			dispatch(isFetchingOff())
		} catch (e) {
			dispatch(isFetchingOff())
			dispatch(setLogginError(e.message))
		}
	}
}


export function deleteArticle(id) {
	return async dispatch => {

		try {
			await realWorldService.deleteArticle(id)
			const action = {
				type: DELETE_ARTICLE,
				articleId: id,
			};

			dispatch(action)
		} catch (e) {
			dispatch(isFetchingOff())
			dispatch(setLogginError(e.message))
		}
	}
}
