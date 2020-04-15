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
			newDescription: ''
		}
	}

	onDescriptionChange = (event) => {
		this.setState({newDescription: event.target.value})
	}


	onSubmitEdit = () => {
		const { user, newDescription, completed, taskToEditId } = this.state
		console.log('token is', user.token)
		fetch(`https://blech-task-manager.herokuapp.com/tasks/${taskToEditId}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${user.token}`
			},

			body: JSON.stringify({
				description: newDescription
			})
		})
		.then(response=> response.json())
		.then(jsonData=> {
			console.log('add task: ', jsonData)
			if (jsonData.description) {
				const { user, token } = jsonData
				this.props.getUserTasks()
			}
		})
	}


	render() {
		return (
			<div className="pa4 black-80 flex justify-center">
			  <div className="measure ">
			    <label form="description" className="f6 b db mb2">Task Description</label>
			    <input 
			    id="newDescription" 
			    className="input-reset ba b--black-20 pa2 mb2 db w-100" 
			    type="text" 
			    aria-describedby="description-desc"
			    placeholder = {this.state.editingTaskDesc}
			    onChange={this.onDescriptionChange}
			    />
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='submit'
			    onClick={this.onSubmitEdit}
			    >Update</button>
			  </div>
			</div>
		);
	} 

}

export default EditTaskForm;