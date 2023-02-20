import React from 'react'
import Slider from './shared/Slider'
import Footer from './shared/Footer'
import {Link} from 'react-router-dom'


const AntHome = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
		
		<div className="splashPicAnt">
  		
		</div>

		<div className='boats'>
			
			<h4> Solace </h4>
			<div>
			<img src='https://i.imgur.com/BWyR3Cyt.jpg'/>
			<Link to=''> Book this boat</Link>
			</div>
	
	
			</div>




<Footer/>

</>


)

}

export default AntHome



