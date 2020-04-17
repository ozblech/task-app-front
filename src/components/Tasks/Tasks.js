import React from 'react'
import Task from '../Task/Task'
import EditTaskForm from '../EditTaskForm/EditTaskForm'
import AddnewTaskButton from '../AddNewTaskButton/AddNewTaskButton'

import './Tasks.css'




class Tasks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			tasks: [],
			addNewTaskButton: true,
			editTaskPage: false,
			taskToEditId: '',
			editingTaskDesc: '',
			toggleTaskComplete: false,
			taskCompletedStatus: false
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
			if(jsonResponse.length > 0) {
				this.setState({
					tasks: jsonResponse
				})
			}
		})		
	}



	editTaskPageOnOff = (editTaskPageOn, _id, description, toggleTaskComplete, completed) => {
		return(
		(editTaskPageOn)
		?
		this.setState({
			editTaskPage: true,
			addNewTaskButton: true,
			taskToEditId: _id,
			editingTaskDesc: description,
			toggleTaskComplete: toggleTaskComplete,
			taskCompletedStatus: completed
		})
		:
		this.setState({
			editTaskPage: false
		})
		)
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


	displayAllTasks = () => {
		const {tasks} = this.state 
		return (

			<div>
				<h1>My Tasks</h1>
				<div className='container'>
		  			{
		  				tasks.map((task, i) => {
							return (
								<Task 
								key={i} 
								_id={tasks[i]._id} 
								description={tasks[i].description} 
								completed={tasks[i].completed}
								editTaskPageOnOff = {this.editTaskPageOnOff}
								/>
							);
						})
		  			}
		  		</div>	  			
	  		</div>
		)

	}

	render() {
		const { 
			user, 
			taskToEditId, 
			editTaskPage, 
			editingTaskDesc, 
			toggleTaskComplete,
			taskCompletedStatus,
			} = this.state

		return(
			<div>
				<AddnewTaskButton 
				addNewTaskButton={this.state.addNewTaskButton}
				changeAddTaskButtonState = {this.changeAddTaskButtonState}
				user = {user}
				getUserTasks= {this.getUserTasks}
				/>
				{(editTaskPage)
					?
					<div>
						<EditTaskForm 
						user={user} 
						taskToEditId={taskToEditId} 
						editingTaskDesc = {editingTaskDesc}
						getUserTasks = {this.getUserTasks}
						toggleTaskComplete = {toggleTaskComplete}
						taskCompletedStatus = {taskCompletedStatus}
						editTaskPageOnOff = {this.editTaskPageOnOff}
						/>
					</div>
					:
					this.displayAllTasks()
				}
			</div>	
		);
	}
		
}

export default Tasks;


