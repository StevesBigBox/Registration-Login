import React, {useRef,useState, useEffect} from 'react';
//import {Link} from 'react-router-dom';
import Login from './Login';
import axios from 'axios';

//console.log(FontAwesomeIcon);

//validation of the user and pwd, in the input fields
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Registration() {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState('false');
  //const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState('false');
  //const [pwdFocus, setPwdFocus] = useState('false');

  const [matchPwd, setMatchPwd] = useState('');
  var [validMatch, setValidMatch] = useState('false');
  var [registered, setRegistered] = useState('false');
  //const [matchFocus, setMatchFocus] = useState('false');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //when the component load
  useEffect(() => {
    userRef.current.focus();
  }, []);

  
  // validate the user name
  useEffect(() => {
    const result = USER_REGEX.test(user);
    //console.log(result);
    //console.log(user);
    setValidName(result);
  }, [user]);

  
  //having issues with this code
  //testing the password , match with matchPwd
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    //console.log(result);
    //console.log(pwd);
    setValidPwd(result);

    const registered = pwd === validPwd;
    setValidMatch(registered);
    setRegistered('true');
    
  }, [pwd, validPwd, registered]);

  //handle errors
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async(e) => {
    try {
      axios.post('http://localhost:3000/user',{
        username: 'username',
        password: 'password'
      })
      .then(function(response){
        console.log(response);
      })

      console.log(user, pwd);
      setUser('');
      setPwd('');
      setSuccess('true');

    } catch (error) {
      
    }
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if(!v1 || !v2){
    setErrMsg("Invalid Entry");
    return;
    }
    //console.log(user, pwd);
    setSuccess('true');
    //connect to the backend
    
  }

  //trying to add some functional form validation
  function validateForm() {
    try {
      let x = document.forms["regForm"]["username"].value;
      let x1 = document.forms["regForm"]["password"].value;
      let x2 = document.forms["regForm"]["validPwd"].value;

      if (x == "" || x1 == "" || x2 == "") {
        alert("Must be filled out");
        return false;
      }
      } catch (error) {
        
    }

    handleSubmit();

  }
  // validateForm();

  return (
    //tenary function to check for success and change the state of the app in according
    <>
      {success ? (
        <section>
          <h1>You're Registered Please Continue!</h1>
          <br />
          <p>
            {<Login />}{/* <a href='./Login.js'>Login</a> */}
          </p>
        </section>
      ) : (
        <section>
          {/* this is for the error handling */}
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
          <h1>Register</h1>
          <form id='regForm' onSubmit={validateForm}>
            <label htmlFor='username'>
              Username: 
              
            </label>
            <input 
              type='text'
              id='username'
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby='uidnote'
              // onFocus={() => setUserFocus(true)}
              // onBlur={() => setUserFocus(false)}
            /><br />

            <label htmlFor='password'>
              Password: 
              
              </label>
              <input
                type='password'
                id='password'
                autoComplete='off'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-describedby='pwdnote'
                // onFocus={() => setPwdFocus(true)}
                // onBlur={() => setPwdFocus(false)}
                /><br />
              
            <label htmlFor='matchPwd'>
                Confirm Password: 
                
              </label>
              <input
                type='password'
                id='validPwd'
                autoComplete='off'
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? "true" : "false"}    //aria-invalid={validMatch ? "false" : "true"}
                aria-describedby='confirmnote'
                // onFocus={() => setMatchFocus(true)}
                // onBlur={() => setMatchFocus(false)}
              /><br />
              
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </section>
      )}
    </>
  )
}

export default Registration