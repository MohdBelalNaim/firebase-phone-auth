import React from 'react';
import Css from './Homepage.css'
const Verify = () =>{
    return(
        <div className='container'>
        <div className='row'>
            <div className='col-lg-4'>&nbsp;</div>
            <div className='col-lg-4'>
                <div className='mt-4 shadow py-3 px-3 rounded animate__animated animate__bounceIn' style={{"backgroundColor":"white"}}>
                    <div id="image-container">
                        <img id="thumb-image-two" src="https://image.freepik.com/free-vector/authentication-concept-illustration_114360-1640.jpg" alt="" />
                    </div>
                    <div className='h4 text-center'>We sent you an OTP</div>
                    <div>
                        <input type="text" className='form-control py-2 mt-4' placeholder='Your OTP here'/>
                        <button className='form-control mt-3' style={{"backgroundColor":"#F38C74","color":'white'}}>Verify OTP</button>
                    </div>
                </div>
            </div>
            <div className='col-lg-4'>&nbsp;</div>
        </div>
    </div>
    )
}

export default Verify