'use strict'
import React, { Component } from 'react'
import mic from '../AddTaskForm/mic.png'


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'


class VoiceRecognition extends Component {
	constructor(props) {
    super(props)
    	this.state = {
     	 listening: false
    }
	    this.toggleListen = this.toggleListen.bind(this)
	    this.handleListen = this.handleListen.bind(this)
  	}
  
  toggleListen() {
    this.setState({
      listening: !this.state.listening
    }, this.handleListen)
  }

	handleListen = () => {
		if (this.state.listening) recognition.start()

	    let finalTranscript = ''
	    recognition.onresult = event => {
		    let interimTranscript = ''

		    for (let i = event.resultIndex; i < event.results.length; i++) {
		    	const transcript = event.results[i][0].transcript;
		        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
		        else interimTranscript += transcript;
		    }
		    if(document.getElementById('description')) {
		    	console.log(document.getElementById('description'))
		    	document.getElementById('description').value = finalTranscript
		    	this.props.updateDescriptionInput(finalTranscript)
		    }
		    else {
		    	if(finalTranscript === 'no ' || finalTranscript === 'cancel '){
		    		console.log(document.getElementById('cancelEditTask'))
		    		document.getElementById('cancelEditTask').click()
		    	}
		    	if(finalTranscript === 'yes ' || finalTranscript === 'update '){
		    		document.getElementById('submitEditTask').click()
		    	}
		    }
		    
		}
	}


	render() {
		return (
			<div style={container}>
				<img id = 'microphone-btn' 
				className='pointer grow'
				src={mic} 
				width = "50px"
				onClick={this.toggleListen} 
				/>
     		</div>
		)
	}
}


export default VoiceRecognition;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },

}

const { container } = styles