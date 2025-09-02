import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import {store} from "./store/store.js"
import { BrowserRouter } from 'react-router-dom';
import { AuthorizationProvider } from './Components/Context/ContentApi.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthorizationProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthorizationProvider>
  </Provider>
  ,
)
