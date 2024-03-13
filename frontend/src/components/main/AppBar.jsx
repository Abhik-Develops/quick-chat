import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Tooltip, Typography, CircularProgress, Badge, IconButton, Menu, MenuItem, ListItemIcon, Avatar} from '@mui/material';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';
import { Notifications, Settings, Logout, Search} from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { ChatState } from '../../context/ChatProvider.jsx';
import ToggleColorMode from './ToggleColorMode.jsx'
import ToggleCustomTheme from './ToggleCustomTheme.jsx';
import ChatLoading from '../chat/ChatLoading.jsx';
import ProfileModal from '../miscellaneous/ProfileModal.jsx';
import EditProfileModal from '../miscellaneous/EditProfileModal.jsx';
import UserListItem from '../user/UserListItem.jsx';
import { getSender } from '../../configs/ChatLogics.js';
import axios from 'axios';


function AppBar({mode, toggleColorMode, showCustomTheme, toggleCustomTheme}) {
  const { user, setSelectedChat, chats, setChats, notifications, setNotifications } = ChatState();
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const open = Boolean(anchorEl);
  const openNotifications = Boolean(anchorElNotifications);

  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleClickNotifications = (event) => {
      setAnchorElNotifications(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  const handleCloseNotifications = () => {
      setAnchorElNotifications(null);
  };

  const logoutHandler = () => {
      localStorage.removeItem("userInfo");
      navigate('/signin');
  }

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const [error, setError] = useState({
      status: false,
      msg: "",
      type: "",
  })

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError({
      ...error,
      status: false,
    })
  };

  const handleSearch = async (e) => {
    if(e.key === 'Enter' || e.type === 'click'){
        if(!search){
            setError({
                status: true,
                msg: 'Please enter something in search',
                type: 'warning',
            })
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const {data} = await axios.get(`${import.meta.env.VITE_ENDPOINT}/api/user?search=${search}`, config)
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            setError({
                status: true,
                msg: 'Failed to load search results',
                type: 'error',
            })
        }
    }
  }

  const accessChat = async (userId) => {
    try {
        setLoadingChat(true);
        const config = {
            headers: {
                "Content-type":"application/json",
                Authorization: `Bearer ${user.token}`,
            }
        };
        const { data } = await axios.post(`${import.meta.env.VITE_ENDPOINT}/api/chat`, {userId}, config);
        if(!chats.find((c)=> c._id === data._id)){
          setChats([data, ...chats]);
        } 
        setSelectedChat(data);
        setLoadingChat(false);
        setOpenDrawer(false);
    } catch (error) {
        setError({
            status: true,
            msg: 'Error fetching the chat',
            type: 'error',
        })
    }
  }

  return (
    <>
      <Box
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          pt: '10px',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box>
              <Tooltip title='Search Users' arrow>
                <Button
                  variant="text"
                  color="primary"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                  sx={{ minWidth: '30px', p: '4px' }}
                >
                  <Search/>
                </Button>
              </Tooltip>
              <Drawer 
                anchor="left" 
                open={openDrawer} 
                onClose={toggleDrawer(false)} 
                PaperProps={{
                  sx: { width: {md: '40%', sm: '65%', xs: '90%'}, scrollbarWidth: 'none'},
                }}>
                <Box
                  sx={{
                    p: 5,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Tooltip title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`} arrow>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 60,
                        top: 12,
                      }}
                    >
                      <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                    </Box>
                  </Tooltip>
                  <Tooltip title='Theme' arrow>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 12,
                        top: 10,
                      }}
                    >
                      <ToggleCustomTheme showCustomTheme={showCustomTheme} toggleCustomTheme={toggleCustomTheme} />
                    </Box>
                  </Tooltip>
                  <IconButton
                      aria-label="close Frawer"
                      onClick={toggleDrawer(false)}
                      sx={{
                          position: 'absolute',
                          right: 8,
                          top: 8,
                      }}
                      >
                      <CloseIcon />
                  </IconButton>
                  <Stack
                    direction='row'
                    alignSelf="center"
                    alignItems='center'
                    spacing={1}
                    useFlexGap
                    sx={{ mt: 7, mb: 3}}
                  >
                    <TextField
                      id="outlined-basic"
                      hiddenLabel
                      size="small"
                      fullWidth
                      variant="outlined"
                      aria-label="Search Users by Name or Email"
                      placeholder="Search Users by Name or Email"
                      onChange={(e)=>setSearch(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                      Search
                    </Button>
                  </Stack>
                  <Snackbar 
                    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                    open={error.status} 
                    autoHideDuration={6000} 
                    onClose={handleCloseError}
                  >
                    <Alert
                      onClose={handleCloseError}
                      severity={error.type}
                      variant='filled'
                      sx={{ width: '100%' }}
                    >
                      {error.msg}
                    </Alert>
                  </Snackbar>
                  {loading ? <ChatLoading/> :
                    <Stack spacing={2}>
                        {searchResult.map((user) => {
                            return <UserListItem key={user._id} user={user} handleFunction={()=>{accessChat(user._id)}}/>
                        })}
                    </Stack>
                  }
                  {loadingChat && <Stack alignItems='center' sx={{mt: 2}}><CircularProgress /></Stack>}
                </Box>
              </Drawer>
            </Box>
            <Typography sx={{fontSize: 20, fontFamily: 'Work sans'}}>
                Quick Chat
            </Typography>
            <Stack direction='row' spacing={{xs: 0, sm: 1, md: 2}} alignItems='center'>
              <Tooltip title='Theme' arrow>
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    alignItems: 'center',
                  }}
                >
                  <ToggleCustomTheme showCustomTheme={showCustomTheme} toggleCustomTheme={toggleCustomTheme} />
                </Box>
              </Tooltip>
              <Tooltip title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`} arrow>
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    alignItems: 'center',
                  }}
                >
                  <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                </Box>
              </Tooltip>
              <Tooltip title="Notifications" arrow>
                  <IconButton onClick={handleClickNotifications}>
                      <Badge badgeContent={notifications.length} max={99} color='error' overlap='circular'>
                          <Notifications/>
                      </Badge>
                  </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorElNotifications} open={openNotifications} onClose={handleCloseNotifications} onClick={handleCloseNotifications}>
              {
                !notifications.length && 
                <MenuItem>
                  No new messages
                </MenuItem>
              }
              {
                notifications.map((notification) => {
                  return (
                    <MenuItem key={notification._id} onClick={()=>{
                      console.log(notification)
                      setSelectedChat(notification.chat)
                      setNotifications(notifications.filter((n)=>n.chat._id !== notification.chat._id))}}>
                    {
                      notification.chat.isGroupChat ? `New message from ${notification.chat.chatName}` : `New message from ${getSender(user, notification.chat.users)}`
                    }
                    </MenuItem>
                  )
                })
              }
              </Menu>
              <Tooltip title="Account Settings" arrow>
                <IconButton onClick={handleClick}>
                  <Avatar alt={user.name} src={user.pic} sx={{ width: 26, height: 26 }}/>
                </IconButton>
              </Tooltip>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <ProfileModal user={user}>
                  <MenuItem>
                    <ListItemIcon>
                      <Avatar alt={user.name} src={user.pic} sx={{ width: 24, height: 24}}/>
                    </ListItemIcon>
                    My Profile
                  </MenuItem>
                </ProfileModal>
                <Divider sx={{my: 1}}/>
                <EditProfileModal>
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                </EditProfileModal>
                <MenuItem onClick={logoutHandler}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          </Toolbar>
        </Container>
      </Box>
    </>
  );
}

AppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppBar;