import React from 'react'

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailSignIn: '',
			passwordSignIn: '',
			loginErrorMsg: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({emailSignIn: event.target.value})
	}


	onPasswordChange = (event) => {
		this.setState({passwordSignIn: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('https://blech-task-manager.herokuapp.com/users/login', {
			method: 'post',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				email:this.state.emailSignIn,
				password: this.state.passwordSignIn
			})
		})
		.then(response=> response.json())
		.then(jsonData=> {
			if (jsonData.user) {
				const { user, token } = jsonData
				this.props.loadUser(user, token)
				this.props.onRouteChange('home')
			} else {
				this.setState({loginErrorMsg: 'Invalid email or password'})
			}
		})
	}


	render() {
		const { onRouteChange } = this.props
		return (
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" 
				        	onChange={this.onEmailChange}
				        	/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
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
				      value="Sign in"
				      onClick={this.onSubmitSignIn} 
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('register')}  href="#0" className="f6 link dim black db pointer" >Register</p>
				    </div>
				  </div>
				  <h6 className='red pa1 mv1 black-80'>{this.state.loginErrorMsg}</h6>
				</main>
			</article>

		);
	} 

}

export default SignIn;