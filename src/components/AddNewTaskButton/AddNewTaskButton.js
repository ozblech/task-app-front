import React from 'react'
import AddTaskForm from '../AddTaskForm/AddTaskForm'

import addImg from './Add.png'


const AddNewTaskButton = (props) => {
	const { 
		addNewTaskButton, 
		changeAddTaskButtonState,
		getUserTasks,
		user
		} = props
	return(
	(addNewTaskButton)
	?

	<div>
		<img 
		className='link grow pointer' 
		onClick={() => changeAddTaskButtonState(false)}
		alt='' src = {addImg} width='150px' height='auto'/>
	</div>
	
	:
	
	<div>
		<AddTaskForm 
		changeAddTaskButtonState = {changeAddTaskButtonState}
		getUserTasks = {getUserTasks}
		user = {user}
		/>
	</div>
	)
	
}

export default AddNewTaskButton;