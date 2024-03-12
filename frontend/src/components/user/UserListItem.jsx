import { Avatar, Box, Typography } from '@mui/material';

const UserListItem = ({user, handleFunction}) => {
  return ( 
    <Box onClick={handleFunction} sx={(theme)=>({bgcolor: theme.palette.mode === 'light' ? 'rgb(185, 217, 240, 0.5)' : 'rgb(12, 35, 64, 0.6)', cursor: 'pointer', "&:hover":{bgcolor: theme.palette.mode === 'light' ? 'lightgreen' : 'green'}, width: '100%', display: 'flex', alignItems: 'center', px:3, py:2, mx:'auto', borderRadius:'10px'})}>
        <Avatar sx={{mr:2, cursor: 'pointer', justifySelf: 'flex-start'}} name={user.name} src={user.pic}/>
        <Box sx={{flex: 'auto', overflow: 'hidden'}}>
            <Typography sx={{width: '100%', whiteSpace: 'nowrap', overflow: 'scroll', scrollbarWidth: 'none'}}>{user.name}</Typography>
            <Typography sx={{fontSize: 'small', width: '100%', whiteSpace: 'nowrap', overflow: 'scroll', scrollbarWidth: 'none'}} ><b>{user.email}</b></Typography>
        </Box>
    </Box>
  )
}

export default UserListItem