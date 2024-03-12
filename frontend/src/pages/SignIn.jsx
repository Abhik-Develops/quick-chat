import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from './../context/ChatProvider'
import { Link, Avatar, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ToggleColorMode from './../components/main/ToggleColorMode'
import Copyright from '../components/main/Copyright';
import axios from 'axios';


const SignIn = () => {
  const {mode, toggleColorMode} = ChatState();
  const defaultTheme = createTheme({ palette: { mode } });
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'), 
    }
    setLoading(true);
    if (!actualData.email || !actualData.password){
        setError({
            status: true,
            msg: "Please fill all the fields",
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
        const {data} = await axios.post(`${import.meta.env.VITE_ENDPOINT}/api/user/login`, actualData, config);
        document.getElementById('signin-form').reset();
        setError({
            status: true,
            msg: "Login Successful.",
            type: "success",
        });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false);
        setTimeout(()=>navigate('/'), 1000);
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
            Sign in
          </Typography>
          <Box component="form" id="signin-form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
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
            <Grid container>
              <Grid item xs>
                <Link href="/send-password-reset-email" variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant='body2'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;