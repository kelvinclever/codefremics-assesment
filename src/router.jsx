import Navbar from "./navbar/Navbar.jsx";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Root from './Root.jsx';
import LoginForm from "./Login/Login.jsx";
import NotFound from "./NotFound.jsx";
import Profile from "./account/Profile.jsx";
import CustomerForm from "./customer/CustomerForm.jsx";
import Customers from "./customer/CustomerList.jsx";
import CustomerProfile from "./customer/CustomerProfile.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path="/" element={<Root />}>
      <Route index element={<div><Profile /></div>} />
      <Route path="/aboutus" element={''} />
      <Route path="/account" element={<Profile/>} />
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/add" element={<CustomerForm/>}/>
      <Route path="/customers" element={<Customers/>}/>
      <Route path="/customer-profile/:customer_id" element={<CustomerProfile />} />
     <Route path="*" element={<NotFound/>}/>
    </Route>
    </Route>,
  )
);
