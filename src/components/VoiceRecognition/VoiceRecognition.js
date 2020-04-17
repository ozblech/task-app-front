import React from 'react'

const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();

recognition.continous = true
recognition.lang = 'en-US'
recognition.start()

class VoiceRecognition extends React.Component {
	constructor() {
		super();
		this.state = {
			count: 0,
			setCount: 0,
			listening: false
		}	
	}
	
	toggleListen = () => {
		this.setState({listening: !this.state.listening}, this.handleListen)
	}

	handleListen = () => {

	}

	componentDidMount() {
		this.voiceCommands();
	}


	voiceCommands = () => {
		console.log('hi there')
		//On start
		recognition.onstart = () => {
			console.log('Voice is active')
		}

		// Do something with result
		recognition.onresult = (e) => {
			let current = e.rsultIndex

			let transcript = e.result[current][0].transcript
			console.log(transcript)
		}
	}

	render() {
		this.voiceCommands();
		console.log('helli')
		return 0
	}
}


export default VoiceRecognition;


	