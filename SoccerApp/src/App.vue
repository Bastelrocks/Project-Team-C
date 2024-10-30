<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginForm from './components/LoginForm.vue';
import HomeView from './views/HomeView.vue';
</script>

<template>
  <LoginForm />
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/soccerAppLogo.svg" width="125" height="125" />
    <h1>Welcome to the home of Soccerapp!</h1>
  </header>
  <div class="wrapper">
    <nav>
      <RouterLink to="/"><img class="menuLogo" src="@/assets/home.svg">Home</RouterLink>
      <RouterLink to="/teams"><img class="menuLogo" src="@/assets/team.svg">Teams</RouterLink>
      <RouterLink to="/players"><img class="menuLogo" src="@/assets/soccer-player.svg">Players</RouterLink>
      <RouterLink to="/transfers"><img class="menuLogo" src="@/assets/transfer.svg">Transfers</RouterLink>
      <RouterLink to="/Register"><img class="menuLogo" src="@/assets/register.svg">Register</RouterLink>
      <RouterLink to="/about"><img class="menuLogo" src="@/assets/about.svg">About</RouterLink>
      <RouterLink to="/contact"><img class="menuLogo" src="@/assets/contact-phone.svg">Contact Us</RouterLink>
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
  background-color: hsla(160, 100%, 37%, 1);
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  display: flex;
  min-width: 200px;
  width: auto;
  min-height: auto;
  flex-direction: column;
  font-size: 1rem;
  text-align: left;
  margin: 40px;
  margin-top: 2rem;
  
  /* position: fixed; */
  border: 1px solid hsla(160, 100%, 37%, 1);
  border-radius: 15%;
  background-color: white;
  /* align-items: center;
  justify-content: center; */
}

nav:hover{
  /* border: 4px solid hsla(160, 100%, 37%, 1); */
  box-shadow: 0px 0px 10px 5px hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active {
  padding: 15px;
  /* background-color: hsla(160, 100%, 37%, 1); */
  color: var(--color-text);
  border-top: 2px solid var(--color-border);
  border-bottom: 2px solid var(--color-border);
}

nav a.router-link-exact-active:first-of-type {
  border-bottom: 2px solid var(--color-border);
}

nav a.router-link-exact-active:last-of-type {
  border: 0;
  border-top: 2px solid var(--color-border);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 5px 20px;
  display: inline-block;
  /* padding: 0 1rem; */
   /* border-left: 1px solid var(--color-border); that was the border at left side on nav*/
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
    min-width: 800px;
    min-height: 600px;
    background-color: azure;
  }
}
</style>
