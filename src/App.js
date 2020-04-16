import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Profile from './components/Profile/Profile'
import SigninForm from './components/SigninForm/SigninForm'
import RegisterForm from './components/RegisterForm/RegisterForm'



import Particles from 'react-particles-js';

import './App.css';
import 'tachyons'

const particlesParams = {
  "particles": {
      "number": {
          "value": 55,
          "density": {
              "enable": false
          }
      },
      "size": {
          "value": 8,
          "random": true
      },
      "move": {
          "direction": "bottom",
          "out_mode": "out"
      },
      "line_linked": {
          "enable": false
      }
  },
  "interactivity": {
      "events": {
          "onclick": {
              "enable": true,
              "mode": "remove"
          }
      },
      "modes": {
          "remove": {
              "particles_nb": 2
          }
      }
  }
}

// const emptyUser = {
//   id: '',
//   name: '',
//   email: '',
//   age: '',
//   createdAt: ''
// }

const initialState = {
  isLoggedIn: false,
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    age: '',
    avatar: false,
    createdAt: '',
    token: ''
  }
}


class App extends Component {
  constructor () {
    super()
    this.state = {
      isLoggedIn: false,
      route: 'signin',
      user: {
        _id: '',
        name: '',
        email: '',
        age: '',
        avatar: false,
        createdAt: '',
        token: ''
      }
    }
  }

  onRouteChange = (route) => {
    if(route === 'home') {
      this.setState({ isLoggedIn: true })
    } else if (route === 'signout') {
      this.setState(initialState)
    }
    this.setState({ route:route })
    console.log('Change route to ', route)
  }

  loadUser = (userData, token) => {
    this.setState({user: {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      createdAt: userData.createdAt,
      age: userData.age,
      imgURL: '',
      token: token
    }})
    console.log('App: ', userData, token)
  }



  render() {
    const {isLoggedIn, route} = this.state
    return (
    <div className="App">
      <Particles className='particles'
          params={particlesParams} 
        />
      <Navigation onRouteChange={this.onRouteChange} isLoggedIn={isLoggedIn} />
      {(route === 'home') ? 
        <div className='center'>
          <Profile 
          onRouteChange={this.onRouteChange} 
          user = {this.state.user} 
          loadUser = {this.loadUser}
          />
        </div>
      : (route === 'signin') ? 
        <div>
          <SigninForm onRouteChange={
          this.onRouteChange} 
          loadUser={this.loadUser} 
          />
        </div>
        :
        <div>
          <RegisterForm onRouteChange={this.onRouteChange}  loadUser={this.loadUser} />
        </div>
      }
    </div>
  );
  }
  
}

export default App;
