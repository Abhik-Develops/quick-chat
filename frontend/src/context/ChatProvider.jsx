import { createContext, useContext, useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom';

const ChatContext = createContext()

const ChatProvider = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [mode, setMode] = useState(prefersDark ? 'dark' : 'light');
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        if( localStorage.getItem("mode")){
            setMode(localStorage.getItem("mode"))
        }
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
        if(!userInfo){
            if(location.pathname === '/signup' || location.pathname === '/send-password-reset-email' || matchPath('/reset-password/:id/:token', location.pathname) || matchPath('/verify-email/:id/:token', location.pathname)){
                return;
            }
            navigate('/signin');
        } 
    },[navigate]);
    const toggleColorMode = () => {
        localStorage.setItem("mode", mode === 'light' ? 'dark' : 'light' )
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    return (
        <ChatContext.Provider value={{mode, toggleColorMode, user, setUser, selectedChat, setSelectedChat, chats, setChats, notifications, setNotifications}}>{children}</ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;