// npm i json-server
// npx json-server --watch src/db.json --port 3007
//http://localhost:3007/todos

import { useEffect, useState } from 'react'
import {
	requestReadTodos,
	requestCreateTodo,
	requestUpdateTodo,
	requestDeleteTodo,
} from './api'
import { ControlTodo, Todo } from './components'
import { addTodo, findTodo, setTodo, removeTodo } from './utils'
import styles from './app.module.css'
import { NEW_TODO_ID } from './constants'

export const App = () => {
	const [todos, setTodos] = useState([])
	const [searchText, setSearchText] = useState('')
	const [isSortingAZ, setIsSortingAZ] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const addNewTodo = () => {
		setTodos(addTodo(todos))
	}

	const onSaveTodo = (todoId) => {
		const { title, completed } = findTodo(todos, todoId) || {}
		//если появляется новое id, то делаем Create нового todo:
		if (todoId === NEW_TODO_ID) {
			requestCreateTodo({ title, completed }).then((todo) => {
				let updatedTodos = setTodo(todos, {
					id: NEW_TODO_ID,
					isEdit: false,
				})
				updatedTodos = removeTodo(updatedTodos, NEW_TODO_ID)
				updatedTodos = addTodo(updatedTodos, todo)
				setTodos(updatedTodos)
			})
		} else {
			//если нет нового id, то можно делать Update уже существующего todo:
			requestUpdateTodo({ id: todoId, title }).then(() => {
				setTodos(setTodo(todos, { id: todoId, isEdit: false }))
			})
		}
	}

	const onEditTodo = (id) => {
		setTodos(setTodo(todos, { id, isEdit: true }))
	}

	const onAddTitle = (id, newTitle) => {
		setTodos(setTodo(todos, { id, title: newTitle }))
	}
	const onChangeIsCompleted = (id, isCompleted) => {
		requestUpdateTodo({ id, completed: isCompleted }).then(() => {
			setTodos(setTodo(todos, { id, completed: isCompleted }))
		})
	}

	const onRemoveTodo = (id) => {
		requestDeleteTodo(id).then(() => setTodos(removeTodo(todos, id)))
	}

	useEffect(() => {
		setIsLoading(true)
		requestReadTodos(searchText, isSortingAZ).then((loadedTodos) =>
			setTodos(loadedTodos),
		)
		.finally(() => setIsLoading(false))
	}, [searchText, isSortingAZ])

	return (
		<div className={styles.app}>
			<h1>Json-Server Todo-App</h1>

			<ControlTodo
				onAddTodo={addNewTodo}
				onSearch={setSearchText}
				onSorting={setIsSortingAZ}
			/>

			{ isLoading ? (
				<div className={ styles.loader }></div>
			) : (
				<div className={styles.container}>
					{todos.map(({ id, title, completed, isEdit = false }) => (
						<Todo
							key={id}
							id={id}
							title={title}
							completed={completed}
							isEditTodo={isEdit}
							onEdit={() => onEditTodo(id)}
							onChangeTitle={(newTitle) => onAddTitle(id, newTitle)}
							onChangeCompleted={(isCompleted) =>
								onChangeIsCompleted(id, isCompleted)
							}
							onSave={() => onSaveTodo(id)}
							onRemove={() => onRemoveTodo(id)}
						/>
					))}
				</div>
			)}
		</div>
	)
}



// react-icons:
// npm install react-icons
// react-icons ri
// RiTodoFill
// import { IconName } from "react-icons/ri";

// in new terminal:
// запуск сервера json-server
// npx json-server --watch src/db.json --port 3004
//
// переключение на другую ветку:
// git checkout -b todo-list
// git commit -m "..."
// git push --set-upstream origin todo-list
//
