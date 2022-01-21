import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCxt = useContext(AuthContext);
  const isLoggedIn = authCxt.isLoggedIn; 
  
  const logoutHandler = () => {
    authCxt.logout();
    //you can redirect the user here, this is optional
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
            </li>
          }
          {
            isLoggedIn && <li>
              <Link to='/profile'>Profile</Link>
            </li>
          }
          {
            isLoggedIn && <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          }
        </ul>
       </nav>
    </header>
  );
};

export default MainNavigation;
