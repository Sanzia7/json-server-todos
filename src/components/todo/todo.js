import { RiTodoFill } from 'react-icons/ri'
import { Button } from '../button/button'
import styles from './todo.module.css'

export const Todo = ({
	title,
	completed,
	isEditing,
	onEditTodo,
	onChangeTitle,
	onChangeCompleted,
	onSave,
	onRemove,
}) => {

	return (
		<div className={`${styles.todo} ${completed ? styles.completedTodo : ''}`}>
			<RiTodoFill className={styles.todoIcon} />
			<div className={styles.title}>
				{ isEditing
					? (<input
						type="text"
						value={title}
						onChange={({ target }) => onChangeTitle(target.value)}
					/>)
					: (<div onClick={ onEditTodo }>{ title }</div>)
				}
			</div>
			<div>
				{ isEditing
					? (<Button onClick={onSave}>✍</Button>)
					: (<Button onClick={ onRemove }>✖</Button>)
				}
			</div>

			<input
				className={styles.checkbox}
				type="checkbox"
				checked={completed}
				onChange={({target}) => onChangeCompleted(target.checked)}
			/>
		</div>
	)
}

//  {RiDeleteBin2Line,}

// <RiDeleteBin2Line
// 	className={styles.deleteIcon}
// 	onClick={onDeleteTodo}
// />
//<Button onClick={onDeleteTodo}>&#x2717;</Button>
