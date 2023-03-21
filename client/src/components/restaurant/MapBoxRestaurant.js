import React, {useEffect, useRef, useState, useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import axiosRender from '../../utils/axios';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHRhcHVsZWFzYSIsImEiOiJja242OXl4ZjYwYzZoMnhwOTZzMjdxaWZsIn0.Hd-tvdnfV7XkDffsPf2Cqg';

export default function MapBoxRestaurant(props) {

    
 
const [userContext, setUserContext] = useContext(UserContext);   

const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(9);

useEffect(() => {
    
    async function getGeometry() {
    const res = await axiosRender.get(`/restaurants/geometry/${props.restaurantId}`);
    // console.log(`${res.data.coordinates[0]} - ${res.data.coordinates[1]}`)
    setLng(res.data.coordinates[0]);
    setLat(res.data.coordinates[1]);
    }
    // console.log(`Longitude: ${lng} - Latitude:${lat}`);
getGeometry()
}, [])

useEffect(() => {
   
    // if (map.current) return; // initialize map only once
    // console.log('MapBox UseEffect!!!')
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng,lat],
    zoom: zoom
    });
    new mapboxgl.Marker()
        .setLngLat([lng,lat])
        .setPopup(
            new mapboxgl.Popup({offset: 25})
            .setHTML(
                `<h3>${props.title}</h3><p>${props.location}</p>`
            )
        )
        .addTo(map.current)
    }, [lng, lat]);


return (
<div>
<div ref={mapContainer} style ={{height: '500px'}}/>
</div>)

};

