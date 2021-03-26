import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useForm} from 'react-hook-form'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import classNames from 'classnames'

import TagsBar from '../TagsBar'
import classes from './NewArticle.module.sass'
import {clearJustCreateArticle, createArticle, updateArticle} from '../../redux/actions/actionArticles'
import FormErrorMessage from '../FormErrorMessage'


function NewArticle({
											id,
											articleTitle,
											articleDescription,
											articleBody,
											title,
											createArticle,
											updateArticle,
											loading,
											justCreatedArticle,
											clearJustCreateArticle,
											history,
											articleTagList,
										}) {

	const {register, handleSubmit, errors} = useForm()


	const [inputTag, setInputTag] = useState('')

	const [tagError, setTagError] = useState('')

	const [tagsArr, setTagsArr] = useState([...articleTagList])

	if (justCreatedArticle) {
		clearJustCreateArticle()
		history.push(`/article/${justCreatedArticle}`)
		return null
	}

	const onAddTag = () => {
		const isUniqe = tagsArr.includes(inputTag) === false
		if (isUniqe === true) setTagError('')
		if (isUniqe === false) setTagError('this tag is already added')
		if (inputTag !== '' && isUniqe) {
			setTagsArr([...tagsArr, inputTag])
			setInputTag('')
		}
	}

	const onDeleteTag = (tag) => {
		setTagsArr(tagsArr.filter((item) => item !== tag))
	}

	const onSubmit = async (data) => {

		const newArticle = {
			title: data.title,
			description: data.description,
			body: data.body,
			tagList: tagsArr,
		}
		if (id !== '') {
			updateArticle(newArticle, id)
			return
		}
		await createArticle(newArticle)

		history.push('/articles/page/1')
	}

	return (
		<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={classes.title}>{title}</div>
			<div className={classes['input-title']}>Title</div>
			<input
				name="title"
				placeholder="Title"
				type="text"
				defaultValue={articleTitle}
				className={classNames(classes.input, errors.title ? classes['input-invalid'] : null)}
				ref={register({required: true, minLength: 3})}
			/>
			{errors.title && <FormErrorMessage serverError="title must be longer than 3 letters"/>}

			<div className={classes['input-title']}>Short description</div>
			<input
				name="description"
				placeholder="Short description"
				type="text"
				defaultValue={articleDescription}
				className={classNames(classes.input, errors.description ? classes['input-invalid'] : null)}
				ref={register({required: true, minLength: 3})}
			/>
			{errors.description && <FormErrorMessage serverError="description must be longer that 3 letters"/>}

			<div className={classes['input-title']}>Text</div>
			<textarea
				name="body"
				rows="8"
				defaultValue={articleBody}
				placeholder="Text"
				className={classNames(classes.input, errors.body ? classes['input-invalid'] : null)}
				ref={register({required: true, minLength: 3})}
			/>
			{errors.body && <FormErrorMessage serverError="article must be longer that 3 letters"/>}

			<div className={classes['input-title']}>Tags</div>
			<TagsBar tagsArr={tagsArr} marginBottom onClick={onDeleteTag}/>
			<div className={classes['tag-wrapper']}>
				<div className={classes['tag-input-wrapper']}>
					<input
						autoComplete="off"
						name="tag"
						type="text"
						className={classNames(classes.input, classes['input-tag'])}
						placeholder="Tag"
						onChange={e => setInputTag(e.target.value)}
						value={inputTag}
						onKeyDown={(e) => {
							if (e.code === 'Enter') {
								e.preventDefault()
								onAddTag()
							}
						}}
					/>
					{tagError && <FormErrorMessage serverError={tagError}/>}
				</div>
				<button
					type='button'
					className={classes.blue}
					onClick={onAddTag}>
					Add tag
				</button>
			</div>

			<button
				type='submit'
				className={classNames(classes.button)}
				disabled={loading}
			>
				{loading ? 'loading' : 'Send'}
			</button>
		</form>
	)
}

NewArticle.propTypes = {
	createArticle: PropTypes.func.isRequired,
	updateArticle: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	justCreatedArticle: PropTypes.string,
	history: PropTypes.object.isRequired,
	title: PropTypes.string,
	articleTitle: PropTypes.string,
	articleDescription: PropTypes.string,
	articleBody: PropTypes.string,
	clearJustCreateArticle: PropTypes.func.isRequired,
	id: PropTypes.string,
	articleTagList: PropTypes.array,
}

NewArticle.defaultProps = {
	justCreatedArticle: '',
	title: 'Create new article',
	articleTitle: '',
	articleDescription: '',
	articleBody: '',
	id: '',
	articleTagList: [],
}

const mapStateToProps = (state) => ({
	loading: state.isFetching,
	isLoggin: state.user.isLoggin,
	justCreatedArticle: state.articles.newArticle || '',
})

const mapDispatchToProps = dispatch => ({
	createArticle: article => dispatch(createArticle(article)),
	updateArticle: (article, id) => dispatch(updateArticle(article, id)),
	clearJustCreateArticle: () => dispatch(clearJustCreateArticle()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewArticle))
