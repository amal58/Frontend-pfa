import React from 'react';
import  './../styling/errorPage.css';

function Errorpage() {
  return (

    <div id="notfound">
  <div className="notfound">
    <div className="notfound-404" />
    <h1>404</h1>
    <h2>Oops! Page Not Be Found</h2>
    <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
    <a href="/">Back to login</a>
  </div>
</div>

  )
}

export default Errorpage