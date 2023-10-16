import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider';
import { AlertsProvider } from './context/AlertsProvider';
import App from './views/App';
import GetStarted from './views/GetStarted';
import About from './views/About';
import Login from './views/Login';
import Handwriting from './views/Handwriting';
import Graph from "./views/Graph";
import Layout from './views/Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Disable Console.log
if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AlertsProvider>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<App />}/>
              <Route path="getstarted" element={<GetStarted />}/>
              <Route path="about" element={<About />}/>
              <Route path="login" element={<Login />}/>
              <Route path="handwriting" element={<Handwriting/>}/>
              <Route path="graph" element={<Graph/>}/>
            </Route>
          </Routes>
        </AlertsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
