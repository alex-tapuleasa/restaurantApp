import React, {useContext, lazy, Suspense, useCallback, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import RestaurantList from './components/restaurant/RestaurantList';
import RestaurantDetails from './components/restaurant/RestaurantDetails';
import SignUp from './components/user/SignUp';
import SignIn from './components/user/SignIn';
import ForgotPassword from './components/user/ForgotPassword';
import Navbar from './Navbar';
import Home from './Home';
import { UserContext } from './context/UserContext';
import axiosRender from './utils/axios';
import ResetPassword from './components/user/ResetPassword';
import Dashboard from './components/user/Dashboard';


const NewRestaurantForm = lazy(() => import('./components/restaurant/NewRestaurantForm'));

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(async () => {
    // if(!userContext.token) return;
  
     const res = await axiosRender.post('/api/auth/refreshtoken', {headers: {
      "Authorization": `Bearer: ${userContext.token}`
    }});
      
     if(res.statusText === 'OK') {
       setUserContext(oldValues => {
         return{...oldValues, token: res.data.token}
         
       })
     } else {
       setUserContext(oldValues => {
         return{...oldValues, token: null}
       })
     }
    
      // call refreshToken every 10 minutes to renew the authentication token.
      setTimeout(verifyUser, 10 * 60 * 1000)
  },[setUserContext]);

  useEffect(() => {
    verifyUser();
    
 
  }, [verifyUser]);

// ==============================================

  const fetchUserDetails = useCallback(async () => {
    // const config = {
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${userContext.token}`,
    //       }
    // }

    const res = await axiosRender.get('/api/users/me', {headers: {
      Authorization: `Bearer ${userContext.token}`,
    }});
    
            setUserContext(oldValues => {
                return { ...oldValues, details: res.data };
            })
           

}, [setUserContext, userContext.token]);

  useEffect(() => {
    
    // fetch only when user details are not present  
        if(!userContext.token) 
        return;                 
        if (!userContext.details) {
             fetchUserDetails()
             return () => {

             }
        }
  }, [userContext.details, userContext.token, fetchUserDetails])



  return (
    <div >
      
        <Navbar/>
        
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>          
          <Route
            path='/'
            element = {<Home/>}></Route>
          <Route
            path='restaurants/search'
            element = { <RestaurantList/> }></Route>  
          <Route
            path='restaurants'
            element = { <RestaurantList/> }></Route>                 
          <Route 
            path='restaurants/:id'
            element ={<RestaurantDetails/>}></Route> 
          <Route
            path='/new'
            element = {userContext.token ? <NewRestaurantForm/> : <SignIn/>}></Route>   
          <Route
            path='/aboutme/:id'
            element = {userContext.token ? <Dashboard/> : <SignIn/>}></Route>
          <Route
            path='/register'
            element = {<SignUp/>}></Route> 
          <Route
            path='/login'
            element = {<SignIn/>}></Route>
          <Route
            path='/forgotpassword'
            element = {<ForgotPassword/>}></Route>
          <Route
            path='/resetpassword/:resetToken'
            element = {<ResetPassword/>}></Route>

          </Routes></Suspense>
    
    </div>
  );
}

export default App;
