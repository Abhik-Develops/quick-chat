import { Typography, IconButton, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const UserBadgeItem = ({user, handleFunction}) => {
  return (
    <Tooltip arrow title={user.email}>
      <Typography variant="solid" sx={(theme)=>({pl:2, borderRadius:'10px', m:"4px", fontSize:12, bgcolor: theme.palette.mode === 'light' ? 'lightgreen' : 'green', cursor:'pointer', display: 'inline-flex', alignItems: 'center'})}>
        {user.name}<IconButton onClick={handleFunction}><CloseIcon fontSize='small'/></IconButton>
      </Typography>
    </Tooltip>
  )
}

export default UserBadgeItem