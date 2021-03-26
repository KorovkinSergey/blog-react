import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import classNames from 'classnames'

import {Popconfirm /* message */} from 'antd'

import realWorldService from '../../API/RealWorldService'

import TagsBar from '../TagsBar'

import classes from './ArticleItem.module.sass'
import avatar from '../../img/avatar.png'
import {deleteArticle} from '../../redux/actions/actionArticles'

const text = 'Are you sure to delete this task?'

function ArticleItem({
											 title,
											 likesCount,
											 tags,
											 username,
											 publishDate,
											 avatarUrl,
											 description,
											 body,
											 id,
											 logginUsername,
											 favorited,
											 deleteOneArticle,
											 isLoggin,
											 edit
										 }) {
	const [isActive, setActive] = useState(false)
	const [isLiked, setLiked] = useState(favorited)
	const [likesCountState, setLikesCountState] = useState(likesCount)

	if (!title && !likesCount && !tags && !username && !publishDate && !avatarUrl && !description && !body) {
		return <div className={classes.article}>No data :(</div>
	}

	const clickHandler = state => setActive(!state)

	function confirm() {
		deleteOneArticle(id)
	}

	function onLike() {
		if (isLiked) {
			setLikesCountState(likesCountState - 1)
			setLiked(false)
			realWorldService.unLikeArticle(id)
			return
		}
		if (!isLiked) {
			setLikesCountState(likesCountState + 1)
			setLiked(true)
			realWorldService.likeArticle(id)
		}
	}

	const bodyClasses = isActive ? classNames(classes.body, classes.active) : classes.body
	const link = `/article/${id}`

	const renderPublishDate = () => {
		const date = new Date(publishDate)
		return format(date, 'd, MMM yyyy')
	}

	return (
		<div className={classes.article}>
			<header className={classes.header}>
				<div>
					<div className={classes.wrapper}>
						<Link to={link}>
							<div className={classes.title}>{title} </div>
						</Link>

						<button
							disabled={isLoggin === false}
							type="button"
							className={classNames(classes.likes, isLiked ? classes.liked : null)}
							onKeyPress={(e) => {
								if (e.code === 'Enter') onLike()
							}}
							onClick={onLike}
						>
							{likesCountState}
						</button>
					</div>
					<TagsBar tagsArr={tags} disabled/>
				</div>
				<div className={classes.wrapper}>
					<div className={classes.published}>
						<div className={classes.name}>{username}</div>
						<div className={classes.date}>{renderPublishDate()}</div>
					</div>
					<div className={classes.avatar}>
						<img src={avatarUrl} alt="avatar"/>
					</div>
				</div>
			</header>
			<div className={classes['wrapper-between']}>
				<div
					className={classes.description}
					role="button"
					tabIndex="0"
					onClick={() => {
						clickHandler(isActive)
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') clickHandler(isActive)
					}}
				>
					{description}
				</div>
				{username === logginUsername && edit && (
					<div className={classes.wrapper}>
						<Popconfirm placement="rightTop" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
							<button
								type='button'
								className={classNames(classes.button,classes.red)}
							>Delete
							</button>
						</Popconfirm>

						<Link to={`/article/${id}/edit`}>
							<button
								type='button'
								className={classNames(classes.button,classes.green)}
							>
								Edit
							</button>
						</Link>
					</div>
				)}
			</div>
			<div className={bodyClasses}>
				<ReactMarkdown>{body}</ReactMarkdown>
			</div>
		</div>
	)
}

ArticleItem.propTypes = {
	title: PropTypes.string,
	likesCount: PropTypes.number,
	tags: PropTypes.array,
	username: PropTypes.string,
	publishDate: PropTypes.string,
	avatarUrl: PropTypes.string,
	description: PropTypes.string,
	body: PropTypes.string,
	id: PropTypes.string,
	logginUsername: PropTypes.string,
	deleteOneArticle: PropTypes.func.isRequired,
	isLoggin: PropTypes.bool.isRequired,
	favorited: PropTypes.bool.isRequired,
	edit:PropTypes.bool
}

ArticleItem.defaultProps = {
	title: 'title',
	likesCount: 0,
	tags: ['Tag1', 'Tag2'],
	username: 'username',
	publishDate: '2021-02-15T10:20:29.238Z',
	avatarUrl: avatar,
	description: 'decription',
	body: 'body',
	id: 'id',
	logginUsername: '',
	edit:false
}

const mapStateToProps = (state) => ({
	logginUsername: state.user.user.username,
	isLoggin: state.user.isLoggin,
})

const mapDispatchToProps = dispatch => ({
	deleteOneArticle: id => dispatch(deleteArticle(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem)
