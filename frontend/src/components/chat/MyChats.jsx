import { useState, useEffect } from 'react';
import { Box, Button, Stack, Snackbar, Alert, alpha } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ChatState } from '../../context/ChatProvider.jsx';
import NewGroupChatModal from '../miscellaneous/NewGroupChatModal.jsx';
import ChatListItem from './ChatListItem.jsx';
import ChatLoading from './ChatLoading';
import axios from 'axios';

const MyChats = ({fetchAgain}) => {
  const { user, selectedChat, setSelectedChat, chats, setChats, notifications, setNotifications } = ChatState();
  const [loggedUser, setLoggedUser] = useState(user);
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

  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };
      const {data} = await axios.get(`${import.meta.env.VITE_ENDPOINT}/api/chat`, config);
      setChats(data)
    } catch (error) {
      setError({
        status: true,
        msg: 'Failed to load the chats',
        type: 'error',
      })
    }
  }

  const handleClick = (chat) => {
    setNotifications(notifications.filter((notification)=> notification.chat._id !== chat._id));
    setSelectedChat(chat)
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChat();
  },[fetchAgain])

  return (
    <Box
      sx={(theme) => ({
        display: {xs: selectedChat ? "none" : "flex", md: "flex"}, 
        flexDirection: 'column', 
        alignItems: 'center', 
        height: '100%',
        width: {xs:"100%", md:"31%"},
        p: 3, 
        borderRadius: '10px',
        outline: '1px solid',
        outlineColor:
          theme.palette.mode === 'light'
            ? alpha('#BFCCD9', 0.5)
            : alpha('#9CCCFC', 0.1),
        boxShadow:
          theme.palette.mode === 'light'
            ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
            : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
      })}
    >
      <Box sx={{fontSize: {xs:'28px', md:'30px'}, fontFamily: 'Work sans', display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
        <NewGroupChatModal>
          <Button variant='outlined' size='large' fullWidth startIcon=<AddIcon/>>
            New Group Chat
          </Button>
        </NewGroupChatModal>
      </Box>
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
      <Box sx={{display: 'flex', flexDirection: 'column', py: 3, bgcolor: 'F8F8F8', width: '100%', h: '100%', borderRadius: '10px', overflowY: 'hidden'}}>
        {
          chats ? 
          <Stack sx={{overflowY: 'scroll', '::-webkit-scrollbar': {display: 'none'}}} spacing={2}>
            {chats.map((chat)=>{
              const notificationCount = notifications.reduce((count, notification) => {
                  if (notification.chat._id === chat._id) {
                      return count + 1;
                  }
                  return count;
              }, 0);
              return (
                <ChatListItem key={chat._id} chat={chat} handleFunction={handleClick} loggedUser={loggedUser} notificationCount={notificationCount}/>
              )})}
          </Stack>
        : <ChatLoading/>}
      </Box>
    </Box>
  )
}

export default MyChats