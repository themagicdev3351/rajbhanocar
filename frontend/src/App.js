import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Components
import Navbar from './components/Navbar'
import SideDrawer from './components/SideDrawer'
import Backdrop from './components/Backdrop'

// Screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from './redux/actions/cartActions'
import { setUserDeatils } from './redux/actions/userAction'
import Service from './screens/Service';
import Profile from './screens/Profile';
import AddCar from './screens/AddCar';

const PrivateWrapper = ({ auth }) => {
  return auth ? <Outlet /> : <Navigate to="/login" />;
};


function App() {
  const [sideToggle, setSideToggle] = useState(false)
  const user = useSelector(state => state.user)
  // fetchCart
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCart())
    dispatch(setUserDeatils())
  }, [dispatch])

  return (
    <>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />

      <main className="app">
        <Routes>

          <Route path="/" element={<HomeScreen />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route element={<PrivateWrapper auth={user.userInfo.isLogin} />}>
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/service" element={<Service />} />
            <Route path="/addcar" element={<AddCar />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
