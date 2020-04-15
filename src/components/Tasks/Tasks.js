import React from 'react'
import Task from '../Task/Task'
import AddTaskForm from '../AddTaskForm/AddTaskForm'
import EditTaskForm from '../EditTaskForm/EditTaskForm'


import addImg from './Add.png'


class Tasks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			tasks: [],
			addNewTaskButton: true,
			editTaskPage: false,
			taskToEditId: '',
			editingTaskDesc: ''
		}	
	}

	getUserTasks = () => {
		const user = this.state.user
		fetch('https://blech-task-manager.herokuapp.com/tasks', {
			method: 'get',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${user.token}`
			}
			
		})
		.then(response => response.json())
		.then(jsonResponse => {
			console.log(jsonResponse)
			if(jsonResponse.length > 0) {
				this.setState({
					tasks: jsonResponse,
					editTaskPage: false
				})
			}
		})	
		
	}

	changeAddTaskButtonState = (trueOrFalse) => {
		(trueOrFalse) ?
		this.setState({addNewTaskButton: true})
		:
		this.setState({addNewTaskButton: false})
	}

	componentDidMount() {
		this.getUserTasks()
	}

	editTask = (_id, description) => {
		console.log('task id is: ',_id)
		this.setState({
			taskToEditId: _id,
			editTaskPage: true,
			editingTaskDesc: description
		})
	}

	displayAddTaskButton = () => {
		const { tasks, addNewTaskButton } = this.state
		return (
				(addNewTaskButton)
					?
					<div>
						<img 
						className='link grow pointer' 
						onClick={() => this.changeAddTaskButtonState(false)}
						alt='' src = {addImg} width='150px' height='auto'/>
					</div>
					:
					<div>
						<AddTaskForm 
						changeAddTaskButtonState = {this.changeAddTaskButtonState}
						getUserTasks = {this.getUserTasks}
						user = {this.state.user}
						/>
					</div>
			)
	}

	displayAllTasks = () => {
		const { tasks, addNewTaskButton } = this.state
		return (
			
			<div>
				<h1>Tasks</h1>
	  			{
	  				tasks.map((task, i) => {
						return (
							<Task 
							key={i} 
							_id={tasks[i]._id} 
							description={tasks[i].description} 
							completed={tasks[i].completed}
							editTask = {this.editTask}
							/>
						);
					})

	  			}		  			
	  		</div>
		)

	}

	render() {
		const { user, taskToEditId, getUserTasks, editTaskPage, editingTaskDesc } = this.state
		return (
			<div>
				{
					(!editTaskPage) 
					?
					(
						this.displayAddTaskButton(),
						this.displayAllTasks()
					)
					:
					(
					<div>
						<EditTaskForm 
						user={user} 
						taskToEditId={taskToEditId} 
						editingTaskDesc = {editingTaskDesc}
						getUserTasks = {this.getUserTasks}
						/>
					</div>
					)
				}
		  	</div>
		)
	}	
	
}

export default Tasks;


