import { createContext, useState } from 'react';
import { setCookie } from 'cookies-next';

const ApprovedItemsContext = createContext()

export const ApprovedItemsProvider = ({children}) => {
  const [approvedItems, setApprovedItemsBase] = useState({})
  function setApprovedItems(value, update_cookie=true) {
    setApprovedItemsBase(value);
    if (update_cookie) {
      setCookie('approvedItems', value, {'maxAge': 60*60*5});
    }
  }
  return (
    <ApprovedItemsContext.Provider value={[approvedItems, setApprovedItems]}>
      {children}
    </ApprovedItemsContext.Provider>
  )
}

export default ApprovedItemsContext
