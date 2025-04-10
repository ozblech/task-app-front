import React from 'react'
import Task from '../Task/Task'
import EditTaskForm from '../EditTaskForm/EditTaskForm'
import AddnewTaskButton from '../AddNewTaskButton/AddNewTaskButton'
import { API_BASE_URL } from '../../config';

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

	getUserTasks = async () => {
		try {
			const user = this.state.user;
			const response = await fetch(`${API_BASE_URL}/tasks`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			});
	
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
	
			const contentType = response.headers.get('content-type');
			let jsonResponse = [];
	
			if (contentType && contentType.includes('application/json')) {
				jsonResponse = await response.json();
			}
	
			if (Array.isArray(jsonResponse) && jsonResponse.length > 0) {
				this.setState({ tasks: jsonResponse });
			} else {
				this.setState({ tasks: [] }); // or show a message like "no tasks yet"
			}
		} catch (error) {
			console.error('Failed to fetch tasks:', error.message);
			// Optionally: this.setState({ error: error.message });
		}
	};
	



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


