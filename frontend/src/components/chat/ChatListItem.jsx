import { Box, Avatar, Typography, Badge } from '@mui/material'
import { ChatState } from '../../context/ChatProvider'
import { getSender, getSenderInfo, formatTime } from '../../configs/ChatLogics'
import ChatProfileModal from '../miscellaneous/ChatProfileModal'

const ChatListItem = ({chat, handleFunction, loggedUser, notificationCount}) => {
    const { user, selectedChat } = ChatState();
    
  return (
    <Box sx={(theme)=>({cursor:'pointer', bgcolor: theme.palette.mode === 'light' ? selectedChat ? selectedChat._id === chat._id ? "rgb(39, 116, 174, 0.05)" : "rgb(185, 217, 240, 0.5)" : "rgb(185, 217, 240, 0.5)" : selectedChat ? selectedChat._id === chat._id ? "rgb(12, 35, 64, 0.1)" : "rgb(12, 35, 64, 0.6)" : "rgb(12, 35, 64, 0.6)", px: 3, py: 2, display: 'flex', alignItems: 'center', borderRadius: '10px'})}>
        <ChatProfileModal name={chat.isGroupChat ? chat.chatName : getSender(loggedUser, chat.users)} pic={chat.isGroupChat ? chat.chatPic : getSenderInfo(loggedUser, chat.users).pic} ><Avatar alt={!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName} src={!chat.isGroupChat ? getSenderInfo(loggedUser, chat.users).pic : chat.chatPic} sx={{mr:2, size:'small', cursor: 'pointer'}}/></ChatProfileModal>
        <Box onClick={()=>handleFunction(chat)} sx={{width: '100%', overflow:'hidden', flex: 1}}>
            <Typography sx={{fontSize: '20px', fontWeight: 'bold', width: '95%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
            </Typography>
            <Typography sx={{fontSize: '15px', width: '95%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {chat.latestMessage ? `${chat.isGroupChat ? chat.latestMessage.sender._id==user._id ? 'You:' : chat.latestMessage.sender.name + ':' : ''} ${chat.latestMessage.content}` : "Start chatting"}
            </Typography>
        </Box>
        <Box sx={{height: '75%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography sx={{fontSize: 12}}>
                {chat.latestMessage ? formatTime(chat.latestMessage.updatedAt) : ''}
            </Typography>
            <Badge badgeContent={notificationCount} max={99} color='error' sx={{mb: 0.75}}/>
        </Box>
    </Box>
  )
}

export default ChatListItem