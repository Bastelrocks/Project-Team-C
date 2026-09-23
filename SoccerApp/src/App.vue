<script setup>
import LoginForm from './components/LoginForm.vue';
import { RouterLink, RouterView } from 'vue-router'
import { sessionStore } from '@/stores/sessionStore';
let session = sessionStore();

</script>

<template>
  <div class="ourMain">
    <header>
      <LoginForm />
      <nav>
      <RouterLink to="/"><img class="menuLogo" src="@/assets/home.svg">Home</RouterLink>
      <RouterLink to="/teams"><img class="menuLogo" src="@/assets/team.svg">Teams</RouterLink>
      <RouterLink to="/players"><img class="menuLogo" src="@/assets/soccer-player.svg">Players</RouterLink>
      <RouterLink to="/transfers"><img class="menuLogo" src="@/assets/transfer.svg">Transfers</RouterLink>
      <RouterLink v-if="!session.isAutenticated" to="/Register">
        <img class="menuLogo" src="@/assets/register.svg">Register
      </RouterLink>
      <RouterLink to="/about"><img class="menuLogo" src="@/assets/about.svg">About</RouterLink>
      <RouterLink to="/contact"><img class="menuLogo" src="@/assets/contact-phone.svg">Contact Us</RouterLink>
    </nav>
    </header>
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.ourMain {
  display: flex;
  flex-direction: row;
  width: 100vh;
  min-height: 90vh;
  /* background-color: rgba(255, 255, 255, 0.80); */
}

.menuLogo{
  width: 20px;
  margin-right: 10px;
}

nav {
  display: flex;
  flex-direction: row;
  min-width: 200px;
  width: auto;
  /* width: min-content; */

  max-width: 50vw;
  margin: auto;
  /* max-height: max-content; */
  height: max-content;
  max-height: 10vh;
  font-size: 1rem;
  text-align: left;
  border: 1px solid hsla(160, 100%, 37%, 1);
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.95);
}

nav:hover{
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0px 0px 10px 5px hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active {
  color: var(--color-text);
  border-right: 2px solid var(--color-border);
  border-left: 2px solid var(--color-border);
}

nav a.router-link-exact-active:first-of-type {
  border-right: 2px solid var(--color-border);
}

nav a.router-link-exact-active:last-of-type {
  border: 0;
  border-left: 2px solid var(--color-border);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  padding: 20px 5px;
  text-align: center;
  justify-content: center;
  align-items: center; 
  display: inline-block;
  /* padding: 0 1rem; */
  /* border-left: 1px solid var(--color-border); that was the border at left side on nav */
}

nav a:first-of-type {
  border: 0;
}

header {
  line-height: 1.5;
  min-height: 85px;
  height: fit-content;
  max-height: 12.5vh; 
  width: 100vw;
  top: 0;
  /* background-color: hsla(160, 100%, 37%, 1); */
} 


@media (min-width: 1024px) {
  header {
    display: flex;
    /* place-items: center; */
    line-height: 1.5;
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  /* header {
  max-height: 100vh; 
  width: 100%;
  top: 0;
  background-color: hsla(160, 100%, 37%, 1);
}  */

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    position: absolute; 
    /* margin-left: 10vw; */
    margin-top: 12.5vh;
    margin-top: 100px;
    width: 100vw;

    min-height: 90vh;
    height: max-content;
    padding: 10px;

    border: 1px solid #000;
    border-radius: 15px;
    /* max-width: 80vw;
    /* padding-top: 10vh; This padding is for every view, it will create a gap on the top 10% */
    /* min-height: 90vh; */
    background-color: rgba(255, 255, 255, 0.70);
  }
}
</style>
