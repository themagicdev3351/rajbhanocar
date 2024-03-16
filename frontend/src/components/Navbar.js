import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../utils/localstorage'
import { setInitialState } from '../redux/actions/userAction'

const Navbar = ({ click }) => {
  const cart = useSelector(state => state.cart)
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  // console.log({user})

  const { cartItems } = cart

  const getCartCount = () => {
    return cartItems && cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  const _handleLogout = () => {
    // console.log('click')
    dispatch(setInitialState())
    logout()
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <h2>E-COMERCE</h2>
        </Link>
      </div>

      <ul className="navbar__links">
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>

        <li>
          <Link to="/">Shop</Link>
        </li>
        {/* <li>
          <Link to="/service">Service</Link>
        </li> */}

        {!user.userInfo.isLogin ? (
          <>
            <li>
              <Link to="/signin">Login</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/addcar">add car</Link>
            </li>
            <li>
              <p onClick={_handleLogout}>Logout</p>
            </li>
          </>
        )}
      </ul>

      <div className="hamburger__menu" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  )
}

export default Navbar
