
import React from 'react'
import {Button} from 'react-bootstrap'
import Footer from './shared/Footer'
import {Link} from 'react-router-dom'




const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
		
		<div className="splashPic" />

		<div className='boats'>
			
		<h4> Calypso </h4>
		<div>
		<img src='https://i.imgur.com/GuCXXQYt.jpg' alt=''/>
		<Link to=''> Book this boat</Link>
		<p> Explore the beautiful city harbors along the coast of Taiwan and China.</p>
		</div>


		</div>
		<hr/>
		<div className='boats'>
			
			<h4> Enchanted Lady </h4>
			<div>
			<img src='https://i.imgur.com/JwIGdYM.jpg' alt=''/>
			<Link to=''> Book this boat</Link>
			<p> Dock in the sheltered bays of the Polynesian Islands.</p>
			</div>
	
	
			</div>
		<hr/>
		<div className='boats'>
			
		<h4> Kingsman </h4>
		<div>
		<img src='https://i.imgur.com/RNxsirYm.jpg' alt=''/>
		<Link to=''> Book this boat</Link>
		<p> Move gracefully through the Greek Isles.</p>
		</div>


		</div>



		<Footer/>
		
		</>
		
		
	)
	

}

export default Home
