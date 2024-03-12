import { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import { IconButton, Box, Alert, Stack, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, InputAdornment, Typography, Divider, Snackbar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import UserBadgeItem from '../user/UserBadgeItem';
import UserListItem from '../user/UserListItem';
import axios from 'axios';

const UpdateGroupChatModal = ({fetchAgain, setFetchAgain, fetchMessages, children}) => {
    const { selectedChat, setSelectedChat, user} = ChatState();
    const [open, setOpen] = useState(false);
    const [pic, setPic] = useState('');
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loadingPic, setLoadingPic] = useState(false);
    const [loadingName, setLoadingName] = useState(false);
    const [loadingDesc, setLoadingDesc] = useState(false);
    const [loading, setLoading] = useState(false);
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
    const handleClose = () => {
        setPic('');
        setName('');
        setDesc('');
        setSearchResult([]);
        setError({
            status: false,
            msg: "",
            type: "",
        })
        setOpen(false);
    }
    const handlePic = (e) => {
        postDetails(e.target.files[0]);
    }
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleDesc = (e) => {
        setDesc(e.target.value);
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
            const { data } = await axios.put(`${import.meta.env.VITE_ENDPOINT}/api/chat/groupupdate`, {
                chatId: selectedChat._id,
                chatPic: pic,
            }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoadingPic(false);
            setPic('');
            setError({
                status: true,
                msg: "Group picture updated successfully",
                type: "success",
            });
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
                console.log(err);
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
    const handleSubmitName = async () => {
        setLoadingName(true);
        if(!name)
        {
            setError({
                status: true,
                msg: "Please enter a name",
                type: 'warning',
            })
            setLoadingName(false);
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const { data } = await axios.put(`${import.meta.env.VITE_ENDPOINT}/api/chat/groupupdate`, {
                chatId: selectedChat._id,
                chatName: name,
            }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoadingName(false);
            setName('');
            setError({
                status: true,
                msg: "Group name updated successfully",
                type: 'success',
            })
        } catch (error) {
            setError({
                status: true,
                msg: error.response.data.message,
                type: 'error',
            })
            setLoadingName(false);
        }
    }
    const handleSubmitDesc = async () => {
        setLoadingDesc(true);
        if(!desc)
        {
            setError({
                status: true,
                msg: "Please write something",
                type: 'warning',
            })
            setLoadingDesc(false);
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const { data } = await axios.put(`${import.meta.env.VITE_ENDPOINT}/api/chat/groupupdate`, {
                chatId: selectedChat._id,
                chatDesc: desc,
            }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoadingDesc(false);
            setDesc('');
            setError({
                status: true,
                msg: "Group description updated successfully",
                type: 'success',
            })
        } catch (error) {
            setError({
                status: true,
                msg: error.response.data.message,
                type: 'error',
            })
            setLoadingDesc(false);
        }
    }
    const handleSearch = async (query) => {
        setSearch(query)
        if(!query){
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
                msg: "Failed to load the search results",
                type: "error",
            })
            setLoading(false);
        }
    }
    const handleAddUser = async (userToAdd) => {
        if(selectedChat.users.find((u)=>u._id===userToAdd._id)){
            setError({
                status: true,
                msg: "User already in group",
                type: 'warning',
            });
            return;
        }
        if(!selectedChat.groupAdmins.some((u)=>u._id===user._id)){
            setError({
                status: true,
                msg: "Only admins can add someone",
                type: 'warning',
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                }
            };
            const {data} = await axios.put(`${import.meta.env.VITE_ENDPOINT}/api/chat/groupadd`, {
                chatId: selectedChat._id,
                userId: userToAdd._id,
            }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            setError({
                status: true,
                msg: error.message,
                type: 'error',
            })
            setLoading(false);
        }
    }
    const handleRemove = async (userToRemove) => {
        if(userToRemove._id !== user._id && !selectedChat.groupAdmins.some((u)=>u._id === user._id)){
            setError({
                status: true,
                msg: "Only admins can remove someone",
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
            const {data} = await axios.put(`${import.meta.env.VITE_ENDPOINT}/api/chat/groupremove`, {
                chatId: selectedChat._id,
                userId: userToRemove._id,
            }, config);
            userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        } catch (error) {
            setError({
                status: true,
                msg: error.message,
                type: 'error',
            })
            setLoading(false);
        }
    }
    
  return (
    <>
        {
            children ? <span onClick={handleOpen}>{children}</span> :
            <IconButton onClick={handleOpen} sx={{display:{xs:'flex'}}}>
                <MoreVertIcon/>
            </IconButton>
        }
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
            <DialogTitle variant='h4' sx={{fontFamily:'Work sans', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <SettingsIcon fontSize='inherit' sx={{mr:1}} /> Update Group
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
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
            <DialogContent sx={{scrollbarWidth: 'none'}}>
                <Stack spacing={2}>
                    <Box component="img" alt={selectedChat.chatName} src={pic ? pic : selectedChat.chatPic} sx={{height: 'auto', maxHeight: 'calc(100vh - (100px + 150px))', width: '100%', maxWidth: '500px'}} />
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
                        aria-label="Upload New Group Image"
                        placeholder="Upload New Group Image"
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
                    <Typography variant='h4' sx={{fontFamily:'Work sans', textAlign:'center', whiteSpace: 'nowrap', overflow:'auto', scrollbarWidth: 'none'}}>{name ? name : selectedChat.chatName}</Typography>
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
                    <Stack
                    direction='row'
                    alignSelf="center"
                    spacing={1}
                    useFlexGap
                    sx={{ mt: 7, mb: 3, width: '100%'}}
                    >
                        <TextField
                        id="desc"
                        name='desc'
                        hiddenLabel
                        fullWidth
                        variant="outlined"
                        aria-label="Enter new group description"
                        placeholder="Update Description"
                        value={desc}
                        onChange={handleDesc}
                        />
                        <LoadingButton 
                            loading={loadingDesc} 
                            variant='contained' 
                            onClick={handleSubmitDesc}
                        >
                        Save
                        </LoadingButton>
                    </Stack>
                    <TextField 
                        id='addUsers'
                        hiddenLabel
                        fullWidth
                        variant='outlined'
                        aria-label='Add users'
                        placeholder="Add Users" 
                        value={search} 
                        onChange={(e)=>handleSearch(e.target.value)}
                    />
                    <Box sx={{display: selectedChat.users.length ? 'flex' : 'none', flexWrap: 'wrap'}}>
                        {
                            selectedChat.users.map((u)=>{
                                return <UserBadgeItem key={u._id} user={u} handleFunction={()=>handleRemove(u)} />
                            })
                        }
                    </Box>
                    {loading ? 
                        <Stack sx={{alignItems: 'center'}}>
                            <CircularProgress/>
                        </Stack> 
                        : 
                        <Stack spacing={1}>
                            {
                                searchResult?.slice(0,4).map((user)=>{
                                    return <UserListItem key={user._id} user={user} handleFunction={()=>handleAddUser(user)}></UserListItem>
                                })
                            }
                        </Stack>
                    }
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={()=>handleRemove(user)} color='error' disableElevation>Leave Chat</Button>
            </DialogActions>
        </Dialog>
    </>
  )
}

export default UpdateGroupChatModal