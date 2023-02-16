import React from 'react'
import Slider from './shared/Slider'
import Footer from './shared/Footer'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
		<div className="splashPic">
			<h2>Home Page</h2>


			<h4> random mumbo jumbo</h4>

			<div className="review">
			Review
			</div>
			<div className="review">
			Review
			</div>
			<div className="review">
			Review
			</div>
			<div className="review">
			Review
			</div>
			<div className="review">
			Review
			</div>
			<div className="review">
			Review
			</div>
			<Slider />

			<Footer/>
		</div>
		</>
		
		
	)

	
}

export default Home
