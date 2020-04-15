import React from 'react'
import Task from '../Task/Task'
import AddTaskForm from '../AddTaskForm/AddTaskForm'

import addImg from './Add.png'


class Tasks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: props.user,
			tasks: [],
			addNewTaskButton: true
		}	
	}

	getUserTasks= () => {
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
				this.setState({tasks: jsonResponse})
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



	render() {
		const { tasks, addNewTaskButton } = this.state
		console.log('render ' ,addNewTaskButton)

		return (
			<div>
				{
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

				}
				<h1>Tasks</h1>
				<div>
		  			{
		  				tasks.map((task, i) => {
							return (
								<Task 
								key={i} 
								// id={tasks[i]._id} 
								description={tasks[i].description} 
								completed={tasks[i].completed}
								/>
							);
						})

		  			}
		  			
		  		</div>
		  	</div>
		)
	}	
	
}

export default Tasks;


