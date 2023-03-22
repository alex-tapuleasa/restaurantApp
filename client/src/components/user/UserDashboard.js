import React, {useContext, useEffect, useState} from 'react';
import { Typography, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import axiosRender from '../../utils/axios';


function UserDashboard(props) {

    const[userContext, setUserContext] = useContext(UserContext);
    const[userRestaurants, setUserRestaurants] = useState([]);

    

    useEffect(() => {
        async function getRestaurantsData() {
            // const config = {
            //     credentials: "include",
            //     headers: {
            //       "Content-Type": 'application/json',
            //       "Authorization": `Bearer: ${userContext.token}`
            //     }
                
            //   }
         const res = await axiosRender.get(`/api/auth/userrestaurants/${userContext.details._id}`, {headers: {
            // "Content-Type": 'application/json',
            "Authorization": `Bearer ${userContext.token}`
          }});    
         setUserRestaurants(res.data) 
        };
        getRestaurantsData();
    }, [userContext])


    

    return(
            
            <Box sx={{
                            
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center', 
                            alignItems: 'center',
                            backgroundColor: 'white', 
                            boxShadow: '0 0 30px 6px rgb(31 51 73 / 10%)',
                            borderRadius:'5px'

                        }}>
                <Typography 
                    sx={{
                        textAlign: 'center', 
                        color:'#0277BD', 
                        paddingBottom:'5%', 
                        fontSize:{xs: '1rem', sm: '1.2rem', md: '1.2rem'}, 
                        fontWeight:'600', 
                        margin: '2rem auto'
                    }} 
                    variant='h6'>
                    {userRestaurants && userRestaurants.length > 0 ? 
                    `You have ${userRestaurants.length} restaurants registered` : 'No restaurants added yet'}
                </Typography>            
            <List>
                {userRestaurants?.map(restaurant => (
                    <ListItem key={restaurant._id}>
                    <ListItemButton divider component="a" href={`/restaurants/${restaurant._id}`}>
                        <ListItemText primary={restaurant.title} sx={{color: '#3949AB', '&:hover': {color: 'black'}}}/>
                        
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            </Box>
            
    )
}

export default UserDashboard;