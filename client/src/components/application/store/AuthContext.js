import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userinfo, setUserInfo] = useState({});

    const updateUserInfo = (newInfo) => {
        setUserInfo(newInfo);
    };

    useEffect(() => {
        console.log("AuthContext.js userinfo:", userinfo);
    }, [userinfo]);



    const login = async (userData) => {
        try {
            // Call the /user endpoint to fetch user information
            const response = await axios.post('http://localhost:3000/user', userData);
            // Update user information state
            setUserInfo({ ...response.data })
            // Set isLoggedIn to true
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed:', error);
            setIsLoggedIn(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:3000/logout', "", {
                withCredentials: true,
            });
            setUserInfo({});
            setIsLoggedIn(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userinfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };