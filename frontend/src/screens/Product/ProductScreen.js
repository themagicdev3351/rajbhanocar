import './ProductScreen.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

// Actions
import { getProductDetails } from '../../redux/actions/productActions'
import { addToCart } from '../../redux/actions/cartActions'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ProductScreen = () => {
  const navigate = useNavigate();
  let params = useParams();

  const [qty, setQty] = useState(1)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.getProductDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    if (product && params.id !== product._id) {
      dispatch(getProductDetails(params.id))
    }
  }, [dispatch, params, product])

  const addToCartHandler = () => {
    if (user.userInfo.isLogin) {
      dispatch(addToCart(product._id, qty))
      navigate('/cart');
      return
    } else {
      alert('You need to first login.')
    }
  }

  const delProductHandler = async (productId) => {
    try {
      const data = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}api/products/del/${productId}`);
      navigate('/');
      return data
      // Optionally, update local state or trigger any necessary actions after deletion
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle error response
    }
  };


  return (
    <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="left__info">
              <p className="left__name">{product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span>${product.price}</span>
              </p>
              <p>
                Status:
                <span>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={e => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                {user.userInfo.isLogin ?
                  <>
                    <button type="button" onClick={addToCartHandler}>
                      Add To Cart
                    </button>
                    <br />
                    <button type="button" onClick={() => delProductHandler(product._id)}>
                      Del product
                    </button>
                  </>
                  :
                  <Link to={`/signin`} className="info__button">
                    View
                  </Link>
                }
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductScreen
