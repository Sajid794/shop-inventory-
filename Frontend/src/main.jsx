import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import NewSales from './Pages/NewSales/NewSales.jsx';

import { Provider } from 'react-redux'
import { store } from './Redux/Store.js';
import Auth from './Pages/Auth/Auth.jsx';
import ViewSales from './Pages/ViewSales/ViewSales.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import LandingPage from './Components/Navbar/LandingPage.jsx';
import SignupPage from './Clients/LogReg/SignupPage.jsx';
import LoginPage from './Clients/LogReg/LoginPage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<LandingPage/>}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/newSales" element={<NewSales />} />
      <Route path="/viewSales" element={<ViewSales/>} />
      <Route path="/profile" element={<Profile/>} />
       
         {/* client page routes */}
      <Route path="/LoginPage" element={<LoginPage/>} /> 
      <Route path='/SignupPage' element={<SignupPage/>}/>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)


