import React from 'react';
import MainPage from './../MainPage';

const Auth = () => {
  console.log(typeof localStorage.getItem("isAuth"));
  return (
    <div>
      {JSON.parse(localStorage.getItem("isAuth")) === true ? <div>todo</div> : <MainPage />}
    </div>
  )
}

export default Auth
