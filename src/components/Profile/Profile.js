import React from 'react'
import Photo from '../Photo/Photo'
import Tasks from '../Tasks/Tasks'


class Profile extends React.Component  {
	
	constructor(props) {
		super(props);
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

	render() {
		const { user } = this.props
		return (
		<div>
			<div className='ma4 mt0'>
				<h1>{`${user.name}`}</h1>
			</div>
			<div>
				<h2>{`email: ${user.email}`}</h2>
				<h2>{`age: ${user.age}`}</h2>
			</div>
			<Photo user={user}/>
			<br />
			<Tasks user={user}/>
			<div>
				<button className='w-30 grow f4 link ph3 pv dib white bg-light-purple'
				onClick= {this.deleteUser}
				>Delete User</button>
			</div>


		</div>
		);
	}
	
	
}

export default Profile;