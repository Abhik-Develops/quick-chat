import { Typography, Link } from "@mui/material";

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://myportfolio-abhik-gangulys-projects.vercel.app/">
        Abhik Ganguly
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;