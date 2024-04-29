// npm i json-server
// npx json-server --watch src/db.json --port 3007
//http://localhost:3007/todos

import { useEffect, useState } from 'react'
import {
	createTodo,
	readTodos,
	updateTodo,
	deleteTodo,
} from './api'
import { ControlTodo, Todo } from './components'
import { addSingleTodo, findSingleTodo, setSingleTodo, removeSingleTodo } from './utils'
import styles from './app.module.css'
import { NEW_TODO_ID } from './constants'

export const App = () => {
	const [todos, setTodos] = useState([])
	const [searchText, setSearchText] = useState('')
	const [isSortingAZ, setIsSortingAZ] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	//делаем запрос на сервер для получения объекта todos/список дел:
	useEffect(() => {
		setIsLoading(true)
		readTodos(searchText, isSortingAZ)
			.then((loadedTodos) =>setTodos(loadedTodos))
			.finally(() => setIsLoading(false))
	}, [searchText, isSortingAZ])

	//добавляем новое дело 
	const addNewTodo = () => {
		setTodos(addSingleTodo(todos))
	}

	const onSaveTodo = (todoId) => {
		const { title, completed } = findSingleTodo(todos, todoId) || {}
		//если появляется новое id, то делаем Create нового todo:
		if (todoId === NEW_TODO_ID) {
			createTodo({ title, completed })
				.then((todo) => {
				let updatedTodos = setSingleTodo(todos, {
					id: NEW_TODO_ID,
					isEdit: false,
				})
				updatedTodos = removeSingleTodo(updatedTodos, NEW_TODO_ID)
				updatedTodos = addSingleTodo(updatedTodos, todo)
				setTodos(updatedTodos)
			})
		} else {
			//если нет нового id, то можно делать Update уже существующего todo:
			updateTodo({ id: todoId, title })
				.then(() => {
				setTodos(setSingleTodo(todos, { id: todoId, isEdit: false }))
				})
		}
	}

	const onEditTodo = (id) => {
		setTodos(setSingleTodo(todos, { id, isEdit: true }))
	}

	const onAddTitle = (id, newTitle) => {
		setTodos(setSingleTodo(todos, { id, title: newTitle }))
	}

	const onChangeIsCompleted = (id, isCompleted) => {
		updateTodo({ id, completed: isCompleted })
			.then(() => {
			setTodos(setSingleTodo(todos, { id, completed: isCompleted }))
			})
	}

	const onRemoveTodo = (id) => {
		deleteTodo(id)
			.then(() => setTodos(removeSingleTodo(todos, id)))
	}


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
