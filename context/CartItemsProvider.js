import { createContext, useState } from 'react';
import { setCookie } from 'cookies-next';

const CartItemsContext = createContext()

export const CartItemsProvider = ({children}) => {
  const [cartItems, setCartItemsBase] = useState({});
  function setCartItems(value, update_cookie=true) {
    setCartItemsBase(value);
    if (update_cookie) {
      setCookie('cartItems', value, {'maxAge': 60*5}); // 30 mins
      console.log("cookies were set");
    }
  }

  return (
    <CartItemsContext.Provider value={[cartItems, setCartItems]}>
      {children}
    </CartItemsContext.Provider>
  )
}

export default CartItemsContext
