import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from './context/UserContext';
import logo from './assets/images/gourmand-logo5.png';
import axiosRender from './utils/axios';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';



// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userContext, setUserContext] = React.useContext(UserContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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


  return (
    // sx={{mb: '20px'}}''
    <>
    <ThemeProvider theme={ theme }>
    <AppBar position='fixed' 
      sx={{ background: '#fff', 
        color:'#2D3843', 
        boxShadow: 'none', 
        backdropFilter:'blur(8px)', 
        borderStyle: 'solid',
        borderColor: '#E7EBF0',
        borderWidth: '0',
        borderBottomWidth: 'thin',
        backgroundColor: 'rgba(255,255,255,0.8)', 
        
      }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          
          <Box
            component='img'
            src={logo}
            sx={{height: '40px', width:'100px', display:{ xs: 'none', md: 'flex'}}}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
                
              }}
            >
              
                <MenuItem component={Link} href='/'
                onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"> Home </Typography>
                </MenuItem>
                <MenuItem component={Link} href='/restaurants'
                onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center" >
                    Restaurants</Typography>
                </MenuItem>
                <MenuItem component={Link} href='/new'
                onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    Add Restaurant</Typography>
                </MenuItem>
              
            </Menu>
            <Box
            component='img'
            src={logo}
            sx={{height: '30px', width:'100px', margin: '2% auto 0'}}
          />
          </Box>
          
          <Box sx={{ flexGrow: 1, justifyContent:'flex-end', display: { xs: 'none', md: 'flex' }, my: 1, mx: 1.5 }} >
              <Button
                disableRipple={true}
                href='/'
                onClick={handleCloseNavMenu}
                sx={{  my: 2, display: 'block', '&:hover':{ backgroundColor: 'transparent'}}}
                >
                <HomeIcon sx={{marginLeft: '72px', marginRight: '32px', color:'black', '&:hover':{ color: '#4287f5'}}} />
              </Button>
              <Button
                href='/restaurants'
                onClick={handleCloseNavMenu}
                disableRipple={true}
                sx={{ '&:hover':{ backgroundColor: 'transparent', color: '#4287f5'}, my: 2, color: 'black', display: 'block', paddingRight:'32px', textTransform: 'capitalize' }}
              >
                Restaurants
              </Button>
              <Button
                href='/new'
                onClick={handleCloseNavMenu}
                sx={{ '&:hover':{ backgroundColor: 'transparent', color: '#4287f5'}, my: 2, color: 'black', display: 'block', paddingRight:'32px', textTransform:'capitalize'}}
                disableRipple={true}
              >
                Add Restaurant
              </Button>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={userContext.token ? 'View Account' : 'Login'}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={userContext.details && userContext.details.avatarImage ? userContext.details.avatarImage.url : '' } sx={{ width: { xs:40, md: 56 }, height: { xs:40, md: 56 } }}/>
              </IconButton>
            </Tooltip>

             <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userContext.token && userContext.details && userContext.token !== null ? 
              <div>
                <Link href={`/aboutme/${userContext.details._id}`} underline='none' sx={{color: 'black'}}><MenuItem>Profile</MenuItem></Link>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </div>
                : <Link href='/login' underline='none'><MenuItem>Login</MenuItem></Link>}
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
    </ThemeProvider>
    
  </>)
};

export default Navbar;

