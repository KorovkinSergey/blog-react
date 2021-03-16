import reduxThunk from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'

import reduceArticles from './reducers/reduceArticles'
import reduceFetching from './reducers/reduceFetching'
import reducePagination from './reducers/reducePagination'
import reduceErrors from './reducers/reduceErrors'
import reduceLogging from './reducers/reduceLogging'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	combineReducers({
		articles: reduceArticles,
		isFetching: reduceFetching,
		page: reducePagination,
		errors: reduceErrors,
		user: reduceLogging,
	}),
	composeEnhancers(applyMiddleware(reduxThunk))
)

export default store
