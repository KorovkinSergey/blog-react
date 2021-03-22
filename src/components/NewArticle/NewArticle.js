import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useForm} from 'react-hook-form'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {TextArea, TagInput, Input} from '../formInputs'
import Button from '../Button'
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

	const [inputTitle, setInputTitle] = useState(articleTitle)

	const [inputDescription, setInputDescription] = useState(articleDescription)

	const [inputBody, setInputBody] = useState(articleBody)

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
			<Input
				name="title"
				placeholder="Tilte"
				required
				value={inputTitle}
				type="text"
				minLength="0"
				onInput={setInputTitle}
				ref={register({required: true, minLength:3})}
			/>
			{errors.title && <FormErrorMessage serverError="title must be longer than 3 letters"/>}

			<div className={classes['input-title']}>Short description</div>
			<Input
				name="description"
				placeholder="Short description"
				required
				value={inputDescription}
				type="text"
				minLength="0"
				onInput={setInputDescription}
				ref={register({required: true, minLength:3})}
			/>
			{errors.description && <FormErrorMessage serverError="description must be longer that 3 letters"/>}

			<div className={classes['input-title']}>Text</div>
			<TextArea
				name="body"
				placeholder="Text"
				required
				ref={register({required: true, minLength:3})}
				value={inputBody}
				minLength="1"
				onInput={setInputBody}
			/>
			{errors.body && <FormErrorMessage serverError="article must be longer that 3 letters"/>}

			<div className={classes['input-title']}>Tags</div>
			<TagsBar tagsArr={tagsArr} marginBottom onClick={onDeleteTag}/>
			<TagInput
				onAdd={onAddTag}
				onDelete={() => {
				}}
				value={inputTag}
				onInput={(text) => {
					setInputTag(text)
				}}
				errorMessage={tagError}
			/>
			<Button submit style={['blue', 'half-wide']} loading={loading} disabled={loading}>
				Send
			</Button>
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
