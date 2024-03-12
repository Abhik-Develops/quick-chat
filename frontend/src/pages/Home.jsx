import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ChatState } from '../context/ChatProvider';
import Chat from '../components/main/Chat';
import getLPTheme from '../themes/getLPTheme';


const Home = () => {
  const {mode, toggleColorMode} = ChatState();
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <Chat mode={mode} toggleColorMode={toggleColorMode} showCustomTheme={showCustomTheme} toggleCustomTheme={toggleCustomTheme}/>
    </ThemeProvider>
  );
}

export default Home;