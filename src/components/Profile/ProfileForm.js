import React, {useRef, useContext} from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = passwordRef.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD7iqTsrcAO9-tVF5Hj1iSqkcot1OvhuK0", {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res.data)
      history.replace("/auth")
    })

  }

  // method: 'POST',
  //     body: JSON.stringify({
  //       email: enteredEmail,
  //       password: enteredPassword,
  //       recurrentToken: true
  //     }),
  //     headers: {
  //       'content-Type': 'application/json'
  //     }



  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password'minLength="7" ref={passwordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
