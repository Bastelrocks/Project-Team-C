<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginForm from './components/LoginForm.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/soccerAppLogo.svg" width="125" height="125" />
    <LoginForm />
    <h1>Welcome to the home of soccer!</h1>
  </header>
  <div class="wrapper">
    <nav>
      <RouterLink to="/"><img src=""><img class="menuLogo" src="@/assets/home.svg">Home</RouterLink>
      <RouterLink to="/teams"><img class="menuLogo" src="@/assets/team.svg">Teams</RouterLink>
      <RouterLink to="/players"><img class="menuLogo" src="@/assets/soccer-player.svg">Players</RouterLink>
      <RouterLink to="/transfers"><img class="menuLogo" src="@/assets/transfer.svg">Transfers</RouterLink>
      <RouterLink to="/Register"><img class="menuLogo" src="@/assets/register.svg">Register</RouterLink>
      <RouterLink to="/about"><img class="menuLogo" src="@/assets/about.svg">About</RouterLink>
    </nav>
      <RouterView />
  </div>
</template>

<style scoped>

.menuLogo{
  width: 20px;
  margin-right: 10px;
}

main{
  min-width: 1024px;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  top: 0;
  background-color: green;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  min-width: auto;
  width: 200px;
  min-height: auto;
  flex-direction: column;
  font-size: 1rem;
  text-align: left;
  margin: 40px;
  margin-top: 2rem;
  padding: 10px;
  /* position: fixed; */
  border: 1px solid hsla(160, 100%, 37%, 1);
  border-radius: 15%;
  background-color: white;
}
nav:hover{
  border: 4px solid hsla(160, 100%, 37%, 1);
  padding: 6px;
  box-shadow: 0px 0px 10px 5px hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    place-items: flex-start;
    /* flex-wrap: wrap; */
    min-width: 1024px;
    min-height: 600px;
  }
}
</style>
