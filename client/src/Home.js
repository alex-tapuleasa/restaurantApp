import React from 'react';
import { motion } from 'framer-motion';

import './Home.css';
import Nav from './Nav';



function Home() {

    return (
        <>
        <Nav />
        <div className='homepage' >
            <motion.div 
                className='slogan'
                animate={{opacity: [0,1], y: [100, 0] }}
                transition={{duration: 1, type: 'ease-in-out', delay: 0.5 }}
                >
                    <h2>Trust us as your gastronomique guide!</h2> 
                    <h3>We help you chose the right restaurant for you!</h3>
            </motion.div>
        </div>
        </>
    )
}

export default Home;

