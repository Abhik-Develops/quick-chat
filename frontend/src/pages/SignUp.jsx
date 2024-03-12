import { useState } from 'react';
import { ChatState } from './../context/ChatProvider'
import { Link, Avatar, CssBaseline, TextField, Grid, Box, Typography, Container, Snackbar, Alert, IconButton, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PortraitIcon from '@mui/icons-material/Portrait'
import ToggleColorMode from './../components/main/ToggleColorMode'
import Copyright from '../components/main/Copyright';
import axios from 'axios';


const SignUp = () => {
  const {mode, toggleColorMode} = ChatState();
  const defaultTheme = createTheme({ palette: { mode } });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [pic, setPic] = useState();
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
  }
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showPassword);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      confirmpassword: data.get('confirmpassword'), 
    }
    if(pic)
    {
      actualData.pic = pic;
    }
    setLoading(true);
    if (!actualData.name || !actualData.email || !actualData.password || !actualData.confirmpassword){
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
        const config = {
          headers: {
              "Content-type": "application/json"
          }                
        }
        const {data} = await axios.post(`${import.meta.env.VITE_ENDPOINT}/api/user`, actualData, config);
        document.getElementById('signup-form').reset();
        setError({
          status: true,
          msg: "Verification link sent to your email. Please verify your email.",
          type: "success",
        });
        setLoading(false);
    }   
    catch(error){
      console.log(error)
        setError({
            status: true,
            msg: error.response.data.message,
            type: "error",
        });
        setLoading(false);
    }
  }

  const handlePic = (e) => {
    postDetails(e.target.files[0]);
  }
  const postDetails = (pic) => {
    setLoading(true);
    if(pic === undefined){
        setError({
            status: true,
            msg: "Please select an image",
            type: "warning",
        })
        setLoading(false);
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
            setLoading(false);
        })
        .then((err)=>{
            setLoading(false);
        });
    }
    else{
        setError({
            status: true,
            msg: "Please select an image of jpeg or png type",
            type: "warning",
        })
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
            Sign up
          </Typography>
          <Box component="form" id='signup-form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin='normal'
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              autoComplete="given-name"
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
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
            <TextField 
              margin="normal"
              fullWidth
              name='pic'
              label='Upload Image'
              type='file' 
              id="pic"  
              onChange={handlePic} 
              InputProps=
                {{startAdornment: 
                    <InputAdornment position="start">
                      <PortraitIcon />
                    </InputAdornment>, 
                  accept: 'image/*'}} 
              />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4}} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;