import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let API_URL = "http://localhost:8080";

if (process.env.REACT_APP_API_URL) {
    API_URL = process.env.REACT_APP_API_URL;
}

export async function createUser(data) {
    const response = await fetch(API_URL + `/api/user`, {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}

createUser({name: 'asdf', age: 23}).then(items => console.log('items: ', items));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
