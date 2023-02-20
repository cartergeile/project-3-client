import React from 'react'
import Slider from './shared/Slider'
import Footer from './shared/Footer'
import {Link} from 'react-router-dom'

const MisHome = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
		<div className="splashPicMis"></div>
        <div className='boats'>
			
            <h4> Huck Finn Experience </h4>
            <div>
            <img src='https://i.imgur.com/jqkOCKa.jpg'/>
            <Link to=''> Book this raft</Link>
            </div>
    
    
            </div>
            <hr/>
    
           
            
    
    
    
            <Footer/>
            
            </>


)

}

export default MisHome