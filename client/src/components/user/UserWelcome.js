import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import Typography from '@mui/material/Typography';
import  Loader from  './Loader';
import { motion } from 'framer-motion';



function UserWelcome () {
    const [userContext, setUserContext] = useContext(UserContext);

    return  userContext.details ===  null ? ('Error loading user details!') : !userContext.details ? (<Loader/>) : 
    
    <motion.div
        animate={{opacity:[0, 1], scale:[0, 1]}}
        transition={{duration: 1.5, type: 'ease-in-out', delayChildren: 0.5}}

        style={{
            borderRadius: '8px', 
            height: '500px', 
            // background: 'linear-gradient(134.87deg, #52e5e7 -20%, #130cb7 109.89%)', 
            boxShadow: '0 0 30px 6px rgb(31 51 73 / 10%)',
            display: 'flex', 
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        {/* <EmojiPeople sx={{color:'black', marginBottom: '1%', fontSize:'3rem'}}/> */}
        <span style={{fontSize: '2.5rem'}}>👋</span>
        <Typography variant='h5' sx={{
            textTransform: 'capitalize',
            textAlign: 'center', 
            color:'#0277BD', 
            marginTop:'1rem',
            fontSize:'1.2rem', 
            fontWeight:'900', 
            letterSpacing:{xs: '1px', md: '2px'}}}>
                Welcome, {userContext.details.username}!
        </Typography>
    </motion.div>
}

export default UserWelcome;