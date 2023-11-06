import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './Registration';
import Registration from './Registration';

function Login() {
  const userRef = useRef();
  const errRef = useRef();

  // some state
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //set the focus on the first input field
  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  //empty the error message and set user and password
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();

      axios.post('http://localhost:3000/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      
      console.log(user, pwd);
      setUser('');
      setPwd('');
      setSuccess('true');
    } catch (error) {
      console.log(errMsg);
    }
    
  }

//tennary action to respond to the succes of the login
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href='/'>Go To Home</a>
          </p>
        </section>
      ) : (
      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} arial-aria-live='assertive'>{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            // autoComplete='off'//not supported
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required />

            <button onClick={handleSubmit}>Sign In</button>
        </form>
        <p>
          Need an Account?<br />
          <span className='line'>
            {/*put router link here*/}
            
            {/* <a href='./Registration.js'>Register</a>  */}

          </span>
        </p>
      </section>
    )}
    </>
  )
}

export default Login