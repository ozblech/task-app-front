import React from 'react'

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			passwordErrorMsg: '',
			emailErrorMsg: '',
			nameErrorMsg: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value})
	}


	onEmailChange = (event) => {
		this.setState({email: event.target.value})
	}


	onPasswordChange = (event) => {
		this.setState({password: event.target.value})
	} 

	onSubmitRegister = () => {
		this.setState({
			emailErrorMsg: '',
			passwordErrorMsg: '',
			nameErrorMsg: ''
		})
		fetch('https://blech-task-manager.herokuapp.com/users', {
		method: 'post',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify({
			email:this.state.email,
			name: this.state.name,
			password: this.state.password
		})
		})
		.then(response=> response.json())
		.then(jsonData=> {
			if (jsonData.user) {
				const { user, token } = jsonData
				this.props.loadUser(user, token)
				console.log('Register: ', user, token)
				this.props.onRouteChange('home')
			}
			else if (jsonData.errors) {
				if(jsonData.errors.email) {
					this.setState({emailErrorMsg: jsonData.errors.email.message})
				}
				if(jsonData.errors.password) {
					this.setState({passwordErrorMsg: 'Password is invalid'})
				}
				if(jsonData.errors.name) {
					this.setState({nameErrorMsg: 'Name is invalid'})
				}
			}
		})
	}

	render() {
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-92" 
				        type="name" 
				        name="name"  
				        id="name"
				        onChange={this.onNameChange}
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"
				        onChange={this.onEmailChange} 
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password"
				        	onChange={this.onPasswordChange} 
				        	/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="register"
				      onClick={this.onSubmitRegister} 
				      />
				    </div>
				  </div>
				  <h6 className='red pa1 mv1'>{this.state.nameErrorMsg}</h6>
				  <h6 className='red pa1 mv1 black-80'>{this.state.emailErrorMsg}</h6>
			  	  <h6 className='red pa1 mv1'>{this.state.passwordErrorMsg}</h6>
				</main>
			</article>
		);
	}
	
}

export default RegisterForm;