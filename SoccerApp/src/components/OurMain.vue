<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { sessionStore } from '@/stores/sessionStore';
let session = sessionStore();
</script>
<template>
    <nav>
        <RouterLink to="/"><img class="menuLogo" src="@/assets/home.svg">Home</RouterLink>
        <RouterLink to="/teams"><img class="menuLogo" src="@/assets/team.svg">Teams</RouterLink>
        <RouterLink to="/players"><img class="menuLogo" src="@/assets/soccer-player.svg">Players</RouterLink>
        <RouterLink to="/transfers"><img class="menuLogo" src="@/assets/transfer.svg">Transfers</RouterLink>
        <RouterLink v-if="!session.isAutenticated" to="/Register"><img class="menuLogo"
                src="@/assets/register.svg">Register</RouterLink>
        <RouterLink to="/about"><img class="menuLogo" src="@/assets/about.svg">About</RouterLink>
        <RouterLink to="/contact"><img class="menuLogo" src="@/assets/contact-phone.svg">Contact Us</RouterLink>
    </nav>
    <div class="wrapper">
        <RouterView />
    </div>
</template>
<style scoped>
.menuLogo{
  width: 20px;
  margin-right: 10px;
}

nav {
  display: flex;
  min-width: 200px;
  width: auto;
  max-height: max-content;
  flex-direction: column;
  font-size: 1rem;
  text-align: left;
  margin-right: 40px;
  margin-left: 40px;
  margin-bottom: auto;
  margin-top: 10rem;
  
  border: 1px solid hsla(160, 100%, 37%, 1);
  border-radius: 15%;
  background-color: white;
}

nav:hover{
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
  .wrapper {
    display: flex;
    flex-direction: row;
    place-items: flex-start;
    /* flex-wrap: wrap; */
    min-width: 1024px;
    width: 85vw;
    /* margin-left: 5vw; */
    min-height: 630px;
    background-color: rgba(255, 255, 255, 0.80);
  }
}
</style>