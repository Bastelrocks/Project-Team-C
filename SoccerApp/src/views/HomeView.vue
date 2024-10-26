<template>
    <div class="main-container">
      
      <div class="header">
        <h1 class="header-title">Welcome to the Soccerapp</h1>
      </div>
  
      
      <div class="background-container">
        <div class="background-overlay"></div>
        <img src="https://cdn.mos.cms.futurecdn.net/v92f8pvXTjqHSGeiDAXxN7-1200-80.jpg" alt="Players" class="background-image">
      </div>
  
      
      <div class="nav-menu">
        <router-link to="/">Home</router-link>
        <router-link to="/teams">Teams</router-link>
        <router-link to="/players">Players</router-link>
        <router-link to="/transfers">Transfers</router-link>
        <router-link to="/register">Register</router-link>
        <router-link to="/about">About</router-link>
      </div>
  
      
      <div class="login-section">
        <input type="email" placeholder="E-mail">
        <input type="password" placeholder="Password">
        <button>Log me in</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView'
  }
  </script>
  
  <style scoped>
  
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  
  
  .main-container {
    min-height: 100vh;
    width: 100%;
    position: relative;
    background-color: aqua;
  }
  
  
  .header {
    background-color: #959b95;
    background-position: left top;
    padding: 10px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  
  .logo {
    width: 60px;
    height: 60px;
  }
  
  .header-title {
    color: white;
    margin-left: 15px;
  }
  
  
  .nav-menu {
    width: 200px;
    background-color: rgb(173, 168, 168);
    padding: 15px;
    position: relative;
    z-index: 2;
    border-radius: 8px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .nav-menu a {
    text-decoration: none;
    color: #333;
    padding: 8px;
    border-radius: 4px;
  }
  
  .nav-menu a:hover {
    background-color: #901212;
  }
  
  
  .background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  
  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  
  .background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
  
  
  .login-section {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
    display: flex;
    gap: 10px;
  }
  
  .login-section input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .login-section button {
    padding: 8px 16px;
    background-color: #008000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .login-section button:hover {
    background-color: #006800;
  }
  </style>
