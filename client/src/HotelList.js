// CLASS BASED COMPONENT

// import React, {Component} from 'react';
// import axios from 'axios';

// class HotelList extends Component {
//     constructor(props) {
//         super(props);
//         this.state= {hotels:[{title:''}]}
//     }
//     componentDidMount() {
//     axios.get('http://localhost:5000/hotelslist').then(response =>{
//         this.setState({hotels: response.data})
//         console.log(response);
//         console.log(this.state.hotels[0].title)
//     });
// }

// render() {

//     return(
//         <div>
//             <ul>{this.state.hotels.map(hotel => (

//                 <li>{hotel.title}</li>))}
//             </ul>
//         </div>
//     )}

// }

// export default HotelList;

// FUNCTION COMPONENT

import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Hotel from './Hotel';

function HotelList(props) {
    const[hotels, setHotels] = useState([]);
    

    useEffect(() =>{
        async function getData() {
            const res = await axios.get('http://localhost:5000/hotelslist');
            
            setHotels(res.data);
        }
        getData();},[]
    )

    return(
        <div><ul>{hotels.map(hotel => (
            
            <li key={hotel.id}>
                <Link to={`${hotel._id}`}>
                    <Hotel 
                        title={hotel.title} 
                        location={hotel.location}
                        id={hotel._id}
                         />
                </Link>
            </li>
            
        ))}</ul>
        <button><a href='/new'>Add Hotel!</a></button>
        </div>
        
    )
}

export default HotelList;