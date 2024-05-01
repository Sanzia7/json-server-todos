import { NEW_TODO_ID } from '../constants'

export const addSingleTodo = (todos, todo) => {
	const newTodo = todo || {
		id: NEW_TODO_ID,
		title: '',
		completed: false,
		isEditing: true,
	}
	return [ newTodo, ...todos ]
}



// первоначально было так:
// export const addTodo = (todos) =>[
//	{ id: NEW_TODO_ID, title: '', completed: false, isEdit: true },
//	...todos,
//]
