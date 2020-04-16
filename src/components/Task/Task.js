import React from 'react'
import editImg from './edit.png'
import completedImg from './completed.png'
import notCompletedImg from './notCompleted.png'


const Task = ({ description, completed , _id, editTaskPageOnOff }) => {


	return (
		<div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 w-40 shadow-5'>
			<div>
				<h2>{description}</h2>
				{
					(completed) 
					?
					<p className = 'dark-blue b'>completed!</p>
					:
					<p>{completed}</p>
				}
			</div>
			<div className = 'f5 flex justify-between'>
				<div className='edit flex justify-center items-center'>
					<p>Edit</p>
					<img 
					className='link pointer' 
					alt='' src = {editImg} width = "20px"
					onClick={() => editTaskPageOnOff(true, _id, description, false)}
					/>
				</div>
				<div className='completed flex justify-center items-center'>
					<p>Completed</p>
					{
					(!completed)
					?
					<img 
					className='link pointer' 
					alt='' src = {notCompletedImg} width = "20px"
					onClick={() => editTaskPageOnOff(true, _id, description, true)}
					/>
					:
					<img 
					className='link pointer' 
					alt='' src = {completedImg} width = "20px"
					onClick={() => editTaskPageOnOff(true, _id, description, true)}
					/>
					}

				</div>
			</div>
		</div>
	);
}

export default Task;