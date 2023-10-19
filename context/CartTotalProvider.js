import { createContext, useState } from 'react';
import { setCookie } from 'cookies-next';

const CartTotalContext = createContext()

export const CartTotalProvider = ({children}) => {
  const [cartTotal, setCartTotalBase] = useState(0);
  const [approvedCartTotal, setApprovedCartTotalBase] = useState(0);
  const [unapprovedCartTotal, setUnapprovedCartTotalBase] = useState(0);

  function setCartTotal(value, update_cookie=true) {
    setCartTotalBase(value);
    if (update_cookie) {
      setCookie('cartTotal', value, {'maxAge': 60*5}); // 30 mins
    }
  }

  function setApprovedCartTotal(value, update_cookie=true) {
    setApprovedCartTotalBase(value);
    if (update_cookie) {
      setCookie('approvedCartTotal', value, {'maxAge': 60*5}); // 30 mins
    }
  }

  function setUnapprovedCartTotal(value, update_cookie=true) {
    setUnapprovedCartTotalBase(value);
    if (update_cookie) {
      setCookie('unapprovedCartTotal', value, {'maxAge': 60*5}); // 30 mins
    }
  }

  return (
    <CartTotalContext.Provider value={[cartTotal, setCartTotal, approvedCartTotal, setApprovedCartTotal, unapprovedCartTotal, setUnapprovedCartTotal]}>
      {children}
    </CartTotalContext.Provider>
  )
}

export default CartTotalContext
