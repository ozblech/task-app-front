import React from 'react'
import Photo from '../Photo/Photo'
import Tasks from '../Tasks/Tasks'


class Profile extends React.Component  {
	
	constructor(props) {
		super(props);
		this.state={
			nameInput:'',
			emailInput: '',
			ageInput: '',
			showEditUser: false,
			ageErrorMessage: '',
			emailErrorMessage: '',
			deleteUserForm: false
		}
	}

	onNameChange = (event) => {
		this.setState({nameInput: event.target.value})
	}
	onEmailChange = (event) => {
		this.setState({emailInput: event.target.value})
	}
	onAgeChange = (event) => {
		this.setState({ageInput: event.target.value})
	}

	deleteUser = () => {
		const { onRouteChange, user } = this.props
		fetch('https://blech-task-manager.herokuapp.com/users/me/', {
			method: 'delete',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${user.token}`
			}
			
		})
		.then(response => response.json())
		.then(jsonResponse => {
			console.log(jsonResponse)
			if(jsonResponse._id) {
				onRouteChange('signout')
			}
		})	
	}

	showUserDetails = () => {
		const { user } = this.props
		return(
			<article 
			className = 'grow pointer mw6 center br3 pa4-ns mv3 b--black-10'
			onClick={()=> this.setState({showEditUser: true})}
			>
				<div className = 'tl'>
					<h1 className = 'f2 mb2'>{`${user.name}`}</h1>
					<h2 className = 'f3 fw4 black mt0'>{`email: ${user.email}`}</h2>
					<h2 className = 'f3 fw4 black mt0'>{`age: ${user.age}`}</h2>
				</div>
			</article>
		)
	}

	onSubmitUpdate = () => {
		const { user } = this.props
		let {nameInput, emailInput, ageInput} = this.state
		if(nameInput === '') nameInput = user.name
		if(emailInput === '') emailInput = user.email
		if(ageInput === '') ageInput = user.age

		this.setState({
			ageErrorMessage:'',
			emailErrorMessage:''
		})	
		fetch(`https://blech-task-manager.herokuapp.com/users/me`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${user.token}`
			},

			body: JSON.stringify({
				name: nameInput,
				email: emailInput,
				age: ageInput
			})
		})
		.then(response=> response.json())
		.then(jsonData=> {
			if (jsonData._id) {
				console.log(jsonData)
				this.props.loadUser(jsonData, user.token)
				this.setState({showEditUser: false})
			}
			else {
				if(jsonData.errors.email) {
					this.setState({emailErrorMessage:jsonData.errors.email.message})
				}
				if(jsonData.errors.age) {
					this.setState({ageErrorMessage:'Age must be a number'})
				}
				console.log(jsonData.errors)
			}
		})
	}

	showUserEditForm = () => {
		const {user} = this.props
		
		return (
			<div className="pa4 black-80 center">
			  <div className="measure">
			    <label form="userDetails" className="f6 b db mb2">Update User</label>
			    <input 
			    id="name" 
			    className="input-reset ba b--black-20 pa2 mb2 db w-100" 
			    type="text" 
			    onChange={this.onNameChange}
			    placeholder={user.name}
			    />
			    <input 
			    id="email" 
			    className="input-reset ba b--black-20 pa2 mb2 db w-100" 
			    type="text" 
			    onChange={this.onEmailChange}
			    placeholder={user.email}
			    />
			    <input 
			    id="age" 
			    className="input-reset ba b--black-20 pa2 mb2 db w-100" 
			    type="text" 
			    onChange={this.onAgeChange}
			    placeholder={user.age}
			    />
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='update'
			    onClick={() => this.onSubmitUpdate()}
			    >Update</button>
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='cancel'
			    onClick={() => this.setState({
			    	showEditUser: false,
					ageErrorMessage:'',
					emailErrorMessage:''
			    })}
			    >Cancel</button>
			    <button 
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-light-red'
			    onClick={() => this.setState({deleteUserForm: true})}
				>Delete User</button>
			    
			    <h6 className='red pa1 mv1 black-80'>{this.state.emailErrorMessage}</h6>
			  	<h6 className='red pa1 mv1'>{this.state.ageErrorMessage}</h6>
			  </div> 	
			</div>
		);
	}

	showDeleteUserForm = () => {
		return (
			<div className="pa4 black-80 center">
				<div>
			    <label form="userDetails" className="f3 b db mb2">Delete User?</label>
			    <p>This action can not be undone!</p>
			    <p>All user data will be lost!</p>
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='No'
			    onClick={() => this.setState({deleteUserForm: false})}
			    >No</button>
			    <button
			    className='ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
			    type='Yes'
			    onClick={() => this.deleteUser()}
			    >Yes</button>
			    </div>
			</div>
		)
	}

	render() {
		const {user} = this.props
		return (
		<div>
			{
				(this.state.showEditUser)
				?
				((this.state.deleteUserForm)
					?
					this.showDeleteUserForm()
					:
				 	this.showUserEditForm())
				:
				this.showUserDetails()
			}
			<Photo user={user}/>
			<br />
			<Tasks user={user}/>
			


		</div>
		);
	}
	
	
}

export default Profile;