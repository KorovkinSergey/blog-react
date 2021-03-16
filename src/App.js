import React from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import PrivateRoute from './components/PrivateRoute'
import pageSize from './components/Pagination/pageSize'
import {getArticles, getMyArticles} from './redux/actions/actionArticles'
import {singInWithToken} from './redux/actions/actionLogin'

import Main from './components/Main'
import getTokenFromLocaleStorage from './localStorage/getTokenFromLocaleStorage'
import Header from './components/Header'
import ArticleList from './components/ArticleList'
import ArticleItemWithService from './components/ArticleItemWithService'
import ErrorMessage from './components/ErrorMessage'
import RegistrationForm from './components/RegistrationForm'
import SingIn from './components/SingInForm'
import Profile from './components/Profile'
import NewArticle from './components/NewArticle'
import EditArticle from './components/EditArticle'


function App({getArticles, getMyArticles, singInWithToken, isLoggin}) {

	const token = getTokenFromLocaleStorage()

	if (token) singInWithToken()



	return (
		<Router>
			<Header/>
			<Main>
				<Switch>
					<Redirect exact from="/" to="/articles/page/1"/>
					<Route exact path="/sing-in" component={SingIn}/>
					<Route
						exact
						path="/articles/page/:id"
						render={({match}) => {
							const page = +match.params.id
							const offset = (page - 1) * pageSize
							getArticles(offset)
							return <ArticleList page={page}/>
						}}
					/>
					<PrivateRoute
						path="/my-articles"
						exact
						render={() => {
							getMyArticles()
							return <ArticleList page={1}/>
						}}
					/>
					<Route
						path="/article/:id"
						exact
						render={({match}) => {
							const {id} = match.params
							return <ArticleItemWithService id={id}/>
						}}
					/>
					<Route exact path="/sing-up" component={RegistrationForm}/>

					<PrivateRoute exact path="/new-article" render={() =>{
						if (isLoggin === false && token === '') {
							return <Redirect to="/sing-in"/>
						}
					 return <NewArticle />}}/>

					<PrivateRoute Component={Profile} path="/profile"/>

					<PrivateRoute
						exact
						path="/article/:id/edit"
						render={({match}) => {
							const {id} = match.params
							return <EditArticle id={id}/>
						}}
					/>


					<Route render={() => <ErrorMessage description="404: there is no page on this URL :("/>}/>
				</Switch>
			</Main>
		</Router>
	)
}

App.propTypes = {
	getArticles: PropTypes.func.isRequired,
	getMyArticles: PropTypes.func.isRequired,
	singInWithToken: PropTypes.func.isRequired,
	isLoggin: PropTypes.bool
}
App.defaultProps = {
	isLoggin: false
}

const mapStateToProps = (state) => ({
	isLoggin: state.user.isLoggin
})


const dispatchToProps = (dispatch) => ({
	getArticles: offset => dispatch(getArticles(offset)),
	getMyArticles: offset => dispatch(getMyArticles(offset)),
	singInWithToken: () => dispatch(singInWithToken()),
})


export default connect(mapStateToProps, dispatchToProps)(App)
