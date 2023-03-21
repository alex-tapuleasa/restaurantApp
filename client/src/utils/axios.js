import axios from 'axios';

const axiosRender = axios.create({
    baseURL: "https://restaurantguideapi.onrender.com",
    withCredentials: true
})

export default axiosRender;