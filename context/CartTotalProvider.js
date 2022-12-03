import { createContext, useState } from 'react';
import { setCookie } from 'cookies-next';

const CartTotalContext = createContext()

export const CartTotalProvider = ({children}) => {
  const [cartTotal, setCartTotalBase] = useState(0);

  function setCartTotal(value, update_cookie=true) {
    setCartTotalBase(value);
    if (update_cookie) {
      setCookie('cartTotal', value, {'maxAge': 60*60*5});
    }
  }

  return (
    <CartTotalContext.Provider value={[cartTotal, setCartTotal]}>
      {children}
    </CartTotalContext.Provider>
  )
}

export default CartTotalContext
