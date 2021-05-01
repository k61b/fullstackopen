/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App.js'
import './index.css'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
