import { useState } from 'react'
import { Box, IconButton, Typography, Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

const ProfileModal = ({user, children}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <>
        {
            children ? <span style={{overflow: 'hidden', maxWidth: '100%'}} onClick={handleOpen}>{children}</span> : 
                <IconButton onClick={handleOpen}>
                    <VisibilityIcon/>
                </IconButton>
        }
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
            <DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }}
                    >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{scrollbarWidth: 'none'}}>
                <Typography variant='h4' sx={{fontFamily:'Work sans', textAlign: 'center', whiteSpace: 'nowrap', overflow:'auto', scrollbarWidth: 'none', mb: 1}}>{user.name}</Typography>
                <Box component="img" alt={user.name} src={user.pic} sx={{height: 'auto', maxHeight: 'calc(100vh - (100px + 150px))', width: '100%', maxWidth: '500px', alignSelf: 'center'}} />
                <Typography sx={{fontSize: {xs: '28px', md: '30px'}, textAlign: 'center', fontFamily: 'Work sans', whiteSpace: 'nowrap', overflow: 'auto', scrollbarWidth: 'none'}}>Email : {user.email}</Typography>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default ProfileModal