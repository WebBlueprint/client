import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userinfo, setUserInfo] = useState({});

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
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:3000/logout', "", {
                withCredentials: true,
            }); // 로그아웃 요청
            // 로그아웃 후 필요한 동작 수행
            // ...
        } catch (error) {
            console.error(error);
        }
    };

    console.log("AuthContext.js isLoggedIn  " + isLoggedIn)

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userinfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };