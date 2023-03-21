import React, {useState, useEffect, useContext} from 'react';
import axiosRender from '../../utils/axios';
import {useNavigate} from 'react-router-dom';
import Restaurant from './Restaurant';
import GeneralMap from './GeneralMap';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SearchRestaurant from './SearchRestaurant';
import {UserContext} from '../../context/UserContext';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';







function RestaurantList(props) {
    const[restaurants, setRestaurants] = useState([]);
    const [userContext, setUserContext] = useContext(UserContext);

    const[searchDone, setSearchDone] = useState(false)

    const navigate = useNavigate();

    useEffect(() =>{
        async function getData() {
            const res = await axiosRender.get('/restaurants');
            
            setRestaurants(res.data);
        }
        getData();},[restaurants?.length]
    )

    const clearSearch = () => {
        if(userContext.searchRestaurants && userContext.searchRestaurants.length > 0) {
        setUserContext(oldValues => {
            return { ...oldValues, searchRestaurants: [] };
          
        }) 
        navigate('/restaurants') 
        }
    }

    const toggleSearchDone = () => {
        setSearchDone(prev => !prev)
    }


    return(
        <> 
            <Container>
                <GeneralMap/>
                <SearchRestaurant toggleSearchDone={toggleSearchDone}/>
                 {userContext.searchRestaurants && userContext.searchRestaurants.length > 0 && <Button onClick={clearSearch}>All Restaurants</Button>}
                    <Grid container direction='row' justifyContent='space-around' sx={{marginTop:'1%'}}>
                    
                        {userContext.searchRestaurants && userContext.searchRestaurants.length > 0 ?
                        
                        userContext.searchRestaurants.map(searchRestaurant => (
                        
                           
                            <Grid item md={6} lg={4} key={searchRestaurant._id} >
                            <Restaurant 
                                title={searchRestaurant.title} 
                                location={searchRestaurant.location}
                                id={searchRestaurant._id}
                                description={searchRestaurant.description}
                                price={searchRestaurant.price}
                                images={searchRestaurant.images}
                                key={searchRestaurant._id}
                            />
                            </Grid>
                        ))

                      : ( searchDone===false ?
                       
                       restaurants.map(restaurant => (
                        <Grid item md={6} lg={4} key={restaurant._id} sx={{display: 'flex', justifyContent:'space-around'}} >
                                <Restaurant 
                                    title={restaurant.title}
                                    location={restaurant.location}
                                    id={restaurant._id}
                                    description={restaurant.description}
                                    price={restaurant.price}
                                    images={restaurant.images}
                                    key={restaurant._id}
                                />
                        </Grid>)) :
                        <Typography>No restaurants found!</Typography>)

                        }
                
                    </Grid>

            </Container>
        </>
    )
}

export default RestaurantList;