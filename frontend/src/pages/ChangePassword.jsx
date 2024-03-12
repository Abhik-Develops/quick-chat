import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';
import { Snackbar, Alert, Avatar, CssBaseline, TextField, Box, Typography, IconButton, InputAdornment, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ToggleColorMode from './../components/main/ToggleColorMode'
import Copyright from '../components/main/Copyright';
import axios from 'axios';


const ChangePassword = () => {
  const {mode, toggleColorMode} = ChatState();
  const defaultTheme = createTheme({ palette: { mode } });
  const {user} = ChatState();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get('password'),
      confirmpassword: data.get('confirmpassword'), 
    }
    setLoading(true);
    if (!actualData.password || !actualData.confirmpassword){
        setError({
            status: true,
            msg: "Please fill all the fields",
            type: "warning",
        });
        setLoading(false);
        return;
    }
    if(actualData.password !== actualData.confirmpassword){
      setError({
          status: true,
          msg: "Password and Confirm Password does not match",
          type: "warning",
      });
      setLoading(false);
      return;
    }
    try{
        actualData.userId = user._id;
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-type": "application/json"
          }                
        }
        const {data} = await axios.post(`${import.meta.env.VITE_ENDPOINT}/api/user/change-password`, actualData, config);
        document.getElementById('change-password-form').reset();
        setError({
          status: true,
          msg: "Password changed Sucessfully. Redirecting to chats Page...",
          type: "success",
        });
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
            Change Password
          </Typography>
          <Box component="form" id='change-password-form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              autoComplete="new-confirmpassword"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Save
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
        <Copyright sx={{ mt: 8, mb: 4}} />
      </Container>
    </ThemeProvider>
  );
}

export default ChangePassword;