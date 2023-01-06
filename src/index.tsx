import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CountPage from './pages/CountPage';
import Database from './service/storage';
import app from './service/config';
import Auth from './service/auth';
import LoginContainer from './components/login/LoginContainer';

const database = new Database(app);
const auth = new Auth(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/login' element={<LoginContainer auth={auth}/>} />
      <Route path='/count' element={<CountPage database={database} />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
