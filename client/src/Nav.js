import React from 'react';
import './nav.css';

import {useState} from 'react';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from './context/UserContext';
import axiosRender from './utils/axios';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {styled} from '@mui/material/styles';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));


const Nav = () => {
    const navigate = useNavigate();
    const logout = () => {

        // const config = {
        //   credentials: "include",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Authorization": `Bearer ${userContext.token}`
        //   }
        // };
    
        axiosRender.get('/api/auth/logout', {headers: {
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
    const [userContext, setUserContext] = React.useContext(UserContext);
    const[activeNav, setActiveNav] = useState('#')
    return(
        <nav>
            <LightTooltip title='Home'><a href='/' onClick={ () => setActiveNav('/')} className={activeNav === '/' ? 'active' : ''}><HomeIcon /></a></LightTooltip>
            <LightTooltip title='Restaurants'><a href='/restaurants' onClick={ () => setActiveNav('/restaurants')} className={activeNav === '/restaurants' ? 'active' : ''} ><RestaurantIcon /></a></LightTooltip>
            <LightTooltip title='Add Restaurant'><a href='/new' onClick={ () => setActiveNav('/new')} className={activeNav === '/new' ? 'active' : ''}><AddCircleIcon /></a></LightTooltip>
            
            {userContext.token ? 
                <LightTooltip title='Logout'><a href='/login' onClick={logout}><LogoutIcon /></a></LightTooltip>
             :<Stack direction='row' sx={{dysplay:'flex', justifyContent: 'space-around'}}>
                <LightTooltip title='Login'><a href='/login' onClick={ () => setActiveNav('/login')} className={activeNav === '/login' ? 'active' : ''}><PersonIcon /></a></LightTooltip>
                <LightTooltip title='Register'><a href='/register' onClick={ () => setActiveNav('/register')} className={activeNav === '/register' ? 'active' : ''}><PersonAddIcon/></a></LightTooltip>
             </Stack>}

            
        </nav>
    )
}

export default Nav;