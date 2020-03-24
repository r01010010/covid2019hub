import React, { createContext } from 'react';
import { useLocalStore } from 'mobx-react-lite'
import ReactDOM from 'react-dom';
import App from './components/App';
import { UXStore } from './libs/data_feed'

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    uxstore: new UXStore()
  }))
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  return React.useContext(StoreContext) || null
}

export const useUXStore = () => {
  return React.useContext(StoreContext).uxstore || null
}

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>
, document.getElementById('root'))
