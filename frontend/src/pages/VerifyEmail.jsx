import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatState } from './../context/ChatProvider'
import { Snackbar, Alert, Container, Typography, Box, CssBaseline, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ToggleColorMode from './../components/main/ToggleColorMode'
import Copyright from '../components/main/Copyright';
import axios from 'axios';


const VerifyEmail = () => {
  const {mode, toggleColorMode} = ChatState();
  const defaultTheme = createTheme({ palette: { mode } });
  const {id, token} = useParams();
  const navigate = useNavigate();
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
  useEffect(() =>{
      const verifyAndFetch = async ()=>{
          try {
              const { data } = await axios.get(`${import.meta.env.VITE_ENDPOINT}/api/user/verify-email/${id}/${token}`);
              setError({status:true, msg: "Email verified sucessfully. Redirecting to chats Page...", type: "success"})
              localStorage.setItem('userInfo', JSON.stringify(data));
              setTimeout(()=>navigate('/'), 2000);
          } catch (error) {
              setError({status:true, msg: error.response.data.message, type: "error"})
          }
      }
      verifyAndFetch();
  },[])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
              sx={{
                position: 'absolute',
                left: 12,
                top: 12,
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify Email
          </Typography>
          <Box component="form" id="verify-email-form" noValidate sx={{ mt: 1 }}>
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default VerifyEmail;