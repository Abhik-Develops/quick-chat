import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from './../context/ChatProvider'
import { Snackbar, Avatar, CssBaseline, TextField, Box, Typography, Container, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ToggleColorMode from './../components/main/ToggleColorMode'
import Copyright from '../components/main/Copyright';
import axios from 'axios';

const defaultTheme = createTheme();

const SendPasswordResetEmail = () => {
  const {mode, toggleColorMode} = ChatState();
  const defaultTheme = createTheme({ palette: { mode } });
  const navigate = useNavigate();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    }
    setLoading(true);
    if (!actualData.email){
        setError({
            status: true,
            msg: "Please enter email",
            type: "warning",
        });
        setLoading(false);
        return;
    }
    try{
        const config = {
          headers: {
              "Content-type": "application/json"
          }                
        }
        const {data} = await axios.post(`${import.meta.env.VITE_ENDPOINT}/api/user/send-password-reset-email`, actualData, config);
        document.getElementById('send-password-reset-email-form').reset();
        setError({
            status: true,
            msg: "Password reset link sent to your email. Redirecting to login page...",
            type: "success",
        });
        setLoading(false);
        setTimeout(()=>navigate('/signin'), 3000);
    }   
    catch(error){
        setError({
            status: true,
            msg: error.response.data.message,
            type: "error",
        });
        setLoading(false);
    }
  }

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
            Reset Password Email
          </Typography>
          <Box component="form" id="send-password-reset-email-form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </LoadingButton>
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

export default SendPasswordResetEmail;