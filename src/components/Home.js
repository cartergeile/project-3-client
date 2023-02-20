





import React from 'react'
import Slider from './shared/Slider'
import Footer from './shared/Footer'
import {Link, NavLink} from 'react-router-dom'

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'









const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
		
		<div className="splashPic" />
			
		
			
			
		

			
		

		<div className='boats'>
			
		<h4> Calypso </h4>
		<div>
		<img src='https://i.imgur.com/GuCXXQYt.jpg'/>
		<Link to=''> Book this boat</Link>
		</div>


		</div>
		<hr/>
		<div className='boats'>
			
			<h4> Enchanted Lady </h4>
			<div>
			<img src='https://i.imgur.com/JwIGdYM.jpg'/>
			<Link to=''> Book this boat</Link>
			</div>
	
	
			</div>
		<hr/>
		<div className='boats'>
			
		<h4> Kingsman </h4>
		<div>
		<img src='https://i.imgur.com/RNxsirYm.jpg'/>
		<Link to=''> Book this boat</Link>
		</div>


		</div>



		<Footer/>
		
		</>
		
		
	)
	






}

export default Home
