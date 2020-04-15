import React from 'react'
import anonymous from './anonymous.png'




class Photo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			avatar: false
		}
		
	}


	getUserAvatar = async() => {
		const user = this.props.user
		console.log('user token', user.token)
		try {
			await fetch(`https://blech-task-manager.herokuapp.com/users/${user._id}/avatar`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
			})
			.then(response => {
				if(response.status === 200) {
					this.setState({avatar: true})
				}
			})
		} catch(err) {
			this.setState({avatar: false})
		}
	}

	componentDidMount() {
		this.getUserAvatar()
	}


	onPhotoChangeClick = () => {
		// console.log(document.querySelector('#myfile').files[0])
		const fileInput = document.querySelector('#myfile').files[0]
		const formData = new FormData()
		formData.append('avatar', fileInput)
		fetch('https://blech-task-manager.herokuapp.com/users/me/avatar', {
			method: 'post',
			body: formData,
			headers: {
				Authorization: `Bearer ${this.props.user.token}`
			}
		})
		.then(response => {
			if(response.status === 200) {
			this.setState({avatar: true})
			}
		})
	}

	onPhotoDeleteClick = () => {
		fetch('https://blech-task-manager.herokuapp.com/users/me/avatar', {
			method: 'delete',
			headers: {
				Authorization: `Bearer ${this.props.user.token}`
			}
		})
		this.setState({avatar: false})

	}

	render() {
		const { user } = this.props
		return (
			<div>
				{
					(this.state.avatar) 
					? 
					<img alt='' 
					src = {`https://blech-task-manager.herokuapp.com/users/${user._id}/avatar`} 
					width='300px' height='auto'/>
					:
					<img alt='' 
					src = {anonymous} 
					width='300px' height='auto'/>
				}
				
				<br/>
				<form className='center f5 ph3 pv white' action="/action_page.php">
				  <input type="file" id="myfile" name="myfile" /><br/>
				</form>
				<div className='flex justify-center '>
					<button 
					className='outline w-20 ph3 link dim f6 ph3 pv2 mb2 dib white bg-navy'
					type='submit'
					onClick={this.onPhotoChangeClick}
					>Update Photo</button>
					<button 
					className='outline w-20 f6 ph3 link dim ph3 pv2 mb2 dib white bg-dark-pink'
					type='delete'
					onClick={this.onPhotoDeleteClick}
					>Delete Photo</button>
				</div>
				
			</div>
		);
	}
	
}

export default Photo
