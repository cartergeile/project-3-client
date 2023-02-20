import React from 'react'

import Footer from './shared/Footer'
import {Link} from 'react-router-dom'



const CarHome = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
		
		<div className="splashPicCar" />

		<div className='boats'>
			
		<h4> Hyperion </h4>
		<div>
		<img src='https://i.imgur.com/SCXtMBKm.jpg' alt=''/>
		<Link to=''> Book this boat</Link>
		</div>


		</div>
		<hr/>
		<div className='boats'>
			
			<h4> My Song </h4>
			<div>
			<img src='https://i.imgur.com/7fUrib8t.jpg' alt=''/>
			<Link to=''> Book this boat</Link>
			</div>
	
	
			</div>
		<hr/>
		<div className='boats'>
			
		<h4> Hyperion </h4>
		<div>
		<img src='https://i.imgur.com/4XBiAmhm.jpg' alt=''/>
		<Link to=''> Book this boat</Link>
		</div>


		</div>



		<Footer/>
		
		</>


)

}

export default CarHome
