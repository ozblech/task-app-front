import React from 'react'
import VoiceRecognition from '../VoiceRecognition/VoiceRecognition'


class EditTaskForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			editingTaskDesc: this.props.editingTaskDesc,
			taskToEditId: this.props.taskToEditId,
			getUserTasks: this.props.getUserTasks,
			toggleTaskComplete: this.props.toggleTaskComplete,
			taskCompletedStatus: this.props.taskCompletedStatus,
			editTaskPageOnOff: this.props.editTaskPageOnOff,
			newDescription: ''

		}
	}

	onDescriptionChange = (event) => {
		this.setState({newDescription: event.target.value})
	}


	onSubmitEdit = () => {
		const { user, newDescription, taskToEditId, toggleTaskComplete, taskCompletedStatus } = this.state
		const patchBody = (toggleTaskComplete) ?
			({
				completed : !taskCompletedStatus
			})
			:
			({
				description: newDescription
			})

		fetch(`https://blech-task-manager.herokuapp.com/tasks/${taskToEditId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${user.token}`
			},

			body: JSON.stringify(patchBody)
		})
		.then(response=> response.json())
		.then(jsonData=> {
			if (jsonData.description) {
				this.props.getUserTasks()
				this.taskEditFormOff(false)
			}
		})
	}

	onSubmitDelete = () => {
		const { user, taskToEditId } = this.state

		fetch(`https://blech-task-manager.herokuapp.com/tasks/${taskToEditId}`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${user.token}`
			},
		})
		.then(response=> response.json())
		.then(jsonData=> {
			if (jsonData.description) {
				this.props.getUserTasks()
				this.taskEditFormOff(false)
			}
		})
	}

	taskEditFormOff = () => {
		this.props.editTaskPageOnOff(false)
	}


	render() {

		return (
			<div className="pa4 black-80 flex justify-center center">
			  <div className="measure ">
			  	{
			  	(this.props.toggleTaskComplete)
			  	?
			  		<h3>Toggle complete?</h3>
				:
				<div className='center'>
					<div>
				    <label form="description" className="f6 b db mb2">Add Task Description</label>
				    <input 
				    id="description" 
				    className="input-reset ba b--black-20 pa2 mb2 db w-100" 
				    type="text" 
				    aria-describedby="description-desc"
				    placeholder = {this.state.editingTaskDesc}
				    onChange={this.onDescriptionChange}
				    />
					</div>
				</div>
				}
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='submitEditTask'
			    id='submitEditTask'
			    onClick={this.onSubmitEdit}
			    >Update</button>
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='cancelEditTask'
			    id='cancelEditTask'
			    onClick={this.taskEditFormOff}
			    >Cancel</button>
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='delete'
			    onClick={this.onSubmitDelete}
			    >Delete</button>
			  </div>
			</div>
		);
	} 

}

// <VoiceRecognition updateDescriptionInput={(d) => this.setState({newDescription: d})}/>


export default EditTaskForm;