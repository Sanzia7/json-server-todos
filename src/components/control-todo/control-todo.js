//import { useState } from 'react'
import { Sorting, Search } from './actions'
import { Button } from '../button/button'
import styles from './control-todo.module.css'

export const ControlTodo = ({ onAddTodo, onSearch, onSorting }) => {
	// const onSearchTitle = ({ target }) => {
	// 	setSearchTitle(target.value)
	// }

	// const onChangeSorting = ({ target }) => {
	// 	setIsAbleSorting(target.checked)
	// }

	return (
		<div className={styles.controlPanel}>
			<Search onSearch={onSearch} />
			<Sorting onSorting={onSorting} />

			<Button  onClick={onAddTodo}>
				☝
			</Button>
		</div>
	)
}




