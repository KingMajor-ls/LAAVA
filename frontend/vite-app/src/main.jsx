import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client';

import App from './App.jsx'

import { Provider } from 'react-redux';
import Store from './Components/Store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    {/* <React.StrictMode > */}
      <App />
    {/* </React.StrictMode>, */}
  </Provider>
)




