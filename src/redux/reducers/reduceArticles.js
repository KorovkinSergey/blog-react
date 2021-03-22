import {
	CLEAR_JUST_NEW_ARTICLE,
	CREATE_NEW_ARTICLE, DELETE_ARTICLE,
	GET_ARTICLES,
	GET_ONE_ARTICLE,
	UPDATE_ARTICLE
} from '../types'

const initialState = {
	articles: [],
	totalCount: null,
	newArticle: null,
}

function reduceArticles(state = initialState, action) {
	switch (action.type) {
		case GET_ARTICLES:
			return {...state, articles: action.articles, totalCount: action.totalCount}
		case GET_ONE_ARTICLE:
			return {...state, articles: [...state.articles, {...action.articles}], totalCount: action.totalCount}
		case CREATE_NEW_ARTICLE:
			return {...state, articles: [action.article], newArticle: action.newArticle}
		case UPDATE_ARTICLE:
			return {...state, articles: [action.article], newArticle: action.newArticle}
		case CLEAR_JUST_NEW_ARTICLE:
			return {...state, newArticle: null}
		case DELETE_ARTICLE: {
			const newArticles = state.articles.filter((item) => item.slug !== action.articleId)
			return {...state, articles: newArticles, totalCount: --state.totalCount, newArticle: null}
		}
		default:
			return state
	}
}

export default reduceArticles
