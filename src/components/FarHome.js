import React from 'react'
import Slider from './shared/Slider'
import Footer from './shared/Footer'
import {Link} from 'react-router-dom'

const FarHome = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
		
		<div className="splashPicFar">
            
            	
			
			
		

			
		</div>

        <div className='boats'>
			
            <h4> Calypso </h4>
            <div>
            <img src='https://i.imgur.com/GuCXXQYt.jpg'/>
            <Link to=''> Book this boat</Link>
            </div>
    
    
            </div>
<hr/>

<div className='boats'>


</div>



<Footer/>

</>


)

}

export default FarHome