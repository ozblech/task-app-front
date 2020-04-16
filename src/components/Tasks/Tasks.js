import React from 'react'
import Task from '../Task/Task'
import EditTaskForm from '../EditTaskForm/EditTaskForm'
import AddnewTaskButton from '../AddNewTaskButton/AddNewTaskButton'




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
			toggleTaskComplete: false
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



	editTaskPageOnOff = (sign, _id, description, toggleTaskComplete) => {
		return(
		(sign)
		?
		this.setState({
			editTaskPage: true,
			addNewTaskButton: true,
			taskToEditId: _id,
			editingTaskDesc: description,
			toggleTaskComplete: toggleTaskComplete
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
				<h1>Tasks</h1>
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
		)

	}

	render() {
		const { user, taskToEditId, editTaskPage, editingTaskDesc, toggleTaskComplete } = this.state
		console.log('edit task page not: ', !editTaskPage)
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
						editTaskPageOnOff = {this.editTaskPageOnOff}
						toggleTaskComplete = {toggleTaskComplete}
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


