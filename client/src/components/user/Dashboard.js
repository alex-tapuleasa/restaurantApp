import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  Loader from  './Loader';
import { UserContext } from '../../context/UserContext';
import { motion } from 'framer-motion';
import axiosRender from '../../utils/axios';

import './Dashboard.css';
import UserDashboard from './UserDashboard';
import UserPhoto from './UserPhoto';
import UserWelcome from './UserWelcome';

const Dashboard = () => {
    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false)
    const [showRestaurants, setShowRestaurants] = useState(false)

    const [userContext, setUserContext] = useContext(UserContext);

    const handleShowProfile = () => {
        setShowProfile(true);
        setShowRestaurants(false);
    }

    const handleShowRestaurants = () => {
        setShowProfile(false);
        setShowRestaurants(true);
    }

    const logout = () => {

        // const config = {
        //   credentials: "include",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${userContext.token}`
        //   }
        // };
    
        axiosRender.get('/api/auth/logout', {headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userContext.token}`
          }})
        .then(async response => {
          setUserContext(oldValues => {
            return { ...oldValues, token: null, details: {} }
          })
          window.localStorage.setItem("logout", Date.now())
          navigate('/login')
        })
    }

  return (

    userContext.details ===  null ? ('Error loading user details!') : !userContext.details ? (<Loader/>) : (

    <div className='main'>
        <div className='dashboard-wrapper'>
            <div className='dashboard-container'>
                <div className='dashboard-container-menu'>
                    <div className='button-container'>
                        <button type='button' onClick={handleShowProfile} className={showProfile ? 'active' : ''}>Profile</button>
                        <button type='button' onClick={handleShowRestaurants} className={showRestaurants ? 'active' : ''} >My Restaurants</button>
                        <button type='button' onClick={logout}>Logout</button>
                    </div>
                </div>
                <div className='dashboard-container-item'>
                    { showProfile &&
                        <motion.div 
                            className='userPhoto-container'
                            animate={{y:[100, 0], opacity:[0, 1]}}
                            transition={{duration: 0.5 ,type: 'ease-in-out'}}
                            >
                                <UserPhoto />
                        </motion.div>
                    }
                    { showRestaurants &&
                        <motion.div 
                            className='userDashboard-container'
                            animate={{y:[100, 0], opacity:[0, 1]}}
                            transition={{duration: 0.5 ,type: 'ease-in-out'}}
                            >
                                <UserDashboard />
                        </motion.div>
                    }
                    { !showProfile && !showRestaurants && 
                    <UserWelcome />
                    }
                    
                </div>
            </div>
        </div>
    </div>
    ))
}

export default Dashboard;