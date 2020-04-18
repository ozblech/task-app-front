import React from 'react'
import anonymous from './anonymous.png'




class Photo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			avatar: false,
			changePhoto: false,
			errorText: '',
			uploadingText: ''
		}
		
	}


	getUserAvatar = async() => {
		const user = this.props.user
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


	onPhotoChangeClick = async () => {
		const fileInput = document.querySelector('#myfile').files[0]
		const formData = new FormData()
		this.setState({
			uploadingText: 'Uploading...',
			errorText: ''
		})
		formData.append('avatar', fileInput)
		let result = await fetch('https://blech-task-manager.herokuapp.com/users/me/avatar', {
			method: 'post',
			body: formData,
			headers: {
				Authorization: `Bearer ${this.props.user.token}`
			}
		})	
		if(result.status === 200) {
		this.setState({
			avatar: true,
			changePhoto: false
			})
		} else {
			let jsonRes = await result.json()
			this.setState({errorText: jsonRes.error})
		}
		this.setState({uploadingText: ''})
	}

	onPhotoDeleteClick = () => {
		fetch('https://blech-task-manager.herokuapp.com/users/me/avatar', {
			method: 'delete',
			headers: {
				Authorization: `Bearer ${this.props.user.token}`
			}
		})
		this.setState({
			avatar: false,
			changePhoto: false,
			errorText: ''
		})

	}

	changePhotoToggle = (trueOrFalse) => {
		(trueOrFalse)
		?
		this.setState({changePhoto: true})
		:
		this.setState({
			changePhoto: false,
			errorText: ''
		})
	}

	showUserAvater = () => {
		const { user } = this.props
		return (
			(this.state.avatar)
			? 
			<img alt='' className='pointer grow'
			src = {`https://blech-task-manager.herokuapp.com/users/${user._id}/avatar`} 
			width='300px' height='auto'
			onClick={() => this.changePhotoToggle(true)}
			/>
			:
			<img alt='' className='pointer grow'
			src = {anonymous} 
			width='300px' height='auto'
			onClick={() => this.changePhotoToggle(true)}
			/>
		)
	}

	showChangePhotoForm = () => {

		return (
			<div>
			<div className="pt3 black-80 flex justify-center">
				<div className="measure">
					<form className='f7 white ma4' action="/action_page.php">
				  	<input type="file" id="myfile" name="myfile" />
					</form>
				</div>
			</div>
			<div className="pb6 black-80 flex justify-center">
				<div>
					<button
					className='outline w-15 f6 link dim ph3 pv2 mb2 dib white bg-dark-blue'
					type='submit'
					onClick={this.onPhotoChangeClick}
					>Update Photo</button>
					<button 
					className='outline w-15 f6 link dim ph3 pv2 mb2 dib white bg-dark-pink'
					type='delete'
					onClick={this.onPhotoDeleteClick}
					>Delete Photo</button>
					<button 
					className='outline w-15 f6 link dim ph3 pv2 mb2 dib white bg-dark-blue'
					type='cancel'
					onClick={() => this.changePhotoToggle(false)}
					>Cancel</button>
					<h6 className='black pa1 mv1 black-80'>{this.state.uploadingText}</h6>
					<h6 className='red pa1 mv1 black-80'>{this.state.errorText}</h6>
				</div>
			</div>
			</div>
		
		)
	}

	render() {
		const { user } = this.props
		return (
			<div className='center '>
				{
					(this.state.changePhoto)
					?
					this.showChangePhotoForm()
					:
					this.showUserAvater()								
				}
			</div>
	
		);
	}
	
}

export default Photo
