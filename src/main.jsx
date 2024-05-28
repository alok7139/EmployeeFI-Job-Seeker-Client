import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'

export const Context = createContext({isAuthorized : false});

const AppWrapper = () => {
  const [isauthorized, setisauthorized] = useState(false);
  const [user, setuser] = useState({});

  return (
    <Context.Provider value={{isauthorized,setisauthorized,user,setuser}}>
      <App/>
    </Context.Provider>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppWrapper/>
    </BrowserRouter>
    
  </React.StrictMode>
)
