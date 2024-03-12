import { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Divider, TextField, InputAdornment, Button, IconButton, Stack, Snackbar, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const EditProfileModal = ({children}) => {
    const { user, setUser } = ChatState();
    const [name, setName] = useState('');
    const [pic, setPic] = useState('');
    const [open, setOpen] = useState(false);
    const [loadingName, setLoadingName] = useState(false);
    const [loadingPic, setLoadingPic] = useState(false);
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCancel = () => {
        setName('');
        handleClose();
    }
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handlePic = (e) => {
        postDetails(e.target.files[0]);
    }
    const handleSubmitName = async () => {
        setLoadingName(true);
        if (!name){
            setError({
                status: true,
                msg: "Please enter a name",
                type: "warning",
            });
            setLoadingName(false);
            return;
        }
        if (name === user.name){
            setError({
                status: true,
                msg: "Please enter a different name",
                type: "warning",
            });
            setLoadingName(false);
            return;
        }
        try {
            setLoadingName(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const { data } = await axios.put(`${import.meta.env.VITE_ENDPOINT}/api/user/update`, {
                userId: user._id,
                name: name,
            }, config);
            const newUser = {...data, token: user.token}
            localStorage.setItem('userInfo', JSON.stringify(newUser));
            setUser(newUser);
            setName('');
            setError({
                status: true,
                msg: "Name updated successfully",
                type: "success",
            });
            setLoadingName(false);
        } catch (error) {
            setError({
                status: true,
                msg: error.response.data.message,
                type: 'error',
            })
            setLoadingName(false);
        }
    }
    const handleSubmitPic = async () => {
        setLoadingPic(true);
        if (!pic){
            setError({
                status: true,
                msg: "Please select an image",
                type: "warning",
            });
            setLoadingPic(false);
            return;
        }
        try {
            setLoadingPic(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const { data } = await axios.put(`${import.meta.env.VITE_ENDPOINT}/api/user/update`, {
                userId: user._id,
                pic: pic,
            }, config);
            const newUser = {...data, token: user.token}
            localStorage.setItem('userInfo', JSON.stringify(newUser));
            setUser(newUser);
            setPic('');
            setError({
                status: true,
                msg: "Profile picture updated successfully",
                type: "success",
            });
            setLoadingPic(false);
        } catch (error) {
            setError({
                status: true,
                msg: error.response.data.message,
                type: 'error',
            })
            setLoadingPic(false);
        }
    }
    const postDetails = (pic) => {
        setLoadingPic(true);
        if(pic === undefined){
            setError({
                status: true,
                msg: "Please select an image",
                type: "warning",
            })
            setLoadingPic(false);
        }
        if(pic.type === "image/jpeg" || pic.type === "image/png"){
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dddpgqmd1");
            fetch(`${import.meta.env.VITE_IMAGE_UPLOAD_URL}`, {
                method: "post",
                body: data,
            })
            .then((res) => res.json())
            .then((data)=>{
                setPic(data.url.toString());
                setLoadingPic(false);
            })
            .then((err)=>{
                setLoadingPic(false);
            });
        }
        else{
            setError({
                status: true,
                msg: "Please select an image of jpeg or png type",
                type: "warning",
            })
            setLoadingPic(false);
        }
    }

  return (
    <>
        <span onClick={handleOpen}>{children}</span>
        <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
            <DialogTitle variant='h4' sx={{fontFamily:'Work sans', display:'flex', justifyContent:'center', alignItems:'center'}}>
                <SettingsIcon fontSize='inherit' sx={{mr:1}} /> Edit Profile
                <IconButton
                    aria-label="close"
                    onClick={handleCancel}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider/>
            <DialogContent sx={{scrollbarWidth:'none'}}>
                <Stack spacing={2}>
                    <Typography variant='h4' sx={{fontFamily:'Work sans', textAlign:'center', whiteSpace: 'nowrap', overflow:'auto', scrollbarWidth: 'none'}}>{name ? name : user.name}</Typography>
                    <Stack
                    direction='row'
                    alignSelf="center"
                    spacing={1}
                    useFlexGap
                    sx={{ mt: 7, mb: 3, width: '100%'}}
                    >
                        <TextField
                        id="name"
                        name='name'
                        hiddenLabel
                        fullWidth
                        variant="outlined"
                        aria-label="Enter user name"
                        placeholder="New Name"
                        value={name}
                        onChange={handleName}
                        />
                        <LoadingButton 
                            loading={loadingName} 
                            variant='contained' 
                            onClick={handleSubmitName}
                        >
                        Save
                        </LoadingButton>
                    </Stack>
                    <Box component="img" alt={user.name} src={pic ? pic : user.pic} sx={{height: 'auto', maxHeight: 'calc(100vh - (100px + 150px))', width: '100%', maxWidth: '500px', alignSelf: 'center'}} />
                    <Stack
                    direction='row'
                    alignSelf="center"
                    spacing={1}
                    useFlexGap
                    sx={{ mt: 7, mb: 3, width: '100%'}}
                    >
                        <TextField
                        type='file'
                        id="pic"
                        name='pic'
                        hiddenLabel
                        fullWidth
                        variant="outlined"
                        aria-label="Upload New Image"
                        placeholder="Upload New Image"
                        inputProps={{
                            accept: 'image/*'
                        }}
                        onChange={handlePic}
                        />
                        <LoadingButton 
                            loading={loadingPic} 
                            variant='contained' 
                            onClick={handleSubmitPic}
                        >
                        Save
                        </LoadingButton>
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
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button href='/change-password' color='error' variant='contained' disableElevation>Change Password</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default EditProfileModal