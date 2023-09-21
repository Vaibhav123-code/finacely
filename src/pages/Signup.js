import React from 'react'
import Header from '../componenet/Header'
import SignupSignin from '../componenet/SignupSignin'

function Signup() {
  return (
    <div>
        <Header />  
        <div className='wrapper'>
          <SignupSignin />
        </div>
    </div>
  )
}

export default Signup