import { useState } from 'react';
import { alpha, Box } from '@mui/material';
import { ChatState } from '../../context/ChatProvider.jsx';
import AppBar from './AppBar';
import MyChats from '../chat/MyChats.jsx';
import ChatBox from '../chat/ChatBox.jsx';

const Chat = ({mode, toggleColorMode, showCustomTheme, toggleCustomTheme}) => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      {user && <AppBar mode={mode} toggleColorMode={toggleColorMode} showCustomTheme={showCustomTheme} toggleCustomTheme={toggleCustomTheme}/>}
      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', height: '90vh', p: '10px'}}>
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </Box>
  );
}

export default Chat;