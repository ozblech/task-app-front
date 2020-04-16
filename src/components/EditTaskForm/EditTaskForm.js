import React from 'react'

class EditTaskForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			editingTaskDesc: this.props.editingTaskDesc,
			completed: this.props.completed,
			taskToEditId: this.props.taskToEditId,
			getUserTasks: this.props.getUserTasks,
			editTaskPageOff: this.props.editTaskPageOnOff,
			toggleTaskComplete: this.props.toggleTaskComplete,
			newDescription: ''

		}
	}

	onDescriptionChange = (event) => {
		this.setState({newDescription: event.target.value})
	}


	onSubmitEdit = () => {
		const { user, newDescription, taskToEditId, toggleTaskComplete } = this.state
		const patchBody = (toggleTaskComplete) ?
			({
				completed : !this.props.completed
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
			}
		})
	}

	onSubmitCancel = () => {
		this.props.editTaskPageOnOff(false)
	}


	render() {
		return (
			<div className="pa4 black-80 flex justify-center center">
			  <div className="measure ">
			  	{
			  	(this.props.toggleTaskComplete)
			  	?
			  		<h3>Change complete?</h3>
				:
				<div>
					<div>
				    <label form="description" className="f6 b db mb2">Task Description</label>
				    <input 
				    id="newDescription" 
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
			    type='submit'
			    onClick={this.onSubmitEdit}
			    >Update</button>
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='cancel'
			    onClick={this.onSubmitCancel}
			    >Cancel</button>
			  </div>
			</div>
		);
	} 

}

export default EditTaskForm;