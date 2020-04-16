import React from 'react'
import anonymous from './anonymous.png'




class Photo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			avatar: false,
			changePhoto: false
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


	onPhotoChangeClick = () => {
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
			this.setState({
				avatar: true,
				changePhoto: false
				})
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
		this.setState({
			avatar: false,
			changePhoto: false
		})

	}

	changePhotoToggle = (trueOrFalse) => {
		(trueOrFalse)
		?
		this.setState({changePhoto: true})
		:
		this.setState({changePhoto: false})
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
			<div className='tc bg-blue dib br3 pa1 ma4 grow bw2 w-30 o-90 shadow-5'>
				<div>
				<h4>
					<form className='f5 white ma4' action="/action_page.php">
				  	<input type="file" id="myfile" name="myfile" />
					</form>
				</h4>
				</div>

				<div>
				<p>
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
				</p>
				</div>
		</div>
		
		)
	}

	render() {
		const { user } = this.props
		console.log('show changephoto?',this.state.changePhoto)
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
