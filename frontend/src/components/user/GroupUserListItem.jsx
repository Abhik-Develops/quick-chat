import { Avatar, Box, Stack, Button, Typography, alpha } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close';
import { ChatState } from '../../context/ChatProvider';
import ChatProfileModal from '../miscellaneous/ChatProfileModal';

const GroupUserListItem = ({u, handleFunction, admins, isAdmin, addAdmin, removeAdmin}) => {
    const { user } = ChatState();
    const isUserAdmin = admins ? admins.some(admin => admin._id === u._id) : false;
    
  return ( 
    <Stack direction='row' spacing={2} onClick={handleFunction} sx={(theme)=>({bgcolor: theme.palette.mode === 'light' ? 'rgb(185, 217, 240, 0.5)' : 'rgb(12, 35, 64, 0.6)', cursor: 'pointer', "&:hover":{bgcolor: theme.palette.mode === 'light' ? 'lightgreen' : 'green'}, width: '100%', alignItems: 'center', px:3, py:2, borderRadius:'10px'})}>
        <ChatProfileModal name={u.name} pic={u.pic}>
          <Avatar sx={{cursor: 'pointer'}} name={u.name} src={u.pic}/>
        </ChatProfileModal>
        <Box sx={{overflow: 'hidden', width: '100%'}}>
            <Typography sx={{whiteSpace: 'nowrap', overflow: 'scroll', scrollbarWidth: 'none'}}>{u.name}</Typography>
            <Typography sx={{fontSize: 'small', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'scroll', scrollbarWidth: 'none'}} >{u.email}</Typography>
        </Box>
        {isAdmin ? isUserAdmin ? <Button size='small' variant='contained' color='error' startIcon={<CloseIcon/>} disabled={u._id===user._id} disableElevation onClick={()=>removeAdmin(u)}>Admin</Button> 
        : <Button size='small' variant='contained' startIcon={<AddIcon/>} disableElevation onClick={()=>addAdmin(u)}>Admin</Button>
        : isUserAdmin ? <Button size='small' variant='contained' disabled={true} disableElevation>Admin</Button>
        : ''}
    </Stack>
  )
}

export default GroupUserListItem