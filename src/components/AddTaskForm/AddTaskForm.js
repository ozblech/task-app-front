import React from 'react'
import VoiceRecognition from '../VoiceRecognition/VoiceRecognition'



class AddTaskForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			description: '',
			completed: false

		}
	}

	onDescriptionChange = (event) => {
		this.setState({description: event.target.value})
	}


	onSubmitAdd = () => {
		const { user, description, completed } = this.state
		fetch('https://blech-task-manager.herokuapp.com/tasks', {
			method: 'post',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${user.token}`
			},

			body: JSON.stringify({
				description: description,
				completed: completed
			})
		})
		.then(response=> response.json())
		.then(jsonData=> {
			console.log('add task: ', jsonData)
			if (jsonData.description) {
				this.props.getUserTasks()
				this.props.changeAddTaskButtonState(true)
			}
		})
	}



	render() {
		return (
			<div className="pa4 black-80 center">
			  <div className="measure">
			    <label form="description" className="f6 b db mb2">Add Task Description</label>
			    <input 
			    id="description" 
			    className="input-reset ba b--black-20 pa2 mb2 db w-100" 
			    type="text" 
			    aria-describedby="description-desc"
			    onChange={this.onDescriptionChange}
			    />
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='submit'
			    onClick={this.onSubmitAdd}
			    >Add</button>
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='cancel'
			    onClick={() => this.props.changeAddTaskButtonState(true)}
			    >Cancel</button>
			    
			  </div>
			</div>
		);
	} 

}

export default AddTaskForm;