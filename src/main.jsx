import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
 disableReactDevTools()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* store provider */}
      <Provider store={store}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
