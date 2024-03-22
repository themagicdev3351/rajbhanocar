import * as actionTypes from '../constants/productConstants'
import { Api } from '../../utils/Api'

export const getProducts = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST })

    const { data } = await Api.getRequest('/api/products')

    const parsedData = JSON.parse(data);

    parsedData.forEach(product => {
      product.imageUrl = `${process.env.REACT_APP_BACKEND_URL}${product.imageUrl.replace(/\\/g, '/')}`;
    });

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: parsedData,
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getProductDetails = id => async dispatch => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST })

    const { data } = await Api.getRequest(`/api/products/${id}`)

    const p = JSON.parse(data)

    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: {
        ...{ ...p, imageUrl: `${process.env.REACT_APP_BACKEND_URL}${p.imageUrl.replace(/\\/g, '/')}` },
      },
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeProductDetails = () => dispatch => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET })
}
