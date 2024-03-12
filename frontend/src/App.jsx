import { BrowserRouter, Routes, Route } from "react-router-dom"
import ChatProvider from "./context/ChatProvider.jsx"
import Home from './pages/Home.jsx'
import SignIn from "./pages/SignIn.jsx"
import SignUp from './pages/SignUp.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import SendPasswordResetEmail from './pages/SendPasswordResetEmail.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import ChangePassword from './pages/ChangePassword.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="signin" element={<SignIn/>}/>
            <Route path="signup" element={<SignUp/>}/>
            <Route path="verify-email/:id/:token" element={<VerifyEmail/>}/>
            <Route path="send-password-reset-email" element={<SendPasswordResetEmail/>}/>
            <Route path="reset-password/:id/:token" element={<ResetPassword/>}/>
            <Route path="change-password" element={<ChangePassword/>}/>
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </>
  )
}

export default App
