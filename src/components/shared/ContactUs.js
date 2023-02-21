import React from 'react'

import Footer from './shared/Footer'
import {Link} from 'react-router-dom'


const ContactUs = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
	

		<div className='boats'>
			
			<h4> Our friendly agents are standing by! </h4>
			<div>
			<img src='images/Timm cropped.png' alt=''/>
			<Link to=''> Contact Us </Link>
			</div>
	
	
			</div>




<Footer/>

</>


)

}

export default ContactUs