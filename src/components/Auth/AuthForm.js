import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';
import AuthContext from '../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCxt = useContext(AuthContext);
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true)
    let url;
    if(isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7iqTsrcAO9-tVF5Hj1iSqkcot1OvhuK0"
    } else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7iqTsrcAO9-tVF5Hj1iSqkcot1OvhuK0"
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        recurrentToken: true
      }),
      headers: {
        'content-Type': 'application/json'
      }
    }).then(res => {
      setIsLoading(false)
      if(res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          console.log({data})
          let errorMessage = 'Authentication failed';
          // if (data && data.error && data.error.message) {
          //   errorMessage = data.error.message
          // }
          throw new Error(errorMessage)
        })
      }
    })
    .then(data => {
      console.log(data, "data")
      const expirationTime = new Date((new Date().getTime()) * 1000);
      console.log("time value", expirationTime);
      authCxt.login(data.idToken, expirationTime.toISOString());
      history.replace("/");
    })
    .catch(err => {
      alert(err.message)
    })
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        {console.log("check login state,", isLogin)}
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
