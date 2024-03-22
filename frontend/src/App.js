import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Components
import Navbar from './components/Navbar'
import SideDrawer from './components/SideDrawer'
import Backdrop from './components/Backdrop'

// Screens
import HomeScreen from './screens/Home/HomeScreen'
import ProductScreen from './screens/Product/ProductScreen'
import CartScreen from './screens/Cart/CartScreen'
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import { useDispatch } from 'react-redux'
import { fetchCart } from './redux/actions/cartActions'
import { setUserDeatils } from './redux/actions/userAction'
import Service from './screens/Service';
import Profile from './screens/Profile/Profile';
import AddCar from './screens/Cart/AddCar';

const PrivateWrapper = ({ auth }) => {
  return auth ? <Outlet /> : <Navigate to="/" />;
};


function App() {
  const [sideToggle, setSideToggle] = useState(false)
  // const user = useSelector(state => state.user)
  const auth = useState(localStorage.getItem('E_COMMERCE_TOKEN'))
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
        <div className='container'>
          <Routes>

            <Route path="/" element={<HomeScreen />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />

            <Route element={<PrivateWrapper auth={auth} />}>
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/service" element={<Service />} />
              <Route path="/addcar" element={<AddCar />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App
