import React, {useState} from 'react';
 
let logoutTimer;

// const retrieveStoredToken = () => {
//     const storedToken = localStorage.getItem('token');
//     const storedE
// }

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token, expirationTime) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    return adjExpirationTime - currentTime;
}

export const AuthContextProvider = (props) => {
    const initialState = localStorage.getItem("token")
    const [token, setToken] = useState(initialState);
    const userIsLoggedIn = !!token

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem("token");
       
        if (logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }

    const loginHandler = (token, expirationTime) => {
        setToken(token);

        localStorage.setItem("token", token);

        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;