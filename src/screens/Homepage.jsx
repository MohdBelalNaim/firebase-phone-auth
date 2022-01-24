import React, { useState } from 'react';
import Css from './Homepage.css'
import {RecaptchaVerifier,getAuth,signInWithPhoneNumber} from 'firebase/auth'
import { app } from '../firebase';
import Swal from 'sweetalert2';
import Overlay from './Overlay';


const Homepage = () =>{
    const[sentOtp,setSent]=useState(false)
    const[phone,setPhone]=useState("")
    const[otp,setOtp]=useState("")
    const[sending,setSending]=useState(false)
    const auth = getAuth(app)

    const generateRecaptcha = () =>{
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size':'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
              }
        }, auth);
    }

    const requestOtp = (e) =>{
        setSending(true)
        e.preventDefault()
        generateRecaptcha()
        let appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(auth,phone,appVerifier)
        .then(confirmationResult=>{
            window.confirmationResult = confirmationResult
            setSent(true)
            setSending(false)
        })
        .catch(err=>{
            setSending(false)
            if(err.message==="Firebase: Error (auth/too-many-requests)."){
                new Swal({
                    title:"Maximum limit reached",
                    text:"Maximum limit to generate OTP has bee reached, Please try again later",
                    icon:"error"
                })
            }
            else if(err.message==="Firebase: Invalid format. (auth/invalid-phone-number)."){
                new Swal({
                    title:"Invalid phone number",
                    text:"Please double check your phone number and make sure to add your country code",
                    icon:"error"
                })
                .then(done=>window.location.reload())
                
            }
            else{
                console.log(err)
            }
        })
    }

    const verifyOtp = () =>{
        let confirmationResult = window.confirmationResult
        confirmationResult.confirm(otp)
        .then(confirmed=>{
            const user = confirmed.user
            console.log(user)
            new Swal({
                title:"Phone verified",
                text:"Your phone number has been successfully verified",
                icon:"success"
            })
        })
        .catch(err=>{
            new Swal({
                title:"Invlid OTP",
                text:"Please enter correct OTP",
                icon:"error"
            })
        })
    }

    return(
        !sentOtp?
        <>
        {
            sending?<Overlay/>:""
        }
        <div className='container'>
            <div className='row'>
                <div className='col-lg-4'>&nbsp;</div>
                <div className='col-lg-4'>
                    <div className='mt-4 shadow py-3 px-3 rounded animate__animated animate__bounceIn' style={{"backgroundColor":"white"}} >
                        <div id="image-container">
                            <img id="thumb-image" src="https://image.freepik.com/free-vector/secure-login-concept-illustration_114360-4685.jpg" alt="" />
                        </div>
                        <div className='h4 text-center'>Enter your phone number</div>
                        <div>
                            <form onSubmit={requestOtp}>
                                <input maxLength={13} value={phone} onChange={e=>setPhone(e.target.value)} type="text" className='form-control py-2 mt-4' placeholder='Your phone number here'/>
                                <button className='form-control mt-3' style={{"backgroundColor":"#F38C74","color":'white'}}>Send OTP</button>
                            </form>
                        </div>
                    </div>
                    <div id='recaptcha-container'></div>
                </div>
                <div className='col-lg-4'>&nbsp;</div>
            </div>
        </div>
        </>
        :
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
                        <input value={otp} onChange={e=>setOtp(e.target.value)} type="text" className='form-control py-2 mt-4' placeholder='Your OTP here'/>
                        <button onClick={()=>verifyOtp()} className='form-control mt-3' style={{"backgroundColor":"#F38C74","color":'white'}}>Verify OTP</button>
                    </div>
                    <div onClick={()=>window.location.reload()} className='text-center mt-3'><i className='px-2 fas fa-arrow-left'></i> Go back</div>
                </div>
            </div>
            <div className='col-lg-4'>&nbsp;</div>
        </div>
    </div>
    )
}

export default Homepage