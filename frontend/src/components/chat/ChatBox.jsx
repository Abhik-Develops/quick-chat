import { Box, alpha } from '@mui/material'
import { ChatState } from '../../context/ChatProvider.jsx'
import SingleChat from './SingleChat.jsx'

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const { selectedChat } = ChatState();
  
  return (
    <Box
      sx={(theme) => ({
        display:{xs: selectedChat ? 'flex' : 'none', md: 'flex'}, 
        alignItems: 'center', 
        flexDirection: 'column', 
        height: '100%',
        width: {xs: '100%', md: '68%'},
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
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  )
}

export default ChatBox